/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/VitePluginHTMLConfig.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * vite-plugin-html插件的配置。
 * 详细的配置见：
 * node_modules/vite-plugin-html/dist/index.d.ts:23
 * https://github.com/vbenjs/vite-plugin-html
 */

'use strict';

import {
  dirname,
  join,
  resolve,
} from 'node:path';

import {
  fileURLToPath,
} from 'node:url';

import {
  weinreLocalPort,
  weinrePublicNetworkHost,
  weinrePublicNetworkPort,
} from './GlobalParameters.esm.mjs';

import {
  ShortcutIcons,
  Icons,
  AppleTouchIcon,
  AppleTouchIconPrecomposed,
} from './IconForLink.esm.mjs';

import StartupImgForApple from './StartupImgForApple.esm.mjs';

/**
 * 该函数返回值完全等价于“CommonJS modules”中的“__dirname”，是一个字符串，Windows系统下型如：G:\WebStormWS\xx\tools。<br />
 *
 * @param {string} import_meta_url 只传入import.meta.url即可，默认值（哈哈哈，这个默认值设置的有点多余，纯粹只是为了规避传空报错）：import.meta.url，必需。
 *
 * @returns {string} 返回值完全等价于“CommonJS modules”中的“__dirname”，是一个字符串，Windows系统下型如：G:\WebStormWS\xx\tools。
 */
function Get__dirname( import_meta_url = import.meta.url ){
  return dirname( Get__filename( import_meta_url ) );
}

/**
 * 该函数返回值完全等价于“CommonJS modules”中的“__filename”，是一个字符串，Windows系统下型如：G:\WebStormWS\xx\7788.mjs。<br />
 *
 * @param {string} import_meta_url 只传入import.meta.url即可，默认值（哈哈哈，这个默认值设置的有点多余，纯粹只是为了规避传空报错）：import.meta.url，必需。
 *
 * @returns {string} 返回值完全等价于“CommonJS modules”中的“__filename”，是一个字符串，Windows系统下型如：G:\WebStormWS\xx\7788.mjs。
 */
function Get__filename( import_meta_url = import.meta.url ){
  return fileURLToPath( import_meta_url );
}

/**
 * @type {string} 表示项目文件夹根目录，不是磁盘根目录。<br />
 */
const __dirname = Get__dirname( import.meta.url );

/**
 * @type {object} 为vite-plugin-html插件的inject.data、injectOptions.data选项中的顶级变量、公共变量设置默认值，尤其是顶级变量，如果顶级变量未定义会报出编译错误。
 * 顶级变量就算不需要也要保证它们被设置为null。
 * 各个属性具体表示什么，值是什么，可参见“src/template/ejs/head_meta”、“src/template/ejs/tool”中的描述。
 */
const defaultData = {
  contentSecurityPolicy: null,
  expires: 0,
  setCookieExpires: null,
  pageEnter: 'revealTrans(duration=5,transtion=8)',
  pageExit: 'revealTrans(duration=5,transtion=9)',
  refresh: null,
  color: '#0000ff',
  keywords: 'WEB,HTML5,CSS3',
  description: 'This is a page for HelloWorld.',
  subject: '这是一个副标题。',
  generator: 'WebStorm',
  appName: 'HelloWorld',
  author: '1227839175@qq.com',
  publisher: '12278',
  creators: [
    '1227839175@qq.com',
  ],
  itemprop: {
    type: 'website',
    url: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
    name: 'HelloWorld',
    description: 'This is a page for HelloWorld.',
    image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
  },
  appLinks: {
    web: {
      url: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
    },
    share: {
      type: 'website',
      url: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
      title: 'HelloWorld',
      description: 'This is a page for HelloWorld.',
      image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
    },
  },
  shortcutIcons: ShortcutIcons,
  icons: Icons,
  appleTouchIcon: AppleTouchIcon,
  appleTouchIconPrecomposed: AppleTouchIconPrecomposed,
  og: {
    og: 'website',
    title: 'HelloWorld',
    url: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
    siteName: 'HelloWorld',
    description: 'This is a page for HelloWorld.',
    locale: 'zh_CN',
    image: {
      url: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
      secureURL: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
      type: 'image/png',
      width: '512',
      height: '512',
      alt: '网站图片_512x512.png',
    },
  },
  alternate: null,
  twitter: {
    type: 'website',
    creator: '1227839175@qq.com',
    site: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
    url: 'https://192.168.2.7:8500/dev_server/pages/HelloWorld.html',
    title: 'HelloWorld',
    description: 'This is a page for HelloWorld.',
    card: 'summary_large_image',
    image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
  },
  facebook: null,
  publisherByGooglePlus: null,
  manifestByPWA: null,
  apple_itunes_app: null,
  dnsPrefetch: null,
  preconnect: null,
  preload: null,
  prefetch: null,
  prerender: null,
  modulepreload: null,
  mobileAgent: null,
  importByHTML: null,
  shortlink: null,
  search: null,
  startupImgForApple: StartupImgForApple,
  dynamicREM: true,
  viteAssetsManifest: 'vite_assets_manifest.json',
  weinreTool: {
    isEnable: false,
    weinreLocalPort,
    id: '',
    custom: null,
  },
  // 以上的顶级变量，就算不需要也要保证它们被设置为null，否则会出现顶级变量未定义的编译错误。

  // 以下是多个模板之间会共用到的变量的默认值。
  lang: 'zh-CN',
  prefix: 'og: https://ogp.me/ns#',
};

/**
 * 生成createHtmlPlugin()的配置参数。<br />
 * 详细的配置见：<br />
 * node_modules/vite-plugin-html/dist/index.d.ts:23
 * https://github.com/vbenjs/vite-plugin-html
 *
 * @param {object} config 对象参数。
 *
 * @param {string} config.appType 默认值为'spa'，必需。无论你的应用是一个单页应用（SPA）还是一个多页应用（MPA），亦或是一个定制化应用（SSR和自定义HTML处理的框架）：<br />
 * 'spa'：包含HTML中间件以及使用SPA回退。在预览中将sirv配置为single: true。<br />
 * 'mpa'：包含HTML中间件。<br />
 * 'custom'：不包含HTML中间件。<br />
 *
 * @param {string | string []| { [entryName: string]: string }} config.entryConfig vite的顶级配置项build.rollupOptions.input的配置值，必需。<br />
 *
 * @param {boolean} config.isProduction isProduction的值为true时表示生产环境，反之开发环境，必需。<br />
 *
 * @param {object} config.HTMLMinifyConfig 压缩HTML的配置选项，必需。<br />
 *
 * @returns {object} 返回一个对象，是传给createHtmlPlugin()的配置参数。
 */
function VitePluginHTMLConfig( {
  appType,
  entryConfig,
  isProduction,
  HTMLMinifyConfig,
} ){
  const isSPA = appType === 'spa' && !( typeof entryConfig !== 'string' && Object.keys( entryConfig || {} ).length > 1 ),
    config001 = {
      minify: isProduction
              ? HTMLMinifyConfig
              : false,
      verbose: !isProduction,
    },
    /**
     * node_modules/@types/ejs/index.d.ts:301
     */
    ejsOptions = {
      cach: !isProduction,
      compileDebug: !isProduction,
      root: [
        resolve( __dirname, '../src/template/ejs/' ),
      ],
      views: [
        resolve( __dirname, '../src/template/ejs/' ),
      ],
    };

  /**
   * SPA的配置。<br />
   *
   * 详细的配置见：
   * node_modules/vite-plugin-html/dist/index.d.ts:23
   * https://github.com/vbenjs/vite-plugin-html
   */
  function GenerateSPAConfig( {
    entry,
    template,
    filename,
    data,
  } ){
    return {
      entry,
      template,
      ...config001,
      inject: {
        ejsOptions: {
          ...ejsOptions,
          filename,
        },
        data,
      },
    };
  }

  /**
   * MPA的配置。<br />
   *
   * 详细的配置见：
   * node_modules/vite-plugin-html/dist/index.d.ts:23
   * https://github.com/vbenjs/vite-plugin-html
   */
  function GenerateMPAConfig( pagesConfig = [] ){
    return {
      ...config001,
      pages: pagesConfig.map( ( {
        entry,
        template,
        filename,
        data,
      } ) => {
        return {
          entry,
          template,
          filename,
          injectOptions: {
            ejsOptions: {
              ...ejsOptions,
              filename,
            },
            data,
          },
        };
      } ),
    };
  }

  return isSPA
    /**
     * SPA的配置。<br />
     *
     * 详细的配置见：
     * node_modules/vite-plugin-html/dist/index.d.ts:23
     * https://github.com/vbenjs/vite-plugin-html
     */
         ? GenerateSPAConfig( {
      entry: 'src/pages/hello_world/HelloWorld.mjs',
      template: 'src/template/ejs/HelloWorld.ejs',
      filename: 'HelloWorld.html',
      data: {
        VitePluginHTMLData: {
          ...defaultData,
          title: 'HelloWorld',
        },
      },
    } )
    /**
     * MPA的配置。<br />
     *
     * 详细的配置见：
     * node_modules/vite-plugin-html/dist/index.d.ts:23
     * https://github.com/vbenjs/vite-plugin-html
     */
         : GenerateMPAConfig( [
      {
        entry: 'src/pages/hello_world/HelloWorld.mjs',
        template: 'src/template/ejs/HelloWorld.ejs',
        filename: 'HelloWorld.html',
        data: {
          VitePluginHTMLData: {
            ...defaultData,
            title: 'HelloWorld',
          },
        },
      },

      {
        entry: 'src/pages/upload/Upload.mts',
        template: 'src/pages/upload/Upload.ejs',
        filename: 'Upload.html',
        data: {
          VitePluginHTMLData: {
            ...defaultData,
            title: 'Upload',
            description: 'This is a page for Upload.',
            appName: 'Upload',
            itemprop: {
              type: 'website',
              url: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
              name: 'Upload',
              description: 'This is a page for Upload.',
              image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
            },
            appLinks: {
              web: {
                url: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
              },
              share: {
                type: 'website',
                url: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
                title: 'Upload',
                description: 'This is a page for Upload.',
                image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
              },
            },
            og: {
              og: 'website',
              title: 'Upload',
              url: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
              siteName: 'Upload',
              description: 'This is a page for Upload.',
              locale: 'zh_CN',
              image: {
                url: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
                secureURL: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
                type: 'image/png',
                width: '512',
                height: '512',
                alt: '网站图片_512x512.png',
              },
            },
            twitter: {
              type: 'website',
              creator: '1227839175@qq.com',
              site: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
              url: 'https://192.168.2.7:8500/dev_server/pages/Upload.html',
              title: 'Upload',
              description: 'This is a page for Upload.',
              card: 'summary_large_image',
              image: 'https://192.168.2.7:8500/dev_server/static/ico/uncompressed/ico_512_512.png',
            },
          },
        },
      },
    ] );
}

export {
  VitePluginHTMLConfig,
};

export default VitePluginHTMLConfig;
