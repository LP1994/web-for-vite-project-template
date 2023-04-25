/**
 * Project: web-for-vite-project-template
 * FileDirPath: /vite.config.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

'use strict';

import vue from '@vitejs/plugin-vue';

import {
  defineConfig,
} from 'vite';

export default defineConfig( {
  plugins: [
    vue(),
  ],
} );
