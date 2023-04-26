/**
 * Project: web-for-vite-project-template
 * FileDirPath: vite.webstorm.js
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 该文件是用来让“WebStorm”这个开发工具识别“Vite”配置中“resolve”这个字段里头的各个别名变量，当然其他配置字段也系可以被识别的。
 * 1、这么做才能让代码中的别名路径被“WebStorm”这个开发工具识别到，才可以通过点击这个别名路径导航到目标文件。
 * 2、目前“WebStorm”这个开发工具只能识别以.js为结尾的编写的“Vite”配置，其他的后缀名、模块写法还不能识别。
 */

'use strict';

const path = require( 'path' );

export default {
  resolve: {
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
    alias: {
      'element-ui-css$': 'element-ui/lib/theme-chalk/index.css',
      'element-plus-css$': 'element-plus/dist/index.css',
      'swiper-css$': 'swiper/swiper-bundle.min.css',

      // assets文件夹 Start
      'assetsDir': path.resolve( __dirname, './src/assets/' ),

      'docDir': path.resolve( __dirname, './src/assets/doc/' ),

      'csonDir': path.resolve( __dirname, './src/assets/doc/cson/' ),
      'csvDir': path.resolve( __dirname, './src/assets/doc/csv/' ),
      'jsonDir': path.resolve( __dirname, './src/assets/doc/json/' ),
      'json5Dir': path.resolve( __dirname, './src/assets/doc/json5/' ),
      'tomlDir': path.resolve( __dirname, './src/assets/doc/toml/' ),
      'tsvDir': path.resolve( __dirname, './src/assets/doc/tsv/' ),
      'txtDir': path.resolve( __dirname, './src/assets/doc/txt/' ),
      'xmlDir': path.resolve( __dirname, './src/assets/doc/xml/' ),
      'yamlDir': path.resolve( __dirname, './src/assets/doc/yaml/' ),

      'fontsDir': path.resolve( __dirname, './src/assets/fonts/' ),
      'imgDir': path.resolve( __dirname, './src/assets/img/' ),
      'musicDir': path.resolve( __dirname, './src/assets/music/' ),
      'videosDir': path.resolve( __dirname, './src/assets/videos/' ),
      // assets文件夹 End

      'gQLAPIDir': path.resolve( __dirname, './src/graphQL/api/' ),

      'nativeComponentsDir': path.resolve( __dirname, './src/native_components/' ),

      'pagesDir': path.resolve( __dirname, './src/pages/' ),

      'pwaManifestDir': path.resolve( __dirname, './src/pwa_manifest/' ),

      // styles文件夹 Start
      'stylesDir': path.resolve( __dirname, './src/styles/' ),

      'cssDir': path.resolve( __dirname, './src/styles/css/' ),
      'lessDir': path.resolve( __dirname, './src/styles/less/' ),
      'postcssDir': path.resolve( __dirname, './src/styles/postcss/' ),
      'sassDir': path.resolve( __dirname, './src/styles/sass/' ),
      'scssDir': path.resolve( __dirname, './src/styles/scss/' ),
      'stylusDir': path.resolve( __dirname, './src/styles/stylus/' ),
      // styles文件夹 End

      // template文件夹 Start
      'templateDir': path.resolve( __dirname, './src/template/' ),

      'ejsDir': path.resolve( __dirname, './src/template/ejs/' ),
      'handlebarsDir': path.resolve( __dirname, './src/template/handlebars/' ),
      'htmlDir': path.resolve( __dirname, './src/template/html/' ),
      'markdownDir': path.resolve( __dirname, './src/template/markdown/' ),
      'mustacheDir': path.resolve( __dirname, './src/template/mustache/' ),
      'pug_jadeDir': path.resolve( __dirname, './src/template/pug_jade/' ),
      // template文件夹 End

      // tools文件夹 Start
      'toolsDir': path.resolve( __dirname, './src/tools/' ),

      'jsDir': path.resolve( __dirname, './src/tools/js/' ),
      'tsDir': path.resolve( __dirname, './src/tools/ts/' ),
      // tools文件夹 End

      'wasmDir': path.resolve( __dirname, './src/wasm/build/' ),

      'webComponentsDir': path.resolve( __dirname, './src/web_components/' ),

      // workers文件夹 Start
      'workersDir': path.resolve( __dirname, './src/workers/' ),

      'serviceWorkersDir': path.resolve( __dirname, './src/workers/service_workers/' ),
      'sharedWorkersDir': path.resolve( __dirname, './src/workers/shared_workers/' ),
      'workersToolsDir': path.resolve( __dirname, './src/workers/tools/' ),
      'webWorkersDir': path.resolve( __dirname, './src/workers/web_workers/' ),
      // workers文件夹 End
    },
  },
};
