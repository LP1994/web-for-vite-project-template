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

import DefineConfig from './configures/DefineConfig.esm.mjs';

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
 * @type {import('vite').UserConfig} Vite配置。<br />
 * 详细选项见：node_modules/vite/dist/node/index.d.ts:2407
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
     * @type {string}
     */
    appType = 'spa',
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
      /**
       * @type {string} 指定输出路径。<br />
       */
      outDir: resolve( __dirname, `./dist/${ env_platform }/` ),
    },
    /**
     * @type {object}
     */
    css = {
      /**
       * @type {CSSModulesOptions|boolean} 配置CSS modules的行为。选项将被传递给postcss-modules。<br />
       * 详细见：<br />
       * node_modules/vite/dist/node/index.d.ts:514
       * https://github.com/css-modules/postcss-modules
       */
      modules: false,
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
    // ToDo
    /**
     * @type {object} 详细配置见：<br />
     * https://cn.vitejs.dev/config/shared-options.html#esbuild
     * node_modules/vite/dist/node/index.d.ts:2470
     * node_modules/vite/dist/node/index.d.ts:687
     * node_modules/esbuild/lib/main.d.ts:235
     * node_modules/esbuild/lib/main.d.ts:8
     */
    esbuild = {
      /**
       * 不遵守此选项。请改用build.minify。<br />
       * 注意esbuild.minify选项无法用于覆盖build.minify。<br />
       */
      // minify: isProduction,
      // jsx: 'automatic',
      jsxInject: `import React from 'react';`,
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
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
      vue( /*{}*/ ),
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
    root = resolve( __dirname, `./` );

  /**
   * 开发配置，“vite preview”也会用该配置。
   */
  if( command === 'serve' ){
    return {
      appType,
      base,
      build,
      clearScreen: false,
      css,
      define,
      envDir,
      envPrefix,
      esbuild,
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
  /**
   * 生产配置。
   */
  else if( command === 'build' ){
    return {
      appType,
      base,
      build,
      clearScreen: false,
      css,
      define,
      envDir,
      envPrefix,
      esbuild,
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