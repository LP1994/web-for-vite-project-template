/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/pages/spa/SPA.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-07-30 14:08:53 星期六
 */

'use strict';

import {
  type App,
  type ComponentPublicInstance,

  createApp,
} from 'vue';

import {
  type Router,
  type RouteRecordRaw,

  createRouter,
  createWebHashHistory,
} from 'vue-router';

import './SPA.css';

import SPAComponentForVue3 from './SPA.Vue3.ts.vue';

import Index from './index/Index.Vue3.ts.vue';
import HelloWorld from '../hello_world/HelloWorld.Vue3.ts.vue'
import Upload from '../upload/Upload.Vue3.ts.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/Upload',
    name: 'Upload',
    component: Upload,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Index,
  },
];

const router: Router = createRouter( {
  history: createWebHashHistory(),
  routes,
} );

/**
 * @type {App<Element>} 创建了一个Vue 3的应用实例。
 */
const SPAAPPInstance: App<Element> = createApp( SPAComponentForVue3 );

SPAAPPInstance.config.errorHandler = ( error: unknown, instance: ComponentPublicInstance | null, info: string ): void => {
  console.log( `\n\n\n` );
  console.error( `error:` );
  console.error( error );
  console.log( `\n` );
  console.log( `instance:` );
  console.dir( instance );
  console.log( `\n` );
  console.log( `info:` );
  console.log( info );
  console.log( `\n\n\n` );
};

/**
 * @type {ComponentPublicInstance} 一个Vue 3的根组件实例。
 */
const SPARootComponentInstance: ComponentPublicInstance = SPAAPPInstance.use( router ).mount( '#SPA' );

console.log( `\n\n\n一个Vue 3的根组件实例：` )
console.dir( SPARootComponentInstance );
console.log( `\n\n\n` );
