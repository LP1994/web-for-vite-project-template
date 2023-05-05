/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/vite_plugin_custom/vite-plugin-sri-by-custom.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2023-05-04 12:47:50 星期四
 */

/**
 * 本插件是基于“https://github.com/JonathanLee-LX/vite-plugin-sri”的二次开发。
 *
 * Vite的生态终究远不如Webpack，看来还是需要漫长的扩展！
 */

'use strict';

import {
  createHash,
} from 'node:crypto';

import {
  writeFileSync,
  readFileSync
} from 'node:fs';

import {
  resolve,
} from 'node:path';

import {
  load,
} from 'cheerio';

function sri( {
  hashFuncNames = 'sha512',
} = {} ){
  let config;
  const bundle = {};
  return {
    name: 'vite-plugin-sri',
    configResolved( resolvedConfig ){
      config = resolvedConfig;
    },
    enforce: 'post',
    apply: 'build',
    async writeBundle( options, _bundle ){
      // when use with vite-plugin-legacy
      // writeBundle will be called twice
      // legacy bundle will be run first, but not with index.html file
      // esm bundle will be run after, so should saved legacy bundle before esm bundle output.
      Object.entries( _bundle ).forEach( ( [ k, v ] ) => {
        // @ts-ignore
        bundle[ k ] = v;
      } );
      const htmls = Object.keys( bundle )
      .filter( filename => filename.endsWith( '.html' ) )
      // @ts-ignore
      .map( filename => {
        const bundleItem = bundle[ filename ];
        if( bundleItem.type === 'asset' ){
          return {
            name: bundleItem.fileName,
            source: bundleItem.source,
          };
        }
      } )
      .filter( item => !!item );
      htmls.forEach( async ( {
        name,
        source: html
      } ) => {
        // @ts-ignore
        const $ = load( html );
        // Implement SRI for scripts and stylesheets.
        const scripts = $( 'script' ).filter( '[src]' );
        const stylesheets = $( 'link' ).filter( '[href]' );
        const calculateIntegrityHashes = async ( element ) => {
          let source;
          const attributeName = element.attribs.src
                                ? 'src'
                                : 'href';
          const resourceUrl = element.attribs[ attributeName ];
          const resourcePath = resourceUrl.indexOf( config.base ) === 0
                               ? resourceUrl.substring( config.base.length )
                               : resourceUrl;
          const t = Object.entries( bundle )
          .find( ( [ , bundleItem ] ) => bundleItem.fileName === resourcePath )?.[ 1 ];
          if( !t ){
            config.logger.warn( `cannot find ${ resourcePath } in output bundle.` );
            try{
              source = readFileSync( resolve( options.dir, resourcePath ) );
            }
            catch( error ){
              source = void 0;
            }
          }
          else{
            if( t.type === 'asset' ){
              source = t.source;
            }
            else{
              source = t.code;
            }
          }
          if( source ){
            element.attribs.integrity = `${ hashFuncNames }-${ createHash( hashFuncNames )
            .update( source )
            .digest()
            .toString( 'base64' ) }`;
          }
          if( element.attribs.crossorigin === void 0 ){
            // 在进行跨域资源请求时，integrity必须配合crossorigin使用，不然浏览器会丢弃这个资源的请求
            // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin
            element.attribs.crossorigin = 'anonymous';
          }
        };
        await Promise.all( [
          ...scripts.map( async ( i, script ) => {
            return await calculateIntegrityHashes( script );
          } ),
          ...stylesheets.map( async ( i, style ) => {
            return await calculateIntegrityHashes( style );
          } ),
        ] );
        writeFileSync( resolve( config?.root, config?.build.outDir, name ), $.html() );
      } );
    },
  };
}

const VitePluginSRIByCustom = sri;

export {
  VitePluginSRIByCustom,
};

export default VitePluginSRIByCustom;
