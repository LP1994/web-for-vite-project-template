/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/custom_declare_types/define.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 配合new webpack.DefinePlugin插件里定义的全局常量所自定义的关于这些全局常量的类型描述。
 */

/**
 * 在Vue 3中启用/禁用Vue 2的Options API支持，默认值true，表示在Vue 3中启用对Vue 2的Options API支持。<br />
 * 1、当使用Vue 3时（建议使用“组合API”的写法，如果想使用“选项API”写法，还不如切换到Vue 2，毕竟“组合API”的写法更配Vue 3），建议将其设置为false，这样可以让Vue 3正确的使用“tree-shaking”，以使打包后的代码最小化。<br />
 *
 * @type {boolean}
 */
declare const __VUE_OPTIONS_API__: boolean;

/**
 * 在生产中启用/禁用devtools支持，默认值false。
 *
 * @type {boolean}
 */
declare const __VUE_PROD_DEVTOOLS__: boolean;

/**
 * 启用/禁用生产环境构建下激活(hydration)不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能，默认值false。仅在3.4+中可用。
 *
 * @type {boolean}
 */
declare const __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: boolean;
