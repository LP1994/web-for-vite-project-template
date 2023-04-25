/**
 * Project: web-for-vite-project-template
 * FileDirPath: vite.config.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

'use strict';

import {
  dirname,
  resolve,
} from 'node:path';

import {
  fileURLToPath,
} from 'node:url';

import vue from '@vitejs/plugin-vue';

import {
  defineConfig,
} from 'vite';

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
 * @type {import('vite').UserConfig}
 */
export default defineConfig( ( {
  command,
  mode,
  ssrBuild,
} ) => {
  const alias = {
    'element-ui-css$': 'element-ui/lib/theme-chalk/index.css',
    'element-plus-css$': 'element-plus/dist/index.css',
    'swiper-css$': 'swiper/swiper-bundle.min.css',

    // assets文件夹 Start
    assetsDir: resolve( __dirname, './src/assets/' ),

    docDir: resolve( __dirname, './src/assets/doc/' ),

    csonDir: resolve( __dirname, './src/assets/doc/cson/' ),
    csvDir: resolve( __dirname, './src/assets/doc/csv/' ),
    jsonDir: resolve( __dirname, './src/assets/doc/json/' ),
    json5Dir: resolve( __dirname, './src/assets/doc/json5/' ),
    tomlDir: resolve( __dirname, './src/assets/doc/toml/' ),
    tsvDir: resolve( __dirname, './src/assets/doc/tsv/' ),
    txtDir: resolve( __dirname, './src/assets/doc/txt/' ),
    xmlDir: resolve( __dirname, './src/assets/doc/xml/' ),
    yamlDir: resolve( __dirname, './src/assets/doc/yaml/' ),

    fontsDir: resolve( __dirname, './src/assets/fonts/' ),
    imgDir: resolve( __dirname, './src/assets/img/' ),
    musicDir: resolve( __dirname, './src/assets/music/' ),
    videosDir: resolve( __dirname, './src/assets/videos/' ),
    // assets文件夹 End

    gQLAPIDir: resolve( __dirname, './src/graphQL/api/' ),

    nativeComponentsDir: resolve( __dirname, './src/native_components/' ),

    pagesDir: resolve( __dirname, './src/pages/' ),

    pwaManifestDir: resolve( __dirname, './src/pwa_manifest/' ),

    // styles文件夹 Start
    stylesDir: resolve( __dirname, './src/styles/' ),

    cssDir: resolve( __dirname, './src/styles/css/' ),
    lessDir: resolve( __dirname, './src/styles/less/' ),
    postcssDir: resolve( __dirname, './src/styles/postcss/' ),
    sassDir: resolve( __dirname, './src/styles/sass/' ),
    scssDir: resolve( __dirname, './src/styles/scss/' ),
    stylusDir: resolve( __dirname, './src/styles/stylus/' ),
    // styles文件夹 End

    // template文件夹 Start
    templateDir: resolve( __dirname, './src/template/' ),

    ejsDir: resolve( __dirname, './src/template/ejs/' ),
    handlebarsDir: resolve( __dirname, './src/template/handlebars/' ),
    htmlDir: resolve( __dirname, './src/template/html/' ),
    markdownDir: resolve( __dirname, './src/template/markdown/' ),
    mustacheDir: resolve( __dirname, './src/template/mustache/' ),
    pug_jadeDir: resolve( __dirname, './src/template/pug_jade/' ),
    // template文件夹 End

    // tools文件夹 Start
    toolsDir: resolve( __dirname, './src/tools/' ),

    jsDir: resolve( __dirname, './src/tools/js/' ),
    tsDir: resolve( __dirname, './src/tools/ts/' ),
    // tools文件夹 End

    wasmDir: resolve( __dirname, './src/wasm/build/' ),

    webComponentsDir: resolve( __dirname, './src/web_components/' ),

    // workers文件夹 Start
    workersDir: resolve( __dirname, './src/workers/' ),

    serviceWorkersDir: resolve( __dirname, './src/workers/service_workers/' ),
    sharedWorkersDir: resolve( __dirname, './src/workers/shared_workers/' ),
    workersToolsDir: resolve( __dirname, './src/workers/tools/' ),
    webWorkersDir: resolve( __dirname, './src/workers/web_workers/' ),
    // workers文件夹 End
  };

  // 开发配置，“vite preview”也会用该配置。
  if( command === 'serve' ){
    return {
      resolve: {
        alias,
      },
      plugins: [
        vue(),
      ],
    };
  }
  // 生产配置。
  else if( command === 'build' ){
    return {
      resolve: {
        alias,
      },
      plugins: [
        vue(),
      ],
    };
  }
  else{
    throw new Error( `\n\n\n当前本Vite配置（vite.config.mjs）的“command”支持的命令有：“serve”、“build”，还不支持本次输入的：“${ command }”，可能需要更新本Vite配置（vite.config.mjs）以便支持该命令。\n\n\n` );
  }
} );
