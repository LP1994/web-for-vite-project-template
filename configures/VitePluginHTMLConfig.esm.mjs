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
 * 表示项目文件夹根目录，不是磁盘根目录。<br />
 *
 * @type {string}
 */
const __dirname = Get__dirname( import.meta.url );

/**
 * URL开头的共同部分。<br />
 * 例子1：<br />
 * https://192.168.2.10:8100/dev_server
 * 例子2：<br />
 * ..
 *
 * 注意：<br />
 * HTML的标签<meta>的值可以是相对路径，也可以是绝对路径。<br />
 * <meta http-equiv="refresh" content="5;url=another.html">
 * <meta http-equiv="refresh" content="5;url=https://www.runoob.com/html/html-meta.html">
 *
 * @type {string}
 */
const URLHead = '.';

/**
 * 为vite-plugin-html插件的inject.data、injectOptions.data选项中的顶级变量、公共变量设置默认值，尤其是顶级变量，如果顶级变量未定义会报出编译错误。
 * 顶级变量就算不需要也要保证它们被设置为null。
 * 各个属性具体表示什么，值是什么，可参见“src/template/ejs/head_meta”、“src/template/ejs/tool”中的描述。
 *
 * @type {object}
 */
const defaultData = {
  contentSecurityPolicy: null,
  expires: `${ new Date( Date.now() + ( 2 * 60 * 60 * 1000 ) ).toUTCString() }`,
  setCookieExpires: null,
  pageEnter: 'revealTrans(duration=5,transtion=8)',
  pageExit: 'revealTrans(duration=5,transtion=9)',
  refresh: null,
  color: '#0000ff',
  keywords: 'WEB,Vite,SPA',
  description: 'This is a page for Index.',
  subject: '这是一个副标题。',
  generator: 'WebStorm',
  appName: 'Index',
  author: '1227839175@qq.com',
  publisher: '12278',
  creators: [
    '1227839175@qq.com',
  ],
  itemprop: {
    type: 'website',
    url: URLHead + '/Index.html',
    name: 'Index',
    description: 'This is a page for Index.',
    image: URLHead + '/static/ico/uncompressed/ico_512_512.png',
  },
  appLinks: {
    web: {
      url: URLHead + '/Index.html',
    },
    share: {
      type: 'website',
      url: URLHead + '/Index.html',
      title: 'Index',
      description: 'This is a page for Index.',
      image: URLHead + '/static/ico/uncompressed/ico_512_512.png',
    },
  },
  shortcutIcons: ShortcutIcons,
  icons: Icons,
  appleTouchIcon: AppleTouchIcon,
  appleTouchIconPrecomposed: AppleTouchIconPrecomposed,
  og: {
    og: 'website',
    title: 'Index',
    url: URLHead + '/Index.html',
    siteName: 'Index',
    description: 'This is a page for Index.',
    locale: 'zh_CN',
    image: {
      url: URLHead + '/static/ico/uncompressed/ico_512_512.png',
      secureURL: URLHead + '/static/ico/uncompressed/ico_512_512.png',
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
    site: URLHead + '/Index.html',
    url: URLHead + '/Index.html',
    title: 'Index',
    description: 'This is a page for Index.',
    card: 'summary_large_image',
    image: URLHead + '/static/ico/uncompressed/ico_512_512.png',
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
 * 特别说明：
 * 1、该选项也会影响“configures/VitePluginHTMLConfig.esm.mjs”、“configures/EntryConfig.esm.mjs”这个两个的配置。<br />
 * 2、前者是vite-plugin-html插件，后者是Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。<br />
 * 3、上述两个配置文件，详细可前往它们内部查看说明。<br />
 * 4、如果实际项目指定为是SPA的，那么就将该选项设置为'spa'即可，上述两个配置文件会有各自的判断，返回相应的配置，具体见它们内部说明。<br />
 * 5、如果实际项目指定为是MPA的，那么就将该选项设置为'mpa'即可，上述两个配置文件会有各自的判断，返回相应的配置，具体见它们内部说明。<br />
 * 6、如果该选项设置为'custom'，那么极可能需要前往上述两个配置文件进行具体的修改，当前的配置未必能满足“custom”的需要。<br />
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
   *
   * @param {object} config 对象参数。
   *
   * @param {string} config.entry 1个对应的“入口脚本”。<br />
   * 1、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
   *
   * @param {string} config.template HTML模板文件，一般是ejs文件。<br />
   * 1、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
   *
   * @param {string} config.filename 最后生成的HTML文件名，带不带“.html”这个后缀名都行，因为最后生成的HTML文件名都会带上“.html”。<br />
   * 1、该选项不仅影响生产模式下生成的HTML文件名，也影响开发模式下，浏览器打开的URL的路径名。<br />
   * 如：<br />
   * filename: 'Index'
   * 那么开发模式下，浏览器打开的URL的路径名为：https://localhost:8500/dev_server/Index
   * 注意，这时，能成功访问到的URL为：https://localhost:8500/dev_server/Index
   * 而不是：https://localhost:8500/dev_server/Index.html
   * 此时，带不带“.html”就有区别了！
   *
   * filename: 'Index.html'
   * 那么开发模式下，浏览器打开的URL的路径名为：https://localhost:8500/dev_server/Index.html
   * 注意，这时，能成功访问到的URL为：https://localhost:8500/dev_server/Index.html
   * 而不是：https://localhost:8500/dev_server/Index
   * 此时，带不带“.html”就有区别了！
   *
   * @param {object} config.data 传给模板的自定义数据，一般将自定义的数据放在VitePluginHTMLData下即可，这样就能在模板文件中通过VitePluginHTMLData.xxx来访问自定义数据了。<br />
   * 如：<br />
   * {
   *   VitePluginHTMLData: {
   *     name: 'nameXXX',
   *   },
   * }
   * 1、当然，也可以是其他命名的，不一定得是“VitePluginHTMLData”，只是说，这里叫啥名，在模板文件中就得用那个设置的名字获取自定义的数据。<br />
   *
   * @returns {object}
   */
  function GenerateSPAConfig( {
    entry,
    template,
    filename,
    data,
  } ){
    return {
      ...config001,
      pages: [
        {
          entry,
          template,
          filename,
          data,
        },
      ].map( ( {
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

  /**
   * MPA的配置。<br />
   *
   * 详细的配置见：
   * node_modules/vite-plugin-html/dist/index.d.ts:23
   * https://github.com/vbenjs/vite-plugin-html
   *
   * @param {Array<{entry, template, filename, data}>} configs 数组参数。
   *
   * @param {string} entry 1个对应的“入口脚本”。<br />
   * 1、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
   *
   * @param {string} template HTML模板文件，一般是ejs文件。<br />
   * 1、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
   *
   * @param {string} filename 最后生成的HTML文件名，带不带“.html”这个后缀名都行，因为最后生成的HTML文件名都会带上“.html”。<br />
   * 1、该选项不仅影响生产模式下生成的HTML文件名，也影响开发模式下，浏览器打开的URL的路径名。<br />
   * 如：<br />
   * filename: 'Index'
   * 那么开发模式下，浏览器打开的URL的路径名为：https://localhost:8500/dev_server/Index
   * 注意，这时，能成功访问到的URL为：https://localhost:8500/dev_server/Index
   * 而不是：https://localhost:8500/dev_server/Index.html
   * 此时，带不带“.html”就有区别了！
   *
   * filename: 'Index.html'
   * 那么开发模式下，浏览器打开的URL的路径名为：https://localhost:8500/dev_server/Index.html
   * 注意，这时，能成功访问到的URL为：https://localhost:8500/dev_server/Index.html
   * 而不是：https://localhost:8500/dev_server/Index
   * 此时，带不带“.html”就有区别了！
   *
   * @param {object} data 传给模板的自定义数据，一般将自定义的数据放在VitePluginHTMLData下即可，这样就能在模板文件中通过VitePluginHTMLData.xxx来访问自定义数据了。<br />
   * 如：<br />
   * {
   *   VitePluginHTMLData: {
   *     name: 'nameXXX',
   *   },
   * }
   * 1、当然，也可以是其他命名的，不一定得是“VitePluginHTMLData”，只是说，这里叫啥名，在模板文件中就得用那个设置的名字获取自定义的数据。<br />
   *
   * @returns {object}
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
    /*
     1、当项目为单页应用时，调用函数GenerateSPAConfig即可。
     2、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
     */
         ? GenerateSPAConfig( {
      entry: 'src/pages/index/Index.mts',
      template: 'src/template/ejs/Index.ejs',
      filename: 'Index.html',
      data: {
        VitePluginHTMLData: {
          ...defaultData,
          title: 'Index',
        },
      },
    } )
    /*
     1、当项目为多页应用时，调用函数GenerateMPAConfig即可。
     2、由于返回的值是给项目根目录下的vite.config.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
     */
         : GenerateMPAConfig( [] );
}

export {
  VitePluginHTMLConfig,
};

export default VitePluginHTMLConfig;
