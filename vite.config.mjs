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
  readFileSync,
} from 'node:fs';

import {
  dirname,
  join,
  resolve,
} from 'node:path';

import {
  fileURLToPath,
} from 'node:url';

import vue from '@vitejs/plugin-vue';

import JSON5 from 'json5';

import Stylus from 'stylus';

import {
  defineConfig,
} from 'vite';

import tsconfig_json from './tsconfig.json' assert { type: 'json', };

import DefineConfig from './configures/DefineConfig.esm.mjs';

import {
  devServerGlobalParameters,
} from './configures/GlobalParameters.esm.mjs';

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
 * @type {string[]} 目标浏览器版本。<br />
 */
const browserslist = [
    // PC端完全支持ES 5的主流浏览器 Start
    // 'Chrome >= 23',
    // 'Firefox >= 21',
    // ie 9不支持ECMAScript 5的"use strict"，但是ie 10真正的完全支持ECMAScript 5了。
    // 'ie >= 9',
    // 'Safari >= 6',
    // Opera 15开始改用基于Chromium 28的，也是从15开始其内核跟Chrome一致了。
    // 'Opera >= 15',
    // PC端完全支持ES 5的主流浏览器 End

    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 Start
    // 'Chrome >= 58',
    // 'Firefox >= 54',
    // 这里的Edge是指旧版的微软Edge（版本从12到18），它是用微软的浏览器引擎EdgeHTML和他们的Chakra JavaScript引擎构建的。
    // 'Edge >= 14',
    // 'Safari >= 10',
    // 'Opera >= 55',
    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 End

    // PC端各主流浏览器的最新版本，至20230409。Start
    'Chrome >= 112',
    // 这里的Edge是指新版的微软Edge，其基于Chromium，带有Blink和V8引擎，后来其最新的版本号，也基本跟Chrome版本号保持一致了。
    'Edge >= 112',
    'Firefox >= 112',
    'Safari >= 16',
    'Opera >= 98',
    // PC端各主流浏览器的最新版本，至20230409。End

    // 移动端各主流浏览器的最新版本，至20230409。Start
    'ChromeAndroid >= 112',
    // 从Android 4.4后Android WebView直接跟Chrome同步。
    'Android >= 112',
    'FirefoxAndroid >= 112',
    'iOS >= 16',
    // 移动端各主流浏览器的最新版本，至20230409。End
  ],
  /**
   * @type {string[]} 每个目标环境都是一个环境名称，后跟一个版本号。当前支持以下环境名称：<br />
   * 1、chrome、edge、firefox、hermes、ie、ios、node、deno、opera、rhino、safari。<br />
   * 2、还可以是这样的：es2020、esnext、node12、node12.19.0、es5、es6、deno1.0。<br />
   */
  esbuildMinify_target = [
    // PC端完全支持ES 5的主流浏览器 Start
    // 'chrome23',
    // 'firefox21',
    // ie 9不支持ECMAScript 5的"use strict"，但是ie 10真正的完全支持ECMAScript 5了。
    // 'ie9',
    // 'safari6',
    // Opera 15开始改用基于Chromium 28的，也是从15开始其内核跟Chrome一致了。
    // 'opera15',
    // PC端完全支持ES 5的主流浏览器 End

    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 Start
    // 'chrome58',
    // 'firefox54',
    // 这里的Edge是指旧版的微软Edge（版本从12到18），它是用微软的浏览器引擎EdgeHTML和他们的Chakra JavaScript引擎构建的。
    // 'edge14',
    // 'safari10',
    // 'opera55',
    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 End

    'es2022',

    // PC端各主流浏览器的最新版本，至20230409。Start
    'chrome112',
    'edge112',
    'firefox112',
    'safari16',
    'opera98',
    // PC端各主流浏览器的最新版本，至20230409。End

    // 移动端各主流浏览器的最新版本，至20230409。Start
    'ios16',
    // 移动端各主流浏览器的最新版本，至20230409。End
  ];

// autoprefixer共有三种类型的控制注释：
// /* autoprefixer: (on|off) */：在注释前后“启用/禁用”整个块的所有Autoprefixer翻译。
// /* autoprefixer: ignore next */：仅为下一个属性或下一个规则选择器或规则参数（但不规则/规则正文）禁用自动前缀。
// /* autoprefixer grid: (autoplace|no-autoplace|off) */：控制Autoprefixer如何处理整个块的网格转换：
// autoplace：启用带有自动放置支持的网格翻译。
// no-autoplace：在禁用自动放置支持的情况下启用网格转换，但不支持自动放置（该值是值on的别名，但是值on是一个已弃用的值）。
// off：禁用所有网格翻译。
/**
 * @type {object} autoprefixer配置。<br />
 */
const autoprefixerConfig = {
    // 如果CSS未压缩，Autoprefixer应该使用Visual Cascade。默认值：true。
    cascade: true,
    // Autoprefixer应该添加前缀。默认为true。
    add: true,
    // 应该Autoprefixer[删除过时的]前缀。默认为true。
    remove: false,
    // Autoprefixer应该为@supports参数添加前缀。默认为true。
    supports: true,
    // 值类型：boolean、string，Autoprefixer应该为flexbox属性添加前缀。使用“no-2009”值，Autoprefixer将只为规范的最终版本和IE 10版本添加前缀。默认为true。
    flexbox: true,
    /**
     * 处理grid布局，有效值为：false、'autoplace'、'no-autoplace'。
     * 1、默认值为false，防止Autoprefixer输出CSS Grid翻译。<br />
     * 2、在您的项目根目录中运行npx autoprefixer --info以检查选择了哪些浏览器以及将为哪些属性添加前缀。<br />
     */
    // autoplace：启用Autoprefixer网格翻译并包括自动放置支持。您还可以在CSS中使用魔术注释：/* autoprefixer grid: autoplace */。
    // no-autoplace：该选项值是已弃用的选项值true的别名，启用Autoprefixer网格翻译，但不支持自动放置。您还可以在CSS中使用/* autoprefixer grid: no-autoplace */。
    // 将自动放置集成到现有项目中的绝对最佳方法是默认关闭自动放置，然后在需要时使用控制注释启用它。这种方法不太可能导致网站上的某些东西损坏。
    // 也就是在CSS文件的最顶部使用/* autoprefixer grid: no-autoplace */来关闭自动放置，但是在需要的地方使用/* autoprefixer grid: autoplace */来开启自动放置。
    grid: 'autoplace',
    // 不要在Browserslist配置中引发未知浏览器版本的错误。默认为false。
    ignoreUnknownVersions: false,
  },
  /**
   * @type {object} 插件postcss-calc的配置。<br />
   */
  postcssCalcConfig = {
    // 默认值为5，允许您定义十进制数的精度。
    precision: 6,
    // 默认值为false，允许您在输出中保留calc() 用法，以便浏览器自己处理小数精度。
    preserve: true,
    // 默认值为false，当calc()未减少为单个值时添加警告。
    warnWhenCannotResolve: false,
    // 默认值为false，允许将calc()用作媒体查询声明的一部分。
    mediaQueries: true,
    // 默认值为false，允许将calc()用作选择器的一部分。
    selectors: true,
  };

/**
 * 注意：仅使用纯字母字符作为自定义变量名称。我们正在使用正则表达式来修补视口值，任何带有特殊字符的变量都可能导致未知问题。<br />
 * 1、自定义属性名称区分大小写--my-color将被视为与--My-color不同的自定义属性。<br />
 */
const postcssViewportHeightCorrectionCustomViewportCorrectionVariable = 'postcss-viewport-height-correction2023',
  /**
   * 使用postcss-viewport-height-correction插件时需要手动引入的JS，其是为了解决height: 100vh在移动端浏览器（尤其是iOS端的浏览器）上出现的“怪异”现象，哪怕不是100vh，如：50vh、75vh、-1vh也会出现怪异现象。
   * 1、相关文章可见：<br />
   * https://cloud.tencent.com/developer/article/2031944
   * https://www.jianshu.com/p/437fd5b603de
   * 2、该插件的使用需要手动引入部分JS，具体写法见：<br />
   * https://github.com/Faisal-Manzer/postcss-viewport-height-correction
   * 3、注意：仅使用纯字母字符作为自定义变量名称。我们正在使用正则表达式来修补视口值，任何带有特殊字符的变量都可能导致未知问题。<br />
   * 4、自定义属性名称区分大小写--my-color将被视为与--My-color不同的自定义属性。<br />
   * 5、默认值为：vh。<br />
   * 6、里面的变量customViewportCorrectionVariable的值要跟插件中的选项variable的值保持一致。<br />
   */
  postcssViewportHeightCorrectionJS = `var customViewportCorrectionVariable='${ postcssViewportHeightCorrectionCustomViewportCorrectionVariable }';function setViewportProperty(doc){var prevClientHeight,customVar='--'+(customViewportCorrectionVariable||'vh');function handleResize(){var clientHeight=doc.clientHeight;if(clientHeight===prevClientHeight){return;}requestAnimationFrame(function updateViewportHeight(){doc.style.setProperty(customVar,(clientHeight*0.01)+'px');prevClientHeight=clientHeight;});}handleResize();return handleResize;}window.addEventListener('resize',setViewportProperty(document.documentElement));`;

/**
 * @type {import('vite').UserConfig} Vite配置。<br />
 * 详细选项见：<br />
 * node_modules/vite/dist/node/index.d.ts:2407
 */
export default defineConfig( ( {
  command,
  mode,
  ssrBuild,
} ) => {
  /**
   * @type {string|undefined} env_platform的值是字符串，有4个值：'dev_server'、'local_server'、'test'、'production'，来源是CLI参数中的“--mode”参数值，必需。<br />
   * 注意：<br />
   * 1、但是必须有这么一个“--mode”参数设置，这4个之中的其中一个即可：--mode dev_server、--mode local_server、--mode test、--mode production。<br />
   */
  const env_platform = mode,
    /**
     * @type {boolean} isProduction的值为true时表示生产环境，反之开发环境，该值依赖CLI参数中的“--mode”参数值，必需。<br />
     * 1、当CLI参数中有：“--mode dev_server”、“--mode local_server”时，该参数为false，表示开发环境。<br />
     * 2、当CLI参数中有：“--mode test”、“--mode production”时，该参数为true，表示生产环境。<br />
     */
    isProduction = ( mode === 'test' || mode === 'production' );

  mode = isProduction
         ? 'production'
         : 'development';

  /**
   * @type {object} 设置路径别名。<br />
   * 1、路径别名到底是路径别名，别用于直接指向具体的文件，尤其是JS文件，因为会导致无法根据导入语法的不同自行加载到相应的模块文件，致使报错；但是CSS一类的文件倒是可以直接指向到具体的文件。<br />
   * 2、也可以指定完整路径：xxx: path.resolve(path.join(__dirname, 'src/module1'))。<br />
   * 3、path.resolve和path.join的区别在于：<br />
   * 例如：<br />
   * path.resolve( __dirname, './src/assets/' )，最后解析成：G:\WebStormWS\web-for-vite-project-template\src\assets
   * path.join( __dirname, './src/assets/' )，最后解析成：G:\WebStormWS\web-for-vite-project-template\src\assets\
   * 有或是没有最后的“\”在具体应用时很重要！不然容易出现不如你所愿的现象。<br />
   * 4、当设置文件夹的路径别名时，用path.resolve设置时，其值包不包含最后的“/”都没关系，因为最后生成的路径（如：G:\WebStormWS\web-for-vite-project-template\src\assets）最尾部都不会包含“\”。<br />
   * 5、当设置文件夹的路径别名时，用path.join设置时，其值如果包含最后的“/”，则最后生成的路径（如：G:\WebStormWS\web-for-vite-project-template\src\assets\）最尾部就会包含“\”，反之不会。<br />
   * 6、设置文件夹的路径别名时，建议使用path.resolve，这样在后续使用路径别名时，就可以按正常的习惯使用：import JSONDemo001 from 'jsonDir/Demo001.json';<br />
   */
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
    },
    /**
     * @type {string} 默认值为'spa'。无论你的应用是一个单页应用（SPA）还是一个多页应用（MPA），亦或是一个定制化应用（SSR和自定义HTML处理的框架）：<br />
     * 'spa'：包含HTML中间件以及使用SPA回退。在预览中将sirv配置为single: true。<br />
     * 'mpa'：包含HTML中间件。<br />
     * 'custom'：不包含HTML中间件。<br />
     */
    appType = 'spa',
    /**
     * @type {string|RegExp|(string|RegExp)[]} 详细见：https://cn.vitejs.dev/config/shared-options.html#assetsinclude
     */
    assetsInclude = [
      ( () => {
        const KNOWN_ASSET_TYPES = Array.from( new Set( [
          // fonts Start
          'eot',
          'otf',
          'fon',
          'font',
          'ttf',
          'ttc',
          'woff',
          'woff2',
          // fonts End

          // images Start
          'apng',
          'arw',
          'avif',
          'bmp',
          'bpg',
          'cr2',
          'cur',
          'dcx',
          'dng',
          'flif',
          'gif',
          'heic',
          'heif',
          'icns',
          'ico',
          'j2c',
          'j2k',
          'jbig2',
          'jng',
          'jp2',
          'jpe',
          'jpeg',
          'jpg',
          'jpm',
          'jpx',
          'jxl',
          'jxr',
          'ktx',
          'mj2',
          'nef',
          'orf',
          'pam',
          'pbm',
          'pcx',
          'pgm',
          'png',
          'pnm',
          'ppm',
          'psd',
          'raf',
          'raw',
          'rgbe',
          'rw2',
          'svg',
          'svgz',
          'tga',
          'tif',
          'tiff',
          'wbmp',
          'webp',
          'wp2',
          'xbm',
          'xpm',
          'jfif',
          'pjpeg',
          'pjp',
          // images End

          // music Start
          'm4a',
          'kar',
          'ape',
          'wav',
          'wave',
          'flac',
          'wma',
          'cda',
          'aiff',
          'au',
          'mpeg',
          'mpeg-1',
          'mpeg-2',
          'mpeg-layer3',
          'mpeg-4',
          'mp3',
          'mp2',
          'mp1',
          'mid',
          'midi',
          'ra',
          'rm',
          'rmx',
          'vqf',
          'amr',
          'aac',
          'vorbis',
          'opus',
          // music End

          // videos Start
          'wmv',
          'asf',
          'asx',
          'rmvb',
          'mp4',
          '3gp',
          'mov',
          'm4v',
          'avi',
          'dat',
          'mkv',
          'flv',
          'vob',
          'mod',
          'mng',
          'mpg',
          '3gpp',
          'ogg',
          'webm',
          // videos End

          // other Start
          'webmanifest',
          // other End
        ] ) );

        return new RegExp( `\\.(` + KNOWN_ASSET_TYPES.join( '|' ) + `)(\\?.*)?$`, );
      } )(),
      new RegExp( `\\.(manifest)\\.(json)(\\?.*)?$` ),
    ],
    /**
     * @type {string} 默认：“/”，开发或生产环境服务的公共基础路径。合法的值包括以下3种：<br />
     * 1、绝对URL路径名，例如：/foo/
     * 2、完整的URL，例如：https://foo.com/
     * 3、空字符串“”或“./”（用于嵌入形式的开发）
     */
    base = ``,
    // ToDo
    /**
     * @type {object}
     */
    build = {
      minify: isProduction,
      /**
       * @type {string} 指定输出路径。<br />
       */
      outDir: resolve( __dirname, `./dist/${ env_platform }/` ),
    },
    /**
     * @type {CSSOptions} 配置CSS相关的行为。<br />
     * 详细见：<br />
     * node_modules/vite/dist/node/index.d.ts:526
     * https://cn.vitejs.dev/config/shared-options.html#css-modules
     */
    css = {
      /**
       * @type {CSSModulesOptions|boolean} 配置CSS modules的行为。选项将被传递给postcss-modules。<br />
       * 详细见：<br />
       * node_modules/vite/dist/node/index.d.ts:514
       * https://github.com/css-modules/postcss-modules
       */
      modules: {
        /**
         * @type {'global' | 'local'} 默认情况下，该插件假定所有的类都是'local'。值有：'global'、'local'。
         */
        scopeBehaviour: 'local',
        /**
         * @type {string | ((name: string, filename: string, css: string) => string)}
         */
        generateScopedName: '[name]_[local]_[sha512:contenthash:hex:8]',
        /**
         * @type {'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly' | ((originalClassName: string, generatedClassName: string, inputFile: string) => string)} 输出类名的样式。<br />
         * camelCase：class名称将被驼峰化（如：.apply-color -> applyColor），原来的class名称将不会被从local中删除。
         * camelCaseOnly：class名称将被驼峰化（如：.apply-color -> applyColor），原来的class名称将会被从local中删除。
         * dashes：只有class名中的破折号（“-”）会被驼峰化（如：.apply-color -> applyColor）。
         * dashesOnly：class名中的破折号（“-”）将被驼峰化（如：.apply-color -> applyColor），原来的class名将被从local删除。
         */
        localsConvention: 'dashes',
      },
      /**
       * @type {string | (PostCSS.ProcessOptions & { plugins?: PostCSS.AcceptedPlugin[]; })} 内联的PostCSS配置（格式同postcss.config.js），或者一个（默认基于项目根目录的）自定义的PostCSS配置路径。<br />
       * 对内联的POSTCSS配置，它期望接收与postcss.config.js一致的格式。但对于plugins属性有些特别，只接收使用数组格式。<br />
       * 搜索是使用postcss-load-config完成的，只有被支持的文件名才会被加载。<br />
       * 注意：如果提供了该内联配置，Vite将不会搜索其他PostCSS配置源。<br />
       *
       * 详细见：<br />
       * node_modules/postcss/lib/postcss.d.ts:314
       */
      postcss: {
        syntax: 'sugarss',
        parser: 'sugarss',
        stringifier: 'sugarss',
        map: false,
        // 配置插件的时候注意顺序哦！不同插件之间有先后处理的规则！postcss的插件有200多之数（有些还废弃、迁移包名之类的），还会随着积累越来越多的，挑着对项目有用的插件配置，不要过度求全，不然指不定会出现不如所愿的情况出现。
        plugins: [
          // 生成后备的兼容语法 Start

          // postcss-will-change-transition，为transition生成will-change。这个插件在transition之后添加了will-change属性来加速动画。可以与postcss-will-change插件结合使用，但是postcss-will-change-transition插件得在postcss-will-change插件之前。
          'postcss-will-change-transition',

          /**
           * postcss-will-change（得在Autoprefixer插件之前），使用backface-visibility来强制浏览器创建一个新层，而不覆盖现有的backface-visibility属性。<br />
           * 1、这个3D CSS hack通常使用transform: translateZ(0)来完成，但是这里使用了backface-visibility来避免覆盖更流行的transform属性。<br />
           * 2、不支持will-change的浏览器需要这些hack。<br />
           * 3、得在Autoprefixer插件之前使用此插件，它将供应商前缀添加到背面可见性。<br />
           */
          'postcss-will-change',

          // postcss-safe-area，为安全区域环境变量添加浏览器后备。
          'postcss-safe-area',

          /**
           * postcss-momentum-scrolling，用于为iOS上具有overflow（scroll、auto）的元素添加动量样式滚动行为（-webkit-overflow-scrolling: touch）。<br />
           * 1、默认仅为overflow: scroll添加-webkit-overflow-scrolling: touch。
           */
          'postcss-momentum-scrolling',

          // 生成后备的兼容语法 End

          // postcss-preset-env
          [
            'postcss-preset-env',
            {
              /**
               * 根据它们在成为实施Web标准的过程中的稳定性来确定要填充哪些CSS功能。<br />
               * 1、阶段可以是0（实验）到4（稳定），也可以是false。将stage设置为false将禁用每个polyfill。仅当您打算专门使用features选项时，这样做才有用。<br />
               * 2、默认值为2。<br />
               * 3、为了在PostCSS Preset Env更新之间获得更高的稳定性，您可以设置stage: 3和minimumVendorImplementations: 2。保持接近标准的一个副作用是您可以更轻松地将项目迁移到其他工具。<br />
               */
              stage: 0,
              /**
               * 根据实现状态确定要填充哪些CSS功能。这可用于启用浏览器中可用的插件，无论规范状态如何。<br />
               * 1、可以是0（没有供应商实现它）到 3（所有主要供应商）。<br />
               * 2、默认值为0。<br />
               * 3、当任何供应商尚未实施某个功能时，可以将其视为实验性的。<br />
               * 4、即使只有一个实现，它也可能在未来发生变化。<br />
               * 5、有时，功能/规范的问题只有在它可用后才会被发现。<br />
               * 6、当您只想使用那些应该稳定的功能时，建议使用值2。<br />
               * 7、拥有2个独立的实现是提案成为标准的关键步骤，也是功能稳定性的良好指标。<br />
               * 8、为了在PostCSS Preset Env更新之间获得更高的稳定性，您可以设置stage: 3和minimumVendorImplementations: 2。保持接近标准的一个副作用是您可以更轻松地将项目迁移到其他工具。<br />
               */
              minimumVendorImplementations: 0,
              browsers: browserslist,
              preserve: true,
              // debug: !isProduction,
              // 请注意，通过“feature”选项手动启用/禁用功能会覆盖此标志。
              enableClientSidePolyfills: true,
              // autoprefixer共有三种类型的控制注释：
              // /* autoprefixer: (on|off) */：在注释前后“启用/禁用”整个块的所有Autoprefixer翻译。
              // /* autoprefixer: ignore next */：仅为下一个属性或下一个规则选择器或规则参数（但不规则/规则正文）禁用自动前缀。
              // /* autoprefixer grid: (autoplace|no-autoplace|off) */：控制Autoprefixer如何处理整个块的网格转换：
              // autoplace：启用带有自动放置支持的网格翻译。
              // no-autoplace：在禁用自动放置支持的情况下启用网格转换，但不支持自动放置（该值是值on的别名，但是值on是一个已弃用的值）。
              // off：禁用所有网格翻译。
              autoprefixer: autoprefixerConfig,
            },
          ],

          // 优化性插件，这里个人设置成只做优化，不对特殊的、非标准的CSS语法（符合W3C的CSS语法）做处理 Start

          // postcss-single-charset，当文件中存在多个@charset规则时，会将最后一个@charset规则提取到文件顶部，并删除其他@charset规则。
          'postcss-single-charset',

          /**
           * postcss-remove-nested-calc
           * 1、说是已弃用，calc(100vw - calc(20% - 10px))到calc(100vw - (20% - 10px))以实现IE 11兼容性（其实IE 9及其以上版本也都不支持calc函数嵌套）。<br />
           * 2、使用下面的“@csstools/postcss-nested-calc”来代替它也行。<br />
           */
          // 'postcss-remove-nested-calc',

          // @csstools/postcss-nested-calc，处理calc函数的嵌套，文档见：https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nested-calc。<br />
          [
            '@csstools/postcss-nested-calc',
            {
              preserve: false,
            },
          ],

          /**
           * postcss-calc
           * 1、MDN上提到允许嵌套calc()函数（IE浏览器不支持的，可以用括号来代替嵌套），在这种情况下，内部函数被视为简单的括号。<br />
           * 2、对于长度，您不能使用0来表示0px（或其他长度单位）；相反，您必须使用带有单位。<br />
           * 3、如果您愿意，您可以为表达式中的每个值使用不同的单位。您还可以在需要时使用括号来建立计算顺序。<br />
           * 4、+和-运算符必须被空格包围，有效：calc(50% - 8px)。<br />
           * 5、*和/运算符不需要空格，但为了保持一致性，允许并建议添加空格。<br />
           * 6、涉及自动和固定布局表中的表格列、表格列组、表格行、表格行组和表格单元格的宽度和高度百分比的数学表达式可能被视为已指定auto。<br />
           * 7、当calc()用于控制文本大小时，请确保其中一个值包含相对长度单位，例如： font-size: calc(1.5rem + 3vw)，这可确保在缩放页面时文本大小会缩放。<br />
           * 8、与整数一起使用时，在需要<integer>的地方使用calc()时，该值将四舍五入为最接近的整数。例如：z-index: calc(3 / 2)，最终会取2这个值。<br />
           * 9、注意：Chrome浏览器当前不接受calc()返回的某些值，当需要整数时。这包括任何除法，即使它产生一个整数。z-index: calc(4 / 2)，也将不被接受。<br />
           * 10、+和-运算符两边的操作数都必须是带单位的，但是*和/运算符两边的操作数至少有一个带单位就行。<br />
           * 11、该插件就开发环境启用，生产环境不要使用，因为生产环境会启用cssnano进行压缩，而cssnano里面就有calc选项（也是使用postcss-calc插件），而且也已经配置了。<br />
           */
          ...( () => {
            return isProduction
                   ? []
                   : [
                [
                  'postcss-calc',
                  postcssCalcConfig,
                ],
              ];
          } )(),

          // postcss-mq-optimize（说是已弃用，但是人家还在更新，而且postcss官方插件页面还能搜索到它），删除无效的媒体查询或其表达式。
          'postcss-mq-optimize',

          /**
           * postcss-merge-queries，将相同的CSS媒体查询规则合并为一个。<br />
           * 1、由于此插件将所有媒体查询移动到文件末尾，因此如果您的CSS结构不合理，它可能会引入错误，导致结果不如所愿。所以记住这一点！<br />
           * 2、因此，建议在开发中也使用此插件以更快地检测到此类副作用。<br />
           */
          'postcss-merge-queries',

          /**
           * postcss-combine-duplicated-selectors，自动检测和组合重复的css选择器，这样你就不必手动处理了。<br />
           * 1、该插件就开发环境启用，生产环境不要使用，因为生产环境会启用cssnano进行压缩，而cssnano里面就有discardDuplicates选项，而且也已经配置了。<br />
           */
          ...( () => {
            return isProduction
                   ? []
                   : [
                [
                  'postcss-combine-duplicated-selectors',
                  {
                    // 可以选择组合重复的属性，启用后会移除重复的属性，后面的会覆盖前面的，从而保留最后的那个属性。
                    removeDuplicatedProperties: true,
                    // 限制仅在值相等时才组合属性，启用后会移除重复的属性，后面的会覆盖前面的，从而保留最后的那个属性。但是必须保证其值是全等的，对于使用了自定义属性的，还是会保留自定义属性的。
                    removeDuplicatedValues: true,
                  },
                ],
              ];
          } )(),

          // 优化性插件，这里个人设置成只做优化，不对特殊的、非标准的CSS语法（符合W3C的CSS语法）做处理 End

          // 特殊处理 Start

          // postcss-pseudo-element-colons，转换伪元素的双冒号、单冒号，对于新的标准的W3C规范，伪元素最好都用双冒号，虽然单冒号也被支持，但是它是不规范或者旧的规范版本。
          [
            'postcss-pseudo-element-colons',
            {
              selectors: [
                'before',
                'after',
                'first-letter',
                'first-line',
              ],
              'colon-notation': 'double',
            },
          ],

          /**
           * postcss-viewport-height-correction，解决height: 100vh在移动端浏览器（尤其是iOS端的浏览器）上出现的“怪异”现象，哪怕不是100vh，如：50vh、75vh、-1vh也会出现怪异现象。
           * 1、相关文章可见：<br />
           * https://cloud.tencent.com/developer/article/2031944
           * https://www.jianshu.com/p/437fd5b603de
           * 2、该插件的使用需要手动引入部分JS，具体写法见：<br />
           * https://github.com/Faisal-Manzer/postcss-viewport-height-correction
           */
          [
            'postcss-viewport-height-correction',
            {
              /**
               * 注意：仅使用纯字母字符作为自定义变量名称。我们正在使用正则表达式来修补视口值，任何带有特殊字符的变量都可能导致未知问题。<br />
               * 1、自定义属性名称区分大小写--my-color将被视为与--My-color不同的自定义属性。<br />
               * 2、默认值为：vh。<br />
               * 3、该设置值要跟JS中的变量customViewportCorrectionVariable的值保持一致。<br />
               */
              variable: postcssViewportHeightCorrectionCustomViewportCorrectionVariable,
            },
          ],

          // 特殊处理 End

          // postcss-browser-reporter，如果您想涵盖所有可能的警告，请将此插件放在所有插件之后。
          [
            'postcss-browser-reporter',
            {
              selector: 'html::before',
              styles: {
                display: 'block !important',
                position: 'fixed !important',
                top: '0 !important',
                right: '0 !important',
                bottom: '0 !important',
                left: '0 !important',
                'z-index': '202200000000 !important',
                content: '',
                width: '100% !important',
                height: '100% !important',
                'background-color': 'red !important',
                color: 'white !important',
                'font-size': '12px !important',
                overflow: 'hidden !important',
                'white-space': 'pre-wrap !important',
              },
            },
          ],
        ],
      },
      /**
       * @type {Record<string, any>} 指定传递给CSS预处理器的选项。文件扩展名用作选项的键。每个预处理器支持的选项可以在它们各自的文档中找到。<br />
       * 所有预处理器选项还支持additionalData选项，可以用于为每个样式内容注入额外代码。请注意，如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。<br />
       * 详细见：<br />
       * https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions
       */
      preprocessorOptions: {
        /**
         * 1、data、file这两个选项是不可用的，会被忽略。<br />
         * 2、我们强烈建议不要更改outFile、sourceMapContents、sourceMapEmbed、sourceMapRoot选项，因为当sourceMap选项为true时，sass-loader会自动设置这些选项。<br />
         * 3、sass(dart-sass)和node-sass选项之间存在细微差别。<br />
         * 4、sass(dart-sass)的'modern'API和旧API（legacy）的sass选项是不同的。请查看文档如何迁移新选项：https://sass-lang.com/documentation/js-api。<br />
         * 5、使用Dart Sass实现和sass-embedded实现则sassOptions选项里面不支持以下选项：precision、sourceComments。<br />
         * 6、使用sass-embedded实现则sassOptions选项里面不支持以下选项，但是Dart Sass实现还是支持的：indentWidth、indentType、linefeed。<br />
         * 7、注意！sass(dart-sass)、sass-embedded实现在2.0.0之前还是支持旧版的API及其选项，但是2.0.0之后，就会被删除，到时升级了还是要注意下述sassOptions选项中的选项差异。<br />
         * 8、新版API对应的sassOptions选项里的各个可用选项见：node_modules/sass/types/options.d.ts。<br />
         * 9、旧版API对应的sassOptions选项里的各个可用选项见：node_modules/sass/types/legacy/options.d.ts。<br />
         * 10、上面的api选项的值也会影响sassOptions选项里的各个选项。'modern'API和旧API（legacy）的sass选项是不同的。请查看文档如何迁移新选项：https://sass-lang.com/documentation/js-api。<br />
         */
        sass: {
          // additionalData: `$injectedColor: orange;`,

          // 作者自己说这个库已经过时了，不建议再使用它了！设置成false就可以禁用它，而不是不设置，因为默认是启用它的。
          // 报：[sass] fiber.call$1 is not a function
          // fiber: false,
          /**
           * dart-sass的charset选项默认值为true，我们强烈建议不要将值更改为false，因为webpack不支持utf-8以外的文件。<br />
           * 1、值类型：boolean，默认值：true。<br />
           * 2、如果为true，编译器可能会在前面加上@charset "UTF-8";如果输出非ASCII CSS，则为U+FEFF（字节顺序标记）。<br />
           * 3、如果为false，编译器永远不会发出这些字节序列。这在连接或嵌入HTML <style>标记时非常理想（输出仍然是UTF-8）。<br />
           */
          // charset: true,
          quietDeps: false,
          verbose: false,

          // 以下分别列出新旧选项，个人觉得最好就这么全留着两者，按理会根据上面的api选项来使用对应的选项，应该不会有冲突的，毕竟它们之间没有选项覆盖。

          // 旧版选项。
          ...{
            /**
             * 处理.scss文件时，该选项值设置为false即可，但是如果是处理.sass文件，则还是要设置成true的。<br />
             * 1、值类型：boolean，默认值：false。<br />
             */
            indentedSyntax: true,
            /**
             * 生成的CSS是否应该使用空格或制表符进行缩进。<br />
             * 1、值类型：string，默认值：space，有效值：'space'、'tab'。<br />
             * 2、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            indentType: 'space',
            /**
             * 每个应使用多少空格或制表符（二者到底哪个取决于indentType选项）生成的CSS中的缩进级别。它必须介于0和10之间（包括0和10）。<br />
             * 1、值类型：number，默认值：2。<br />
             * 2、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            indentWidth: 4,
            /**
             * 在生成的CSS中每个行的末尾使用哪个字符序列，它可以具有以下值：<br />
             * 1、'lf'使用U+000A换行。<br />
             * 2、'lfcr'使用U+000A换行符，后跟U+000D回车符。<br />
             * 3、'cr'使用U+000D回车。<br />
             * 4、'crlf'使用U+000D回车符，后跟U+000A换行符。<br />
             * 5、值类型：string，默认值：'lf'，有效值有：'lf'、'lfcr'、'cr'、'crlf'。<br />
             * 6、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            linefeed: 'lf',
            /**
             * 已编译CSS的输出样式。有4种可能的输出样式：<br />
             * 1、'expanded'：Dart Sass的默认值，写入每个选择器并声明自己的路线。<br />
             * 2、'compressed'：尽可能多的删除额外字符，并将整个样式表放在一行上。<br />
             * 3、'nested'：Node Sass的默认值，Dart Sass和sass-embedded实现不支持，缩进CSS规则以匹配Sass源的嵌套。<br />
             * 4、'compact'：Dart Sass和sass-embedded实现不支持，将每个CSS规则放在自己的单行上。<br />
             */
            outputStyle: isProduction
                         ? 'compressed'
                         : 'expanded',
          },

          // 新版选项。
          ...{
            /**
             * .scss文件用'scss'，.sass文件用'indented'，.css文件用'css'。<br />
             * 1、默认值：'scss'，值类型：string。<br />
             */
            syntax: 'indented',
            // 设置成false会使用非ASCII码以支持更多的字符编码，设置成true会使用ASCII码（ASCII码只有128个字符编码）。
            alertAscii: false,
            alertColor: true,
            /**
             * 已编译CSS的输出样式。有4种可能的输出样式：<br />
             * 1、'expanded'：Dart Sass的默认值，写入每个选择器并声明自己的路线。<br />
             * 2、'compressed'：尽可能多的删除额外字符，并将整个样式表放在一行上。<br />
             * 3、'nested'：Node Sass的默认值，Dart Sass和sass-embedded实现不支持，缩进CSS规则以匹配Sass源的嵌套。<br />
             * 4、'compact'：Dart Sass和sass-embedded实现不支持，将每个CSS规则放在自己的单行上。<br />
             */
            style: isProduction
                   ? 'compressed'
                   : 'expanded',
          },
        },
        /**
         * 1、data、file这两个选项是不可用的，会被忽略。<br />
         * 2、我们强烈建议不要更改outFile、sourceMapContents、sourceMapEmbed、sourceMapRoot选项，因为当sourceMap选项为true时，sass-loader会自动设置这些选项。<br />
         * 3、sass(dart-sass)和node-sass选项之间存在细微差别。<br />
         * 4、sass(dart-sass)的'modern'API和旧API（legacy）的sass选项是不同的。请查看文档如何迁移新选项：https://sass-lang.com/documentation/js-api。<br />
         * 5、使用Dart Sass实现和sass-embedded实现则sassOptions选项里面不支持以下选项：precision、sourceComments。<br />
         * 6、使用sass-embedded实现则sassOptions选项里面不支持以下选项，但是Dart Sass实现还是支持的：indentWidth、indentType、linefeed。<br />
         * 7、注意！sass(dart-sass)、sass-embedded实现在2.0.0之前还是支持旧版的API及其选项，但是2.0.0之后，就会被删除，到时升级了还是要注意下述sassOptions选项中的选项差异。<br />
         * 8、新版API对应的sassOptions选项里的各个可用选项见：node_modules/sass/types/options.d.ts。<br />
         * 9、旧版API对应的sassOptions选项里的各个可用选项见：node_modules/sass/types/legacy/options.d.ts。<br />
         * 10、上面的api选项的值也会影响sassOptions选项里的各个选项。'modern'API和旧API（legacy）的sass选项是不同的。请查看文档如何迁移新选项：https://sass-lang.com/documentation/js-api。<br />
         */
        scss: {
          // additionalData: `$injectedColor: orange;`,

          // 作者自己说这个库已经过时了，不建议再使用它了！设置成false就可以禁用它，而不是不设置，因为默认是启用它的。
          // 报：[sass] fiber.call$1 is not a function
          // fiber: false,
          /**
           * dart-sass的charset选项默认值为true，我们强烈建议不要将值更改为false，因为webpack不支持utf-8以外的文件。<br />
           * 1、值类型：boolean，默认值：true。<br />
           * 2、如果为true，编译器可能会在前面加上@charset "UTF-8";如果输出非ASCII CSS，则为U+FEFF（字节顺序标记）。<br />
           * 3、如果为false，编译器永远不会发出这些字节序列。这在连接或嵌入HTML <style>标记时非常理想（输出仍然是UTF-8）。<br />
           */
          // charset: true,
          quietDeps: false,
          verbose: false,

          // 以下分别列出新旧选项，个人觉得最好就这么全留着两者，按理会根据上面的api选项来使用对应的选项，应该不会有冲突的，毕竟它们之间没有选项覆盖。

          // 旧版选项。
          ...{
            /**
             * 处理.scss文件时，该选项值设置为false即可，但是如果是处理.sass文件，则还是要设置成true的。<br />
             * 1、值类型：boolean，默认值：false。<br />
             */
            indentedSyntax: false,
            /**
             * 生成的CSS是否应该使用空格或制表符进行缩进。<br />
             * 1、值类型：string，默认值：space，有效值：'space'、'tab'。<br />
             * 2、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            indentType: 'space',
            /**
             * 每个应使用多少空格或制表符（二者到底哪个取决于indentType选项）生成的CSS中的缩进级别。它必须介于0和10之间（包括0和10）。<br />
             * 1、值类型：number，默认值：2。<br />
             * 2、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            indentWidth: 2,
            /**
             * 在生成的CSS中每个行的末尾使用哪个字符序列，它可以具有以下值：<br />
             * 1、'lf'使用U+000A换行。<br />
             * 2、'lfcr'使用U+000A换行符，后跟U+000D回车符。<br />
             * 3、'cr'使用U+000D回车。<br />
             * 4、'crlf'使用U+000D回车符，后跟U+000A换行符。<br />
             * 5、值类型：string，默认值：'lf'，有效值有：'lf'、'lfcr'、'cr'、'crlf'。<br />
             * 6、sass-embedded实现不支持该选项，但是Dart Sass实现还是支持的。<br />
             */
            linefeed: 'lf',
            /**
             * 已编译CSS的输出样式。有4种可能的输出样式：<br />
             * 1、'expanded'：Dart Sass的默认值，写入每个选择器并声明自己的路线。<br />
             * 2、'compressed'：尽可能多的删除额外字符，并将整个样式表放在一行上。<br />
             * 3、'nested'：Node Sass的默认值，Dart Sass和sass-embedded实现不支持，缩进CSS规则以匹配Sass源的嵌套。<br />
             * 4、'compact'：Dart Sass和sass-embedded实现不支持，将每个CSS规则放在自己的单行上。<br />
             */
            outputStyle: isProduction
                         ? 'compressed'
                         : 'expanded',
          },

          // 新版选项。
          ...{
            /**
             * .scss文件用'scss'，.sass文件用'indented'，.css文件用'css'。<br />
             * 1、默认值：'scss'，值类型：string。<br />
             */
            syntax: 'scss',
            // 设置成false会使用非ASCII码以支持更多的字符编码，设置成true会使用ASCII码（ASCII码只有128个字符编码）。
            alertAscii: false,
            alertColor: true,
            /**
             * 已编译CSS的输出样式。有4种可能的输出样式：<br />
             * 1、'expanded'：Dart Sass的默认值，写入每个选择器并声明自己的路线。<br />
             * 2、'compressed'：尽可能多的删除额外字符，并将整个样式表放在一行上。<br />
             * 3、'nested'：Node Sass的默认值，Dart Sass和sass-embedded实现不支持，缩进CSS规则以匹配Sass源的嵌套。<br />
             * 4、'compact'：Dart Sass和sass-embedded实现不支持，将每个CSS规则放在自己的单行上。<br />
             */
            style: isProduction
                   ? 'compressed'
                   : 'expanded',
          },
        },
        less: {
          // additionalData: `$injectedColor: orange;`,

          // 该选项不建议使用，已弃用，它已由math选项代替，该选项为true时，会将math选项设置为2。
          // strictMath: true,
          // 已弃用。该选项为true时，rewriteUrls选项会被设置为2，2对应'all'。
          // relativeUrls: true,
          // 兼容IE 8，不推荐使用，已废弃，从v3.0.0开始默认为false。当前仅用于data-uri函数，以确保不会创建太大的图像，以至于浏览器无法处理。
          // ieCompat: false,
          // 已废弃，从v3.0.0开始默认为false。替换为@plugin选项。
          // javascriptEnabled: false,
          // 已废弃，生成内联源映射。这是浏览器开始支持源地图之前的唯一选择，有效值：'comments'、'mediaquery'、'all'。
          // dumpLineNumbers: 'comments',
          // 已废弃，
          // compress: false,

          /**
           * math选项的4个有效值，具体设置时，设置成字符串值也行，设置成number也行（优先用number设置吧），它们是一一对应的，less包的代码里会进行自动判断：<br />
           * 1、always（对应：0）：less 3.x版本的默认值，总是执行数学运算。<br />
           * 2、parens-division（对应：1）：less 4.0版本的默认值，对使用“/”且两边的操作数没有被括号括起来的不进行计算（不计算：2px / 2），其他都进行数学计算（做计算：(2px / 2)）。<br />
           * 3、parens、strict（对应：2）：这两个都表示同一个，只对被括号包裹的进行计算，其他都不计算。<br />
           * 4、strict-legacy（对应：3）：该值在less 4.0版本中被删除了，都不做计算，原样保留。<br />
           */
          math: 2,
          /**
           * 1、启用严格单位后，我们假设这是计算中的错误并引发错误：.class { property: 1px * 2px; }，因为在这种情况下，事情显然不对，长度乘以长度得到一个区域，但css不支持指定区域。<br />
           * 2、如果没有此选项，Less在进行数学运算时会尝试猜测输出单元。所以我们假设用户希望其中一个值是一个值，而不是一个长度单位，我们输出2px。<br />
           */
          strictUnits: true,
          // 只报告错误，没有任何输出，设置成false表示不会启用。
          lint: false,
          // 允许从不安全的HTTPS主机导入。
          insecure: true,
          // 将生成文件导入依赖项列表输出到标准输出。
          depends: false,
          // 终端中的颜色输出。
          color: true,
          // strictImports选项控制编译器是否允许在@media块或（稍后添加的）其他选择器块内进行@import。
          strictImports: false,
        },
        ...( () => {
          const config = {
            // additionalData: `$injectedColor: orange;`,

            /**
             * 仅支持define，可以作为对象传递。<br />
             * 详细见：<br />
             * https://stylus-lang.com/docs/js.html#define-name-node-raw
             * 通过传递一个Node，我们可以定义一个全局变量。当在你的库中暴露出有条件的功能时，这很有用，这取决于另一个库的可用性。<br />
             */
            /*
             define: {
             $specialColor: new Stylus.nodes.RGBA( 51, 197, 255, 1 ),
             },
             */

            // 且写着！看看有什么反应！Start

            // 值类型：boolean，默认值是：false，在@import上包含常规CSS。
            includeCSS: true,
            // 值类型：boolean、Object，默认值：{ nocheck: true }，resolveURL: true等价于默认值，解析导入文件中的相对url()。
            resolveURL: {
              // 其他解析路径。
              // paths: '',
              // 不要检查文件是否存在。
              nocheck: true,
            },
            // 值类型：boolean，默认值是：false，在生成的CSS中发出注释，指示相应的Stylus行。
            lineNumbers: !isProduction,
            // 值类型：boolean，默认值是：false，将@import和@charset移到顶部。
            hoistAtrules: true,
            // 值类型：boolean，默认值是：false，压缩CSS输出。
            compress: isProduction,

            // 且写着！看看有什么反应！End
          };

          return {
            styl: config,
            stylus: config,
          };
        } )(),
      },
      // 实验性，在开发过程中是否启用sourcemap。
      devSourcemap: false,
    },
    /**
     * @type {object} Vite的顶级配置项define的配置。在编译时用其他值或表达式替换代码中的变量。这对于允许开发构建和生产构建之间的不同行为很有用。<br />
     * 1、传递给define的每个键都是一个标识符或多个用.连接的标识符：'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)。<br />
     * 2、如果该值是一个字符串，它将被用作代码片段：TWO: '1+1'。<br />
     * 3、如果值不是字符串，它将被字符串化（包括函数）。<br />
     * 4、如果你在key前加上typeof前缀，它只为typeof调用定义：'typeof window': JSON.stringify('object111')。<br />
     * 5、如果需要定义一个值是字符串值，得单引号内部嵌套双引号，如：'"例子"'（或者JSON.stringify('例子')），否则没法真正输出这个字符串。<br />
     * 6、如果值不是字符串，它将被字符串化，相当于使用JSON.stringify处理，但是如果是函数，直接这么设置就行，别用JSON.stringify：'fun1': () => {}。<br />
     */
    define = DefineConfig( {
      env_platform,
      isProduction,
    } ),
    /**
     * @type {string} 默认值同顶级配置选项“root”的值。用于加载.env文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。<br />
     */
    envDir = resolve( __dirname, `./configures/env/` ),
    /**
     * @type {string|string[]} 默认值：“VITE_”，以envPrefix开头的环境变量会通过import.meta.env暴露在你的客户端源码中。<br />
     * 安全注意事项：<br />
     * envPrefix不应被设置为空字符串''，这将暴露你所有的环境变量，导致敏感信息的意外泄漏。检测到配置为''时Vite将会抛出错误。<br />
     * 如果你想暴露一个不含前缀的变量，可以使用顶级配置项define选项：<br />
     * define: {
     *   'import.meta.env.ENV_VARIABLE': JSON.stringify( process.env.ENV_VARIABLE ),
     * }
     */
    envPrefix = [
      'VITE_',
      'env_',
    ],
    /**
     * @type {ESBuildOptions | false} 默认情况下，esbuild会被应用在ts、jsx、tsx文件。
     * 你可以通过esbuild.include和esbuild.exclude对要处理的文件类型进行配置，这两个配置的值可以是一个正则表达式、一个picomatch模式，或是一个值为这两种类型的数组。
     *
     * 详细配置见：<br />
     * https://cn.vitejs.dev/config/shared-options.html#esbuild
     * node_modules/vite/dist/node/index.d.ts:695
     * node_modules/esbuild/lib/main.d.ts:235
     * node_modules/esbuild/lib/main.d.ts:8
     *
     * esbuild官方配置选项见：<br />
     * https://esbuild.github.io/api/
     */
    esbuild = {
      // ToDo 是不是要动态的加入：js、mjs、cjs、mts、cts等等。
      include: [
        ( () => {
          return new RegExp( `\\.(` + Array.from( new Set( [
            'ts',
            'jsx',
            'tsx',
          ] ) ).join( '|' ) + `)(\\?.*)?$`, );
        } )(),
      ],
      /**
       * “法律注释（legal comment）”被认为是JS中的任何语句级注释或CSS中包含@license或@preserve或以//!或者/*!开头的任何规则级注释。<br />
       * 1、默认情况下，这些注释保留在输出文件中，因为这遵循了代码原作者的意图。<br />
       * 2、有效值说明：<br />
       * 'none'：不要保留任何法律评论。<br />
       * 'inline'：保留所有法律评论。<br />
       * 'eof'：将所有法律注释移至文件末尾。<br />
       * 'linked'：将所有法律评论移至.LEGAL.txt文件并使用评论链接到它们。<br />
       * 'external'：将所有法律评论移至.LEGAL.txt文件，但不要链接到它们。<br />
       */
      legalComments: isProduction
                     ? 'none'
                     : 'inline',
      // 值有：'ascii'、'utf8'。
      charset: 'utf8',
      color: true,
      // 这将设置生成的JavaScript文件的输出格式。当前可以配置三个可能的值：iife、cjs、esm。
      format: 'esm',
      /**
       * 1、esbuild的“tree shaking”只能删除声明级别的死代码。<br />
       * 2、请注意，esbuild的“tree shaking”实现依赖于ECMAScript模块导入和导出语句的使用，它不适用于CommonJS模块。<br />
       * 3、用于“tree shaking”的“side effects（副作用）”检测是保守的，这意味着esbuild仅在能够确保没有隐藏的副作用时才将可移除的代码视为死代码。<br />
       */
      // 4、可以使用/* @__PURE__ */注释，明确表示该表达式是无副作用的，由于注释的原因，这被认为是无副作用的，如果未使用，将被删除。
      /*
       // 例子：
       let gammaTable = 无副作用的注释 (() => {
       // 此处跳过副作用检测。
       let table = new Uint8Array(256);
       for (let i = 0; i < 256; i++)
       table[i] = Math.pow(i / 255, 2.2) * 255;
       return table;
       })();
       */
      treeShaking: isProduction,
      /**
       * 代码拆分仍然是一项正在进行的工作。
       * 它目前只适用于esm输出格式，也就是说当选项“format”的值为'esm'时，该选项有效。
       * 还有一个已知的跨代码拆分块的导入语句的排序问题。你可以关注跟踪问题，以了解关于这个功能的更新。
       * 详细见：https://esbuild.github.io/api/#splitting
       */
      splitting: true,
      // 详细见：https://esbuild.github.io/api/#ignore-annotations
      ignoreAnnotations: false,
      // 有效值有：browser、node、neutral。
      platform: 'browser',
      keepNames: true,
      mangleQuoted: false,
      // 日志限制可以更改为另一个值，也可以通过将其设置为0来完全禁用。这将显示所有日志消息。
      logLimit: 0,
      /**
       * 注意：<br />
       * 如果在诸如console.log()中编写某些跟项目逻辑业务有关的代码，那么当启用removeConsole、removeDebugger时，会导致最后输出的代码中因为删除了诸如console.log()，从而导致其中的某些跟项目逻辑业务有关的代码也被删除，最终使生产的代码出现非所愿期望的代码输出，从而报错。<br />
       * 所以，诸如console.log()中不要做任何逻辑处理（哪怕是：++index这种最简单的逻辑），只作为纯日志输出。<br />
       * 例如：<br />
       * let index = 0, arr001 = [ 'qqq', 'www', ], str001 = '';
       *
       * for( const item of arr001 ){
       *   str001 + = item;
       *   
       *   console.log( `index--->${ ++index }` );
       * }
       * 当没有启用removeConsole、removeDebugger时，执行上述代码后，index的值为3，但是如果启用removeConsole、removeDebugger，则index的值为0，那么显然这不是期望的。<br />
       *
       * 对于drop选项，当前配置是这样的，当“env_platform”为“test”时不设置drop选项（对应的是不删除操作），当“env_platform”为“production”时设置drop选项（对应的是删除操作）。<br />
       */
      ...( () => {
        return {
          ...( () => {
            if( env_platform === 'dev_server' ){
              return {};
            }
            else if( env_platform === 'local_server' ){
              return {};
            }
            else if( env_platform === 'test' ){
              return {};
            }
            else if( env_platform === 'production' ){
              return {
                drop: [
                  'debugger',
                  'console',
                ],
              };
            }
            else{
              return {};
            }
          } )(),
        };
      } )(),
      target: esbuildMinify_target,
      // 有效值有：silent、error、warning、info、debug、verbose。
      logLevel: 'error',
      logOverride: {
        'assign-to-constant': 'error',
        'assign-to-import': 'error',
        'call-import-namespace': 'error',
        'commonjs-variable-in-esm': 'error',
        'delete-super-property': 'error',
        'duplicate-case': 'error',
        'duplicate-object-key': 'error',
        'empty-import-meta': 'error',
        // 浮点相等的定义使得NaN永远不等于任何东西，所以"x === NaN"总是返回假。您需要使用“isNaN(x)”来测试NaN。
        'equals-nan': 'error',
        // 浮点相等定义为0和-0相等，因此"x === -0"返回true。您需要使用“Object.is(x, -0)”来测试-0。
        'equals-negative-zero': 'error',
        'equals-new-object': 'error',
        'html-comment-in-js': 'error',
        // 表达式“typeof x”实际上在JavaScript中计算为“object”，而不是“null”。你需要使用“x === null”来测试null。
        'impossible-typeof': 'error',
        'indirect-require': 'error',
        'private-name-will-throw': 'error',
        // 代码“!x in y”被解析为“(!x) in y”。您需要插入括号才能获得“!(x in y)”。
        'suspicious-boolean-not': 'error',
        'unsupported-jsx-comment': 'error',
        'semicolon-after-return': 'warning',
        // 当文件是ECMAScript模块[this-is-undefined-in-esm]，因此顶级“this”将被替换为undefined。
        'this-is-undefined-in-esm': 'warning',
        // 正则表达式标志“d”在配置的目标环境（“chrome50”）中不可用。此正则表达式文字已转换为“new RegExp()”构造函数以避免生成带有语法错误的代码。但是，您需要为“RegExp”包含一个polyfill您的代码在运行时具有正确的行为。
        'unsupported-regexp': 'warning',
        // 此“import”表达式不会被捆绑（import(foo)），因为参数不是字符串文字。
        'unsupported-dynamic-import': 'warning',
        'unsupported-require-call': 'warning',

        'ambiguous-reexport': 'warning',
        'different-path-case': 'silent',
        'ignored-bare-import': 'error',
        'ignored-dynamic-import': 'silent',
        'import-is-undefined': 'error',
        'require-resolve-not-external': 'error',

        'package.json': 'error',
        'tsconfig.json': 'error',
      },
      /**
       * 1、从esbuild-loader包的代码中可知，其会自动判断有没有设置tsconfigRaw选项，没有的话，会自动从项目根目录尝试加载tsconfig.json文件。<br />
       * 2、tsconfigRaw的值类型得是字符串文本，而不是object，但它不会解析extends属性。<br />
       * 3、但是从esbuild包的代码中可知，它会自动判断，如果是字符串文本，它就直接使用，如果不是字符串文本，会直接使用JSON.stringify()转成字符串文本。<br />
       * 4、esbuild仅支持tsconfig选项的子集（请参阅TransformOptions接口，也就是只支持tsconfig.json文件中的compilerOptions选项）并且不进行类型检查。<br />
       * 5、esbuild文档还建议在您的tsconfig中启用isolatedModules和esModuleInterop选项。<br />
       * 6、如：tsconfigRaw: string | { compilerOptions: {} }。<br />
       * 7、必须在项目根目录存在一个有效的tsconfig.json文件。<br />
       */
      tsconfigRaw: ( tsconfigPath => {
        let obj1 = tsconfig_json,
          resultCompilerOptionsObj = Object.prototype.toString.call( obj1.compilerOptions ) === '[object Object]'
                                     ? obj1.compilerOptions
                                     : {},
          path1 = '',
          dirNamePath1 = dirname( resolve( __dirname, tsconfigPath ) );

        while( 'extends' in obj1 && obj1.extends.length !== 0 ){
          path1 = resolve( dirNamePath1, obj1.extends );

          dirNamePath1 = dirname( path1 );

          obj1 = JSON5.parse( String( readFileSync( path1 ) ) );

          resultCompilerOptionsObj = Object.assign( {}, Object.prototype.toString.call( obj1.compilerOptions ) === '[object Object]'
                                                        ? obj1.compilerOptions
                                                        : {}, resultCompilerOptionsObj );
        }

        return JSON.stringify( {
          compilerOptions: {
            ...resultCompilerOptionsObj,
            esModuleInterop: true,
            // 选项'isolatedModules'是多余的，不能与选项'verbatimModuleSyntax'一起指定，优先使用verbatimModuleSyntax。
            // isolatedModules: true,
          },
        } );
      } )( './tsconfig.json' ),
      minifyWhitespace: isProduction,
      minifyIdentifiers: isProduction,
      minifySyntax: isProduction,
      /**
       * 不遵守此选项。请改用build.minify。<br />
       * 注意esbuild.minify选项无法用于覆盖build.minify。<br />
       */
      minify: isProduction,
      // 有效值有：'transform'、'preserve'、'automatic'。
      jsx: 'automatic',
      jsxDev: !isProduction,
      // 有效值有：'React.createElement'（默认值）、'h'，当jsx转换设置为'automatic'时，此设置不适用。
      jsxFactory: 'React.createElement',
      // 有效值有：'React.Fragment'（默认值）、'Fragment'，当jsx转换设置为'automatic'时，此设置不适用。
      jsxFragment: 'React.Fragment',
      // 默认情况下，esbuild假定JSX表达式是无副作用的，这意味着它们被注释为/* @__PURE__ */，并且在捆绑过程中，当它们未被使用时被删除。
      // 这遵循了JSX在虚拟DOM中的普遍使用，适用于绝大多数的JSX库。
      // 然而，有些人编写的JSX库没有这个属性（特别是JSX表达式可以有任意的副作用，在未使用时不能被删除）。
      // 如果你正在使用这样的库，你可以使用这个设置来告诉esbuild，JSX表达式有副作用：jsxSideEffects: true。
      jsxSideEffects: true,
      // 通过esbuild.jsxInject来自动为每一个被esbuild转换的文件注入JSX helper。
      // jsxInject: `import React from 'react';`,
      // Invalid option in transform() call: "incremental".
      // incremental: !isProduction,
      /**
       * 1、通常这是在您使用target选项设置时为您自动配置的，您通常应该使用target选项设置而不是supported选项设置。如果除此supported选项设置之外还指定了target选项，则此supported选项设置将覆盖target选项指定的任何内容。<br />
       * 2、例如，您可以使用它来告诉esbuild BigInts不受支持，以便esbuild在您尝试使用BigInts时生成错误。<br />
       * 3、此设置允许您在单个语法功能级别自定义esbuild的一组不受支持的语法功能。<br />
       * 4、JavaScript运行时通常会快速实现较旧的JavaScript较慢的较新语法功能，您可以通过告诉esbuild假装不支持此语法功能来获得加速。<br />
       * 5、如果想告知esbuild不支持某个语法，就这么设置：'bigint': false，如果是支持就将值设置成true。<br />
       */
      ...( isEnable => {
        return isEnable
               ? {
            supported: {
              // ES2015语法 Start
              'arrow': true,
              'class': true,
              'array-spread': true,
              'const-and-let': true,
              'default-argument': true,
              'destructuring': true,
              'for-of': true,
              'generator': true,
              'new-target': true,
              'rest-argument': true,
              'template-literal': true,
              'unicode-escapes': true,
              'regexp-sticky-and-unicode-flags': true,
              'regexp-match-indices': true,
              // ES2015语法 End

              // ES2016 Start
              'exponent-operator': true,
              // ES2016 End

              // ES2017语法 Start
              'async-await': true,
              // ES2017语法 End

              // ES2018语法 Start
              'async-generator': true,
              'for-await': true,
              'object-rest-spread': true,
              'object-accessors': true,
              'object-extensions': true,
              'regexp-named-capture-groups': true,
              'regexp-dot-all-flag': true,
              'regexp-unicode-property-escapes': true,
              'regexp-lookbehind-assertions': true,
              // ES2018语法 End

              // ES2019语法 Start
              'optional-catch-binding': true,
              // ES2019语法 End

              // ES2020语法 Start
              'bigint': true,
              'dynamic-import': true,
              'export-star-as': true,
              'import-meta': true,
              'nullish-coalescing': true,
              'optional-chain': true,
              // ES2020语法 End

              // ES2021语法 Start
              'logical-assignment': true,
              // ES2021语法 End

              // ES2022语法 Start
              'class-field': true,
              'class-private-accessor': true,
              'class-private-brand-check': true,
              'class-private-field': true,
              'class-private-method': true,
              'class-private-static-accessor': true,
              'class-private-static-field': true,
              'class-private-static-method': true,
              'class-static-blocks': true,
              'class-static-field': true,
              'arbitrary-module-namespace-names': true,
              'top-level-await': true,
              'typeof-exotic-object-is-object': true,
              // ES2022语法 End

              // ESNext语法 Start
              'hashbang': true,
              'import-assertions': true,
              'nested-rest-binding': true,
              // ESNext语法 End

              // node（node:module） Start
              'node-colon-prefix-import': false,
              'node-colon-prefix-require': false,
              // node（node:module） End
            },
          }
               : {};
      } )( false ),
    },
    /**
     * @type {object}
     */
    json = {
      // 是否支持从.json文件中进行按名导入。
      namedExports: true,
      /**
       * 若设置为true，导入的JSON会被转换为export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当JSON文件较大的时候。
       * 开启此项，则会禁用按名导入，也就是上面的“namedExports”选项。
       */
      stringify: false,
    },
    /**
     * @type {string[]} 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。<br />
     * 默认值：['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']。<br />
     */
    extensions = [
      '.js',
      '.cjs',
      '.mjs',
      '.ts',
      '.cts',
      '.mts',

      '.jsx',
      '.tsx',

      '.json',
      '.json5',

      '.wasm',

      '.vue',
    ],
    // ToDo
    /**
     * @type {[]} 插件配置。<br />
     * 官方插件信息：https://cn.vitejs.dev/plugins/
     * 社区插件列表：https://github.com/vitejs/awesome-vite#plugins
     * 兼容Rollup官方插件列表：https://vite-rollup-plugins.patak.dev/
     *
     * @vitejs/plugin-legacy：https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
     * vite-plugin-wasm：https://github.com/Menci/vite-plugin-wasm
     * vite-plugin-top-level-await：https://github.com/Menci/vite-plugin-top-level-await
     * @rollup/plugin-image：https://github.com/rollup/plugins/tree/master/packages/image
     * @rollup/plugin-babel：https://github.com/rollup/plugins/tree/master/packages/babel
     * @rollup/plugin-commonjs：https://github.com/rollup/plugins/tree/master/packages/commonjs
     */
    plugins = [
      // ToDo
      /**
       * 该插件的详细配置选项见：<br />
       * node_modules/@vitejs/plugin-vue/dist/index.d.ts:20
       * https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
       */
      vue(),
    ],
    // ToDo 考虑使用类似copy插件的工具来复制静态资源文件夹。
    /**
     * @type {string|boolean} 默认值：“public”。作为“静态资源服务”的文件夹。<br />
     * 该目录中的文件在“开发期间”在“/”处提供，并在“构建期间”复制到选项build.outDir设置的文件夹下，并且始终按原样提供或复制而无需进行转换。<br />
     * 该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。<br />
     * 将publicDir设定为false可以关闭此项功能，使用类似copy插件的工具来复制静态资源文件夹。<br />
     */
    publicDir = false,
    /**
     * @type {string} 表示项目根目录，一个绝对路径。<br />
     */
    root = resolve( __dirname, `./` ),
    /**
     * @type {ServerOptions} 开发服务器选项。<br />
     * 详细见：<br />
     * node_modules/vite/dist/node/index.d.ts:2079
     * node_modules/vite/dist/node/index.d.ts:318
     */
    server = {
      /**
       * @type {string | boolean} 默认值：'localhost'，指定服务器应该监听哪个IP地址。如果将此设置为0.0.0.0或者true将监听所有地址，包括局域网和公网地址。<br />
       * 注意：<br />
       * 在某些情况下，可能响应的是其他服务器而不是Vite：<br />
       * 第1种情况是：<br />
       * localhost被使用了。Node.js在v17以下版本中默认会对DNS解析地址的结果进行重新排序。当访问localhost时，浏览器使用DNS来解析地址，这个地址可能与Vite正在监听的地址不同。<br />
       * 当地址不一致时，Vite会打印出来。<br />
       * 你可以设置dns.setDefaultResultOrder('verbatim')来禁用这个重新排序的行为。Vite会将地址打印为localhost。<br />
       * 例如：<br />
       * // vite.config.js
       * import { defineConfig, } from 'vite';
       * import dns from 'dns';
       *
       * dns.setDefaultResultOrder( 'verbatim' );
       *
       * export default defineConfig({
       *   // omit
       * });
       *
       * 第2种情况是：<br />
       * 使用了通配主机地址（例如 0.0.0.0）。这是因为侦听非通配符主机的服务器优先于侦听通配符主机的服务器。<br />
       */
      host: true,
      /**
       * @type {number} 默认值：5173，指定开发服务器端口。<br />
       * 注意：如果端口已经被使用，Vite会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。<br />
       */
      port: devServerGlobalParameters[ env_platform ]?.port ?? 5173,
      /**
       * @type {boolean} 设为true时若端口已被占用则会直接退出，而不是尝试下一个可用端口。<br />
       */
      strictPort: true,
      /**
       * @type {boolean | https.ServerOptions} 启用TLS + HTTP/2。注意：当server.proxy选项也被使用时，将会仅使用TLS。<br />
       * 这个值也可以是一个传递给https.createServer()的选项对象。<br />
       * 详细见：<br />
       * https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener
       * https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener
       * https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions
       * https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
       * https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener
       */
      https: {
        /**
         * 使用一个不安全的HTTP解析器，在真实时接受无效的HTTP头。应该避免使用不安全的解析器。参见--insecure-http-parser获取更多信息。默认值：false。
         */
        insecureHTTPParser: true,

        /**
         * 可选择覆盖该服务器收到的请求的--max-http-header-size的值，即请求头的最大长度（字节）。默认值：16384（16 KiB）。
         */
        maxHeaderSize: 1024000,

        /**
         * 覆盖受信任的CA证书。<br />
         * 默认情况是信任Mozilla策划的知名CA。<br />
         * 当使用此选项显式指定CA时，Mozilla的CA将被完全替换。<br />
         *
         * PS：<br />
         * 1、一般指的是“根CA证书，HTTPSSL001_Root_CA.crt”，“根CA证书，HTTPSSL001_Root_CA.crt”用于安装到系统、浏览器（尤其是火狐浏览器，它有自己的证书列表，也要给它安装）的证书列表中，手机、平板等非电脑的移动设备，只要安装这个“根CA证书”即可。<br />
         */
        ca: [
          readFileSync( join( __dirname, './configures/openssl/HTTPSSL001/001根CA证书/HTTPSSL001_Root_CA.crt' ), 'utf8' ),
        ],

        /**
         * PEM格式的私钥（“HTTPSSL001_Root_CA_Key.key”）。<br />
         * PEM允许选择加密私钥，加密密钥将使用“options.passphrase”（用于单个私钥或PFX的共享密码）解密。<br />
         *
         * 注意：<br />
         * 1、在生成“服务端CA证书，HTTPSSL001_Servers_192_168_2_7_CA.crt”的“HTTPSSL001_Root_CA_Key.key”文件时，除了用.key作为文件的扩展后缀，也可以用.pem做后缀，一般首选.key。<br />
         * 2、当前“HTTPSSL001_Root_CA_Key.key”没使用加密。<br />
         */
        key: readFileSync( join( __dirname, './configures/openssl/HTTPSSL001/001根CA证书/HTTPSSL001_Root_CA_Key.key' ), 'utf8' ),

        /**
         * PEM格式的证书链（服务端CA证书，HTTPSSL001_Servers_192_168_2_7_CA.crt）。<br />
         */
        cert: readFileSync( join( __dirname, './configures/openssl/HTTPSSL001/002服务端CA证书/HTTPSSL001_Servers_192_168_2_7_CA.crt' ), 'utf8' ),

        /**
         * 如果SSL/TLS握手未在指定的毫秒数内完成，则中止连接。只要握手超时，就会在tls.Server对象上发出“tlsClientError”。默认值：120000（120000毫秒 = 120秒）。<br />
         */
        handshakeTimeout: 120000,

        /**
         * 如果为true，服务器将从连接的客户端请求证书并尝试验证该证书。默认值：false。<br />
         *
         * PS：<br />
         * 启用该项会导致浏览器无法从https加载，因为服务器将从连接的客户端请求证书并尝试验证该证书，如果客户端没能提供“证书”，那么就会报错，这通常出现在浏览器端。<br />
         */
        requestCert: false,

        /**
         * （可选）设置允许的最低TLS版本。“TLSv1.3”、“TLSv1.2”、“TLSv1.1”或“TLSv1”之一。不能与“secureProtocol”选项一起指定。<br />
         * 使用一个或另一个。避免设置为低于TLSv1.2，但互操作性可能需要它。默认值：tls.DEFAULT_MIN_VERSION（也就是：TLSv1.2）。<br />
         */
        minVersion: 'TLSv1.2',

        /**
         * （可选）设置允许的最大TLS版本。“TLSv1.3”、“TLSv1.2”、“TLSv1.1”或“TLSv1”之一。不能与“secureProtocol”选项一起指定。<br />
         * 使用一个或另一个。默认值：tls.DEFAULT_MAX_VERSION（也就是：TLSv1.3）。<br />
         */
        maxVersion: 'TLSv1.3',

        /**
         * 用于单个私钥和/或PFX的共享密码。<br />
         */
        passphrase: '@HTTPSSL001.2023#',

        /**
         * PEM格式的CRL（证书吊销列表）。<br />
         */
        // crl: readFileSync( join( __dirname, './configures/openssl/HTTPSSL001/证书吊销列表/证书吊销列表.pem' ), 'utf8' ),

        /**
         * PFX或PKCS12编码的私钥和证书链。<br />
         * pfx是单独提供密钥和证书的替代方案。<br />
         * PFX通常是加密的，如果是，将使用“options.passphrase”（用于单个私钥或PFX的共享密码）解密。<br />
         *
         * 该选项跟上面的“key”、“cert”选项是互斥的，也就是不要同时设置该选项跟“key”、“cert”选项，否则会报错，说什么太长了。<br />
         */
        // pfx: readFileSync( join( __dirname, './configures/openssl/HTTPSSL001/001根CA证书/HTTPSSL001_Root_CA.p12' ), 'utf8' ),
      },
      /**
       * @type {boolean | string} 开发服务器启动时，自动在浏览器中打开应用程序。<br />
       * 当该值为字符串时，它将被用作URL的路径名。<br />
       * 如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量process.env.BROWSER（例如：Windows上的msedge）。<br />
       * 你还可以设置process.env.BROWSER_ARGS来传递额外的参数，例如：--incognito（以隐私模式打开浏览器），--new-window（在新窗口中打开浏览器）。<br />
       * BROWSER和BROWSER_ARGS都是特殊的环境变量，你可以将它们放在.env文件中进行设置，欲了解更多打开浏览器的更多内部细节，请参阅open包的源码（https://github.com/sindresorhus/open#app）。<br />
       */
      open: `https://${ devServerGlobalParameters[ env_platform ]?.host }:${ devServerGlobalParameters[ env_platform ]?.port }/${ env_platform }/index.html`,
      cors: {
        origin: [
          '*',
        ],
        methods: [
          'GET',
          'HEAD',
          'POST',
          'PUT',
          'DELETE',
          'CONNECT',
          'OPTIONS',
          'TRACE',
          'PATCH',
        ],
        allowedHeaders: [
          'X-Custom-Header-File-SRI',
          'Authorization',
          'Accept',
          'Content-Type',
          'Content-Language',
          'Accept-Language',
        ],
        exposedHeaders: [
          'X-Custom-Header-File-SRI',
          'Authorization',
          'Content-Encoding',
          'Cache-Control',
          'Content-Language',
          'Content-Length',
          'Content-Type',
          'Expires',
          'Last-Modified',
          'Pragma',
        ],
        credentials: true,
        maxAge: 2 * 60 * 60,
        preflightContinue: false,
        optionsSuccessStatus: 200,
      },
      /**
       * 1、关于跨域请求头。<br />
       *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即withCredentials:true）。<br />
       *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
       *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
       *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
       *     如果使用Fetch API，请确保Request.credentials是"omit"。<br />
       */
      headers: {
        // 'Content-Security-Policy': 'require-sri-for script style',
        /**
         * Clear-Site-Data：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data
         * 1、该标头的值的格式比较特别，必需是用“双引号”括起来，这时就会出现字符串嵌套字符串的情况。
         */
        // 'Clear-Site-Data': '"cache"',
        'Service-Worker-Allowed': '/',
        /**
         * Cache-Control：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
         */
        'Cache-Control': 'no-store',
        /**
         * Expires：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires
         */
        'Expires': 0,
        /**
         * Allow：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow
         */
        'Allow': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
        /**
         * X-DNS-Prefetch-Control：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
         */
        'X-DNS-Prefetch-Control': 'on',
        /**
         * Access-Control-Allow-Credentials：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
         * 1、Access-Control-Allow-Credentials响应标头告诉浏览器是否在包含请求的凭据模式(Request.credentials)时将响应公开给前端JavaScript代码。
         * 2、当包含请求的凭据模式(Request.credentials)时，如果Access-Control-Allow-Credentials值为true，浏览器只会将响应公开给前端JavaScript代码。
         * 3、凭据是cookies、授权标头（authorization headers）或TLS客户端证书（TLS client certificates）。
         * 4、当用作对预检请求的响应的一部分时，这表明是否可以使用凭据进行实际请求。
         * 5、请注意，简单的GET请求不会进行预检。因此，如果对具有凭据的资源发出请求，并且如果此标头未随资源一起返回，则浏览器将忽略响应，并且不会将其返回到Web内容。
         * 6、Access-Control-Allow-Credentials标头与XMLHttpRequest.withCredentials属性或Fetch API的Request()构造函数中的credentials选项结合使用。
         * 7、对于带有证书的CORS请求，浏览器要将响应暴露给前端JavaScript代码，服务器（使用Access-Control-Allow-Credentials标头）和客户端（通过为XHR、Fetch或Ajax请求设置证书模式）都必须表明他们选择包括证书。
         * 8、此标头的唯一有效值为true（区分大小写）。如果您不需要凭据，请完全省略此标头（而不是将其值设置为 false）。
         * 9、当此标头设置为true时，客户端发起的请求，相应的也要设置：如果请求使用XMLHttpRequest发出，请确保withCredentials为true、如果使用Fetch API，请确保Request.credentials是"include"。
         */
        'Access-Control-Allow-Credentials': true,
        /**
         * Access-Control-Allow-Headers：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
         * 1、Access-Control-Allow-Headers响应标头用于响应预检请求，其中包括Access-Control-Request-Headers以指示在实际请求期间可以使用哪些HTTP标头。
         * 2、如果请求具有Access-Control-Request-Headers标头，则此标头是必需的。
         * 3、注意：始终允许使用CORS安全列表请求标头，并且通常不会在Access-Control-Allow-Headers中列出（除非需要规避安全列表附加限制）。
         * 4、对于没有凭据的请求（没有HTTP cookie或HTTP身份验证信息的请求），值“*”仅算作一个特殊的通配符值。
         * 5、在带有凭据的请求中，它被视为没有特殊语义的文字标头名称“*”。请注意，授权标头（Authorization header）不能使用通配符，并且始终需要明确列出。
         * 6、CORS安全列表请求标头：Accept、Content-Type、Content-Language、Accept-Language。
         * 7、当仅包含CORS安全列表请求标头（以及满足下面列出的附加要求的值）时，请求不需要在CORS上下文中发送预检请求（OPTIONS请求）。
         * 8、您可以使用Access-Control-Allow-Headers标头将更多标头列入安全列表，并在那里列出上述标头以规避以下附加限制：
         *   附加限制，CORS安全列表标头还必须满足以下要求才能成为CORS安全列表请求标头：
         *   1）对于Accept-Language和Content-Language：只能有由0-9、A-Z、a-z、空格或*,-.;=组成的值。
         *   2）对于Accept和Content-Type：不能包含CORS不安全请求标头字节：0x00-0x1F（除了0x09 (HT)，它是允许的）、"():<>?@[\]{}、0x7F (DEL)。
         *   3）对于Content-Type：需要其解析值（忽略参数）的MIME类型为：application/x-www-form-urlencoded、multipart/form-data或text/plain。
         *   4）对于任何标头：值的长度不能大于128个字符。
         */
        'Access-Control-Allow-Headers': 'X-Custom-Header-File-SRI, Authorization, Accept, Content-Type, Content-Language, Accept-Language',
        /**
         * Access-Control-Allow-Methods：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods
         * 1、Access-Control-Allow-Methods响应标头指定访问资源以响应预检请求时允许的一种或多种方法。
         * 2、对于没有凭据的请求（没有HTTP cookie或HTTP身份验证信息的请求），值“*”仅算作一个特殊的通配符值。
         * 3、在带有凭据的请求中，它被视为没有特殊语义的文字方法名称“*”。
         */
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
        /**
         * Access-Control-Allow-Origin：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
         * 1、Access-Control-Allow-Origin响应标头指示是否可以与来自给定来源的请求代码共享响应。
         * 2、对于没有凭据的请求，可以指定字面值“*”作为通配符；该值告诉浏览器允许来自任何来源的请求代码访问资源。但是尝试将通配符与凭据一起使用会导致错误。
         * 3、Access-Control-Allow-Origin: <origin>：只能指定一个来源。如果服务器支持来自多个来源的客户端，它必须返回发出请求的特定客户端的来源。
         */
        'Access-Control-Allow-Origin': '*',
        /**
         * Access-Control-Expose-Headers：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
         * 1、CORS安全列表响应标头是CORS响应中的HTTP标头，它被认为可以安全地暴露给客户端脚本。只有列入安全列表的响应标头可用于网页。
         * 2、默认情况下，安全列表包含以下响应标头：Cache-Control、Content-Language、Content-Length、Content-Type、Expires、Last-Modified、Pragma。
         * 3、可以使用Access-Control-Expose-Headers将其他标头添加到安全列表。
         * 4、注意：Content-Length不是原始安全列表响应标头集的一部分。
         * 5、Access-Control-Expose-Headers 响应标头允许服务器指示哪些响应标头应提供给浏览器中运行的脚本，以响应跨域请求。
         * 6、对于没有凭据的请求（没有 HTTP cookie 或 HTTP 身份验证信息的请求），值“*”仅算作一个特殊的通配符值。
         * 7、在带有凭据的请求中，它被视为没有特殊语义的文字标头名称“*”。
         */
        'Access-Control-Expose-Headers': 'X-Custom-Header-File-SRI, Authorization, Content-Encoding, Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified, Pragma',
        /**
         * Access-Control-Max-Age：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
         * 1、Access-Control-Max-Age响应标头指示预检请求的结果（即Access-Control-Allow-Methods和Access-Control-Allow-Headers标头中包含的信息）可以缓存多长时间（单位：秒）。默认值为5秒。
         * 2、可以缓存结果的最大秒数，作为无符号非负整数。Firefox的上限为24小时（86400秒）。
         * 3、Chromium（v76之前）的上限为10分钟（600秒）。Chromium（从v76开始）的上限为2小时（7200秒）。
         */
        'Access-Control-Max-Age': 2 * 60 * 60,
        /**
         * Access-Control-Request-Headers：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers
         * 1、浏览器在发出预检请求时使用Access-Control-Request-Headers请求标头，让服务器知道在发出实际请求时客户端可能发送哪些HTTP标头（例如使用setRequestHeader()）。
         * 2、Access-Control-Allow-Headers的补充服务器端标头将回答此浏览器端标头。
         * 3、该标头系用于客户端发起的请求中的标头，而不是用于服务器的响应中的标头。
         */
        // 'Access-Control-Request-Headers': 'X-Custom-Header-File-SRI, Authorization, Accept, Content-Type, Content-Language, Accept-Language',
        /**
         * Access-Control-Request-Method：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method
         * 1、浏览器在发出预检请求时使用Access-Control-Request-Method请求标头，让服务器知道在发出实际请求时将使用哪种HTTP方法。
         * 2、这个标头是必需的，因为预检请求始终是一个选项，并且不使用与实际请求相同的方法。
         * 3、该标头系用于客户端发起的请求中的标头，而不是用于服务器的响应中的标头。
         */
        // 'Access-Control-Request-Method': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
      },
      hmr: {
        overlay: true,
      },
      base: `/${ env_platform }/`,
      fs: {
        strict: true,
        allow: [
          resolve( __dirname, `./` ),
        ],
        deny: [],
      },
      /**
       * 使用该选项会报错，导致无法启动！
       * Setting server.middlewareMode to 'html' is deprecated, set server.middlewareMode to `true` instead
       */
      // middlewareMode: true,
    };

  /**
   * 开发配置，“vite preview”也会用该配置。
   */
  if( command === 'serve' ){
    return {
      appType,
      assetsInclude,
      base,
      build,
      clearScreen: false,
      css,
      define,
      envDir,
      envPrefix,
      esbuild,
      json,
      logLevel: 'info',
      mode,
      plugins: [
        ...plugins,
      ],
      publicDir,
      resolve: {
        alias,
        extensions,
        preserveSymlinks: false,
      },
      root,
      server,
    };
  }
  /**
   * 生产配置。
   */
  else if( command === 'build' ){
    return {
      appType,
      assetsInclude,
      base,
      build,
      clearScreen: false,
      css,
      define,
      envDir,
      envPrefix,
      esbuild,
      json,
      logLevel: 'info',
      mode,
      plugins: [
        ...plugins,
      ],
      publicDir,
      resolve: {
        alias,
        extensions,
        preserveSymlinks: false,
      },
      root,
    };
  }
  else{
    throw new Error( `\n\n\n当前本Vite配置（vite.config.mjs）的“command”支持的命令有：“serve”、“build”，还不支持本次输入的：“${ command }”，可能需要更新本Vite配置（vite.config.mjs）以便支持该命令。\n\n\n` );
  }
} );
