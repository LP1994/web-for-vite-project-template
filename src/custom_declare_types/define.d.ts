/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/custom_declare_types/define.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 配合Vite的顶级配置项define里定义的全局常量所自定义的关于这些全局常量的类型描述。
 */

/**
 * @type {string} 值可为这4个中的任意一个：'dev_server'、'local_server'、'test'、'production'。
 */
declare const env_platform: string;

/**
 * @type {boolean} 值为true时表示生产环境，反之开发环境。
 */
declare const isProduction: boolean;

/**
 * @type {string} 生产模式用'classic'，开发用'module'。<br />
 * 1、在Vite中，对于Worker、SharedWorker的第2个参数中的option.type的处理是这样的：<br />
 * 开发模式下，被Vite强制设置成'module'，所以，如果在编码时需要设置option.type的值，也要遵循这个规定，也就是开发时设置成'module'。<br />
 * 生产模式下，Vite是没强制设置的，但是最好用'classic'，也就是在编码时需要设置option.type的值，最好设置成'classic'，因为火狐浏览器在'classic'下不会出现BUG，但是如果是'module'，火狐浏览器会报错。<br />
 * 2、所以，vite.worker.format也要设置成'iife'，才会在生产模式时，vite能启用正确的设置。<br />
 */
declare const workerType: 'classic' | 'module';

/**
 * @type {string} 代理http、https请求的写法例子，假定目标请求地址为：http://192.168.1.3:9000/graphql<br />
 * 注意：<br />
 * 在业务代码中使用时，记得在它后面加"/"，这里在定义时特意没加，以便在业务代码中使用时能有良好的编码语义理解。<br />
 * 使用例子：<br />
 * axios.get( '${ devURLDemo001 }/graphql' )
 */
declare const devURL001: string;

/**
 * @type {string} 代理websocket请求的写法例子，假定目标请求地址为：ws://192.168.1.3:9000/subscriptions<br />
 * 注意：<br />
 * 在业务代码中使用时，记得在它后面加"/"，这里在定义时特意没加，以便在业务代码中使用时能有良好的编码语义理解。<br />
 * 使用例子：<br />
 * new WebSocket( '${ ws4DevURLDemo001 }/subscriptions' )
 */
declare const ws4DevURL001: string;
