/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/DefineConfig.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * Vite的顶级配置项define的配置。
 * 注意：
 * 在这里定义的全局常量，当在TS中使用时，一般会被“TS类型检查”鉴定为未定义的错误！可以在“src/custom_declare_types/define.d.ts”这里定义这些全局常量的类型描述。这样就不会报类型错误了。
 */

'use strict';

import {
  httpRequestHeaders,
} from './GlobalParameters.esm.mjs';

/**
 * Vite的顶级配置项define的配置。在编译时用其他值或表达式替换代码中的变量。这对于允许开发构建和生产构建之间的不同行为很有用。<br />
 * 1、传递给define的每个键都是一个标识符或多个用.连接的标识符：'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)。<br />
 * 2、如果该值是一个字符串，它将被用作代码片段：TWO: '1+1'。<br />
 * 3、如果值不是字符串，它将被字符串化（包括函数）。<br />
 * 4、如果你在key前加上typeof前缀，它只为typeof调用定义：'typeof window': JSON.stringify('object111')。<br />
 * 5、如果需要定义一个值是字符串值，得单引号内部嵌套双引号，如：'"例子"'（或者JSON.stringify('例子')），否则没法真正输出这个字符串。<br />
 * 6、如果值不是字符串，它将被字符串化，相当于使用JSON.stringify处理，但是如果是函数，直接这么设置就行，别用JSON.stringify：'fun1': () => {}。<br />
 *
 * 注意：<br />
 * 在这里定义的全局常量，当在TS中使用时，一般会被“TS类型检查”鉴定为未定义的错误！可以在“src/custom_declare_types/define.d.ts”这里定义这些全局常量的类型描述。这样就不会报类型错误了。<br />
 *
 * @param {object} config 对象参数。
 *
 * @param {string|undefined} config.env_platform env_platform的值是字符串，有4个值：'dev_server'、'local_server'、'test'、'production'，来源是CLI参数中的“--mode”参数值，必需。<br />
 * 注意：<br />
 * 1、但是必须有这么一个“--mode”参数设置，这4个之中的其中一个即可：--mode dev_server、--mode local_server、--mode test、--mode production。<br />
 *
 * @param {boolean} config.isProduction isProduction的值为true时表示生产环境，反之开发环境。<br />
 *
 * @returns {object} 返回一个对象，里面是Vite的顶级配置项define的配置。
 */
function DefineConfig( {
  env_platform,
  isProduction,
} ){
  const wsHost001 = `( location.protocol === "http:" ? "ws:" : "wss:" ) + "//" + location.hostname + ":" + location.port + `;

  return {
    env: JSON.stringify( process.env ),
    env_platform: JSON.stringify( env_platform ),
    isProduction: JSON.stringify( isProduction ),
    httpRequestHeaders: JSON.stringify( httpRequestHeaders ),

    /**
     * 生产模式用'classic'，开发用'module'。<br />
     * 1、在Vite中，对于Worker、SharedWorker的第2个参数中的option.type的处理是这样的：<br />
     * 开发模式下，被Vite强制设置成'module'，所以，如果在编码时需要设置option.type的值，也要遵循这个规定，也就是开发时设置成'module'。<br />
     * 生产模式下，Vite是没强制设置的，但是最好用'classic'，也就是在编码时需要设置option.type的值，最好设置成'classic'，因为火狐浏览器在'classic'下不会出现BUG，但是如果是'module'，火狐浏览器会报错。<br />
     * 2、所以，vite.worker.format也要设置成'iife'，才会在生产模式时，vite能启用正确的设置。<br />
     *
     * @type {string}
     */
    workerType: JSON.stringify( isProduction
                                ? 'classic'
                                : 'module' ),

    /**
     * 在Vue 3中启用/禁用Vue 2的Options API支持，默认值true，表示在Vue 3中启用对Vue 2的Options API支持。<br />
     * 1、当使用Vue 3时（建议使用“组合API”的写法，如果想使用“选项API”写法，还不如切换到Vue 2，毕竟“组合API”的写法更配Vue 3），建议将其设置为false，这样可以让Vue 3正确的使用“tree-shaking”，以使打包后的代码最小化。<br />
     *
     * @type {boolean}
     */
    __VUE_OPTIONS_API__: false,
    /**
     * 在生产中启用/禁用devtools支持，默认值false。
     *
     * @type {boolean}
     */
    __VUE_PROD_DEVTOOLS__: false,
    /**
     * 启用/禁用生产环境构建下激活(hydration)不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能，默认值false。仅在3.4+中可用。
     *
     * @type {boolean}
     */
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,

    /**
     * 代理http、https请求的写法例子，假定目标请求地址为：https://127.0.0.1:9200/graphql
     * 注意：
     * 在业务代码中使用时，记得在它后面加"/"，这里在定义时特意没加，以便在业务代码中使用时能有良好的编码语义理解。
     * 使用例子：
     * axios.get( '${ https4deno }/graphql' )
     */
    https4deno: isProduction
                ? '""'
                : '"/https4deno"',

    /**
     * 代理websocket请求的写法例子，假定目标请求地址为：wss://127.0.0.1:9200/graphql
     * 注意：
     * 在业务代码中使用时，记得在它后面加"/"，这里在定义时特意没加，以便在业务代码中使用时能有良好的编码语义理解。
     * 使用例子：
     * new WebSocket( '${ wss4deno }/graphql' )
     */
    wss4deno: isProduction
              ? `${ wsHost001 }""`
              : `${ wsHost001 }"/wss4deno"`,
  };
}

export {
  DefineConfig,
};

export default DefineConfig;
