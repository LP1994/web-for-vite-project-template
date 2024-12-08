/**
 * Project: web-for-vite-project-template
 * FileDirPath: vite.webstorm.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 该文件是用来让“WebStorm”这个开发工具识别“Vite”配置中“resolve”这个字段里头的各个别名变量，当然其他配置字段也系可以被识别的。
 * 1、这么做才能让代码中的别名路径被“WebStorm”这个开发工具识别到，才可以通过点击这个别名路径导航到目标文件。
 */

'use strict';

import {
  dirname,
  resolve,
} from 'node:path';

import {
  fileURLToPath,
} from 'node:url';

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

export default {
  resolve: {
    /**
     * 设置路径别名。<br />
     * 1、resolve.alias优先于其他模块解析。<br />
     * 2、路径别名到底是路径别名，别用于直接指向具体的文件，尤其是JS文件，因为会导致无法根据导入语法的不同自行加载到相应的模块文件，致使报错；但是CSS一类的文件倒是可以直接指向到具体的文件。<br />
     * 3、为第三方包设置别名时，只能是以包名开始，其他任何都不行，因为webpack会自动从“node_modules”中查找，包括：“./”、“./node_modules/”、“node_modules/”等等都是不行的，当然如果是指向自己的模块文件夹，那还是要指定完整路径。<br />
     * 4、也可以指定完整路径：xxx: path.resolve(path.join(__dirname, 'src/module1'))。<br />
     * 5、path.resolve和path.join的区别在于：<br />
     * 例如：<br />
     * path.resolve( __dirname, './src/assets/' )，最后解析成：G:\WebStormWS\web-for-vite-project-template\src\assets
     * path.join( __dirname, './src/assets/' )，最后解析成：G:\WebStormWS\web-for-vite-project-template\src\assets\
     * 有或是没有最后的“\”在具体应用时很重要！不然容易出现不如你所愿的现象。<br />
     * 6、当设置文件夹的路径别名时，用path.resolve设置时，其值包不包含最后的“/”都没关系，因为最后生成的路径（如：G:\WebStormWS\web-for-vite-project-template\src\assets）最尾部都不会包含“\”。<br />
     * 7、当设置文件夹的路径别名时，用path.join设置时，其值如果包含最后的“/”，则最后生成的路径（如：G:\WebStormWS\web-for-vite-project-template\src\assets\）最尾部就会包含“\”，反之不会。<br />
     * 8、设置文件夹的路径别名时，建议使用path.resolve，这样在后续使用路径别名时，就可以按正常的习惯使用：import JSONDemo001 from 'jsonDir/Demo001.json';<br />
     */
    alias: {
      'element-ui-css$': 'element-ui/lib/theme-chalk/index.css',
      'element-plus-css$': 'element-plus/dist/index.css',
      'swiper-css$': 'swiper/swiper-bundle.min.css',

      // assets文件夹 Start
      'assetsDir': resolve( __dirname, './src/assets/' ),

      'docDir': resolve( __dirname, './src/assets/doc/' ),

      'csonDir': resolve( __dirname, './src/assets/doc/cson/' ),
      'csvDir': resolve( __dirname, './src/assets/doc/csv/' ),
      'jsonDir': resolve( __dirname, './src/assets/doc/json/' ),
      'json5Dir': resolve( __dirname, './src/assets/doc/json5/' ),
      'tomlDir': resolve( __dirname, './src/assets/doc/toml/' ),
      'tsvDir': resolve( __dirname, './src/assets/doc/tsv/' ),
      'txtDir': resolve( __dirname, './src/assets/doc/txt/' ),
      'xmlDir': resolve( __dirname, './src/assets/doc/xml/' ),
      'yamlDir': resolve( __dirname, './src/assets/doc/yaml/' ),

      'fontsDir': resolve( __dirname, './src/assets/fonts/' ),
      'imgDir': resolve( __dirname, './src/assets/img/' ),
      'musicDir': resolve( __dirname, './src/assets/music/' ),
      'videosDir': resolve( __dirname, './src/assets/videos/' ),
      // assets文件夹 End

      'gQLAPIDir': resolve( __dirname, './src/graphQL/api/' ),

      'nativeComponentsDir': resolve( __dirname, './src/native_components/' ),

      'pagesDir': resolve( __dirname, './src/pages/' ),

      'pwaManifestDir': resolve( __dirname, './src/pwa_manifest/' ),

      // styles文件夹 Start
      'stylesDir': resolve( __dirname, './src/styles/' ),

      'cssDir': resolve( __dirname, './src/styles/css/' ),
      'lessDir': resolve( __dirname, './src/styles/less/' ),
      'postcssDir': resolve( __dirname, './src/styles/postcss/' ),
      'sassDir': resolve( __dirname, './src/styles/sass/' ),
      'scssDir': resolve( __dirname, './src/styles/scss/' ),
      'stylusDir': resolve( __dirname, './src/styles/stylus/' ),
      // styles文件夹 End

      // template文件夹 Start
      'templateDir': resolve( __dirname, './src/template/' ),

      'ejsDir': resolve( __dirname, './src/template/ejs/' ),
      'handlebarsDir': resolve( __dirname, './src/template/handlebars/' ),
      'htmlDir': resolve( __dirname, './src/template/html/' ),
      'markdownDir': resolve( __dirname, './src/template/markdown/' ),
      'mustacheDir': resolve( __dirname, './src/template/mustache/' ),
      'pug_jadeDir': resolve( __dirname, './src/template/pug_jade/' ),
      // template文件夹 End

      // tools文件夹 Start
      'toolsDir': resolve( __dirname, './src/tools/' ),

      'jsDir': resolve( __dirname, './src/tools/js/' ),
      'tsDir': resolve( __dirname, './src/tools/ts/' ),

      'currency_toolsDir': resolve( __dirname, './src/tools/js/currency_tools/' ),
      'universal_toolsDir': resolve( __dirname, './src/tools/ts/universal_tools/' ),
      // tools文件夹 End

      'wasmDir': resolve( __dirname, './src/wasm/build/' ),

      'webComponentsDir': resolve( __dirname, './src/web_components/' ),

      // workers文件夹 Start
      'workersDir': resolve( __dirname, './src/workers/' ),

      'serviceWorkersDir': resolve( __dirname, './src/workers/service_workers/' ),
      'sharedWorkersDir': resolve( __dirname, './src/workers/shared_workers/' ),
      'workersToolsDir': resolve( __dirname, './src/workers/tools/' ),
      'webWorkersDir': resolve( __dirname, './src/workers/web_workers/' ),
      // workers文件夹 End

      'deno_std/': 'https://deno.land/std/',
      'deno_std_encoding/': 'https://deno.land/std/encoding/',
      'deno_std_io/': 'https://deno.land/std/io/',
      'deno_std_media_types$': 'https://deno.land/std/media_types/mod.ts',
      'deno_std_path$': 'https://deno.land/std/path/mod.ts',

      'deno_x/': 'https://deno.land/x/',
      'deno_x_corejs$': 'https://deno.land/x/corejs/index.js',
      'deno_x_ejs$': 'https://deno.land/x/dejs/mod.ts',
      'deno_x_mongo$': 'https://deno.land/x/mongo/mod.ts',

      'esm_sh/': 'https://esm.sh/',
      'esm_sh_graphql$': 'https://esm.sh/graphql',

      'preact/': 'https://cdn.skypack.dev/preact/',
      'preact_jsx-runtime$': 'https://cdn.skypack.dev/preact/jsx-runtime?dts',
      'preact_jsx-dev-runtime$': 'https://cdn.skypack.dev/preact/jsx-dev-runtime?dts',

      'deno_src/': resolve( __dirname, './simulation_servers/deno/src/' ),
      'configures/': resolve( __dirname, './simulation_servers/deno/src/configures/' ),
      'route_map_config/': resolve( __dirname, './simulation_servers/deno/src/configures/route_map_config/' ),
      'database/': resolve( __dirname, './simulation_servers/deno/src/database/' ),
      'deno_db/': resolve( __dirname, './simulation_servers/deno/src/database/deno_db/' ),
      'firebase/': resolve( __dirname, './simulation_servers/deno/src/database/firebase/' ),
      'graphql/': resolve( __dirname, './simulation_servers/deno/src/database/graphql/' ),
      'mongo/': resolve( __dirname, './simulation_servers/deno/src/database/mongo/' ),
      'mysql/': resolve( __dirname, './simulation_servers/deno/src/database/mysql/' ),
      'postgres/': resolve( __dirname, './simulation_servers/deno/src/database/postgres/' ),
      'sqlite/': resolve( __dirname, './simulation_servers/deno/src/database/sqlite/' ),
      'supabase/': resolve( __dirname, './simulation_servers/deno/src/database/supabase/' ),
      'public/': resolve( __dirname, './simulation_servers/deno/src/public/' ),
      'routers/': resolve( __dirname, './simulation_servers/deno/src/routers/' ),
      'servers/': resolve( __dirname, './simulation_servers/deno/src/servers/' ),
      'services/': resolve( __dirname, './simulation_servers/deno/src/services/' ),
      'ssr/': resolve( __dirname, './simulation_servers/deno/src/ssr/' ),
      'template/': resolve( __dirname, './simulation_servers/deno/src/template/' ),
      'ejs/': resolve( __dirname, './simulation_servers/deno/src/template/ejs/' ),
      'handlebars/': resolve( __dirname, './simulation_servers/deno/src/template/handlebars/' ),
      'html/': resolve( __dirname, './simulation_servers/deno/src/template/html/' ),
      'markdown/': resolve( __dirname, './simulation_servers/deno/src/template/markdown/' ),
      'mustache/': resolve( __dirname, './simulation_servers/deno/src/template/mustache/' ),
      'pug_jade/': resolve( __dirname, './simulation_servers/deno/src/template/pug_jade/' ),
      'tools/': resolve( __dirname, './simulation_servers/deno/src/tools/' ),
      'third_party_modules/': resolve( __dirname, './simulation_servers/deno/src/tools/third_party_modules/' ),
      'universal_tool_for_deno/': resolve( __dirname, './simulation_servers/deno/src/tools/universal_tool_for_deno/' ),
      'static/': resolve( __dirname, './simulation_servers/deno/static/' ),
      'test/': resolve( __dirname, './simulation_servers/deno/test/' ),
      'upload/': resolve( __dirname, './simulation_servers/deno/upload/' ),
      'web/': resolve( __dirname, './simulation_servers/deno/web/' ),

      'GSD2TSTD$': resolve( __dirname, './simulation_servers/deno/src/graphql_schema_definition_to_ts_type_definition/GSD2TSTD.esm.mts' ),
      'MF_v2_RuntimeAPI$': resolve( __dirname, './src/ModuleFederation_v2_RuntimeAPI.esm.mts' ),
    },
    /**
     * 如果为true，则将不允许无扩展名的文件。设置成false就行。<br />
     * 1、强制解析器使用扩展选项中的一个扩展（用户必须指定不带扩展的请求）。<br />
     */
    enforceExtension: false,
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

      '...',
    ],
    modules: [
      'node_modules',
    ],
    symlinks: false,
    /**
     * 默认值为：false，启用此设置后，vite将通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。
     *
     * @type {boolean}
     */
    preserveSymlinks: false,
  },
};
