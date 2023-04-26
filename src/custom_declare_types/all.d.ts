/// <reference types="vite/client" />

/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/custom_declare_types/all.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 自定义的TS类型描述。
 */

import {
  URL,
} from 'node:url';

interface ImportMeta {
  url: string;

  resolve( specified: string, parent?: string | URL ): string;

  main: boolean;

  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;

  readonly DEV: boolean;

  readonly MODE: string;

  readonly PROD: boolean;

  readonly SSR: boolean;

  readonly VITE_USER_NODE_ENV: string;

  readonly env_platform: string;
}

declare const env_platform: string;

declare const isProduction: boolean;

declare const devURL001: string;

declare const ws4DevURL001: string;
