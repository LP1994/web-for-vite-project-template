/**
 * Project: web-for-vite-project-template
 * FileDirPath: vite.config.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 可能需要修改的地方！
 *
 * 1、当需要将代码转换成兼容比较旧的平台时，需要修改：
 * 变量browserslist。
 * 变量esbuildMinify_target。
 * 变量vite_plugin_legacy_target。
 * package.json中的browserslist字段，值同变量browserslist。
 * tsconfig.json中的compilerOptions.module、compilerOptions.target。
 * tsconfig.vite.json中的compilerOptions.module、compilerOptions.target。
 * 变量rollupOptions.external。
 * 变量rollupOptions.output.format。
 * 变量rollupOptions.output.globals。
 * 变量rollupOptions.output.generatedCode。
 * 变量rollupOptions.acorn。
 *
 * Vite的顶级配置项appType。
 * Vite的顶级配置项esbuild.format。
 * Vite的顶级配置项worker.format。
 *
 * 2、本配置中的路径字符都是以Windows平台为主，没做其他系统平台的兼容，如果需要在其他系统平台使用，注意针对性修改如“./”、“//”、“\\”、“/”、“\”之类的路径。
 */

/**
 * 关于在压缩代码时删除“console”、“debugger”的注意事项，可能导致编译后的代码报错或输出的代码非期望代码！！！
 * 1、当压缩代码时启用删除“console”、“debugger”后，某些情况下会有意外的编译输出，详见如下：
 * 说明：
 * 如果在诸如console.log()中编写某些跟项目逻辑业务有关的代码，那么当压缩代码时启用删除“console”、“debugger”时，会导致最后输出的代码中因删除了诸如console.log()，从而导致其中的某些跟项目逻辑业务有关的代码也被删除，最终使生产的代码出现非所愿期望的代码输出，从而报错。
 * 所以，诸如console.log()中不要做任何逻辑处理（哪怕是：++index这种最简单的逻辑），只作为纯日志输出。
 * 例如：
 * let index = 0, arr001 = [ 'qqq', 'www', ], str001 = '';
 *
 * for( const item of arr001 ){
 *   str001 + = item;
 *
 *   console.log( `index--->${ ++index }` );
 * }
 * 当压缩代码时没有启用删除“console”、“debugger”时，执行上述代码后，index的值为3，但是如果启用，则index的值为0，那么显然这不是期望的。
 *
 * 对于上述的“console”、“debugger”，当前配置是这样的，只当CLI参数中有“--mode production”时，才会压缩代码时启用删除“console”、“debugger”。
 */

'use strict';

import {
  readFileSync,
} from 'node:fs';

import {
  writeFile,
} from 'node:fs/promises';

import {
  cpus,
} from 'node:os';

import {
  basename,
  dirname,
  extname,
  join,
  resolve,
} from 'node:path';

import {
  fileURLToPath,
  URL,
} from 'node:url';

import chalk from 'chalk';

import JSON5 from 'json5';

import PostcssSCSS from 'postcss-scss';

import RollupPluginCSON from 'rollup-plugin-cson';

import RollupPluginDSV from '@rollup/plugin-dsv';

import RollupPluginGraphQL from '@rollup/plugin-graphql';

import RollupPluginHandlebars from 'rollup-plugin-handlebars';

import RollupPluginMustache from 'rollup-plugin-mustache';

import RollupPluginPUG from 'rollup-plugin-pug';

import RollupPluginYAML from '@rollup/plugin-yaml';

import {
  defineConfig,
} from 'vite';

import vue from '@vitejs/plugin-vue';

import checker from 'vite-plugin-checker';

import VitePluginHTMLByCustom from './configures/vite_plugin_custom/vite-plugin-html-by-custom.esm.mjs';

import VitePluginInject from '@rollup/plugin-inject';

import VitePluginInjectPreload from 'vite-plugin-inject-preload';

import VitePluginJSON5 from 'vite-plugin-json5';

import VitePluginLegacy from '@vitejs/plugin-legacy';

import {
  plugin as VitePluginMarkdown,
} from 'vite-plugin-markdown';

import VitePluginSRIByCustom from './configures/vite_plugin_custom/vite-plugin-sri-by-custom.esm.mjs';

import {
  viteStaticCopy,
} from 'vite-plugin-static-copy';

import {
  ViteToml as VitePluginTOML,
} from 'vite-plugin-toml';

import VitePluginWASM from 'vite-plugin-wasm';

import VitePluginTopLevelAwait from 'vite-plugin-top-level-await';

import VitePluginXML from 'vite-plugin-xml-loader';

import DefineConfig from './configures/DefineConfig.esm.mjs';

import {
  EntryConfig,
} from './configures/EntryConfig.esm.mjs';

import {
  devServerGlobalParameters,
  httpHeaders,
  postcssViewportHeightCorrectionCustomViewportCorrectionVariable,
} from './configures/GlobalParameters.esm.mjs';

import {
  ProxyConfig,
} from './configures/ProxyConfig.esm.mjs';

import tsconfig_vite_json from './tsconfig.vite.json' assert { type: 'json', };

import {
  VitePluginHTMLConfig,
} from './configures/VitePluginHTMLConfig.esm.mjs';

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

    // PC端各主流浏览器的最新版本，至20230808。Start
    'Chrome >= 115',
    // 这里的Edge是指新版的微软Edge，其基于Chromium，带有Blink和V8引擎，后来其最新的版本号，也基本跟Chrome版本号保持一致了。
    'Edge >= 115',
    'Firefox >= 116',
    'Safari >= 16',
    'Opera >= 101',
    // PC端各主流浏览器的最新版本，至20230808。End

    // 移动端各主流浏览器的最新版本，至20230808。Start
    'ChromeAndroid >= 115',
    // 从Android 4.4后Android WebView直接跟Chrome同步。
    'Android >= 115',
    'FirefoxAndroid >= 116',
    'iOS >= 16',
    // 移动端各主流浏览器的最新版本，至20230808。End
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

    'es2023',

    // PC端各主流浏览器的最新版本，至20230808。Start
    'chrome115',
    'edge115',
    'firefox116',
    'safari16',
    'opera101',
    // PC端各主流浏览器的最新版本，至20230808。End

    // 移动端各主流浏览器的最新版本，至20230808。Start
    'ios16',
    // 移动端各主流浏览器的最新版本，至20230808。End
  ],
  /**
   * @type {object} 目标浏览器版本。<br />
   * 1、支持的标识符有：<br />
   * android、chrome、deno（支持的最低版本为'1.0'）、edge、electron、firefox、ie、ios、node、opera、rhino、safari、samsung，其他的会报错。<br />
   * 具体见：node_modules/@babel/helper-compilation-targets/lib/options.js。<br />
   * 2、也支持其他的别名标识符，但是不建议用别名标识符，因为如果设置了这些别名会报错（因为相关代码貌似并没使用这个别名映射）：<br />
   * and_chr（对应：chrome）、and_ff（对应：firefox）、ios_saf（对应：ios）、ie_mob（对应：ie）、op_mob（对应：opera）。<br />
   * 其他的别名会报错。<br />
   * 具体见：node_modules/@babel/core/lib/config/validation/option-assertions.js。<br />
   */
  vite_plugin_legacy_target = {
    // PC端完全支持ES 5的主流浏览器 Start
    // chrome: 23,
    // firefox: 21,
    // ie 9不支持ECMAScript 5的"use strict"，但是ie 10真正的完全支持ECMAScript 5了。
    // ie: 9,
    // safari: 6,
    // Opera 15开始改用基于Chromium 28的，也是从15开始其内核跟Chrome一致了。
    // opera: 15,
    // PC端完全支持ES 5的主流浏览器 End

    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 Start
    // chrome: 58,
    // firefox: 54,
    // 这里的Edge是指旧版的微软Edge（版本从12到18），它是用微软的浏览器引擎EdgeHTML和他们的Chakra JavaScript引擎构建的。
    // edge: 14,
    // safari: 10,
    // opera: 55,
    // PC端完全支持ES 6（ECMAScript 2015）的主流浏览器 End

    // PC端各主流浏览器的最新版本，至20230808。Start
    chrome: 115,
    edge: 115,
    firefox: 116,
    safari: 16,
    opera: 101,
    // PC端各主流浏览器的最新版本，至20230808。End

    // 移动端各主流浏览器的最新版本，至20230808。Start
    /*从Android 4.4后Android WebView直接跟Chrome同步。*/
    android: 115,
    ios: 16,
    // 移动端各主流浏览器的最新版本，至20230808。End
  };

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
 * @type {string[]} 几种字体文件的不带“.”的后缀名。
 */
const fontsForAssets = [
    'eot',
    'otf',
    'fon',
    'font',
    'ttf',
    'ttc',
    'woff',
    'woff2',
  ],
  /**
   * @type {string[]} 几种图片的不带“.”的后缀名。
   */
  imgForAssets = [
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
  ],
  /**
   * @type {string[]} 几种音频的不带“.”的后缀名。
   */
  musicForAssets = [
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
  ],
  /**
   * @type {string[]} 几种视频的不带“.”的后缀名。
   */
  videosForAssets = [
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
  ],
  /**
   * @type {string[]} PWA的manifest文件的不带“.”的后缀名。
   */
  pwa_manifestForAssets = [
    'webmanifest',
  ];

/**
 * @type {(string | RegExp)[]} 阻止监视文件。
 */
const watch_ignored = [
  '**/node_modules/**',
  '**/该文件夹说明.txt',
  '**/.gitignore',
  '**/graphQL/doc/**',
  '**/graphQL/test/**',
  '**/type_doc/**',
  '**/unit_test/**',
  '**/wasm/source_codes/**',
];

/**
 * @type {import('vite').UserConfig} Vite配置。<br />
 * 详细选项见：<br />
 * https://vitejs.dev/config/
 * node_modules/vite/dist/node/index.d.ts:2407
 */
export default defineConfig( async ( {
  command,
  mode,
  ssrBuild,
} ) => {
  /**
   * @type {string|undefined} env_platform的值是字符串，有4个值：'dev_server'、'local_server'、'test'、'production'，来源是CLI参数中的“--mode”参数值，必需。<br />
   * 注意：<br />
   * 1、但是必须有这么一个“--mode”参数设置，这4个之中的其中一个即可：--mode dev_server、--mode local_server、--mode test、--mode production。<br />
   */
  const env_platform = ( mode => {
      if( ![
        'dev_server',
        'local_server',
        'test',
        'production',
      ].includes( mode ) ){
        console.log( chalk.cyan( `\nmode的值为--->${ mode }<---。\n` ) );

        throw new Error( `CLI参数中必须有这么一个“--mode”参数设置，这4个之中的其中一个即可：--mode dev_server、--mode local_server、--mode test、--mode production。` );
      }

      return mode;
    } )( mode ),
    /**
     * @type {boolean} isProduction的值为true时表示生产环境，反之开发环境。<br />
     */
    isProduction = command === 'build';

  /**
   * @type {string} 'development'代表开发模式，'production'代表生产模式。
   */
  mode = isProduction
         ? 'production'
         : 'development';

  /**
   * @type {'spa' | 'mpa' | 'custom'} 默认值为'spa'。无论你的应用是一个单页应用（SPA）还是一个多页应用（MPA），亦或是一个定制化应用（SSR和自定义HTML处理的框架）：<br />
   * 'spa'：包含HTML中间件以及使用SPA回退。在预览中将sirv配置为single: true。<br />
   * 'mpa'：包含HTML中间件。<br />
   * 'custom'：不包含HTML中间件。<br />
   *
   * 特别说明：
   * 1、该选项也会影响“configures/VitePluginHTMLConfig.esm.mjs”、“configures/EntryConfig.esm.mjs”这个两个的配置。<br />
   * 2、前者是vite-plugin-html插件，后者是Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。<br />
   * 3、上述两个配置文件，详细可前往它们内部查看说明。<br />
   * 4、如果实际项目指定为是SPA的，那么就将该选项设置为'spa'即可，上述两个配置文件会有各自的判断，返回相应的配置，具体见它们内部说明。<br />
   * 5、如果实际项目指定为是MPA的，那么就将该选项设置为'mpa'即可，上述两个配置文件会有各自的判断，返回相应的配置，具体见它们内部说明。<br />
   * 6、如果该选项设置为'custom'，那么极可能需要前往上述两个配置文件进行具体的修改，当前的配置未必能满足“custom”的需要。<br />
   */
  const appType = 'spa',
    /**
     * @type {string|string[]|{[p: string]: string}} Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。
     */
    entryConfig = EntryConfig( {
      appType,
    } ),
    /**
     * @type {ESBuildOptions | false} 默认情况下，esbuild会被应用在ts、jsx、tsx文件。ESBuildOptions扩展了esbuild自己的transform选项。<br />
     * 1、你可以通过esbuild.include和esbuild.exclude对要处理的文件类型进行配置，这两个配置的值可以是一个正则表达式、一个picomatch模式，或是一个值为这两种类型的数组。<br />
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
      include: [
        new RegExp( `\\.(` + Array.from( new Set( [
          'js',
          'cjs',
          'mjs',

          'ts',
          'cts',
          'mts',

          'jsx',
          'tsx',
        ] ) ).join( '|' ) + `)(\\?.*)?$`, ),
      ],
      exclude: [
        `**/node_modules/**/*`,
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
       *
       * 开发环境启用时报：Invalid option in transform() call: "splitting"
       */
      // splitting: true,
      // 详细见：https://esbuild.github.io/api/#ignore-annotations
      ignoreAnnotations: false,
      // 有效值有：browser、node、neutral。
      platform: 'browser',
      keepNames: true,
      mangleQuoted: false,
      // 日志限制可以更改为另一个值，也可以通过将其设置为0来完全禁用。这将显示所有日志消息。
      logLimit: 0,
      /**
       * 关于在压缩代码时删除“console”、“debugger”的注意事项，可能导致编译后的代码报错或输出的代码非期望代码！！！
       * 1、当压缩代码时启用删除“console”、“debugger”后，某些情况下会有意外的编译输出，详见如下：
       * 说明：
       * 如果在诸如console.log()中编写某些跟项目逻辑业务有关的代码，那么当压缩代码时启用删除“console”、“debugger”时，会导致最后输出的代码中因删除了诸如console.log()，从而导致其中的某些跟项目逻辑业务有关的代码也被删除，最终使生产的代码出现非所愿期望的代码输出，从而报错。
       * 所以，诸如console.log()中不要做任何逻辑处理（哪怕是：++index这种最简单的逻辑），只作为纯日志输出。
       * 例如：
       * let index = 0, arr001 = [ 'qqq', 'www', ], str001 = '';
       *
       * for( const item of arr001 ){
       *   str001 + = item;
       *
       *   console.log( `index--->${ ++index }` );
       * }
       * 当压缩代码时没有启用删除“console”、“debugger”时，执行上述代码后，index的值为3，但是如果启用，则index的值为0，那么显然这不是期望的。
       *
       * 对于上述的“console”、“debugger”，当前配置是这样的，只当CLI参数中有“--mode production”时，才会压缩代码时启用删除“console”、“debugger”。
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
        'semicolon-after-return': 'warning',
        // 代码“!x in y”被解析为“(!x) in y”。您需要插入括号才能获得“!(x in y)”。
        'suspicious-boolean-not': 'error',
        // 当文件是ECMAScript模块[this-is-undefined-in-esm]，因此顶级“this”将被替换为undefined。
        'this-is-undefined-in-esm': 'warning',
        // 此“import”表达式不会被捆绑（import(foo)），因为参数不是字符串文字。
        'unsupported-dynamic-import': 'warning',
        'unsupported-jsx-comment': 'error',
        // 正则表达式标志“d”在配置的目标环境（“chrome50”）中不可用。此正则表达式文字已转换为“new RegExp()”构造函数以避免生成带有语法错误的代码。但是，您需要为“RegExp”包含一个polyfill您的代码在运行时具有正确的行为。
        'unsupported-regexp': 'warning',
        'unsupported-require-call': 'warning',

        'css-syntax-error': 'error',
        'invalid-@charset': 'error',
        'invalid-@import': 'warning',
        'invalid-@layer': 'warning',
        'invalid-calc': 'error',
        'js-comment-in-css': 'warning',
        'unsupported-@charset': 'error',
        'unsupported-@namespace': 'error',
        'unsupported-css-property': 'warning',
        'unsupported-css-nesting': 'error',

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
       * 7、必须在项目根目录存在一个有效的tsconfig.json、tsconfig.vite.json文件。<br />
       */
      tsconfigRaw: ( tsconfigPath => {
        let obj1 = JSON.parse( JSON.stringify( tsconfig_vite_json ) ),
          resultCompilerOptionsObj = Object.prototype.toString.call( obj1.compilerOptions ) === '[object Object]'
                                     ? JSON.parse( JSON.stringify( obj1.compilerOptions ) )
                                     : {},
          path1 = '',
          dirNamePath1 = dirname( resolve( __dirname, tsconfigPath ) );

        while( 'extends' in obj1 && obj1.extends.length !== 0 ){
          path1 = resolve( dirNamePath1, obj1.extends );

          dirNamePath1 = dirname( path1 );

          obj1 = JSON5.parse( String( readFileSync( path1 ) ) );

          resultCompilerOptionsObj = Object.assign( {}, Object.prototype.toString.call( obj1.compilerOptions ) === '[object Object]'
                                                        ? JSON.parse( JSON.stringify( obj1.compilerOptions ) )
                                                        : {}, JSON.parse( JSON.stringify( resultCompilerOptionsObj ) ) );
        }

        return JSON.stringify( {
          compilerOptions: {
            ...JSON.parse( JSON.stringify( resultCompilerOptionsObj ) ),
            esModuleInterop: true,
            // 选项'isolatedModules'是多余的，不能与选项'verbatimModuleSyntax'一起指定，优先使用verbatimModuleSyntax。
            // isolatedModules: true,
          },
        } );
      } )( './tsconfig.vite.json' ),
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
     * @type {RollupOptions} 直接定制底层的Rollup包。这与可以从Rollup配置文件中导出的选项相同，将与Vite的内部Rollup选项合并。<br />
     * 详细见：<br />
     * https://rollupjs.org/configuration-options/
     */
    rollupOptions = {
      // 核心功能 Start

      /**
       * @type {(string | RegExp)[]| RegExp| string| (id: string, parentId: string, isResolved: boolean) => boolean} 可以是一个接收ID并返回true（外部）或false（非外部）的函数，也可以是一个模块ID的数组，或匹配模块ID的正则表达式，这些都应该保持在捆绑的外部。也可以只是一个单一的ID或正则表达式。<br />
       * 1、匹配的ID应该是以下两种情况之一：<br />
       * 外部依赖关系的名称，与导入语句中的写法完全一致。例如，如果要将import "dependency.js"标记为外部，请使用 "dependency.js"，如果要将import "dependency"标记为外部，请使用 "dependency"。<br />
       * 一个已解决的ID（像一个文件的绝对路径）。<br />
       *
       * 详细见：<br />
       * https://rollupjs.org/configuration-options/#external
       */
      external: [
        // 'axios',
        // 'echarts',
        // 'jquery',
        // 'swiper',
      ],
      /**
       * @type {string | string []| { [entryName: string]: string }} Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。<br />
       * 1、捆绑的入口点（例如，你的main.js或app.js或index.js）。<br />
       * 2、如果你提供了一个入口点的数组或一个将名字映射到入口点的对象，它们将被捆绑到独立的输出块中。<br />
       * 3、除非使用output.file选项，否则生成的块的名称将遵循output.entryFileNames选项。<br />
       * 4、当使用对象形式时，文件名的[name]部分将是对象属性的名称，而对于数组形式，它将是入口点的文件名。<br />
       * 5、请注意，在使用对象形式时，可以通过在名称中添加一个/来将入口点放入不同的子文件夹。<br />
       * 下面将生成至少两个名称为entry-a.js和entry-b/index.js的入口块，即文件index.js被放在entry-b文件夹中：<br />
       * input: {
       *   a: 'src/main-a.js',
       *   'b/index': 'src/main-b.js'
       * }
       *
       * 详细见：<br />
       * https://rollupjs.org/configuration-options/#input
       */
      input: entryConfig,
      output: {
        // 核心功能 Start

        /**
         * @type {string} 所有生成的块被放置在哪个目录中。如果生成一个以上的块，这个选项是必需的。否则，可以使用file选项来代替。
         */
        dir: resolve( __dirname, `./dist/${ env_platform }/` ),
        /**
         * @type {string} 默认值："es"。<br />
         * 1、指定生成的捆绑包的格式。以下之一：<br />
         * amd - 异步模块定义，与RequireJS等模块加载器一起使用。<br />
         * cjs - CommonJS，适用于Node和其他捆绑程序（别名：commonjs）。<br />
         * es - 将捆绑文件作为ES模块文件，适用于其他捆绑程序，并在现代浏览器中作为<script type=module>标签包含（别名：esm，模块）。<br />
         * iife - 一个自我执行的函数，适合作为<script>标签包含。(如果你想为你的应用程序创建一个包，你可能想使用这个。)。"iife "代表 "立即调用的函数表达式"。<br />
         * umd - 通用模块定义，与amd、cjs和iife合二为一。<br />
         * system - SystemJS加载器的本地格式（别名：systemjs)。<br />
         */
        format: 'es',
        /**
         * @type {{ [id: string]: string }| ((id: string) => string)} 指定umd/iife包中外部导入所需的id: variableName对。需要上面的“external”选项也要配合设置。
         */
        globals: {
          // axios: 'axios',
          // echarts: 'echarts',
          // jquery: '$',
          // swiper: 'Swiper',
        },

        // 核心功能 End

        // 高级功能 Start

        /**
         * @type {string| ((assetInfo: AssetInfo) => string)} 默认值："assets/[name]-[hash][extname]"。用于命名自定义发射资产的模式，以包括在构建输出中，或者为每个资产调用一个函数来返回这样的模式。<br />
         * 1、模式支持以下占位符：<br />
         * [extname]：资产的文件扩展名，包括一个前导点，例如：.css。<br />
         * [ext]：不含前导点的文件扩展名，例如：css。<br />
         * [hash]：基于资产内容的哈希值。你也可以通过[hash:10]设置一个特定的哈希长度。<br />
         * [name]：资产的文件名，不包括任何扩展名。<br />
         * 2、正斜杠/可以用来将文件放在子目录中。<br />
         * 3、当使用一个函数时，有函数参数assetInfo是generateBundle中的一个缩小版，没有fileName。<br />
         * 4、函数参数assetInfo拥有的属性：<br />
         * name：string，一般表示文件名，带扩展名的，值如：'Helvetica.otf'。<br />
         * source：Uint8Array、string，一般表示文件的源码内容。<br />
         * type：string，其值一般为：'asset'。<br />
         */
        assetFileNames: ( {
          name,
          source,
          type,
        } ) => {
          const ext = extname( name );

          if( ext === '.css' ){
            return `styles/[name]_[hash:16][extname]`;
          }

          if( ext === '.wasm' ){
            return `wasm/[name]_[hash:16][extname]`;
          }

          if( fontsForAssets.map( item => `.${ item }` ).includes( ext ) ){
            return `fonts/[name]_[hash:16][extname]`;
          }

          if( imgForAssets.map( item => `.${ item }` ).includes( ext ) ){
            return `img/[name]_[hash:16][extname]`;
          }

          if( musicForAssets.map( item => `.${ item }` ).includes( ext ) ){
            return `music/[name]_[hash:16][extname]`;
          }

          if( videosForAssets.map( item => `.${ item }` ).includes( ext ) ){
            return `videos/[name]_[hash:16][extname]`;
          }

          if( pwa_manifestForAssets.map( item => `.${ item }` ).includes( ext ) ){
            return `pwa_manifest/[name]_[hash:16][extname]`;
          }

          if( name.endsWith( '.manifest.json' ) ){
            return `pwa_manifest/${ name.split( '.manifest.json' )[ 0 ] }_[hash:16].manifest.json`;
          }

          if( name.endsWith( '.worker.js' ) || name.endsWith( '.worker.ts' ) ){
            return `workers/${ name.split( '.worker' )[ 0 ] }_[hash:16].worker.js`;
          }

          return `assets/[name]_[hash:16][extname]`;
        },
        /**
         * @type {string | ((chunkInfo: ChunkInfo) => string)} 默认值："[name]-[hash].js"。用于命名代码拆分时创建的共享块的模式，或者为每个块调用一个函数以返回这样的模式。<br />
         * 1、模式支持以下占位符：<br />
         * [format]：输出选项中定义的渲染格式，例如es或cjs。<br />
         * [hash]：仅基于最终生成的块的内容的哈希值，包括renderChunk中的转换和任何引用的文件哈希值。你也可以通过[hash:10]设置一个特定的哈希值长度。<br />
         * [name]：块的名称。这可以通过output.manualChunks选项明确设置，或者在插件通过this.emitFile创建大块时设置。否则，它将从块的内容中导出。<br />
         * 2、正斜杠/可以用来将文件放在子目录中。<br />
         * 3、当使用一个函数时，函数参数chunkInfo是generateBundle中的一个简化版本，没有依赖于文件名的属性，也没有关于渲染模块的信息，因为渲染只发生在文件名生成之后。<br />
         * 4、然而，你可以访问所包含的moduleIds的列表。<br />
         * 5、函数参数chunkInfo拥有的属性：<br />
         * exports：值如：[]。<br />
         * facadeModuleId：值如：null。<br />
         * isDynamicEntry：值如：false。<br />
         * isEntry：值如：false。<br />
         * isImplicitEntry：值如：false。<br />
         * moduleIds：值如：[ '\x00vite/modulepreload-polyfill' ]。<br />
         * name：值如：'modulepreload-polyfill'。<br />
         * type：值如：'chunk'。<br />
         */
        chunkFileNames: ( {
          exports,
          facadeModuleId,
          isDynamicEntry,
          isEntry,
          isImplicitEntry,
          moduleIds,
          name,
          type,
        } ) => {
          return `js/[name]_Chunk_[hash:16].js`;
        },
        /**
         * @type {boolean} 默认值：false。这将使rollup生成的包装代码最小化。注意，这并不影响用户编写的代码。这个选项在捆绑预minified代码时很有用。<br />
         */
        compact: isProduction,
        /**
         * @type {boolean} 默认值：true。虽然CommonJS输出最初只支持require(...)来导入依赖关系，但最近的Node版本也开始支持import(...)，这是从CommonJS文件中导入ES模块的唯一方法。<br />
         * 如果这个选项为true，也就是默认情况下，Rollup会在CommonJS输出中保持外部动态导入为import(...)表达式。<br />
         * 将此设置为false，可以使用require(...)语法重写动态导入。<br />
         */
        // dynamicImportInCjs: true,
        /**
         * @type {string | ((chunkInfo: ChunkInfo) => string)} 默认值："[name].js"。用于从入口点创建的块的模式，或者为每个入口块调用一个函数以返回这样的模式。<br />
         * 1、模式支持以下占位符：<br />
         * [format]：输出选项中定义的渲染格式，例如es或cjs。<br />
         * [hash]：仅基于最终生成的条目块内容的哈希值，包括renderChunk中的转换和任何引用的文件哈希值。你也可以通过[hash:10]设置一个特定的哈希值长度。<br />
         * [name]：入口点的文件名（不含扩展名），除非输入的对象形式被用来定义一个不同的名字。<br />
         * 2、正斜杠/可以用来将文件放在子目录中。<br />
         * 3、当使用一个函数时，函数参数chunkInfo是generateBundle中的一个简化版本，没有依赖于文件名的属性，也没有关于渲染模块的信息，因为渲染只发生在文件名生成之后。<br />
         * 4、然而，你可以访问所包含的moduleIds的列表。<br />
         * 5、在设置output.preserveModules选项时，这个模式也将被用于每个文件。<br />
         * 6、注意，在这种情况下，[name]将包括来自输出根的相对路径和可能的原始文件扩展名，如果它不是.js、.jsx、.cjs、.ts、.tsx、.mts或.cts之一。<br />
         * 7、函数参数chunkInfo拥有的属性：<br />
         * exports：值如：[]。<br />
         * facadeModuleId：值如：'G:/WebStormWS/web-for-vite-project-template/HelloWorld.html'。<br />
         * isDynamicEntry：值如：false。<br />
         * isEntry：值如：true。<br />
         * isImplicitEntry：值如：false。<br />
         * moduleIds：值如：[
         *     'G:/WebStormWS/web-for-vite-project-template/src/pages/hello_world/HelloWorld.css',
         *     'G:/WebStormWS/web-for-vite-project-template/src/tools/ts/universal_tools/UniversalTools.esm.mts',
         *     'G:/WebStormWS/web-for-vite-project-template/src/pages/hello_world/HelloWorld.mjs',
         *     'G:/WebStormWS/web-for-vite-project-template/HelloWorld.html'
         *   ]。<br />
         * name：值如：'HelloWorld'。<br />
         * type：值如：'chunk'。<br />
         */
        entryFileNames: ( {
          exports,
          facadeModuleId,
          isDynamicEntry,
          isEntry,
          isImplicitEntry,
          moduleIds,
          name,
          type,
        } ) => {
          return 'js/[name]_Entry_[hash:16].js';
        },
        /**
         * @type {boolean} 默认值：true。<br />
         * 1、如果输出格式是es，是否在输出中为外部导入添加导入断言。<br />
         * 2、默认情况下，断言取自输入文件，但插件可以稍后添加或删除断言。<br />
         * 3、例如，import "foo" assert {type: "json"}将导致相同的导入出现在输出中，除非该选项被设置为false。<br />
         * 4、注意，一个模块的所有导入都需要有一致的断言，否则会发出警告。<br />
         */
        // externalImportAssertions: true,
        /**
         * @type {'es5' | 'es2015'| { arrowFunctions?: boolean, constBindings?: boolean, objectShorthand?: boolean, preset?: 'es5'| 'es2015', reservedNamesAsProps?: boolean, symbols?: boolean }} 默认值："es5"。<br />
         * 1、Rollup可以在生成的代码中安全地使用哪些语言特性。这不会转译任何用户代码，而只是改变Rollup在包装器和帮助器中使用的代码。你可以从几个预设中选择一个：<br />
         * "es5"：不要使用ES2015+的功能，如箭头函数，但不要引用作为道具的保留名称。<br />
         * "es2015"：使用ES2015之前的任何JavaScript特性。<br />
         */
        generatedCode: {
          preset: 'es2015',
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: true,
          symbols: true,
        },
        /**
         * @type {boolean} 默认值：true。默认情况下，当创建多个分块时，入口分块的横向导入将作为空导入添加到入口分块中。<br />
         * 1、请参阅 "为什么在代码拆分时，额外的导入会出现在我的条目块中？"了解详情和背景。<br />
         * 2、将此选项设置为false将禁用这一行为。<br />
         * 3、当使用output.preserveModules选项时，这个选项会被忽略，因为在这里，导入永远不会被挂起。<br />
         */
        // hoistTransitiveImports: true,
        /**
         * @type {boolean} 默认值：false。这将内联动态导入，而不是创建新的块来创建一个单一的捆绑。<br />
         * 1、只有在提供单一输入的情况下才可能。<br />
         * 2、注意，这将改变执行顺序：如果动态导入被内联，一个只被动态导入的模块将被立即执行。<br />
         */
        // inlineDynamicImports: false,
        /**
         * @type {'compat' | 'auto'| 'esModule'| 'default'| 'defaultOnly'| ((id: string) => 'compat'| 'auto'| 'esModule'| 'default'| 'defaultOnly')} 默认值："default"。<br />
         * 1、控制Rollup如何处理默认、命名空间和来自外部依赖的动态导入，像CommonJS这样的格式不原生支持这些概念。<br />
         * 2、请注意，"default "的默认模式是模仿NodeJS的行为，与TypeScript的esModuleInterop不同。<br />
         * 3、要获得TypeScript的行为，明确地将该值设置为 "auto"。<br />
         * 4、在例子中，我们将使用CommonJS格式，但互操作的选择也同样适用于AMD、IIFE和UMD目标。<br />
         */
        interop: 'auto',
        /**
         * @type {boolean} 默认值：对于es和system格式，或者如果output.compact为真，则为真，否则为假。<br />
         * 1、默认情况下，对于格式es和system或者output.compact为true，Rollup会尝试将内部变量导出为单字母变量，以便更好地进行最小化。<br />
         */
        minifyInternalExports: false,
        /**
         * @type {boolean | 'inline'| 'hidden'} 默认值：false。<br />
         * 1、如果是 "true"，将创建一个单独的源图文件。<br />
         * 2、如果是 "inline"，源码表将作为一个数据URI被附加到结果输出文件中。<br />
         * 3、"hidden "的工作原理与 "true "类似，只是捆绑文件中相应的源码表注释会被抑制。<br />
         */
        sourcemap: isProduction,
        /**
         * @type {boolean} 默认值：false。如果为true，源码的实际代码将不会被添加到源码图中，使其大大缩小。<br />
         */
        sourcemapExcludeSources: isProduction,

        // 高级功能 End
      },

      // 核心功能 End

      // 高级功能 Start

      /**
       * @type {RollupCache | boolean} 默认值：true。前一个捆绑包的缓存属性。用它来加速观察模式下的后续构建--Rollup只会重新分析有变化的模块。将此选项明确设置为false将阻止生成bundle上的缓存属性，也会停用插件的缓存。<br />
       */
      cache: true,
      /**
       * @type {boolean| 'ifRelativeSource'} 默认值：'ifRelativeSource'。决定绝对的外部路径是否应该在输出中转换为相对路径。这不仅适用于源文件中的绝对路径，也适用于由插件或Rollup核心解析为绝对路径的路径。<br />
       * 1、对于这种情况，"ifRelativeSource "检查原始导入是否是相对导入，然后才在输出中转换为相对导入。选择 "false "将在输出中保持所有路径为绝对路径。<br />
       */
      // makeAbsoluteExternalsRelative: 'ifRelativeSource',
      /**
       * @type {number} 默认值：20。限制rollup在读取模块或写块时平行打开的文件数量。<br />
       * 1、如果没有限制或者数值足够高，构建可能会失败，出现 "EMFILE: Too many open files"（EMFILE：太多的开放文件）。
       * 2、这取决于操作系统允许多少个开放文件处理。<br />
       */
      maxParallelFileOps: 200 + cpus().length - 1,
      /**
       * @type {'strict' | 'allow-extension' | 'exports-only'| false} 默认值："exports-only"。控制汇总是否尝试确保条目区块与基础条目模块具有相同的导出。<br />
       * 1、如果设置为“strict”，Rollup将在条目块中创建与相应条目模块中完全相同的导出。如果这是不可能的，因为需要向区块添加额外的内部导出，Rollup将创建一个“facade”入口区块，该区块只从其他区块重新导出必要的绑定，但不包含其他代码。这是库的建议设置。<br />
       * 2、"allow-extension"将在入口块中创建入口模块的所有导出，但如果需要，也可以添加额外的导出，从而避免“facade”入口块。此设置对于不需要严格签名的库是有意义的。<br />
       * 3、如果入口模块具有导出，则“exports-only”的行为类似于“strict”，否则的行为类似“allow-extension”。<br />
       * 4、false不会将条目模块的任何导出添加到相应的块中，甚至不包括相应的代码，除非这些导出在捆绑包的其他地方使用。不过，内部导出可能会添加到入口块中。这是将条目块放置在脚本标记中的web应用程序的建议设置，因为这可能会减少块的数量，也可能会减少捆绑包的大小。<br />
       * 5、目前，为单个条目块覆盖此设置的唯一方法是使用插件API，并通过this.emitFile而不是使用input选项发送这些块。<br />
       */
      // preserveEntrySignatures: 'exports-only',
      /**
       * @type {boolean} 默认值：false。启用此标志后，当使用不推荐使用的功能时，Rollup将抛出一个错误，而不是显示警告。<br />
       * 1、此外，标记为在下一个主要版本中收到弃用警告的功能在使用时也会引发错误。<br />
       * 2、此标志旨在供例如插件作者使用，以便能够尽早为即将发布的主要版本调整插件。<br />
       */
      strictDeprecations: true,

      // 高级功能 End

      // 危险功能 Start

      // 除非你知道自己在做什么，否则你可能不需要使用这些选项！

      /**
       * @type {AcornOptions} 应该传递给Acorn的解析函数的任何选项，例如allowReserved:true。<br />
       * 详细见：<br />
       * https://github.com/acornjs/acorn/tree/master/acorn#interface
       * node_modules/acorn/dist/acorn.d.ts:14
       */
      acorn: {
        /**
         * @type {3 | 5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019} 指示要解析的ECMAScript版本。<br />
         * 1、必须是3、5、6（或2015）、7（2016）、8（2017）、9（2018）、10（2019）、11（2020）、12（2021）、13（2022）、14（2023）或"latest"（库支持的最新版本）。<br />
         * 2、这影响了对严格模式、保留字集的支持以及对新语法功能的支持。<br />
         */
        ecmaVersion: 2022,
        /**
         * @type {'script' | 'module'} 指示代码应以何种模式进行解析。可以是“script”或“module”。这会影响导入和导出声明的全局严格模式和解析。<br />
         * 1、注意：如果设置为“module”，则静态import / export语法将有效，即使ecmaVersion小于6。<br />
         */
        sourceType: 'module',
        /**
         * @type {boolean | 'never'} 如果为false，则使用保留字将生成错误。ecmaVersion 3的默认值为true，而更高版本的默认值则为false。当给定值“never”时，保留字和关键字也不能用作属性名（就像在Internet Explorer的旧解析器中一样）。<br />
         */
        allowReserved: false,
        /**
         * @type {boolean} 默认情况下，顶级的return语句会引发一个错误。将此设置为true以接受此类代码。
         */
        allowReturnOutsideFunction: true,
        /**
         * @type {boolean} 默认情况下，导入和导出声明只能出现在程序的顶级。将此选项设置为true可以在允许语句的任何位置使用它们，还可以在脚本中显示import.meta表达式（当sourceType不是“module”时）。
         */
        allowImportExportEverywhere: false,
        /**
         * @type {boolean} 如果为false，则等待表达式只能出现在异步函数内部。ecmaVersion 2022及更高版本默认为true，较低版本默认为false。将此选项设置为true可以使用顶级等待表达式。不过，在非异步函数中仍然不允许使用它们。
         */
        allowAwaitOutsideFunction: true,
        /**
         * @type {boolean} 默认情况下，方法外部的super会引发错误。将此设置为true以接受此类代码。
         */
        allowSuperOutsideMethod: true,
        /**
         * @type {boolean} 启用此选项后，如果代码以字符#!开头（在shell脚本中），第一行将被视为注释。当ecmaVersion>=2023时，默认为true。
         */
        allowHashBang: true,
        /**
         * @type {boolean} 当为true时，每个节点都有一个附加有起始子对象和结束子对象的loc对象，每个子对象都包含{行，列}形式的从一开始的行和从零开始的列编号。默认值为false。
         */
        // locations: false,
      },

      // 危险功能 End

      // 实验性功能 Start

      /**
       * @type {number} 默认值：10，确定插件不再使用的缓存资产应在多少次运行后删除。
       */
      experimentalCacheExpiry: 100,
      /**
       * @type {boolean} 默认值：false，当设置为true时，这将把它在每个文件中发现的第一个副作用记录到控制台。<br />
       * 1、这对于确定哪些文件有副作用以及实际的副作用是什么非常有帮助。<br />
       * 2、消除副作用可以改善树的抖动和块的生成，对输出至关重要。实验MinChunkSize有效。<br />
       * 3、不过，此选项将只记录顶级语句。<br />
       * 4、有时，例如，在立即调用函数表达式的情况下，实际的副作用可能隐藏在嵌套表达式中。<br />
       */
      // experimentalLogSideEffects: false,
      /**
       * @type {number} 默认值：0，单位是：字节。在Byte中设置用于代码拆分设置的最小块大小目标。<br />
       * 1、当该值大于0时，Rollup将尝试将执行时没有副作用的任何块，即仅包含函数定义等并且低于该大小限制的任何块合并到可能在类似条件下加载的另一个块中。<br />
       * 2、这意味着生成的捆绑包可能会加载还不需要的代码，以减少块的数量。合并后的块没有副作用的条件确保了这不会改变行为。<br />
       * 3、不幸的是，由于分块的工作方式，在运行任何分块渲染插件（如minifier）之前都会测量分块大小，这意味着你应该使用足够高的限制来考虑这一点。<br />
       */
      // experimentalMinChunkSize: 0,

      // 实验性功能 End

      /**
       * @type {WatcherOptions | false} 默认值：{}。指定监视模式选项或阻止监视此配置。<br />
       * 1、只有在使用配置数组时，指定false才真正有用。在这种情况下，此配置不会在监视模式更改时生成或重新生成，但会在定期运行Rollup时生成。<br />
       * 2、只有在使用--watch标志运行Rollup或使用Rollup.watch时，这些选项才会生效。<br />
       */
      watch: {
        /**
         * @type {number} 默认值：0，配置Rollup在触发重建之前等待进一步更改的时间（以毫秒为单位）。<br />
         * 1、默认情况下，Rollup不等待，但在chokidar实例中配置了一个小的防跳超时。<br />
         * 2、将其设置为大于0的值意味着，只有在配置的毫秒数没有变化的情况下，Rollup才会触发重建。<br />
         * 3、如果监视多个配置，Rollup将使用配置的最大生成延迟。<br />
         */
        buildDelay: 0,
        /**
         * @type {ChokidarOptions} 手表选项的可选对象，该对象将被传递到绑定的chokidar实例。<br />
         * 详细见：<br />
         * https://github.com/paulmillr/chokidar#persistence
         */
        chokidar: {
          persistent: true,
          ignored: watch_ignored,
          cwd: resolve( __dirname, `./src` ),
          depth: 100,
          ignorePermissionErrors: false,
        },
        /**
         * @type {boolean} 默认值：true，触发重新生成时是否清除屏幕。
         */
        clearScreen: false,
        /**
         * @type {string | RegExp | (string | RegExp)[]} 阻止监视文件。
         */
        exclude: watch_ignored,
        /**
         * @type {string | RegExp | (string | RegExp)[]} 将文件监视限制为某些文件。请注意，这只会过滤模块图，但不允许添加其他监视文件。
         */
        include: [
          'src/**',
        ],
        /**
         * @type {boolean} 默认值：false，触发重建时是否跳过bundle.write()步骤。
         */
        skipWrite: false,
      },

      // 有趣的树摇 Start

      /**
       * 默认值：true
       * 是否应用树形震荡，并对树形震荡过程进行微调。
       * 把这个选项设置为false会产生更大的包，但可能会提高构建性能。
       * 你也可以从3个预设中选择一个，如果有新的选项加入，预设会自动更新：
       * "smallest"：
       * 将为你选择选项值，以尽可能地减少输出大小。只要你不依赖某些模式，这对大多数代码库来说应该是可行的，而这些模式目前是：
       * 有副作用的getters只有在返回值被使用时才会被保留（treeshake.propertyReadSideEffects: false）。
       * 只有在至少使用一个导出值的情况下，才会保留导入模块的代码（treeshake.moduleSideEffects: false）。
       * 你不应该捆绑依赖于检测破碎的内置程序的polyfills（treeshake.tryCatchDeoptimization: false）。
       * 一些语义问题可能被吞噬（treeshake.unknownGlobalSideEffects: false, treeshake.correctVarValueBeforeDeclaration: false）。
       *
       * "recommended"：
       * 对于大多数使用模式来说，应该可以很好地工作。不过，一些语义问题可能会被吞噬（treeshake.unknownGlobalSideEffects: false, treeshake.correctVarValueBeforeDeclaration: false)
       *
       * "safest"：
       * 试图在提供一些基本的树形晃动功能的同时，尽可能地符合规范。
       *
       * true等同于不指定该选项，将总是选择默认值（见下文）。
       */
      treeshake: {
        annotations: true,
        correctVarValueBeforeDeclaration: true,
        moduleSideEffects: ( id, external ) => {
          return true;
        },
        preset: 'recommended',
        propertyReadSideEffects: 'always',
        tryCatchDeoptimization: true,
        unknownGlobalSideEffects: true,
      },

      // 有趣的树摇 End
    };

  const viteConfig = {
    appType,
    /**
     * @type {string|RegExp|(string|RegExp)[]} 指定额外的picomatch模式，作为静态资产处理，以便：<br />
     * 当从HTML引用或通过fetch或XHR直接请求时，它们将被排除在插件转换管道之外。<br />
     * 从JS中导入它们将返回其解析的URL字符串（如果你有一个强制：'pre'插件来处理不同的资产类型，这可以被覆盖）。<br />
     *
     * 详细见：<br />
     * https://cn.vitejs.dev/config/shared-options.html#assetsinclude
     */
    assetsInclude: [
      ( () => {
        const KNOWN_ASSET_TYPES = Array.from( new Set( [
          ...fontsForAssets,
          ...imgForAssets,
          ...musicForAssets,
          ...videosForAssets,
          ...pwa_manifestForAssets,
        ] ) );

        return new RegExp( `\\.(` + KNOWN_ASSET_TYPES.join( '|' ) + `)(\\?.*)?$`, );
      } )(),
      new RegExp( `\\.(manifest)\\.(json)(\\?.*)?$` ),
    ],
    /**
     * @type {string} 默认：“/”，开发或生产环境服务的公共基础路径。合法的值包括以下3种：<br />
     * 1、绝对URL路径名，例如：/foo/。<br />
     * 2、完整的URL，例如：https://foo.com/。<br />
     * 3、空字符串“”或“./”（用于嵌入形式的开发）。<br />
     *
     * 注意：<br />
     * 1、强烈建议在生产模式时将其设置为空字符串即可。<br />
     * 2、为了能正常配合“configures/vite_plugin_custom/vite-plugin-html-by-custom.esm.mjs”使用，强烈建议将其设置为以“/”打头并且以“/”结尾的字符串。<br />
     * 例如：将其设置为：'dev_server'，这样在浏览器中打开页面的地址可为：https://127.0.0.1:8500/dev_server/Upload.html
     */
    base: isProduction
          ? ``
          : `/${ env_platform }/`,
    /**
     * @type {object} 构建选项。
     */
    build: {
      /**
       * @type {string | string[]} 默认值：'modules'。<br />
       * 1、最终捆绑包的浏览器兼容性目标。默认值是Vite的一个特殊值'modules'，它的目标是具有本地ES模块、本地ESM动态导入和import.meta支持的浏览器。
       * Vite会将'modules'替换为['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']。<br />
       * 2、另一个特殊的值是'esnext'--它假定支持本地动态导入，并将尽可能少地转译：<br />
       * 如果build.minify选项是'terser'，并且安装的Terser版本低于5.16.0，'esnext'将被强制降为'es2021'。<br />
       * 在其他情况下，它将完全不执行转译。<br />
       * 3、该转换是通过esbuild进行的，其值应该是一个有效的esbuild目标选项。<br />
       * 自定义目标可以是一个ES版本（如es2015），一个带版本的浏览器（如chrome58），或者是一个多个目标字符串的数组。<br />
       * 注意，如果代码中包含esbuild无法安全转译的特性，则构建会失败。<br />
       */
      target: esbuildMinify_target,
      /**
       * @type {boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }} 默认值：{ polyfill: true }。<br />
       * 1、默认情况下，一个模块预加载polyfill是自动注入的。<br />
       * polyfill被自动注入到每个index.html条目的代理模块中。<br />
       * 如果通过build.rollupOptions.input将构建配置为使用非HTML的自定义条目，那么就有必要在你的自定义条目中手动导入polyfill：<br />
       * import 'vite/modulepreload-polyfill'
       * 2、注意：polyfill并不适用于库模式。<br />
       * 如果你需要支持没有本地动态导入的浏览器，你可能应该避免在你的库中使用它。<br />
       * 可以用{ polyfill: false }来禁用polyfill。<br />
       * 3、为每个动态导入预加载的块的列表由Vite计算。<br />
       * 默认情况下，在加载这些依赖关系时，将使用包括基础在内的绝对路径。<br />
       * 如果基数是相对的（''或'./'），import.meta.url会在运行时使用，以避免依赖最终部署基数的绝对路径。<br />
       */
      modulePreload: {
        polyfill: true,
      },
      /**
       * @type {boolean} 已废弃，是否自动注入一个模块预加载polyfill。请使用build.modulePreload.polyfill代替，默认值：true。<br />
       */
      // polyfillModulePreload: true,
      /**
       * @type {string} 指定输出路径。默认值：'dist'。<br />
       */
      outDir: resolve( __dirname, `./dist/${ env_platform }/` ),
      /**
       * @type {string} 默认值：'assets'，只能是相对于上面的选项outDir设置的文件夹的相对路径，该值要么是以“./”开头的相对路径，要么是“assets/”这种形式的相对路径。
       */
      assetsDir: `./assets/`,
      /**
       * @type {number} 默认值：4096 (4kb)。单位：字节。
       * 1、导入或引用的资产如果小于这个阈值，将被内联为base64 URLs，以避免额外的http请求。设置为0可以完全禁止内联。<br />
       * 2、Git LFS占位符会被自动排除在内联之外，因为它们不包含它们所代表的文件的内容。<br />
       * 3、如果你指定build.lib，build.assetsInlineLimit将被忽略，资产将始终被内联，无论文件大小或是否为Git LFS占位符。<br />
       */
      assetsInlineLimit: 10 * 1024,
      /**
       * @type {boolean} 默认值：true。启用/禁用CSS代码拆分。当启用时，在异步块中导入的CSS将被内联到异步块本身，并在该块被加载时插入。<br />
       * 1、如果禁用，整个项目中的所有CSS将被提取到一个单一的CSS文件中。<br />
       * 2、如果你指定build.lib，build.cssCodeSplit将默认为假。<br />
       */
      cssCodeSplit: true,
      /**
       * @type {string | string[]} 默认值同选项build.target的值。<br />
       * 1、这个选项允许用户为CSS最小化设置一个不同的浏览器目标，而不是用于JavaScript转写的目标。<br />
       * 2、它只应该在你以非主流浏览器为目标时使用。<br />
       * 一个例子是安卓微信WebView，它支持大多数现代JavaScript功能，但不支持CSS中的#RGBA十六进制颜色符号。<br />
       * 在这种情况下，你需要将build.cssTarget设置为chrome61，以防止vite将rgba()颜色转化为#RGBA十六进制符号。<br />
       */
      cssTarget: esbuildMinify_target,
      /**
       * @type {boolean} 默认值同选项build.minify的值。<br />
       * 1、这个选项允许用户特别覆盖CSS的最小化，而不是默认为build.minify，因此你可以分别配置JS和CSS的最小化。Vite使用esbuild来最小化CSS。<br />
       */
      cssMinify: isProduction,
      /**
       * @type {boolean | 'inline' | 'hidden'} 默认值：false。生成生产源码图。<br />
       * 1、如果为真，将创建一个单独的源码图文件。<br />
       * 2、如果是'inline'，源码表将作为一个数据URI附加到生成的输出文件中。<br />
       * 3、如果是'hidden'，则与true类似，只是捆绑文件中相应的源码图注释会被抑制。<br />
       */
      sourcemap: isProduction,
      /**
       * @type {RollupOptions} 直接定制底层的Rollup包。这与可以从Rollup配置文件中导出的选项相同，将与Vite的内部Rollup选项合并。<br />
       * 详细见：<br />
       * https://rollupjs.org/configuration-options/
       */
      rollupOptions,
      /**
       * @type {RollupCommonJSOptions} 一个用于将CommonJS模块转换为ES6的Rollup插件，因此它们可以被包含在一个Rollup包中。<br />
       * 详细见：https://github.com/rollup/plugins/tree/master/packages/commonjs#options
       */
      commonjsOptions: {
        /**
         * @type {'auto' | boolean | 'debug' | string[]} 默认值："auto"，默认情况下，这个插件将尝试把require语句作为import挂在每个文件的顶部。<br />
         * 1、虽然这对许多代码库来说效果很好，并允许非常有效的ESM输出，但它不能完美地捕捉CommonJS的语义，因为所需模块的初始化顺序会有所不同。<br />
         * 由此产生的副作用可能包括日志语句以不同的顺序排放，一些依赖于require语句中polyfills的初始化顺序的代码可能无法工作。<br />
         * 但是，当CommonJS模块之间存在循环的requirement调用时，问题就特别大了，因为这些模块往往依赖于嵌套requirement调用的懒惰执行。<br />
         * 2、将此选项设置为 "true "将把所有的CommonJS文件包裹在函数中，在第一次需要它们时执行，保留了NodeJS的语义。<br />
         * 这是最安全的设置，如果生成的代码在 "auto "下不能正常工作，就应该使用这个选项。<br />
         * 请注意，strictRequires: true会对生成的代码的大小和性能产生小的影响，但如果代码被最小化了，则影响较小。<br />
         * 3、默认值 "auto "将只包裹CommonJS文件，当它们是CommonJS依赖性循环的一部分，<br />
         * 例如，一个索引文件被它的一些依赖性所要求，或者如果它们只是以一种潜在的 "条件 "方式被要求，<br />
         * 如从一个if语句或一个函数中。所有其他的CommonJS文件都被吊起。这是对大多数代码库的推荐设置。<br />
         * 请注意，如果同一个文件同时存在有条件和无条件的要求，那么对有条件的要求的检测可能会受到竞赛条件的影响，在边缘情况下，这可能会导致构建之间的不一致。<br />
         * 如果你认为这对你来说是一个问题，你可以通过使用 "auto "或 "debug "以外的任何值来避免这个问题。<br />
         * 4、false将完全防止包裹和吊起所有文件。这可能仍然有效，取决于循环依赖的性质，但往往会引起问题。<br />
         * 5、你也可以提供一个picomatch模式或模式数组，只指定一个文件子集，该子集应该被包裹在函数中以获得正确的需求语义。<br />
         * 6、"debug "的工作方式与 "auto "类似，但在捆绑之后，它将显示一个警告，其中包含一个已经被捆绑的id列表，可以作为picomatch模式用于微调或避免 "auto "提到的潜在竞赛条件。<br />
         */
        strictRequires: 'auto',
        /**
         * @type {string | string[]} 默认值：[]，已放弃支持！
         *
         * 详细见：<br />
         * https://github.com/rollup/plugins/tree/master/packages/commonjs#dynamicrequiretargets
         */
        // dynamicRequireTargets: [],
        /**
         * @type {string} 默认值：process.cwd()。<br />
         * 1、为了避免在使用 dynamicRequireTargets 选项时出现长的路径，你可以使用这个选项来指定一个目录，这个目录是所有使用动态require语句的文件的共同父目录。<br />
         * 使用一个更高的目录，如/，可能会导致生成的代码中出现不必要的长路径，并可能暴露你机器上的目录名称，如你的主目录名称。<br />
         * 默认情况下，它使用当前工作目录。<br />
         */
        // dynamicRequireRoot: process.cwd(),
        /**
         * @type {string | string[]} 默认值：null。<br />
         * 1、一个picomatch模式或模式数组，用于指定插件应该忽略的构建中的文件。<br />
         * 默认情况下，所有扩展名不在扩展名或".cjs "中的文件都被忽略，但你可以排除其他文件。参见include选项。<br />
         */
        // exclude: null,
        /**
         * @type {string | string[]} 默认值：null。<br />
         * 1、一个picomatch模式或模式数组，它指定了插件应该对构建中的文件进行操作。<br />
         * 默认情况下，所有扩展名为".cjs "的文件或扩展中的文件都被包括在内，但你可以通过只包括特定文件来缩小这个列表。<br />
         * 如果分析没有发现ES模块的特定语句或者transformMixedEsModules为真，这些文件将被分析和转码。<br />
         */
        include: [
          /node_modules/,
        ],
        /**
         * @type {string[]} 默认值为：['.js']。<br />
         * 1、对于无扩展名的导入，按照指定的顺序搜索.js以外的扩展名。注意，你需要确保非JavaScript文件先由另一个插件转译。<br />
         */
        extensions: [
          '.js',
          '.cjs',
          '.cts',
        ],
        /**
         * @type {boolean} 默认值：false。如果为真，全局的使用将不会被这个插件处理。<br />
         */
        // ignoreGlobal: false,
        /**
         * @type {boolean} 默认值：true。如果是false，则跳过CommonJS模块的源图生成。这将提高性能。<br />
         */
        sourceMap: isProduction,
        /**
         * @type {boolean} 默认值：false。<br />
         * 1、指示该插件是否启用混合模块转换。<br />
         * 这在包含ES导入语句和CommonJS require表达式混合的模块的情况下很有用。<br />
         * 如果require调用在混合模块中应被转换为导入，则设置为true；<br />
         * 如果require表达式应在转换中存活，则设置为false。<br />
         * 如果代码包含环境检测，或者你正在为一个对require调用有特殊处理的环境编码，如ElectronJS，后者可能很重要。<br />
         * 也请看ignore选项。<br />
         */
        transformMixedEsModules: true,
        /**
         * @type {string[] | ((id: string) => boolean)} 默认值：[]。<br />
         * 1、有时你必须让require语句不被转换。传递一个包含ID的数组或一个id => boolean函数。<br />
         */
        // ignore: [],
        /**
         * @type {boolean | 'remove' | string[] | ((id: string) => boolean)} 默认值：true。<br />
         * 1、在大多数情况下，如果require调用的外部依赖是在try-catch子句中，它们应该不被转换，因为它需要一个可选的依赖，可能安装在rolled的包旁边，也可能没有。<br />
         * 由于require转换为静态import--该调用被提升到文件的顶部，在try-catch子句之外。<br />
         * 2、true：所有在 try 中的外部 require 调用将不被转换。<br />
         * 3、false：所有在 try 中的外部 require 调用将被转换为没有 try-catch 子句的情况。<br />
         * 4、remove：删除任何try块中的所有外部requirement调用。<br />
         * 5、string[]：传递一个包含ID的数组，不进行转换。<br />
         * 6、((id: string) => boolean|'remove')：传递一个控制单个ID的函数。<br />
         * 7、请注意，非外部的requires不会被这个选项忽略。<br />
         */
        // ignoreTryCatch: true,
        /**
         * @type {boolean} 默认值：false。<br />
         * 1、有些require的调用不能被静态地解决，以翻译成imports。<br />
         * 2、当这个选项被设置为false时，当遇到这样的调用时，生成的代码将直接抛出一个错误，或者，当使用dynamicRequireTargets时，当这样的调用不能用配置的动态需求目标来解决。<br />
         * 3、将此选项设置为 "true "将在代码中保留require调用，或将其作为dynamicRequireTargets的后备选项。<br />
         */
        // ignoreDynamicRequires: false,
        /**
         * @type {boolean | string[] | ((id: string) => boolean)} 默认值：false。<br />
         * 1、控制如何渲染来自外部依赖的导入。默认情况下，这个插件假设所有的外部依赖是CommonJS。这意味着它们被呈现为默认的导入，以便与NodeJS兼容。<br />
         * 2、例如ES模块只能从CommonJS依赖中导入一个默认的导出：<br />
         * // input
         * const foo = require('foo');
         * // output
         * import foo from 'foo';
         * 3、对于 ES 模块的依赖关系来说，这可能是不需要的：在这里，require通常应该返回命名空间，以便与处理捆绑模块的方式兼容。<br />
         * 4、如果你把 esmExternals 设置为 true，这个插件就会假定所有的外部依赖都是 ES 模块，并且会遵守 requireReturnsDefault 选项。如果没有设置该选项，它们将被呈现为命名空间导入。<br />
         * 5、你也可以提供一个id数组，将其视为ES模块，或者提供一个函数，通过每个外部id来确定它是否是ES模块。<br />
         */
        // esmExternals: false,
        /**
         * @type {boolean | 'auto'} 默认值："auto"。当从ES模块导入CommonJS文件时，控制什么是默认导出。<br />
         * 1、true：默认导出的值是module.exports。目前这与Node.js在导入CommonJS文件时的行为一致。<br />
         * 例子：<br />
         * // mod.cjs
         * exports.default = 3;
         *
         * import foo from './mod.cjs';
         * console.log(foo); // { default: 3 }
         *
         * 2、false：默认出口的值是exports.default。<br />
         * 例子：<br />
         * // mod.cjs
         * exports.default = 3;
         *
         * import foo from './mod.cjs';
         * console.log(foo); // 3
         *
         * 3、"auto"：如果CommonJS文件有exports.__esModule === true属性，默认导出的值就是exports.default；否则就是module.exports。<br />
         * 这使得导入编译到CommonJS的ES模块的默认出口成为可能，就像它们没有被编译一样。<br />
         * 例子：
         * // mod.cjs
         * exports.default = 3;
         *
         * // mod-compiled.cjs
         * exports.__esModule = true;
         * exports.default = 3;
         *
         * import foo from './mod.cjs';
         * import bar from './mod-compiled.cjs';
         * console.log(foo); // { default: 3 }
         * console.log(bar); // 3
         */
        // defaultIsModuleExports: 'auto',
        /**
         * @type {boolean | 'namespace' | 'auto' | 'preferred' | ((id: string) => boolean | 'auto' | 'preferred')} 默认值：false。<br />
         * 1、控制当需要一个来自CommonJS文件的ES模块时，会返回什么。当使用esmExternals选项时，这也将适用于外部模块。默认情况下，这个插件将把这些导入呈现为命名空间导入。<br />
         * 例如：<br />
         * // input
         * const foo = require('foo');
         *
         * // output
         * import * as foo from 'foo';
         *
         * 2、这与其他捆绑程序处理这种情况的方式是一致的，也是在Node支持这种情况下最可能的行为。然而，在某些情况下，这可能是不可取的：<br />
         * 在一个不能改变的外部依赖关系中存在代码，其中一个require语句期望从ES模块返回默认导出。<br />
         * 如果导入的模块在同一个包中，Rollup将为导入的模块生成一个命名空间对象，这可能会不必要地增加包的大小：<br />
         * // input: main.js
         * const dep = require('./dep.js');
         * console.log(dep.default);
         *
         * // input: dep.js
         * export default 'foo';
         *
         * // output
         * var dep = 'foo';
         *
         * var dep$1 = //#__PURE__// Object.freeze({
         *   __proto__: null,
         *   default: dep
         * });
         *
         * console.log(dep$1.default);
         *
         * 3、对于这些情况，你可以在全局或每个模块上改变Rollup的行为。要在全局范围内改变它，将requireReturnsDefault选项设置为下列值之一：<br />
         * false：这是默认的，要求ES模块返回其命名空间。这是唯一的选项，也会在命名空间中添加一个标记__esModule: true，以支持CommonJS模块的互操作模式，这些模块是转置的ES模块。<br />
         * "namespace"：和false一样，要求一个ES模块返回它的命名空间，但该插件不添加__esModule标记，从而创建更有效的代码。对于使用esmExternals时的外部依赖：true，不产生额外的互操作代码。<br />
         * "auto"：这是对output.exports的补充："auto "在Rollup中的作用：如果一个模块有一个默认的出口并且没有命名的出口，要求该模块返回默认的出口。在所有其他情况下，命名空间被返回。当使用esmExternals: true时，对于外部依赖，会添加一个相应的互操作帮助器。<br />
         * "preferred"：如果一个模块有一个默认的导出，要求该模块总是返回默认的导出，无论是否存在额外的命名导出。这类似于这个插件以前版本的工作方式。同样，当使用esmExternals: true时，对于外部依赖性，增加了一个互操作帮助器。<br />
         * true: 这将总是尝试在require时返回默认导出，而不检查它是否实际存在。如果没有默认出口，这可能会在构建时抛出。当不使用esmExternals时，这就是处理外部依赖的方式。与其他选项相比，它的优点是，像false一样，它不会为外部依赖添加一个互操作助手，以保持代码的精简。<br />
         *
         * 4、为了改变单个模块的情况，你可以为 requireReturnsDefault 提供一个函数。这个函数将为每个所需的ES模块或外部依赖的相应ID调用一次，并允许你为不同的模块返回不同的值。<br />
         */
        // requireReturnsDefault: false,
      },
      /**
       * @type {RollupDynamicImportVarsOptions} 一个支持Rollup动态导入中的变量的Rollup插件。<br />
       * 详细见：https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#options
       */
      dynamicImportVarsOptions: {
        /**
         * @type {string | string[]} 默认值：[]。要包含在这个插件中的文件（默认为所有）。<br />
         */
        // include: [],
        /**
         * @type {string | string[]} 默认值：[]。在这个插件中要排除的文件（默认没有）。<br />
         */
        // exclude: [],
        /**
         * @type {boolean} 默认值：false。默认情况下，该插件在遇到错误时将退出构建过程。如果你把这个选项设置为 "true"，它将抛出一个警告，而不触动代码。<br />
         */
        warnOnError: true,
      },
      /**
       * @type {boolean | string} 默认值：false。<br />
       * 1、设置为 "true "时，构建还将生成一个 manifest.json 文件，其中包含非哈希资产文件名与其哈希版本的映射，然后服务器框架可使用该映射来呈现正确的资产链接。<br />
       * 2、当该值为字符串时，它将被用作清单文件的名称。<br />
       * 3、最后会在输出目录下生成该文件。<br />
       */
      manifest: `vite_assets_manifest.json`,
      /**
       * @type {boolean | string} 默认值：false。<br />
       * 1、设置为 "true "时，构建也会生成 SSR 清单，用于确定生产中的样式链接和资产预加载指令。<br />
       * 2、当该值为字符串时，它将被用作清单文件的名称。<br />
       * 3、最后会在输出目录下生成该文件。<br />
       */
      // ssrManifest: `vite_ssr_assets_manifest.json`,
      /**
       * @type {boolean | string} 默认值：false。生成面向SSR的构建。<br />
       * 1、该值可以是一个字符串，以直接指定SSR条目，或者是true，这需要通过rollupOptions.input来指定SSR条目。<br />
       */
      ssr: false,
      /**
       * @type {boolean | 'terser' | 'esbuild'} 默认值：'esbuild'。<br />
       * 1、设置为false表示禁用最小化，或者指定要使用的最小化器。默认是esbuild，它比terser快20~40倍，压缩率只差1~2%。基准测试。<br />
       * 2、注意build.minify选项在lib模式下使用'es'格式时不对空白处进行最小化，因为它删除了纯注释并破坏了树形摇动。<br />
       * 3、当Terser被设置为'terser'时，必须安装它。<br />
       */
      minify: isProduction
              ? 'esbuild'
              : false,
      /**
       * @type {boolean} 默认值：true。<br />
       * 1、设置为false是为了禁止将bundle写到磁盘上。这主要用于程序化的build()调用，在写到磁盘之前需要对bundle进行进一步的后处理。<br />
       */
      write: true,
      /**
       * @type {boolean} 默认值：如果outDir在根目录内，则为true。<br />
       * 1、默认情况下，如果outDir在项目根目录内，Vite会在构建时清空它。<br />
       * 2、如果outDir在根目录之外，它将发出警告，以避免意外地删除重要文件。<br />
       * 3、你可以明确设置这个选项来抑制警告。这也可以通过命令行设置为--emptyOutDir。<br />
       */
      emptyOutDir: true,
      /**
       * @type {boolean} 实验性。默认值：true。默认情况下，Vite会在构建时将文件从publicDir复制到outDir。设置为false则禁用。<br />
       */
      copyPublicDir: false,
      /**
       * @type {boolean} 默认值：true。启用/禁用gzip压缩的大小报告。压缩大的输出文件可能会很慢，所以禁用它可能会提高大型项目的构建性能。<br />
       */
      reportCompressedSize: true,
      /**
       * @type {number} 默认值：500。块大小警告的限制（单位：kbs）。它与未压缩的分块大小进行比较，因为JavaScript大小本身与执行时间有关。<br />
       */
      chunkSizeWarningLimit: 5 * 1024,
      /**
       * @type {WatcherOptions| null} 默认值：null。设置为{}以启用rollup观察器。这主要用于涉及只建立插件或整合过程的情况。<br />
       */
      // watch: null,
    },
    /**
     * @type {boolean} 默认值为true，设置为false可以防止Vite在记录某些信息时清除终端屏幕。通过命令行，使用：--clearScreen false。
     */
    clearScreen: false,
    /**
     * @type {CSSOptions} CSS相关选项（预处理器和CSS模块）。<br />
     * 详细见：<br />
     * node_modules/vite/dist/node/index.d.ts:526
     * https://cn.vitejs.dev/config/shared-options.html#css-modules
     */
    css: {
      /**
       * @type {CSSModulesOptions|boolean} 配置CSS modules的行为。选项将被传递给postcss-modules。<br />
       * 详细见：<br />
       * node_modules/vite/dist/node/index.d.ts:514
       * https://github.com/css-modules/postcss-modules
       */
      modules: {
        /**
         * 默认情况下，一个带有导出类的JSON文件将被放在相应的CSS旁边。但你可以自由地使用导出的类来做你想做的一切，只要使用getJSON回调。getJSON也可以返回一个Promise。<br />
         * 注意：<br />
         * 1、目前，有一个问题，就是在生产模式下，该选项生成的.JSON文件在生成后会被清除掉，因为生产模式在构建前，会清除输出目录，显然该选项的生成操作在“清除”操作之前了。<br />
         * 2、使用插件“vite-plugin-clean”也没法改变这个情况。<br />
         * 3、当前将存放路径放在了“src/static/json/css_modules”文件夹下，这样当构建完成后，会随着文件夹“static”一起备拷贝到输出目录。<br />
         *
         * @param {string} cssFileName 如：G:/WebStormWS/xxx/Upload.Vue3.ts.vue?used&vue&type=style&index=1&lang.module.scss
         *
         * @param {Record<string, string>} json 如：{"red001":"Upload-Vue3-ts-vue-used-vue-type-style-index-1-lang-module_red001_4b19293a"}
         *
         * @param {string} outputFileName 如：G:/WebStormWS/xxx/Upload.Vue3.ts.vue?used&vue&type=style&index=1&lang.module.scss
         *
         * @returns {void | Promise<any>}
         */
        getJSON: async ( cssFileName, json, outputFileName ) => {
          await writeFile( resolve( __dirname, `./src/static/json/css_modules/${ basename( cssFileName )
          .replace( new URL( cssFileName ).search, '' ) }.css.modules.json` ), JSON.stringify( json ), {
            flag: 'w+',
          } );
        },
        /**
         * @type {'global' | 'local'} 默认情况下，该插件假定所有的类都是'local'。值有：'global'、'local'。
         */
        scopeBehaviour: 'local',
        /**
         * @type {string | ((name: string, filename: string, css: string) => string)}
         * 例子：<br />
         * 会生成这样的类名：Upload-Vue3-ts-vue-used-vue-type-style-index-1-lang-module_red001_4b19293a。<br />
         *
         * 详细见：<br />
         * https://github.com/webpack/loader-utils#interpolatename
         */
        generateScopedName: '[name]_[local]_[sha512:contenthash:hex:8]',
        /**
         * @type {'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly' | ((originalClassName: string, generatedClassName: string, inputFile: string) => string)} 输出类名的样式。<br />
         * camelCase：class名称将被驼峰化（如：.apply-color -> applyColor），原来的class名称将不会被从local中删除。<br />
         * camelCaseOnly：class名称将被驼峰化（如：.apply-color -> applyColor），原来的class名称将会被从local中删除。<br />
         * dashes：只有class名中的破折号（“-”）会被驼峰化（如：.apply-color -> applyColor）。<br />
         * dashesOnly：class名中的破折号（“-”）将被驼峰化（如：.apply-color -> applyColor），原来的class名将被从local删除。<br />
         */
        localsConvention: 'dashes',
        exportGlobals: true,
      },
      /**
       * @type {string | (PostCSS.ProcessOptions & { plugins?: PostCSS.AcceptedPlugin[]; })} 内联的PostCSS配置（格式同postcss.config.js），或者一个（默认基于项目根目录的）自定义的PostCSS配置路径。<br />
       * 对内联的POSTCSS配置，它期望接收与postcss.config.js一致的格式。<br />
       *
       * “但对于plugins属性有些特别，只接收使用数组格式”，这句话不是特别对！<br />
       * 其也是支持对象形式的配置的，但是Vite自己却强制限制为只能数组格式！<br />
       * 详细见：<br />
       * https://github.com/postcss/postcss-load-config/blob/main/src/plugins.js
       * node_modules/vite/dist/node/chunks/dep-a178814b.js:38420
       *
       * 搜索是使用postcss-load-config完成的，只有被支持的文件名才会被加载。<br />
       * 注意：如果提供了该内联配置，Vite将不会搜索其他PostCSS配置源。<br />
       *
       * 详细见：<br />
       * node_modules/postcss/lib/postcss.d.ts:314
       */
      postcss: {
        syntax: PostcssSCSS,
        parser: PostcssSCSS.parse,
        stringifier: PostcssSCSS.stringify,
        map: false,
        // 配置插件的时候注意顺序哦！不同插件之间有先后处理的规则！postcss的插件有200多之数（有些还废弃、迁移包名之类的），还会随着积累越来越多的，挑着对项目有用的插件配置，不要过度求全，不然指不定会出现不如所愿的情况出现。
        plugins: [
          // 生成后备的兼容语法 Start

          // postcss-will-change-transition，为transition生成will-change。这个插件在transition之后添加了will-change属性来加速动画。可以与postcss-will-change插件结合使用，但是postcss-will-change-transition插件得在postcss-will-change插件之前。
          ( await import('postcss-will-change-transition') ).default(),

          /**
           * postcss-will-change（得在Autoprefixer插件之前），使用backface-visibility来强制浏览器创建一个新层，而不覆盖现有的backface-visibility属性。<br />
           * 1、这个3D CSS hack通常使用transform: translateZ(0)来完成，但是这里使用了backface-visibility来避免覆盖更流行的transform属性。<br />
           * 2、不支持will-change的浏览器需要这些hack。<br />
           * 3、得在Autoprefixer插件之前使用此插件，它将供应商前缀添加到背面可见性。<br />
           */
          ( await import('postcss-will-change') ).default(),

          // postcss-safe-area，为安全区域环境变量添加浏览器后备。
          ( await import('postcss-safe-area') ).default(),

          /**
           * postcss-momentum-scrolling，用于为iOS上具有overflow（scroll、auto）的元素添加动量样式滚动行为（-webkit-overflow-scrolling: touch）。<br />
           * 1、默认仅为overflow: scroll添加-webkit-overflow-scrolling: touch。
           */
          ( await import('postcss-momentum-scrolling') ).default(),

          // 生成后备的兼容语法 End

          // postcss-preset-env
          ( await import('postcss-preset-env') ).default( {
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
          } ),

          // 优化性插件，这里个人设置成只做优化，不对特殊的、非标准的CSS语法（符合W3C的CSS语法）做处理 Start

          // postcss-single-charset，当文件中存在多个@charset规则时，会将最后一个@charset规则提取到文件顶部，并删除其他@charset规则。
          ( await import('postcss-single-charset') ).default(),

          /**
           * postcss-remove-nested-calc
           * 1、说是已弃用，calc(100vw - calc(20% - 10px))到calc(100vw - (20% - 10px))以实现IE 11兼容性（其实IE 9及其以上版本也都不支持calc函数嵌套）。<br />
           * 2、使用下面的“@csstools/postcss-nested-calc”来代替它也行。<br />
           */
          // ( await import('postcss-remove-nested-calc') ).default(),

          // @csstools/postcss-nested-calc，处理calc函数的嵌套，文档见：https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nested-calc。<br />
          ( await import('@csstools/postcss-nested-calc') ).default( {
            preserve: false,
          } ),

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
          ...(
            isProduction
            ? []
            : [
                ( await import('postcss-calc') ).default( postcssCalcConfig ),
              ]
          ),

          // postcss-mq-optimize（说是已弃用，但是人家还在更新，而且postcss官方插件页面还能搜索到它），删除无效的媒体查询或其表达式。
          ( await import('postcss-mq-optimize') ).default(),

          /**
           * postcss-merge-queries，将相同的CSS媒体查询规则合并为一个。<br />
           * 1、由于此插件将所有媒体查询移动到文件末尾，因此如果您的CSS结构不合理，它可能会引入错误，导致结果不如所愿。所以记住这一点！<br />
           * 2、因此，建议在开发中也使用此插件以更快地检测到此类副作用。<br />
           */
          ( await import('postcss-merge-queries') ).default(),

          /**
           * postcss-combine-duplicated-selectors，自动检测和组合重复的css选择器，这样你就不必手动处理了。<br />
           * 1、该插件就开发环境启用，生产环境不要使用，因为生产环境会启用cssnano进行压缩，而cssnano里面就有discardDuplicates选项，而且也已经配置了。<br />
           */
          ...(
            isProduction
            ? []
            : [
                ( await import('postcss-combine-duplicated-selectors') ).default( {
                  // 可以选择组合重复的属性，启用后会移除重复的属性，后面的会覆盖前面的，从而保留最后的那个属性。
                  removeDuplicatedProperties: true,
                  // 限制仅在值相等时才组合属性，启用后会移除重复的属性，后面的会覆盖前面的，从而保留最后的那个属性。但是必须保证其值是全等的，对于使用了自定义属性的，还是会保留自定义属性的。
                  removeDuplicatedValues: true,
                } ),
              ]
          ),

          // 优化性插件，这里个人设置成只做优化，不对特殊的、非标准的CSS语法（符合W3C的CSS语法）做处理 End

          // 特殊处理 Start

          // postcss-pseudo-element-colons，转换伪元素的双冒号、单冒号，对于新的标准的W3C规范，伪元素最好都用双冒号，虽然单冒号也被支持，但是它是不规范或者旧的规范版本。
          ( await import('postcss-pseudo-element-colons') ).default( {
            selectors: [
              'before',
              'after',
              'first-letter',
              'first-line',
            ],
            'colon-notation': 'double',
          } ),

          /**
           * postcss-viewport-height-correction，解决height: 100vh在移动端浏览器（尤其是iOS端的浏览器）上出现的“怪异”现象，哪怕不是100vh，如：50vh、75vh、-1vh也会出现怪异现象。
           * 1、相关文章可见：<br />
           * https://cloud.tencent.com/developer/article/2031944
           * https://www.jianshu.com/p/437fd5b603de
           * 2、该插件的使用需要手动引入部分JS，具体写法见：<br />
           * https://github.com/Faisal-Manzer/postcss-viewport-height-correction
           */
          ( await import('postcss-viewport-height-correction') ).default( {
            /**
             * 注意：仅使用纯字母字符作为自定义变量名称。我们正在使用正则表达式来修补视口值，任何带有特殊字符的变量都可能导致未知问题。<br />
             * 1、自定义属性名称区分大小写--my-color将被视为与--My-color不同的自定义属性。<br />
             * 2、默认值为：vh。<br />
             * 3、该设置值要跟JS中的变量customViewportCorrectionVariable的值保持一致。<br />
             */
            variable: postcssViewportHeightCorrectionCustomViewportCorrectionVariable,
          } ),

          // 特殊处理 End

          // postcss-browser-reporter，如果您想涵盖所有可能的警告，请将此插件放在所有插件之后。
          ( await import('postcss-browser-reporter') ).default( {
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
          } ),
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
      /**
       * @type {boolean} 实验性，在开发过程中是否启用sourcemap。默认值为false。
       */
      devSourcemap: false,
    },
    /**
     * @type {Record<string, any>} Vite的顶级配置项define的配置。在编译时用其他值或表达式替换代码中的变量。这对于允许开发构建和生产构建之间的不同行为很有用。<br />
     * 1、传递给define的每个键都是一个标识符或多个用.连接的标识符：'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)。<br />
     * 2、如果该值是一个字符串，它将被用作代码片段：TWO: '1+1'。<br />
     * 3、如果值不是字符串，它将被字符串化（包括函数）。<br />
     * 4、如果你在key前加上typeof前缀，它只为typeof调用定义：'typeof window': JSON.stringify('object111')。<br />
     * 5、如果需要定义一个值是字符串值，得单引号内部嵌套双引号，如：'"例子"'（或者JSON.stringify('例子')），否则没法真正输出这个字符串。<br />
     * 6、如果值不是字符串，它将被字符串化，相当于使用JSON.stringify处理，但是如果是函数，直接这么设置就行，别用JSON.stringify：'fun1': () => {}。<br />
     *
     * 注意：<br />
     * 在这里定义的全局常量，当在TS中使用时，一般会被“TS类型检查”鉴定为未定义的错误！可以在“src/custom_declare_types/define.d.ts”这里定义这些全局常量的类型描述。这样就不会报类型错误了。<br />
     */
    define: DefineConfig( {
      env_platform,
      isProduction,
    } ),
    /**
     * @type {string} 默认值同顶级配置选项“root”的值。用于加载.env文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。<br />
     */
    envDir: resolve( __dirname, `./configures/env/` ),
    /**
     * @type {string|string[]} 默认值：“VITE_”，以envPrefix开头的环境变量会通过import.meta.env暴露在你的客户端源码中。<br />
     * 安全注意事项：<br />
     * envPrefix不应被设置为空字符串''，这将暴露你所有的环境变量，导致敏感信息的意外泄漏。检测到配置为''时Vite将会抛出错误。<br />
     * 如果你想暴露一个不含前缀的变量，可以使用顶级配置项define选项：<br />
     * define: {
     *   'import.meta.env.ENV_VARIABLE': JSON.stringify( process.env.ENV_VARIABLE ),
     * }
     */
    envPrefix: [
      'VITE_',
      'env_',
    ],
    esbuild,
    /**
     * @type {object} 处理.json相关的配置。
     */
    json: {
      /**
       * @type {boolean} 是否支持从.json文件中进行按名导入。默认值为：true。
       */
      namedExports: true,
      /**
       * @type {boolean} 若设置为true，导入的JSON会被转换为export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当JSON文件较大的时候。<br />
       * 注意：<br />
       * 1、开启此项，则会禁用按名导入，也就是上面的“namedExports”选项。默认值为：false。<br />
       */
      stringify: false,
    },
    /**
     * @type {'info' | 'warn' | 'error' | 'silent'} 调整控制台输出的粗略程度。默认为 "info"。
     */
    logLevel: 'info',
    mode,
    /**
     * @type {object} 当你第一次运行vite时，Vite会在本地加载你的网站之前预先捆绑你的项目依赖。这在默认情况下是自动和透明地进行的。<br />
     * 详细见：<br />
     * https://vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
     * https://vitejs.dev/guide/dep-pre-bundling.html
     */
    optimizeDeps: {
      /**
       * @type {string | string[]} 默认情况下，Vite会抓取你所有的.html文件来检测需要预先捆绑的依赖关系（忽略node_modules、build.outDir、__tests__和coverage）。<br />
       * 1、如果指定了build.rollupOptions.input，Vite将抓取这些入口点。<br />
       * 2、如果这两者都不符合你的需要，你可以使用这个选项指定自定义条目--其值应该是一个快速球状模式或相对于Vite项目根的模式阵列。<br />
       * 这将覆盖默认条目推断。当明确定义了optimationDeps. entries时，默认情况下只有node_modules和build.outDir文件夹会被忽略。<br />
       * 如果其他文件夹需要被忽略，你可以使用一个忽略模式作为条目列表的一部分，用一个初始的！标记。<br />
       */
      // entries: [],
      /**
       * @type {string[]} 要从预捆绑中排除的依赖关系。<br />
       * 1、CommonJS依赖不应该被排除在优化之外。如果一个ESM依赖被排除在优化之外，但有一个嵌套的CommonJS依赖，CommonJS依赖应该被添加到optimationDeps.include中。<br />
       */
      // exclude: [],
      /**
       * @type {string[]} 默认情况下，不在node_modules内的链接包不会被预捆绑。使用这个选项可以强制一个被链接的软件包被预先捆绑起来。
       */
      // include: [],
      /**
       * @type {EsbuildBuildOptions} esbuild配置。<br />
       * 1、在部署扫描和优化过程中传递给esbuild的选项。某些选项被省略了，因为改变它们会与Vite的部署优化不兼容。<br />
       * 2、external选项也被省略了，使用Vite的optimizeDeps.exclude选项。<br />
       * plugins与Vite的dep插件进行合并。<br />
       */
      esbuildOptions: ( esbuild => {
        const obj = Object.assign( {}, esbuild );

        delete obj.include;
        delete obj.exclude;
        delete obj.tsconfigRaw;

        obj.tsconfig = resolve( __dirname, './tsconfig.vite.json' );

        return obj;
      } )( esbuild ),
      /**
       * @type {boolean} 设置为 "true "可以强制进行依赖性预捆绑，忽略之前缓存的优化依赖性。
       */
      // force: isProduction,
      /**
       * @type {boolean | 'build' | 'dev'} 实验性，默认值：'build'。禁用依赖性优化，true在构建和开发过程中禁用优化器。通过'build'或'dev'，只在其中一个模式中禁用优化器。依赖性优化默认只在开发中启用。<br />
       */
      disabled: 'build',
    },
    /**
     * @type {(Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]} 要使用的插件数组。Falsy插件会被忽略，而插件的数组会被扁平化。如果返回一个承诺，它将在运行前被解决。<br />
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
    plugins: [
      /**
       * @type {object} 自动加载模块，而不必在任何地方“import”或“require”它们。<br />
       * 1、默认情况下，模块解析路径是从“当前文件夹”和“node_modules”中开始查找。<br />
       * 2、要导入ES2015模块的“默认导出”，必须指定模块的“默认属性”，也就是说模块必须指定“默认属性”。<br />
       * 3、每当在模块中遇到标识符作为自由变量时，模块会自动加载，并且标识符会填充加载模块的导出（或“属性”以支持“命名导出”）。<br />
       * 如：_map: ['lodash', 'map']、Vue: ['vue/dist/vue.esm.js', 'default']。<br />
       * 4、也可以指定完整路径：identifier: path.resolve(path.join(__dirname, 'src/module1'))。<br />
       * 5、为第三方包配置时，只要用包名作为value值即可，因为webpack会自动从“node_modules”中查找，并加载相应的模块文件。<br />
       * 6、为第三方包配置时，不要设置以“./”、“./node_modules/”、“node_modules/”等等开头的value值，当然如果是指向自己的模块文件，那还是要指定完整路径。<br />
       * 7、element-ui依赖vue 2.X，而当前安装的时vue 3.X，所以如果要使用element-ui，要去安装vue 2.X的包，如：vue@2.6.14。当要使用element-ui且安装了vue 2.X，并且设置了：ELEMENT: 'element-ui'、Vue: 'vue'，那么在代码中使用这两个的时候要写成：Vue.default.use( ELEMENT )。<br />
       * 8、注意，不同的包，因为其package.json中"exports"字段值的不同，如下设置也会不同的，最好每次都要在代码中测试是否如期望一样达到目的效果。<br />
       * 9、鉴于某些低版本浏览器不支持ES6+的语法，而如下设置又直接使用了第三方包的ESM版本，那么最终的打包代码中会直接使用其ESM版本的代码，从而导致不支持某些低版本浏览器。<br />
       *
       * 例子：<br />
       * {
       *   // import { Promise } from 'es6-promise'
       *   Promise: [ 'es6-promise', 'Promise' ],
       *
       *   // import { Promise as P } from 'es6-promise'
       *   P: [ 'es6-promise', 'Promise' ],
       *
       *   // import $ from 'jquery'
       *   $: 'jquery',
       *
       *   // import * as fs from 'fs'
       *   fs: [ 'fs', '*' ],
       *
       *   // use a local module instead of a third-party one
       *   'Object.assign': path.resolve( 'src/helpers/object-assign.js' ),
       * }
       */
      VitePluginInject( {
        // include: [],
        // exclude: [],
        sourceMap: false,
        modules: {
          $: [
            resolve( join( __dirname, './node_modules/jquery/dist/jquery.js' ) ),
            '*',
          ],
          jQuery: [
            resolve( join( __dirname, './node_modules/jquery/dist/jquery.js' ) ),
            '*',
          ],
        },
      } ),

      /**
       * 将WebAssembly ESM集成（又名Webpack的asyncWebAssembly）添加到Vite中，并支持wasm-pack生成的模块。<br />
       * 详细见：<br />
       * https://github.com/Menci/vite-plugin-wasm
       * 1、在针对Firefox时，请将worker.format的值设置为iife。<br />
       */
      VitePluginWASM(),
      /**
       * 转化代码以支持Vite的普通浏览器的顶层等待。支持Vite默认目标的所有现代浏览器，无需将build.target设置为esnext。<br />
       * 详细见：<br />
       * https://github.com/Menci/vite-plugin-top-level-await
       * 1、如果worker.format的值是es，该插件也可以正常工作的。<br />
       * 2、如果worker.format的值是iife，该插件首先让Vite将您的工作者构建为ES捆绑包，因为IIFE不支持顶层等待，然后将转换后的ES捆绑包构建为IIFE。<br />
       * 3、在针对Firefox时，请将worker.format的值设置为iife。<br />
       */
      VitePluginTopLevelAwait(),

      VitePluginLegacy( {
        targets: vite_plugin_legacy_target,
        polyfills: true,
        /**
         * @type {string[]} 添加自定义导入到传统的polyfills块中。<br />
         * 1、由于基于使用的polyfill检测只包括ES语言功能，可能需要使用这个选项手动指定额外的DOM API polyfills。<br />
         * 2、注意：如果现代和传统块都需要额外的polyfills，它们可以简单地在应用程序源代码中导入。<br />
         */
        // additionalLegacyPolyfills: [],
        /**
         * @type {boolean}
         */
        ignoreBrowserslistConfig: false,
        // modernPolyfills: false,
        // renderLegacyChunks: true,
        // externalSystemJS: false,
      } ),
      /**
       * 该插件的详细配置选项见：<br />
       * node_modules/@vitejs/plugin-vue/dist/index.d.ts:20
       * https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options
       */
      vue( {
        isProduction,
        script: {
          /**
           * 设置该选项后会报错！因为内部代码有BUG！
           * 详细见：
           * TypeError: Cannot read properties of undefined (reading 'name')
           *     at registerBinding (G:\WebStormWS\web-for-vite-project-template\node_modules\@vue\compiler-sfc\dist\compiler-sfc.cjs.js:4653:19)
           *     at walkObjectPattern (G:\WebStormWS\web-for-vite-project-template\node_modules\@vue\compiler-sfc\dist\compiler-sfc.cjs.js:4734:13)
           *     at walkDeclaration (G:\WebStormWS\web-for-vite-project-template\node_modules\@vue\compiler-sfc\dist\compiler-sfc.cjs.js:4698:21)
           *     at Object.compileScript (G:\WebStormWS\web-for-vite-project-template\node_modules\@vue\compiler-sfc\dist\compiler-sfc.cjs.js:4263:13)
           *     at resolveScript (file:///G:/WebStormWS/web-for-vite-project-template/node_modules/@vitejs/plugin-vue/dist/index.mjs:283:31)
           *     at genScriptCode (file:///G:/WebStormWS/web-for-vite-project-template/node_modules/@vitejs/plugin-vue/dist/index.mjs:2469:18)
           *     at transformMain (file:///G:/WebStormWS/web-for-vite-project-template/node_modules/@vitejs/plugin-vue/dist/index.mjs:2282:54)
           *     at Object.transform (file:///G:/WebStormWS/web-for-vite-project-template/node_modules/@vitejs/plugin-vue/dist/index.mjs:2785:16)
           *     at file:///G:/WebStormWS/web-for-vite-project-template/node_modules/rollup/dist/es/shared/node-entry.js:24551:40
           */
          ...( isEnabled => {
            return isEnabled
                   ? {
                babelParserPlugins: [
                  // Language extensions Start

                  /**
                   * 1、["pipelineOperator", { proposal: "hack" }]跟插件“placeholders”有冲突，二者只能取其一。
                   * 2、placeholders跟v8intrinsic不能同时使用。
                   */
                  // 'placeholders',
                  /**
                   * 1、["pipelineOperator", { proposal: "hack" }]跟插件“v8intrinsic”有冲突，二者只能取其一。
                   * 2、placeholders跟v8intrinsic不能同时使用。
                   */
                  // 'v8intrinsic',
                  // flow跟typescript不能同时使用。
                  /*
                   [
                   'flow',
                   {
                   // 默认值为：false。
                   all: false,
                   enums: true,
                   },
                   ],
                   */
                  // flow跟typescript不能同时使用。
                  [
                    'typescript',
                    {
                      // 默认值为：false。
                      dts: false,
                      // 默认值为：false。
                      disallowAmbiguousJSXLike: false,
                    },
                  ],
                  'flowComments',
                  'jsx',

                  // Language extensions End

                  // ECMAScript proposals Start

                  'doExpressions',
                  'explicitResourceManagement',
                  // asyncDoExpressions依赖上面的doExpressions。
                  'asyncDoExpressions',
                  'decimal',
                  // decorators和decorators-legacy不能同时使用，建议使用decorators。
                  // 'decorators-legacy',
                  // decorators和decorators-legacy不能同时使用，建议使用decorators。
                  [
                    'decorators',
                    {
                      // 在2022年3月的TC39会议上就Stage 3达成共识的提案版本要求decoratorsBeforeExport为false，allowCallParenthesized也为false。
                      decoratorsBeforeExport: false,
                      // 在2022年3月的TC39会议上就Stage 3达成共识的提案版本要求decoratorsBeforeExport为false，allowCallParenthesized也为false。
                      allowCallParenthesized: false,
                    },
                  ],
                  'decoratorAutoAccessors',
                  'destructuringPrivate',
                  'exportDefaultFrom',
                  'functionBind',
                  // importAssertions跟moduleAttributes不能同时使用，且importAssertions已经取代了moduleAttributes。
                  // 'importAssertions',
                  // importAttributes已经取代了importAssertions。
                  [
                    'importAttributes',
                    {
                      deprecatedAssertSyntax: true,
                    },
                  ],
                  'importReflection',
                  // importAssertions跟moduleAttributes不能同时使用，且importAssertions已经取代了moduleAttributes。
                  /*
                   [
                   'moduleAttributes',
                   {
                   version: 'may-2020',
                   },
                   ],
                   */
                  'moduleBlocks',
                  'partialApplication',
                  [
                    'pipelineOperator',
                    {
                      /**
                       * 1、["pipelineOperator", { proposal: "smart" }]跟["recordAndtuple", { syntaxType: "hash"}]有冲突，二者只能取其一。
                       * 2、["pipelineOperator", { proposal: "hack" }]跟插件“placeholders”有冲突，二者只能取其一。
                       * 3、["pipelineOperator", { proposal: "hack" }]跟插件“v8intrinsic”有冲突，二者只能取其一。
                       * 4、["pipelineOperator", { proposal: "hack", topicToken: "#" }]跟["recordAndtuple", { syntaxType: "hash"}]有冲突，二者只能取其一。
                       */
                      proposal: 'hack',
                      /**
                       * 1、["pipelineOperator", { proposal: "hack", topicToken: "#" }]跟["recordAndtuple", { syntaxType: "hash"}]有冲突，二者只能取其一。
                       */
                      topicToken: '^^',
                    },
                  ],
                  [
                    'recordAndTuple',
                    {
                      /**
                       * 1、["pipelineOperator", { proposal: "hack", topicToken: "#" }]跟["recordAndtuple", { syntaxType: "hash"}]有冲突，二者只能取其一。
                       * 2、["pipelineOperator", { proposal: "smart" }]跟["recordAndtuple", { syntaxType: "hash"}]有冲突，二者只能取其一。
                       */
                      syntaxType: 'hash',
                    },
                  ],
                  'regexpUnicodeSets',
                  'throwExpressions',
                  'importMeta',
                  [
                    'estree',
                    {
                      classFeatures: true,
                    },
                  ],

                  // ECMAScript proposals End

                  // Latest ECMAScript features Start

                  'asyncGenerators',
                  'bigInt',
                  'classPrivateMethods',
                  'classPrivateProperties',
                  'classProperties',
                  // Enabled by default
                  'classStaticBlock',
                  'dynamicImport',
                  // deprecated
                  'exportNamespaceFrom',
                  'functionSent',
                  'logicalAssignment',
                  'moduleStringNames',
                  'nullishCoalescingOperator',
                  'numericSeparator',
                  'objectRestSpread',
                  'optionalCatchBinding',
                  'optionalChaining',
                  // Enabled by default
                  'privateIn',
                  'topLevelAwait',

                  // Latest ECMAScript features End
                ],
              }
                   : {};
          } )( false ),
          /**
           * 在使用Vue的反应性API时，引入一组编译器转换来改善人体工程学，特别是能够使用没有.value的refs。<br />
           * 1、具体可阅https://github.com/vuejs/rfcs/discussions/369 <br />
           * 2、仅在SFC中生效。<br />
           * 3、该选项会在3.4版本中被删除！反应性转换提案已被删除。如果你打算继续使用它，请禁用它并切换到[Vue Macros implementation](https://vue-macros.sxzz.moe/features/reactivity-transform.html)。<br />
           */
          // reactivityTransform: true,

          /**
           * 实验性选项。true表示启用宏“defineModel”。
           */
          defineModel: true,
          /**
           * 实验性选项。true表示为“defineProps”启用反应式解构。
           */
          propsDestructure: true,
        },
        template: {
          /**
           * @type {TemplateCompiler | string} 设置编译器，用于编译单文件组件中的<template>块。<br />
           * 1、对于Vue 2.X使用“vue-template-compiler”，对于Vue 3.X使用“@vue/compiler-sfc”。<br />
           * 2、该选项值可以是字符串的包名，如：'@vue/compiler-sfc'、'vue-template-compiler'。<br />
           * 3、也可以是上面两个包导出的对象（该对象必需包含2个函数实现：compile、parse），详细见：node_modules/@vue/compiler-sfc/dist/compiler-sfc.d.ts:304<br />
           * 该选项详细见：<br />
           * node_modules/vue-loader/dist/index.d.ts:8
           * node_modules/@vue/compiler-sfc/dist/compiler-sfc.d.ts:304
           *
           * PS：<br />
           * 1、实际测试了一下，当该选项设置值为'@vue/compiler-sfc'时，会报错！因为没有找到“compile”函数！<br />
           * 在'@vue/compiler-sfc'源码中发现，有“parse”函数的实现（见：node_modules/@vue/compiler-sfc/dist/compiler-sfc.d.ts:95）。<br />
           * 但是没有“compile”函数的实现，貌似是被命名为“compileTemplate”（见：node_modules/@vue/compiler-sfc/dist/compiler-sfc.d.ts:61），<br />
           * 但是该“compileTemplate”函数的声明不是符合规定的“compile”函数的声明（见：node_modules/@vue/compiler-sfc/dist/compiler-sfc.d.ts:305）。<br />
           *
           * 2、顺便查看了“vue-template-compiler”源码，发现了“compile”函数的实现，见：<br />
           * node_modules/vue-template-compiler/types/index.d.ts:214
           * node_modules/vue-template-compiler/types/index.d.ts:219
           * 而“parse”函数的实现，貌似被重命名为“parseComponent”函数，见：node_modules/vue-template-compiler/types/index.d.ts:238
           *
           * 因此，该选项不用设置，貌似内部自动处理设置了。<br />
           */
          // compiler: '@vue/compiler-sfc',

          // preprocessOptions: any,

          // preprocessCustomRequire: (id: string) => any,

          compilerOptions: {
            /**
             * 值有："module"、"function"（默认值）。<br />
             * `module`模式将为帮助器生成ES模块导入语句 并将渲染函数作为默认导出。<br />
             * `function`模式将产生一个单一的“const { helpers... } = Vue”语句并返回渲染函数。它希望`Vue`是全局可用的（或者通过用IIFE包装代码来传递）。它是用来与`new Function(code)()`一起使用，在运行时生成一个渲染函数。<br />
             *
             * 当mode: 'function'时，会报“scopeId”错误，说是“scopeId”只能跟“mode: 'module'”一起使用，见：node_modules/@vue/compiler-core/dist/compiler-core.d.ts:1151
             * 当在Vue的SFC里书写“<script type = 'module'>”时，就会使用“mode: 'module'”了。<br />
             * 该选项一般不用设置，内部会自动设置。<br />
             *
             * 详细见：<br />
             * node_modules/@vue/compiler-core/dist/compiler-core.d.ts:170
             */
            // mode: 'module',
            /**
             * 将表达式（如 {{ foo }} 转换为 _ctx.foo）。如果此选项为 false，则生成的代码将被包装在一个 with (this) { ... } 块中。<br />
             * 这在mode === 'module'是强制启用的，因为模块默认是严格的，不能使用with。<br />
             * 一般不要设置这个选项，交由内部自行处理。<br />
             */
            // prefixIdentifiers: true,
            /**
             * 缓存v-on处理程序以避免在每次渲染时创建新的内联函数，也避免了通过包装动态修补处理程序的需要。<br />
             * 例如`@click="foo"`默认编译为`{onClick: foo }`。<br />
             * 有了这个选项，它就被编译成：<br />
             * { onClick: _cache[0] || (_cache[0] = e => _ctx.foo(e)) }
             * 需要启用 "prefixIdentifiers"，因为它依靠范围分析来确定处理程序是否可以安全缓存。<br />
             * 分析来确定一个处理程序是否可以安全地进行缓存。<br />
             * 一般不要设置这个选项，交由内部自行处理。<br />
             * 详细见：<br />
             * node_modules/@vue/compiler-core/dist/compiler-core.d.ts:1141
             */
            // cacheHandlers: true,
            /**
             * 通过变量赋值优化帮助程序导入绑定的选项（仅用于webpack代码拆分），默认值为：false。<br />
             * 一般不要设置这个选项，交由内部自行处理。<br />
             * 详细见：node_modules/@vue/compiler-core/dist/compiler-core.d.ts:185
             */
            // optimizeImports: isProduction,
            comments: !isProduction,
            whitespace: !isProduction
                        ? 'preserve'
                        : 'condense',
          },
          transformAssetUrls: {
            video: [
              'src',
              'poster',
            ],
            source: 'src',
            img: 'src',
            image: [
              'xlink:href',
              'href',
            ],
            use: [
              'xlink:href',
              'href',
            ],
            audio: 'src',
          },
        },
        style: {
          trim: true,
        },
        /**
         * 启用自定义元素模式。在自定义元素模式下加载的SFC将其<style>标记内联为组件样式选项下的字符串。<br />
         * 1、当与Vue核心的defineCustomElement一起使用时，样式将被注入到自定义元素的阴影根中。<br />
         * 2、默认值为：/\.ce\.vue$/。<br />
         * 3、该选项的值类型为：boolean、RegExp。<br />
         * 4、设置为true将以“自定义元素模式”处理所有.vue文件。<br />
         */
        // customElement: /\.ce\.vue$/,
        /**
         * 在使用Vue的反应性API时，引入一组编译器转换来改善人体工程学，特别是能够使用没有.value的refs。<br />
         * 1、具体可阅https://github.com/vuejs/rfcs/discussions/369 <br />
         * 2、仅在SFC中生效。<br />
         * 3、该选项会在3.4版本中被删除！反应性转换提案已被删除。如果你打算继续使用它，请禁用它并切换到[Vue Macros implementation](https://vue-macros.sxzz.moe/features/reactivity-transform.html)。<br />
         */
        // reactivityTransform: true,
        /**
         * 使用自定义compiler-sfc实例。可用于强制使用特定版本。
         */
        // compiler: typeof _compiler,
      } ),
      checker( {
        overlay: {
          initialIsOpen: true,
          position: 'bl',
          /**
           * 使用它向徽章按钮添加额外的样式字符串，字符串格式为：[Svelte style](https://svelte.dev/docs#template-syntax-element-directives-style-property)<br />
           * 例如，如果要隐藏徽章，可以将“display: none;”传递给badgeStyle属性。<br />
           */
          // badgeStyle: ``,
          /**
           * 使用它向诊断面板添加额外的样式字符串，字符串格式为：[Svelte style](https://svelte.dev/docs#template-syntax-element-directives-style-property)<br />
           * 例如，如果要更改面板的不透明度，可以将“opacity: 0.8;”传递给panelStyle属性。<br />
           */
          // panelStyle: ``,
        },
        terminal: true,
        // Enable checking in build mode.
        enableBuild: true,
        typescript: {
          root: resolve( __dirname, `./` ),
          tsconfigPath: './tsconfig.vite.json',
          // Add --build to tsc flag, note that noEmit does NOT work if buildMode is true.
          buildMode: false,
        },
        // 供Vue3使用。
        vueTsc: {
          root: resolve( __dirname, `./` ),
          tsconfigPath: './tsconfig.vite.json',
        },
        // 供Vue2使用。
        // vls: true,
      } ),
      VitePluginHTMLByCustom( VitePluginHTMLConfig( {
        appType,
        entryConfig,
        isProduction,
        /**
         * @type {object} HTML压缩配置。
         * 详细见：
         * node_modules/@types/html-minifier-terser/index.d.ts:15
         */
        HTMLMinifyConfig: {
          // 以区分大小写的方式处理属性（对自定义HTML标签有用）。
          caseSensitive: false,
          // 从布尔属性中省略属性值。
          collapseBooleanAttributes: false,
          // 不要在display:inline;之间留下任何空格。折叠时的元素。必须与collapseWhitespace=true结合使用。
          collapseInlineTagWhitespace: true,
          // 折叠有助于文档树中文本节点的空白。
          collapseWhitespace: true,
          // 总是折叠到1个空格（永远不要完全删除它）。必须collapseWhitespace=true结合使用。
          conservativeCollapse: false,
          // 处理解析错误而不是中止。
          continueOnParseError: false,
          // 尽可能使用直接Unicode字符。
          decodeEntities: false,
          // 根据HTML5规范解析输入。
          html5: true,
          // 插入HTML解析器生成的标签。
          includeAutoGeneratedTags: true,
          // 在单例元素上保留斜杠。
          keepClosingSlash: true,
          // 缩小样式元素和样式属性中的CSS（使用clean-css）。
          minifyCSS: isProduction,
          // 缩小脚本元素和事件属性中的JavaScript（使用Terser）。
          minifyJS: isProduction,
          // 缩小各种属性中的URL（使用relateurl来处理的）。
          minifyURLs: false,
          // 切勿在关闭元素的标记之前添加换行符。
          noNewlinesBeforeTagClose: false,
          // 当标签之间的空格包含换行符时，总是折叠到1个换行符（永远不要完全删除它）。必须与collapseWhitespace=true结合使用。
          preserveLineBreaks: false,
          // 防止属性值的转义。
          preventAttributesEscaping: false,
          // 通过minifier处理条件注释的内容。
          processConditionalComments: false,
          // 尽可能删除属性周围的引号。
          removeAttributeQuotes: false,
          // 去除HTML注释。
          removeComments: true,
          // 删除所有具有纯空格值的属性。
          removeEmptyAttributes: false,
          // 删除所有内容为空的元素。
          removeEmptyElements: false,
          // 删除可选标签。
          removeOptionalTags: false,
          // 当值与默认值匹配时删除属性。
          removeRedundantAttributes: false,
          // 从脚本标签中删除type="text/javascript"其他类型属性值保持不变。
          removeScriptTypeAttributes: false,
          // 从样式和链接标签中删除type="text/css"其他类型属性值保持不变。
          removeStyleLinkTypeAttributes: false,
          // 尽可能删除属性之间的空格。请注意，这将导致HTML无效！
          removeTagWhitespace: false,
          // 按频率排序属性。
          sortAttributes: false,
          // 按频率对样式类进行排序。
          sortClassName: false,
          // 修剪ignoreCustomFragments周围的空白。
          trimCustomFragments: false,
          // 用短 (HTML5) 文档类型替换文档类型。
          useShortDoctype: false,
        },
      } ) ),
      VitePluginSRIByCustom( {
        hashFuncNames: 'sha512',
        warn: false,
      } ),

      // .cson
      RollupPluginCSON( {
        compact: isProduction,
        // indent: '\t',
        namedExports: true,
        objectShorthand: true,
        preferConst: true,
        include: [
          /node_modules[\\/].*\.(cson)$/i,
          /src[\\/].*\.(cson)$/i,
          /webpack_location[\\/].*\.(cson)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(cson)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(cson)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(cson)$/i,
          /src[\\/]graphQL[\\/].*\.(cson)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(cson)$/i,
          /src[\\/]static[\\/].*\.(cson)$/i,
          /src[\\/]styles[\\/].*\.(cson)$/i,
          /src[\\/]wasm[\\/].*\.(cson)$/i,
        ],
      } ),
      // .csv、.tsv
      RollupPluginDSV( {
        include: [
          /node_modules[\\/].*\.(csv|tsv)$/i,
          /src[\\/].*\.(csv|tsv)$/i,
          /webpack_location[\\/].*\.(csv|tsv)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(csv|tsv)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(csv|tsv)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(csv|tsv)$/i,
          /src[\\/]graphQL[\\/].*\.(csv|tsv)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(csv|tsv)$/i,
          /src[\\/]static[\\/].*\.(csv|tsv)$/i,
          /src[\\/]styles[\\/].*\.(csv|tsv)$/i,
          /src[\\/]wasm[\\/].*\.(csv|tsv)$/i,
        ],
      } ),
      /**
       * .graphql、.graphqls、.gql
       * 1、如果想将对象转为字符串，可以这么干，而且这种方法还能按需导入：
       * import {
       *   print,
       * } from 'graphql';
       *
       * import {
       *   AlertQuery,
       * } from './gql/Query.graphql';
       *
       * // 会是完整的、包括各种嵌套导入的片段的字符串。
       * print( AlertQuery );
       */
      RollupPluginGraphQL( {
        include: [
          /node_modules[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/].*\.(graphql|graphqls|gql)$/i,
          /webpack_location[\\/].*\.(graphql|graphqls|gql)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]graphQL[\\/]doc[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]graphQL[\\/]test[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]static[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]styles[\\/].*\.(graphql|graphqls|gql)$/i,
          /src[\\/]wasm[\\/].*\.(graphql|graphqls|gql)$/i,
        ],
      } ),
      // .handlebars、.hbs
      RollupPluginHandlebars( {
        sourceMap: false,
        noEscape: false,
        strict: true,
        preventIndent: true,
        // 设置成true会报错！
        compat: false,
        assumeObjects: true,
        // knownHelpers: true,
        // knownHelpersOnly: false,
        // ignoreStandalone: true,
        // explicitPartialContext: false,
        include: [
          /node_modules[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/].*\.(handlebars|hbs)$/i,
          /webpack_location[\\/].*\.(handlebars|hbs)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]graphQL[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]static[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]styles[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]template[\\/]ejs[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]template[\\/]html[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]template[\\/]markdown[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]template[\\/]mustache[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]template[\\/]pug_jade[\\/].*\.(handlebars|hbs)$/i,
          /src[\\/]wasm[\\/].*\.(handlebars|hbs)$/i,
        ],
      } ),
      // .json5、.jsonc
      VitePluginJSON5( {
        include: [
          /node_modules[\\/].*\.(json5)$/i,
          /src[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(json5)$/i,
          /webpack_location[\\/].*\.(json5)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(json5)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(json5)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(json5)$/i,
          /src[\\/]graphQL[\\/].*\.(json5)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(json5)$/i,
          /src[\\/]static[\\/].*\.(json5)$/i,
          /src[\\/]styles[\\/].*\.(json5)$/i,
          /src[\\/]wasm[\\/].*\.(json5)$/i,
        ],
      } ),
      // .md
      VitePluginMarkdown( {
        mode: [
          'html',
          'markdown',
          'toc',
          'react',
          'vue',
        ],
        markdownIt: {
          html: false,
          xhtmlOut: true,
          breaks: false,
          langPrefix: 'language-',
          linkify: true,
          typographer: true,
          quotes: '“”‘’',
        },
        include: [
          /node_modules[\\/].*\.(md)$/i,
          /src[\\/].*\.(md)$/i,
          /webpack_location[\\/].*\.(md)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/].*\.(md)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(md)$/i,
          /src[\\/]graphQL[\\/].*\.(md)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(md)$/i,
          /src[\\/]static[\\/].*\.(md)$/i,
          /src[\\/]styles[\\/].*\.(md)$/i,
          /src[\\/]template[\\/]ejs[\\/].*\.(md)$/i,
          /src[\\/]template[\\/]handlebars[\\/].*\.(md)$/i,
          /src[\\/]template[\\/]html[\\/].*\.(md)$/i,
          /src[\\/]template[\\/]mustache[\\/].*\.(md)$/i,
          /src[\\/]template[\\/]pug_jade[\\/].*\.(md)$/i,
          /src[\\/]wasm[\\/].*\.(md)$/i,
        ],
      } ),
      // .mustache
      RollupPluginMustache( {
        hoganKey: `hogan.js`,
        include: [
          /node_modules[\\/].*\.(mustache)$/i,
          /src[\\/].*\.(mustache)$/i,
          /webpack_location[\\/].*\.(mustache)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/].*\.(mustache)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(mustache)$/i,
          /src[\\/]graphQL[\\/].*\.(mustache)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(mustache)$/i,
          /src[\\/]static[\\/].*\.(mustache)$/i,
          /src[\\/]styles[\\/].*\.(mustache)$/i,
          /src[\\/]template[\\/]ejs[\\/].*\.(mustache)$/i,
          /src[\\/]template[\\/]handlebars[\\/].*\.(mustache)$/i,
          /src[\\/]template[\\/]html[\\/].*\.(mustache)$/i,
          /src[\\/]template[\\/]markdown[\\/].*\.(mustache)$/i,
          /src[\\/]template[\\/]pug_jade[\\/].*\.(mustache)$/i,
          /src[\\/]wasm[\\/].*\.(mustache)$/i,
        ],
      } ),
      // .pug、.jade
      RollupPluginPUG( {
        doctype: 'html',
        pretty: !isProduction,
        compileDebug: !isProduction,
        debug: false,
        sourceMap: false,
        staticPattern: /\.(static|html)\.(pug|jade)$/i,
        extensions: [
          '.pug',
          '.jade',
        ],
        include: [
          /node_modules[\\/].*\.(pug|jade)$/i,
          /src[\\/].*\.(pug|jade)$/i,
          /webpack_location[\\/].*\.(pug|jade)$/i,
        ],
        exclude: [
          /\.(static|html)\.(pug|jade)$/i,
          /src[\\/]assets[\\/].*\.(pug|jade)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(pug|jade)$/i,
          /src[\\/]graphQL[\\/].*\.(pug|jade)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(pug|jade)$/i,
          /src[\\/]static[\\/].*\.(pug|jade)$/i,
          /src[\\/]styles[\\/].*\.(pug|jade)$/i,
          /src[\\/]template[\\/]ejs[\\/].*\.(pug|jade)$/i,
          /src[\\/]template[\\/]handlebars[\\/].*\.(pug|jade)$/i,
          /src[\\/]template[\\/]html[\\/].*\.(pug|jade)$/i,
          /src[\\/]template[\\/]markdown[\\/].*\.(pug|jade)$/i,
          /src[\\/]template[\\/]mustache[\\/].*\.(pug|jade)$/i,
          /src[\\/]wasm[\\/].*\.(pug|jade)$/i,
        ],
      } ),
      // .toml
      VitePluginTOML( {
        namedExports: true,
        include: [
          /node_modules[\\/].*\.(toml)$/i,
          /src[\\/].*\.(toml)$/i,
          /webpack_location[\\/].*\.(toml)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(toml)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(toml)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(toml)$/i,
          /src[\\/]graphQL[\\/].*\.(toml)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(toml)$/i,
          /src[\\/]static[\\/].*\.(toml)$/i,
          /src[\\/]styles[\\/].*\.(toml)$/i,
          /src[\\/]wasm[\\/].*\.(toml)$/i,
        ],
      } ),
      // .xml
      VitePluginXML.default( {
        include: [
          /node_modules[\\/].*\.(xml)$/i,
          /src[\\/].*\.(xml)$/i,
          /webpack_location[\\/].*\.(xml)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(xml)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(xml)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(xml)$/i,
          /src[\\/]graphQL[\\/].*\.(xml)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(xml)$/i,
          /src[\\/]static[\\/].*\.(xml)$/i,
          /src[\\/]styles[\\/].*\.(xml)$/i,
          /src[\\/]wasm[\\/].*\.(xml)$/i,
        ],
      } ),
      // .yaml、.yml
      RollupPluginYAML( {
        documentMode: 'single',
        safe: true,
        extensions: [
          '.yaml',
          '.yml',
        ],
        include: [
          /node_modules[\\/].*\.(yaml|yml)$/i,
          /src[\\/].*\.(yaml|yml)$/i,
          /webpack_location[\\/].*\.(yaml|yml)$/i,
        ],
        exclude: [
          /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]fonts[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]img[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]music[\\/].*\.(yaml|yml)$/i,
          /src[\\/]assets[\\/]videos[\\/].*\.(yaml|yml)$/i,
          /src[\\/]custom_declare_types[\\/].*\.(yaml|yml)$/i,
          /src[\\/]graphQL[\\/].*\.(yaml|yml)$/i,
          /src[\\/]pwa_manifest[\\/].*\.(yaml|yml)$/i,
          /src[\\/]static[\\/].*\.(yaml|yml)$/i,
          /src[\\/]styles[\\/].*\.(yaml|yml)$/i,
          /src[\\/]wasm[\\/].*\.(yaml|yml)$/i,
        ],
      } ),

      /**
       * 拷贝插件。<br />
       * 1、当前被设置为只监听文件夹“src/static”下的文件变动，有需要可以修改该设置。<br />
       *
       * 详细见：<br />
       * node_modules/vite-plugin-static-copy/dist/index.d.ts:56
       * node_modules/chokidar/types/index.d.ts:68
       */
      viteStaticCopy( ( targets => ( {
        targets: targets.map( item => ( {
          preserveTimestamps: false,
          dereference: true,
          ...item,
        } ) ),
        flatten: true,
        silent: false,
        watch: {
          options: {
            persistent: true,
            ignored: [
              '**/.gitignore',
              '**/*.gitignore',
              '**/该文件夹说明.txt',
            ],
            cwd: resolve( __dirname, './src/static' ),
            depth: 1000,
            ignorePermissionErrors: false,
          },
          reloadPageOnChange: !isProduction,
        },
      } ) )( [
        // 该设置会将项目根目录下的文件“favicon.ico”复制到Vite的顶级选项build.outDir设置的文件夹下。
        {
          // 该选项值是相对于项目根目录的。
          src: `./favicon.ico`,
          // 该值是相对于Vite的顶级选项build.outDir设置的值。
          dest: `./`,
        },

        // 该设置会将文件夹“src/static”整个原样复制到Vite的顶级选项build.outDir设置的文件夹下。
        {
          // 该选项值是相对于项目根目录的。
          src: `./src/static`,
          // 该值是相对于Vite的顶级选项build.outDir设置的值。
          dest: `./`,
        },
      ] ) ),

      /**
       * 这个插件通过获取ViteJS的输出资产，在生产模式下的构建时添加预加载（“preload”）链接。<br />
       * 1、目前，由于Vite的行为方式，这个插件只在生产模式下的构建时工作。<br />
       * 2、利用该插件的“注入”功能，我们其实还可以注入诸多“link”标签：<br />
       * <link rel = 'dns-prefetch' />
       * <link rel = 'preconnect' />
       * <link rel = 'preload' />
       * <link rel = 'prefetch' />
       * <link rel = 'prerender' />
       * <link rel = 'modulepreload' />
       * 等等“link”标签。<br />
       * 详细见：<br />
       * src/template/ejs/head_meta/Meta_PreOperation_001.ejs
       * 3、如果手动设置了“href”属性的值，那么手动设置的值会覆盖掉该插件自动设置的值。<br />
       * 4、当前做了一个可以自动为想要预加载（“preload”）的资源做预加载处理的方法，即：<br />
       * 只要打包前的文件名中带有“.preload”这样的文件名组合就能被识别到，当然，最后打包出来的文件名中也必须带有“.preload”这样的文件名组合才能被识别处理。<br />
       */
      VitePluginInjectPreload( ( config => {
        return {
          files: config,
          // 'head' | 'head-prepend' | 'custom'
          injectTo: 'head-prepend',
        };
      } )( [
        {
          match: /.*\.(preload)\.(.*)$/i,
          attributes: {
            // rel: 'preload',
            // href: 'http://localhost:8090/web-for-vite-project-template/dist/test/HelloWorld.html',
            // as: 'font',
            // type: 'font/otf',
            crossorigin: 'anonymous',

            // 'data-font-format': 'opentype',

            // 还可以有其他自定义的属性（如：data-font-format）或者其他标准属性。
          },
        },
        {
          match: /.*\.(preload)(-|_)(.*)\.(.*)$/i,
          attributes: {
            // rel: 'preload',
            // href: 'http://localhost:8090/web-for-vite-project-template/dist/test/HelloWorld.html',
            // as: 'font',
            // type: 'font/otf',
            crossorigin: 'anonymous',

            // 'data-font-format': 'opentype',

            // 还可以有其他自定义的属性（如：data-font-format）或者其他标准属性。
          },
        },
      ] ) ),
    ],
    /**
     * @type {string|boolean} 默认值：“public”。作为“静态资源服务”的文件夹。<br />
     * 该目录中的文件在“开发期间”在“/”处提供，并在“构建期间”复制到选项build.outDir设置的文件夹下，并且始终按原样提供或复制而无需进行转换。<br />
     * 该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。<br />
     * 将publicDir设定为false可以关闭此项功能，使用类似copy插件的工具来复制静态资源文件夹。<br />
     */
    publicDir: false,
    resolve: {
      /**
       * @type {Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>} 设置路径别名。<br />
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
      alias: {
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
       * @type {string[]} 导入时想要省略的扩展名列表。注意，不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响IDE和类型支持。<br />
       * 默认值：['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']。<br />
       */
      extensions: [
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
      /**
       * @type {boolean} 默认值为：false，启用此设置后，vite将通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。
       */
      preserveSymlinks: false,
    },
    /**
     * @type {string} 项目根目录。可以是一个绝对路径，也可以是相对于当前工作目录的路径。默认值：process.cwd()。<br />
     */
    root: resolve( __dirname, `./` ),
    /**
     * @type {object} 与“Web Workers”有关的选项。<br />
     * 详细见：<br />
     * https://vitejs.dev/config/worker-options.html#worker-options
     */
    worker: {
      /**
       * @type {'es' | 'iife'} “Web Workers”捆绑的输出格式。默认值为：'iife'，由于火狐浏览器的原因，该选项强烈建议使用'iife'，保持默认值也可以。
       */
      // format: 'iife',
      /**
       * @type {(Plugin | Plugin[])[]} 适用于worker bundle的Vite插件。请注意，Vite的顶级配置plugins选项只适用于dev中的worker，对于build，应该在这里进行配置。<br />
       * 1、一般来说，如果插件支持Web Worker中使用时，会在它的说明文档中提到！没有特别说明的，也可以试试！<br />
       * 2、不要跟全局的插件配置共享同一个插件的实例、配置等等！要单独在这里添加插件。<br />
       */
      plugins: [
        /**
         * 将WebAssembly ESM集成（又名Webpack的asyncWebAssembly）添加到Vite中，并支持wasm-pack生成的模块。<br />
         * 详细见：<br />
         * https://github.com/Menci/vite-plugin-wasm
         * 1、在针对Firefox时，请将worker.format的值设置为iife。<br />
         */
        VitePluginWASM(),
        /**
         * 转化代码以支持Vite的普通浏览器的顶层等待。支持Vite默认目标的所有现代浏览器，无需将build.target设置为esnext。<br />
         * 详细见：<br />
         * https://github.com/Menci/vite-plugin-top-level-await
         * 1、如果worker.format的值是es，该插件也可以正常工作的。<br />
         * 2、如果worker.format的值是iife，该插件首先让Vite将您的工作者构建为ES捆绑包，因为IIFE不支持顶层等待，然后将转换后的ES捆绑包构建为IIFE。<br />
         * 3、在针对Firefox时，请将worker.format的值设置为iife。<br />
         */
        VitePluginTopLevelAwait(),

        // .cson
        RollupPluginCSON( {
          compact: isProduction,
          // indent: '\t',
          namedExports: true,
          objectShorthand: true,
          preferConst: true,
          include: [
            /node_modules[\\/].*\.(cson)$/i,
            /src[\\/].*\.(cson)$/i,
            /webpack_location[\\/].*\.(cson)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(cson)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(cson)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(cson)$/i,
            /src[\\/]graphQL[\\/].*\.(cson)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(cson)$/i,
            /src[\\/]static[\\/].*\.(cson)$/i,
            /src[\\/]styles[\\/].*\.(cson)$/i,
            /src[\\/]wasm[\\/].*\.(cson)$/i,
          ],
        } ),
        // .csv、.tsv
        RollupPluginDSV( {
          include: [
            /node_modules[\\/].*\.(csv|tsv)$/i,
            /src[\\/].*\.(csv|tsv)$/i,
            /webpack_location[\\/].*\.(csv|tsv)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(csv|tsv)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(csv|tsv)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(csv|tsv)$/i,
            /src[\\/]graphQL[\\/].*\.(csv|tsv)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(csv|tsv)$/i,
            /src[\\/]static[\\/].*\.(csv|tsv)$/i,
            /src[\\/]styles[\\/].*\.(csv|tsv)$/i,
            /src[\\/]wasm[\\/].*\.(csv|tsv)$/i,
          ],
        } ),
        // .graphql、.graphqls、.gql
        RollupPluginGraphQL( {
          include: [
            /node_modules[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/].*\.(graphql|graphqls|gql)$/i,
            /webpack_location[\\/].*\.(graphql|graphqls|gql)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]graphQL[\\/]doc[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]graphQL[\\/]test[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]static[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]styles[\\/].*\.(graphql|graphqls|gql)$/i,
            /src[\\/]wasm[\\/].*\.(graphql|graphqls|gql)$/i,
          ],
        } ),
        // .handlebars、.hbs
        RollupPluginHandlebars( {
          sourceMap: false,
          noEscape: false,
          strict: true,
          preventIndent: true,
          // 设置成true会报错！
          compat: false,
          assumeObjects: true,
          // knownHelpers: true,
          // knownHelpersOnly: false,
          // ignoreStandalone: true,
          // explicitPartialContext: false,
          include: [
            /node_modules[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/].*\.(handlebars|hbs)$/i,
            /webpack_location[\\/].*\.(handlebars|hbs)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]graphQL[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]static[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]styles[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]template[\\/]ejs[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]template[\\/]html[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]template[\\/]markdown[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]template[\\/]mustache[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]template[\\/]pug_jade[\\/].*\.(handlebars|hbs)$/i,
            /src[\\/]wasm[\\/].*\.(handlebars|hbs)$/i,
          ],
        } ),
        // .json5、.jsonc
        VitePluginJSON5( {
          include: [
            /node_modules[\\/].*\.(json5)$/i,
            /src[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(json5)$/i,
            /webpack_location[\\/].*\.(json5)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(json5)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(json5)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(json5)$/i,
            /src[\\/]graphQL[\\/].*\.(json5)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(json5)$/i,
            /src[\\/]static[\\/].*\.(json5)$/i,
            /src[\\/]styles[\\/].*\.(json5)$/i,
            /src[\\/]wasm[\\/].*\.(json5)$/i,
          ],
        } ),
        // .md
        VitePluginMarkdown( {
          mode: [
            'html',
            'markdown',
            'toc',
            'react',
            'vue',
          ],
          markdownIt: {
            html: false,
            xhtmlOut: true,
            breaks: false,
            langPrefix: 'language-',
            linkify: true,
            typographer: true,
            quotes: '“”‘’',
          },
          include: [
            /node_modules[\\/].*\.(md)$/i,
            /src[\\/].*\.(md)$/i,
            /webpack_location[\\/].*\.(md)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/].*\.(md)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(md)$/i,
            /src[\\/]graphQL[\\/].*\.(md)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(md)$/i,
            /src[\\/]static[\\/].*\.(md)$/i,
            /src[\\/]styles[\\/].*\.(md)$/i,
            /src[\\/]template[\\/]ejs[\\/].*\.(md)$/i,
            /src[\\/]template[\\/]handlebars[\\/].*\.(md)$/i,
            /src[\\/]template[\\/]html[\\/].*\.(md)$/i,
            /src[\\/]template[\\/]mustache[\\/].*\.(md)$/i,
            /src[\\/]template[\\/]pug_jade[\\/].*\.(md)$/i,
            /src[\\/]wasm[\\/].*\.(md)$/i,
          ],
        } ),
        // .mustache
        RollupPluginMustache( {
          hoganKey: `hogan.js`,
          include: [
            /node_modules[\\/].*\.(mustache)$/i,
            /src[\\/].*\.(mustache)$/i,
            /webpack_location[\\/].*\.(mustache)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/].*\.(mustache)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(mustache)$/i,
            /src[\\/]graphQL[\\/].*\.(mustache)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(mustache)$/i,
            /src[\\/]static[\\/].*\.(mustache)$/i,
            /src[\\/]styles[\\/].*\.(mustache)$/i,
            /src[\\/]template[\\/]ejs[\\/].*\.(mustache)$/i,
            /src[\\/]template[\\/]handlebars[\\/].*\.(mustache)$/i,
            /src[\\/]template[\\/]html[\\/].*\.(mustache)$/i,
            /src[\\/]template[\\/]markdown[\\/].*\.(mustache)$/i,
            /src[\\/]template[\\/]pug_jade[\\/].*\.(mustache)$/i,
            /src[\\/]wasm[\\/].*\.(mustache)$/i,
          ],
        } ),
        // .pug、.jade
        RollupPluginPUG( {
          doctype: 'html',
          pretty: !isProduction,
          compileDebug: !isProduction,
          debug: false,
          sourceMap: false,
          staticPattern: /\.(static|html)\.(pug|jade)$/i,
          extensions: [
            '.pug',
            '.jade',
          ],
          include: [
            /node_modules[\\/].*\.(pug|jade)$/i,
            /src[\\/].*\.(pug|jade)$/i,
            /webpack_location[\\/].*\.(pug|jade)$/i,
          ],
          exclude: [
            /\.(static|html)\.(pug|jade)$/i,
            /src[\\/]assets[\\/].*\.(pug|jade)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(pug|jade)$/i,
            /src[\\/]graphQL[\\/].*\.(pug|jade)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(pug|jade)$/i,
            /src[\\/]static[\\/].*\.(pug|jade)$/i,
            /src[\\/]styles[\\/].*\.(pug|jade)$/i,
            /src[\\/]template[\\/]ejs[\\/].*\.(pug|jade)$/i,
            /src[\\/]template[\\/]handlebars[\\/].*\.(pug|jade)$/i,
            /src[\\/]template[\\/]html[\\/].*\.(pug|jade)$/i,
            /src[\\/]template[\\/]markdown[\\/].*\.(pug|jade)$/i,
            /src[\\/]template[\\/]mustache[\\/].*\.(pug|jade)$/i,
            /src[\\/]wasm[\\/].*\.(pug|jade)$/i,
          ],
        } ),
        // .toml
        VitePluginTOML( {
          namedExports: true,
          include: [
            /node_modules[\\/].*\.(toml)$/i,
            /src[\\/].*\.(toml)$/i,
            /webpack_location[\\/].*\.(toml)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(toml)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(toml)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(toml)$/i,
            /src[\\/]graphQL[\\/].*\.(toml)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(toml)$/i,
            /src[\\/]static[\\/].*\.(toml)$/i,
            /src[\\/]styles[\\/].*\.(toml)$/i,
            /src[\\/]wasm[\\/].*\.(toml)$/i,
          ],
        } ),
        // .xml
        VitePluginXML.default( {
          include: [
            /node_modules[\\/].*\.(xml)$/i,
            /src[\\/].*\.(xml)$/i,
            /webpack_location[\\/].*\.(xml)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]doc[\\/]yaml[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(xml)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(xml)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(xml)$/i,
            /src[\\/]graphQL[\\/].*\.(xml)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(xml)$/i,
            /src[\\/]static[\\/].*\.(xml)$/i,
            /src[\\/]styles[\\/].*\.(xml)$/i,
            /src[\\/]wasm[\\/].*\.(xml)$/i,
          ],
        } ),
        // .yaml、.yml
        RollupPluginYAML( {
          documentMode: 'single',
          safe: true,
          extensions: [
            '.yaml',
            '.yml',
          ],
          include: [
            /node_modules[\\/].*\.(yaml|yml)$/i,
            /src[\\/].*\.(yaml|yml)$/i,
            /webpack_location[\\/].*\.(yaml|yml)$/i,
          ],
          exclude: [
            /src[\\/]assets[\\/]doc[\\/]cson[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]csv[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]json5[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]toml[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]tsv[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]doc[\\/]xml[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]fonts[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]img[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]music[\\/].*\.(yaml|yml)$/i,
            /src[\\/]assets[\\/]videos[\\/].*\.(yaml|yml)$/i,
            /src[\\/]custom_declare_types[\\/].*\.(yaml|yml)$/i,
            /src[\\/]graphQL[\\/].*\.(yaml|yml)$/i,
            /src[\\/]pwa_manifest[\\/].*\.(yaml|yml)$/i,
            /src[\\/]static[\\/].*\.(yaml|yml)$/i,
            /src[\\/]styles[\\/].*\.(yaml|yml)$/i,
            /src[\\/]wasm[\\/].*\.(yaml|yml)$/i,
          ],
        } ),
      ],
      /**
       * @type {RollupOptions} Rollup选项，建立worker bundle。注意，这个rollupOptions选项，是用来捆绑、压缩、编译“worker”中的代码。<br />
       * 1、直接定制底层的Rollup包。这与可以从Rollup配置文件中导出的选项相同，将与Vite的内部Rollup选项合并。<br />
       *
       * 详细见：<br />
       * https://rollupjs.org/configuration-options/
       */
      rollupOptions: ( rollupOptions => {
        const config = Object.assign( {}, rollupOptions ),
          output = Object.assign( {}, config.output );

        delete config.external;
        delete config.input;

        delete output.globals;

        output.format = 'iife';

        config.output = output;

        return config;
      } )( rollupOptions ),
    },
  };

  /**
   * 开发配置，“vite preview”也会用该配置。
   */
  if( command === 'serve' ){
    return {
      ...viteConfig,
      /**
       * @type {ServerOptions} 开发服务器选项。<br />
       * 详细见：<br />
       * https://vitejs.dev/config/server-options.html
       * node_modules/vite/dist/node/index.d.ts:2079
       * node_modules/vite/dist/node/index.d.ts:318
       */
      server: {
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
         * @type {boolean | string} 开发服务器启动时，自动在浏览器中打开设置好的页面。<br />
         * 当该值为字符串时，它将被用作URL的路径名。<br />
         * 如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量process.env.BROWSER（例如：Windows上的msedge）。<br />
         * 你还可以设置process.env.BROWSER_ARGS来传递额外的参数，例如：--incognito（以隐私模式打开浏览器），--new-window（在新窗口中打开浏览器）。<br />
         * BROWSER和BROWSER_ARGS都是特殊的环境变量，你可以将它们放在.env文件中进行设置，欲了解更多打开浏览器的更多内部细节，请参阅open包的源码（https://github.com/sindresorhus/open#app）。<br />
         */
        open: `https://${ devServerGlobalParameters[ env_platform ]?.host }:${ devServerGlobalParameters[ env_platform ]?.port }/${ env_platform }/${ devServerGlobalParameters[ env_platform ]?.openPage }`,
        /**
         * @type {Record<string, string | ProxyOptions>} 为开发服务器配置自定义代理规则。<br />
         * 期望接收一个{ key: ProxyOptions }对象。<br />
         * 任何请求路径以key值开头的请求将被代理到对应的目标。<br />
         * 如果key值以“^”开头，将被识别为RegExp。ProxyOptions.configure选项可用于访问proxy实例。<br />
         * 详细见：<br />
         * node_modules/vite/dist/node/index.d.ts:365
         * node_modules/vite/dist/node/index.d.ts:1657
         * node_modules/vite/dist/node/index.d.ts:1063
         * node_modules/vite/dist/node/index.d.ts:922
         */
        proxy: await ProxyConfig( {
          env_platform,
        } ),
        /**
         * @type {boolean | CorsOptions} 为开发服务器配置CORS。这在默认情况下是启用的，允许任何来源。传递一个选项对象来微调行为，或传递false来禁用。<br />
         * 详细见：<br />
         * https://github.com/expressjs/cors#configuration-options
         */
        cors: {
          /**
           * @type {boolean | string | regExp | ((string | regExp)[]) | function} 配置Access-Control-Allow-Origin CORS头。
           */
          origin: ( origin => origin.split( ',' )
          .map( item => item.trim() ) )( httpHeaders[ 'Access-Control-Allow-Origin' ] ),
          /**
           * @type {string | string[]} 配置Access-Control-Allow-Methods CORS头。希望是一个以逗号分隔的字符串（例如：'GET,PUT,POST'）或一个数组（例如：['GET', 'PUT', 'POST']）。
           */
          methods: ( methods => methods.split( ',' )
          .map( item => item.trim() ) )( httpHeaders[ 'Access-Control-Allow-Methods' ] ),
          /**
           * @type {string | string[]} 配置Access-Control-Allow-Headers CORS头。希望是一个以逗号分隔的字符串（例如：'Content-Type,Authorization'）或一个数组（例如：['Content-Type', 'Authorization']）。如果没有指定，默认为反映请求的Access-Control-Request-Headers头中指定的头。
           */
          allowedHeaders: ( allowedHeaders => allowedHeaders.split( ',' )
          .map( item => item.trim() ) )( httpHeaders[ 'Access-Control-Allow-Headers' ] ),
          /**
           * @type {string | string[]} 配置Access-Control-Expose-Headers CORS标头。期待一个以逗号分隔的字符串（例如：'Content-Range,X-Content-Range'）或一个数组（例如：['Content-Range', 'X-Content-Range']）。如果不指定，就不会有自定义的头文件被暴露。
           */
          exposedHeaders: ( exposedHeaders => exposedHeaders.split( ',' )
          .map( item => item.trim() ) )( httpHeaders[ 'Access-Control-Expose-Headers' ] ),
          /**
           * @type {boolean} 配置Access-Control-Allow-Credentials CORS头。设置为true以传递该头信息，否则就省略。
           */
          credentials: httpHeaders[ 'Access-Control-Allow-Credentials' ],
          /**
           * @type {number} 配置Access-Control-Max-Age CORS头。设置为整数以通过该头，否则省略。
           */
          maxAge: httpHeaders[ 'Access-Control-Max-Age' ],
          /**
           * @type {boolean} 将CORS预检响应传递给下一个处理程序。默认值为：false。
           */
          preflightContinue: false,
          /**
           * @type {number} 提供一个用于成功的OPTIONS请求的状态代码，因为一些传统的浏览器（IE11，各种智能电视）在204上被扼杀。
           */
          optionsSuccessStatus: 200,
        },
        /**
         * @type {OutgoingHttpHeaders} 指定服务器响应头。<br />
         * 1、关于跨域请求头。<br />
         *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即withCredentials:true）。<br />
         *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
         *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
         *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
         *     如果使用Fetch API，请确保Request.credentials是"omit"。<br />
         */
        headers: httpHeaders,
        /**
         * @type {boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }} 禁用或配置HMR连接（在HMR websocket必须使用与http服务器不同的地址的情况下）。<br />
         * 1、设置server.hmr.overlay为false，以禁用服务器错误覆盖。<br />
         */
        hmr: {
          overlay: false,
        },
        /**
         * @type {object} 文件系统观察者的选项要传递给chokidar。设置后，浏览器打开页面一直处于加载状态！看来不用设置该选项了。<br />
         * 详细见：<br />
         * https://github.com/paulmillr/chokidar#api
         */
        //  watch: {
        //    persistent: true,
        //    ignored: [
        //      '**/该文件夹说明.txt',
        //      '**/.gitignore',
        //      '**/graphQL/doc/**',
        //      '**/graphQL/test/**',
        //      '**/type_doc/**',
        //      '**/unit_test/**',
        //      '**/wasm/source_codes/**',
        //    ],
        //    cwd: resolve( __dirname, `./src` ),
        //    depth: 100,
        //    ignorePermissionErrors: false,
        //  },
        /**
         * @type {boolean} 默认值为：false，在中间件模式下创建Vite服务器。
         */
        // middlewareMode: false,
        /**
         * @type {string | undefined} 在http请求中预留此文件夹，用于代理vite作为子文件夹时使用。应该以/字符开头。
         */
        // base: '',
        /**
         * @type {object}
         */
        fs: {
          /**
           * @type {boolean} 默认值：true。从Vite 2.7开始默认启用。
           */
          strict: true,
          /**
           * @type {string[]} 限制可以通过/@fs/提供的文件。当server.fs.strict设置为 "true "时，访问这个目录列表之外的、不是从允许的文件中导入的文件将导致403的出现。<br />
           * 1、Vite将搜索潜在工作区的根，并将其作为默认使用。一个有效的工作区满足以下条件，否则将退回到项目根。<br />
           * 2、接受一个路径来指定自定义工作区根。可以是一个绝对路径或相对于项目根的路径。<br />
           * 3、当server.fs.allow被指定时，自动工作区根检测将被禁用。为了扩展原来的行为，暴露了一个搜索工作区根的工具：<br />
           * fs: {
           *       allow: [
           *         // search up for workspace root
           *         searchForWorkspaceRoot(process.cwd()),
           *
           *         // your custom rules
           *         '/path/to/custom/allow',
           *       ],
           *     }
           */
          allow: [
            resolve( __dirname, `./` ),
          ],
          /**
           * @type {string[]} 默认值：['.env', '.env.*', '*.{crt,pem}']。敏感文件被限制由Vite开发服务器提供的封锁名单。这比server.fs.allow有更高的优先级。支持picomatch模式。
           */
          deny: [],
        },
        /**
         * @type {string} 定义开发期间生成的资产URL的来源。
         */
        // origin: `https://${ devServerGlobalParameters[ env_platform ]?.host }:${ devServerGlobalParameters[ env_platform ]?.port }`,
        /**
         * @type {false | (sourcePath: string, sourcemapPath: string) => boolean} 是否忽略服务器源地图中的源文件，用于填充x_google_ignoreList源地图扩展。默认值：(sourcePath) => sourcePath.includes('node_modules')。<br />
         * 1、server.sourcemapIgnoreList等同于dev服务器的build.rollupOptions.output.sourcemapIgnoreList。<br />
         * 这两个配置选项之间的区别是，rollup函数是用相对路径调用sourcePath的，而server.sourcemapIgnoreList是用绝对路径调用。<br />
         * 在开发过程中，大多数模块的地图和源文件在同一个文件夹中，所以sourcePath的相对路径就是文件名本身。<br />
         * 在这些情况下，绝对路径使得它可以被替代使用。<br />
         * 2、默认情况下，它排除了所有包含node_modules的路径。<br />
         * 你可以传入false来禁用这种行为，或者，为了完全控制，传入一个函数，接收源路径和sourcemap路径并返回是否忽略源路径。<br />
         * 3、server.sourcemapIgnoreList和build.rollupOptions.output.sourcemapIgnoreList需要独立设置。server.sourcemapIgnoreList是一个只有服务器的配置，不会从定义的rollup选项中获得其默认值。<br />
         */
        // sourcemapIgnoreList: ( sourcePath, sourcemapPath ) => sourcePath.includes( 'node_modules' ),
      },
    };
  }
  /**
   * 生产配置。
   */
  else if( command === 'build' ){
    return viteConfig;
  }
  else{
    throw new Error( `\n\n\n当前本Vite配置（vite.config.mjs）的“command”支持的命令有：“serve”、“build”，还不支持本次输入的：“${ command }”，可能需要更新本Vite配置（vite.config.mjs）以便支持该命令。\n\n\n` );
  }
} );
