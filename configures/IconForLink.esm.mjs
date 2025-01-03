/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/IconForLink.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 一般用于为“VitePluginHTMLConfig.esm.mjs”中“vite-plugin-html”插件配置HTML模板中的head标签里的图片类link标签。
 */

'use strict';

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
 * 为这个标签配置的：<br />
 * ```html
 * <link rel = 'shortcut icon' />
 * ```
 * 参数说明：<br />
 * type：图片类型，值如：“image/png”。<br />
 * sizes：图片尺寸，值如：“32x32”（中间的“x”为小写英文单词“x”）。<br />
 * href：图片链接，值可以是外部第三方链接，如：https://www.xxx.com/001.png，也可以是相对地址，如：“./static/ico/uncompressed/ico_32_32.png”。<br />
 *
 * @type {[{sizes: string, href: string, type: string}]}
 */
const ShortcutIcons = [
  {
    type: 'image/png',
    sizes: '32x32',
    href: URLHead + '/static/ico/uncompressed/ico_32_32.png',
  },
  {
    type: 'image/png',
    sizes: '48x48',
    href: URLHead + '/static/ico/uncompressed/ico_48_48.png',
  },
  {
    type: 'image/png',
    sizes: '57x57',
    href: URLHead + '/static/ico/uncompressed/ico_57_57.png',
  },
  {
    type: 'image/png',
    sizes: '72x72',
    href: URLHead + '/static/ico/uncompressed/ico_72_72.png',
  },
  {
    type: 'image/png',
    sizes: '96x96',
    href: URLHead + '/static/ico/uncompressed/ico_96_96.png',
  },
  {
    type: 'image/png',
    sizes: '114x114',
    href: URLHead + '/static/ico/uncompressed/ico_114_114.png',
  },
  {
    type: 'image/png',
    sizes: '120x120',
    href: URLHead + '/static/ico/uncompressed/ico_120_120.png',
  },
  {
    type: 'image/png',
    sizes: '128x128',
    href: URLHead + '/static/ico/uncompressed/ico_128_128.png',
  },
  {
    type: 'image/png',
    sizes: '144x144',
    href: URLHead + '/static/ico/uncompressed/ico_144_144.png',
  },
  {
    type: 'image/png',
    sizes: '150x150',
    href: URLHead + '/static/ico/uncompressed/ico_150_150.png',
  },
  {
    type: 'image/png',
    sizes: '152x152',
    href: URLHead + '/static/ico/uncompressed/ico_152_152.png',
  },
  {
    type: 'image/png',
    sizes: '167x167',
    href: URLHead + '/static/ico/uncompressed/ico_167_167.png',
  },
  {
    type: 'image/png',
    sizes: '180x180',
    href: URLHead + '/static/ico/uncompressed/ico_180_180.png',
  },
  {
    type: 'image/png',
    sizes: '192x192',
    href: URLHead + '/static/ico/uncompressed/ico_192_192.png',
  },
  {
    type: 'image/png',
    sizes: '384x384',
    href: URLHead + '/static/ico/uncompressed/ico_384_384.png',
  },
  {
    type: 'image/png',
    sizes: '512x512',
    href: URLHead + '/static/ico/uncompressed/ico_512_512.png',
  },
];

/**
 * 为这个标签配置的：<br />
 * ```html
 * <link rel = 'icon' />
 * ```
 * 参数说明：<br />
 * type：图片类型，值如：“image/png”。<br />
 * sizes：图片尺寸，值如：“32x32”（中间的“x”为小写英文单词“x”）。<br />
 * href：图片链接，值可以是外部第三方链接，如：https://www.xxx.com/001.png，也可以是相对地址，如：“./static/ico/uncompressed/ico_32_32.png”。<br />
 *
 * @type {[{sizes: string, href: string, type: string}]}
 */
const Icons = ShortcutIcons;

/**
 * 为这个标签配置的：<br />
 * ```html
 * <link rel = 'apple-touch-icon' />
 * ```
 * 参数说明：<br />
 * type：图片类型，值如：“image/png”。<br />
 * sizes：图片尺寸，值如：“32x32”（中间的“x”为小写英文单词“x”）。<br />
 * href：图片链接，值可以是外部第三方链接，如：https://www.xxx.com/001.png，也可以是相对地址，如：“./static/ico/uncompressed/ico_32_32.png”。<br />
 *
 * @type {[{sizes: string, href: string, type: string}]}
 */
const AppleTouchIcon = ShortcutIcons;

/**
 * 为这个标签配置的：<br />
 * ```html
 * <link rel = 'apple-touch-icon-precomposed' />
 * ```
 * 参数说明：<br />
 * type：图片类型，值如：“image/png”。<br />
 * sizes：图片尺寸，值如：“32x32”（中间的“x”为小写英文单词“x”）。<br />
 * href：图片链接，值可以是外部第三方链接，如：https://www.xxx.com/001.png，也可以是相对地址，如：“./static/ico/uncompressed/ico_32_32.png”。<br />
 *
 * @type {[{sizes: string, href: string, type: string}]}
 */
const AppleTouchIconPrecomposed = ShortcutIcons;

export {
  ShortcutIcons,
  Icons,
  AppleTouchIcon,
  AppleTouchIconPrecomposed,
};

export default {
  ShortcutIcons,
  Icons,
  AppleTouchIcon,
  AppleTouchIconPrecomposed,
};
