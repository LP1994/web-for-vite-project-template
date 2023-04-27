/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/custom_declare_types/env.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 用于描述Vite特有的“import.meta.env”以及其上的各个环境常量类型。
 */

import {
  URL,
} from 'node:url';

interface ImportMetaEnv {
  /**
   * @type {string} 部署应用时的基本URL，它由Vite的顶级配置项base决定。
   */
  readonly BASE_URL: string;

  /**
   * @type {boolean} 应用是否运行在开发环境，其值永远与import.meta.env.PROD相反。
   */
  readonly DEV: boolean;

  /**
   * @type {string} 应用运行的mode，值可为这4个中的任意一个：'dev_server'、'local_server'、'test'、'production'。
   */
  readonly MODE: string;

  /**
   * @type {boolean} 应用是否运行在生产环境。
   */
  readonly PROD: boolean;

  /**
   * @type {boolean} 应用是否运行在server上。
   */
  readonly SSR: boolean;

  /**
   * @type {string} 值可为这2个中的任意一个：'development'、'production'。<br />
   * 在文件夹“configures/env”下的各个.env文件中定义的“NODE_ENV”，注意该常量名就只是“NODE_ENV”，Vite会自动将其重新定义为一个名为“VITE_USER_NODE_ENV”的常量。
   * 该常量只在开发环境中可取到。
   */
  readonly VITE_USER_NODE_ENV: string;

  /**
   * @type {string} 值可为这4个中的任意一个：'dev_server'、'local_server'、'test'、'production'。<br />
   * 在文件夹“configures/env”下的各个.env文件中定义的“env_platform”。
   */
  readonly env_platform: string;
}

interface ImportMeta {
  /**
   * @type {string}
   */
  url: string;

  /**
   * @type {string}
   */
  resolve( specified: string, parent?: string | URL ): string;

  /**
   * @type {boolean}
   */
  main: boolean;

  /**
   * @type {ImportMetaEnv} Vite特有的可在业务代码中全局使用的，用于获取各种自定义的环境常量、Vite自带常量，都挂在“import.meta.env”上。
   */
  readonly env: ImportMetaEnv;
}
