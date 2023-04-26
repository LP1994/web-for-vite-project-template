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

import checker from 'vite-plugin-checker';

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
 * @type {import('vite').UserConfig} Vite配置。
 * 详细选项见：node_modules/vite/dist/node/index.d.ts:2407
 */
export default defineConfig( ( {
  command,
  mode,
  ssrBuild,
} ) => {
  /**
   * @type {boolean} isProduction的值为true时表示生产环境，反之开发环境，该值依赖CLI参数中的“--mode”参数值。<br />
   * 1、有效的“--mode”参数设置是：--mode development（用于开发）、--mode production（用于生产）。<br />
   */
  const isProduction = mode === 'production';

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
     * @type {object} 详细配置见：
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
     * @type {[]} 插件配置。
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
        enableBuild: true,
        typescript: {
          root: resolve( __dirname, `./` ),
          tsconfigPath: './tsconfig.json',
          buildMode: false,
        },
        // 供Vue3使用。
        vueTsc: {
          root: resolve( __dirname, `./` ),
          tsconfigPath: './tsconfig.json',
        },
        // 供Vue2使用。
        // vls: true,
      } ),
      /**
       * 该插件的详细配置选项见：
       * node_modules/@vitejs/plugin-vue/dist/index.d.ts:20
       * https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
       */
      vue( /*{}*/ ),
    ],
    /**
     * @type {string} 表示项目根目录，一个绝对路径。<br />
     */
    root = resolve( __dirname, `./` );

  /**
   * 开发配置，“vite preview”也会用该配置。
   */
  if( command === 'serve' ){
    return {
      esbuild,
      plugins: [
        ...plugins,
      ],
      resolve: {
        alias,
      },
      root,
    };
  }
  /**
   * 生产配置。
   */
  else if( command === 'build' ){
    return {
      esbuild,
      plugins: [
        ...plugins,
      ],
      resolve: {
        alias,
      },
      root,
    };
  }
  else{
    throw new Error( `\n\n\n当前本Vite配置（vite.config.mjs）的“command”支持的命令有：“serve”、“build”，还不支持本次输入的：“${ command }”，可能需要更新本Vite配置（vite.config.mjs）以便支持该命令。\n\n\n` );
  }
} );
