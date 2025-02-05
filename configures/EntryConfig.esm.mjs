/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/EntryConfig.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。
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
 * Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。<br />
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
 * @returns {string | string []| { [entryName: string]: string }} Vite的build.rollupOptions.input的配置，也就是“entry points”的配置。
 */
function EntryConfig( {
  appType,
} ){
  const isSPA = appType === 'spa';

  return isSPA
    /*
     1、当appType为'spa'时，也就是单页应用时，只需要设置1个“入口脚本”即可，且设置成一个字符串类型的值。
     2、由于返回的值是给项目根目录下的vite.base.esm.mjs使用的，所以设置的文件路径也是相对于项目根目录的。
     */
         ? 'src/pages/index/Index.mts'
    /*
     1、当appType为'mpa'时，也就是多页应用时，保持为一个空对象的值即可。
     2、因为实际的设置是依赖“configures/VitePluginHTMLConfig.esm.mjs”这个配置文件的，Vite内部会自动生成相应的“entry points”配置。
     */
         : {};
}

export {
  EntryConfig,
};

export default EntryConfig;
