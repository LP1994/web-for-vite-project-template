<!--
Project: web-for-vite-project-template
FileDirPath: src/pages/spa/index/Index.Vue3.ts.vue
Author: 12278
Email: 1227839175@qq.com
IDE: WebStorm
CreateDate: 2022-07-30 14:08:53 星期六
-->
<style
  scoped
  lang = 'scss'>
main {
  display: grid;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: transparent;

  grid-template-columns: repeat(4, 83px);
  grid-auto-rows: 78px;
  row-gap: 20px;
  justify-content: space-evenly;

  > .app-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    width: 83px;
    height: 78px;
    line-height: 0;
    background-color: transparent;

    > img.css-reset {
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 12px;
      line-height: 0;
    }

    > label.css-reset {
      width: 100%;
      line-height: 1.1;
      text-align: center;
      color: white;
      font-size: 12px;
      font-family: 'MyFont_Helvetica';

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
<template>
  <!--*********弹窗、悬浮一类节点的书写区域 Start*********-->
  <!--
  说明：
  1、这些弹窗、悬浮一类节点的最外层节点的定位建议使用“position: absolute”。
  2、这样就算这些节点中有可滚动的内容，也不会出现滚动穿透BUG！
  -->
  <!--<dialog style = 'position: absolute;'>例子：可以滚动的内容。</dialog>-->
  <!--*********弹窗、悬浮一类节点的书写区域 End*********-->
  <!--在main这个节点里写主体HTML。-->
  <main class = 'css-reset full-screen overflow-hidden-auto'>
    <div
      class = 'css-reset overflow-hidden app-btn'
      v-for = '( { src, alt, appName, goTo, }, index ) in state.appBtnConfig'
      @click = 'goTo'
      :key = 'appName + "_" + index'
      :data-key = 'appName + "_" + index'>
      <img
        class = 'css-reset'
        :src = 'src'
        :alt = 'alt' />
      <label class = 'css-reset'>{{ appName }}</label>
    </div>
  </main>
</template>
<script
  setup
  type = 'module'
  lang = 'ts'>
'use strict';

import {
  onMounted,
  reactive,
} from 'vue';

import {
  type Router,
  type RouteLocationNormalizedLoaded,

  useRouter,
  useRoute,
} from 'vue-router';

const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

import APPImg001 from './APPImg001.png';
import APPImg002 from './APPImg002.png';

type TState = {
  appBtnConfig: Array<{
    src: string;
    alt: string;
    appName: string;
    goTo: () => void;
  }>;
  [ key: string | number ]: any;
};

const state: TState = reactive( {
  appBtnConfig: [
    {
      src: APPImg001,
      alt: 'HelloWorld',
      appName: 'HelloWorld',
      goTo(): void{
        router.push( {
          name: 'HelloWorld',
          query: {
            title: 'HelloWorld',
          },
          hash: '#HelloWorld',
        } );
      },
    },
    {
      src: APPImg002,
      alt: 'Upload',
      appName: 'Upload',
      goTo(): void{
        router.push( {
          name: 'Upload',
          query: {
            title: 'Upload',
          },
          hash: '#Upload',
        } );
      },
    },
  ],
} );

onMounted( (): void => {
  console.log( `\n\n
src/pages/spa/index/Index.Vue3.ts.vue，DOM已挂载。
\n\n` );

  console.dir( route.name );
  console.dir( route.path );
  console.dir( route.hash );
  console.dir( route.params );
  console.dir( route.query );
} );
</script>
