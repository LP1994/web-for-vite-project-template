<!--
Project: web-for-vite-project-template
FileDirPath: src/pages/SPA.Vue3.ts.vue
Author: 12278
Email: 1227839175@qq.com
IDE: WebStorm
CreateDate: 2022-07-30 14:08:53 星期六
-->
<style
  scoped
  lang = 'scss'>
@font-face {
  font-family: 'MyFont_Helvetica';
  src: url(fontsDir/Helvetica.preload.otf) format('opentype');
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
}

main {

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
  <main class = 'css-reset full-screen overflow-hidden-auto'></main>
</template>
<script
  setup
  type = 'module'
  lang = 'ts'>
'use strict';

import {
  reactive,
  onMounted,
} from 'vue';

type TState = {
  [ key: string | number ]: any;
};

const state: TState = reactive( {
  title: 'SPA',
} );

onMounted( (): void => {
  console.log( `\n\n
src/pages/SPA.Vue3.ts.vue，DOM已挂载。
\n\n` );
  console.dir( state );
} );
</script>
