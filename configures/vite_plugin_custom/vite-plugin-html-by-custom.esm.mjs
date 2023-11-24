/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/vite_plugin_custom/vite-plugin-html-by-custom.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2023-05-04 12:47:50 星期四
 */

/**
 * 本插件是基于“https://github.com/vbenjs/vite-plugin-html”的二次开发。
 * 原插件BUG满天飞！见：
 * https://github.com/vbenjs/vite-plugin-html/issues/64
 * 改源代码，configureServer里面有一个调用createRewire(page.template, page, baseUrl, keys)，page.template改成page.filename
 * node_modules/vite-plugin-html/dist/index.mjs:118
 * node_modules/vite-plugin-html/dist/index.cjs:131
 *
 * https://github.com/vbenjs/vite-plugin-html/issues/63
 *
 * Vite的生态终究远不如Webpack，看来还是需要漫长的扩展！
 */

'use strict';

import fs from 'node:fs';

import {
  render,
} from 'ejs';

import {
  minify,
} from 'html-minifier-terser';

import {
  parse,
} from 'node-html-parser';

import path from 'pathe';

import {
  createFilter,
  loadEnv,
  normalizePath,
} from 'vite';

function createPlugin( {
  entry,
  template = './index.html',
  pages = [],
  verbose = false,
  inject = {},
  pageKey = '',
} ){
  const env = loadEnv( process.env.NODE_ENV, process.cwd() ),
    rewrites = [];

  let viteConfig;

  return {
    name: 'vite:html',
    order: 'pre',
    // 组建重写映射，并将filename添加到vite的input中
    config( conf ){
      const filename = path.basename( template );

      // 如果没有配置pages，则把根路径重定向到默认模板
      // 允许input有多个入口，只要不和filename重名就行
      // 这些html都在transform钩子中使用公共配置
      if( !pages?.length ){
        const to = path.resolve( conf.root, template );

        rewrites.push( {
          from: new RegExp( '^\\/$' ),
          to,
        } );

        return {
          build: {
            rollupOptions: {
              input: {
                [ filename.replace( /\.html/, '' ) ]: to,
              },
            },
          },
        };
      }

      let getRegStr,
        getInputStr,
        indexPage = null;

      if( pageKey ){
        getRegStr = page => `^\\/[^#\\\?]*?[\\?&]${ pageKey }=${ page }(&.+|#\\\/.*)?`;

        getInputStr = page => '/?' + pageKey + '=' + page;
      }
      else{
        getRegStr = page => {
          if( conf.base && conf.base.length > 2 && conf.base.startsWith( '/' ) && conf.base.endsWith( '/' ) ){
            return `^${ conf.base.replaceAll( '/', '\\/' ) }${ page }(\\?\w.*|\\/[^\\.]*)?$`;
          }
          else{
            return `^\\/${ page }(\\?\w.*|\\/[^\\.]*)?$`;
          }
        };

        getInputStr = page => {
          if( conf.base && conf.base.length > 2 && conf.base.startsWith( '/' ) && conf.base.endsWith( '/' ) ){
            return `${ conf.base }${ page }`;
          }
          else{
            return `/${ page }`;
          }
        };
      }

      const input = {};

      pages.forEach( page => {
        const to = {
          ...page,
        };

        if( !to.template ){
          to.template = template;
        }

        if( !to.filename ){
          to.filename = path.basename( filename );
        }

        if( to.filename !== 'index.html' && to.filename !== 'index' ){
          rewrites.push( {
            from: new RegExp( getRegStr( to.filename.replaceAll( '.', '\\.' ) ) ),
            to,
          } );

          input[ to.filename.replace( /\.html/, '' ) ] = getInputStr( to.filename );
        }
        else{
          indexPage = to;
        }

        if( !to.filename.endsWith( '.html' ) ){
          to.filename += '.html';
        }
      } );

      if( indexPage ){
        rewrites.push( {
          from: new RegExp( '^\\/(index\\.html)?$' ),
          to: indexPage,
        } );

        input.index = '/index.html';
      }

      return {
        build: {
          rollupOptions: {
            input,
          },
        },
      };
    },
    configResolved( resolvedConfig ){
      viteConfig = resolvedConfig;
    },
    configureServer( server ){
      const baseUrl = viteConfig.base ?? '/',
        proxyKeys = viteConfig.server?.proxy
                    ? Object.keys( viteConfig.server.proxy )
                    : [];

      server.middlewares.use( ( rqst, resp, next ) => {
        if( ![
          'GET',
          'HEAD',
        ].includes( rqst.method ) || !rqst.headers ){
          return next();
        }

        const headers = rqst.headers;

        if( typeof headers.accept !== 'string' || ![
          'text/html',
          'application/xhtml+xml',
        ].some( accept => headers.accept.includes( accept ) ) ){
          return next();
        }

        const parsedUrl = rqst._parsedUrl,
          rewrite = rewrites.find( r => {
            return parsedUrl.pathname.match( r.from );
          } );

        if( !rewrite ){
          if( parsedUrl.pathname.lastIndexOf( '.' ) <= parsedUrl.pathname.lastIndexOf( '/' ) ){
            rqst.url = '/index.html';
          }

          return next();
        }

        if( typeof rewrite.to === 'string' ){
          rqst.url = rewrite.to;

          return next();
        }

        // 用于开发环境的代理。只要发起的任何请求的URL符合开发环境设置的定义的代理映射（viteConfig.server.proxy），就交由代理处理。
        if( proxyKeys.some( k => parsedUrl.pathname.startsWith( path.resolve( baseUrl, k ) ) ) ){
          rqst.url = parsedUrl.pathname.replace( baseUrl, '/' );

          return next();
        }

        // 调用resp的end或write方法会直接把数据发给浏览器
        // 因此不会再触发transformIndexHtml钩子，需要手动调用
        server.transformIndexHtml(
          path.resolve( baseUrl, rewrite.to.filename ),
          fs.readFileSync( path.resolve( viteConfig.root, rewrite.to.template ) ).toString(),
        ).then( html => {
          resp.end( html );
        } );
      } );
    },
    // rollup钩子，获取文件地址。生产模式才会执行到！
    resolveId( source, importer ){
      const rewrite = rewrites.find( r => source.match( r.from ) );

      if( !rewrite ){
        return null;
      }
      if( typeof rewrite.to === 'string' ){
        return rewrite.to;
      }

      return path.resolve( viteConfig.root, rewrite.to.filename );
    },
    // rollup钩子，根据文件地址读取文件内容
    load( id ){
      if( typeof id !== 'string' ){
        return null;
      }

      const rewrite = rewrites.filter( r => typeof r.to !== 'string' )
      .find( r => path.resolve( viteConfig.root, r.to.filename ) === id );

      return rewrite
             ? fs.readFileSync( path.resolve( viteConfig.root, rewrite.to.template ) ).toString()
             : null;
    },
    // vite特有钩子，填充html文件插槽
    transformIndexHtml: {
      order: 'pre',
      async handler( html, ctx ){
        let injectOptions,
          pageEntry;

        const rewrite = rewrites.filter( r => typeof r.to !== 'string' )
        .find( r => {
          if( ctx.server && ctx.server.config?.base && ctx.server.config?.base?.length > 2 && ctx.server.config?.base?.startsWith( '/' ) && ctx.server.config?.base?.endsWith( '/' ) && ctx.filename.includes( ctx.server.config.base ) ){
            return path.resolve( viteConfig.root, r.to.filename ) === ctx.filename.replace( ctx.server.config.base, '/' );
          }
          else{
            return path.resolve( viteConfig.root, r.to.filename ) === ctx.filename;
          }
        } );

        if( rewrite ){
          injectOptions = rewrite.to.injectOptions || {};

          pageEntry = rewrite.to.entry || entry;
        }
        else{
          injectOptions = inject;

          pageEntry = entry;
        }

        html = await render(
          html,
          {
            ...viteConfig?.env ?? {},
            ...viteConfig?.define ?? {},
            ...env || {},
            ...injectOptions.data,
          },
          injectOptions.ejsOptions,
        );

        if( pageEntry ){
          const root = parse( html ),
            scriptNodes = root.querySelectorAll( 'script[type=module]' );

          if( scriptNodes?.length ){
            const removedNode = scriptNodes.map( item => {
              item.parentNode.removeChild( item );
              return item.toString();
            } );

            if( verbose ){
              console.warn( `vite-plugin-html: Since you have already configured entry, ${ removedNode.toString() } is deleted. You may also delete it from the index.html.` );
            }
          }

          html = root.toString()
          .replace( /<\/body>/, `<script defer type="module" src="${ normalizePath( `${ pageEntry }` ) }"><\/script>\n</body>` );
        }

        return {
          html,
          tags: injectOptions.tags || [],
        };
      }
    },
  };
}

const htmlFilter = createFilter( [
  '**/*.html',
] );

function getOptions( minify ){
  return {
    collapseWhitespace: minify,
    keepClosingSlash: minify,
    removeComments: minify,
    removeRedundantAttributes: minify,
    removeScriptTypeAttributes: minify,
    removeStyleLinkTypeAttributes: minify,
    useShortDoctype: minify,
    minifyCSS: minify,
  };
}

async function minifyHtml( html, minify$1 ){
  if( typeof minify$1 === 'boolean' && !minify$1 ){
    return html;
  }

  let minifyOptions = minify$1;

  if( typeof minify$1 === 'boolean' && minify$1 ){
    minifyOptions = getOptions( minify$1 );
  }

  return await minify( html, minifyOptions );
}

function createMinifyHtmlPlugin( { minify = true } = {} ){
  return {
    name: 'vite:minify-html',
    order: 'post',
    async generateBundle( _, outBundle ){
      if( minify ){
        for( const bundle of
          Object.values( outBundle ) ){
          if( bundle.type === 'asset' && htmlFilter( bundle.fileName ) && typeof bundle.source === 'string' ){
            bundle.source = await minifyHtml( bundle.source, minify );
          }
        }
      }
    },
  };
}

function VitePluginHTMLByCustom( userOptions = {} ){
  return [
    createPlugin( userOptions ),
    createMinifyHtmlPlugin( userOptions ),
  ];
}

export {
  VitePluginHTMLByCustom,
};

export default VitePluginHTMLByCustom;
