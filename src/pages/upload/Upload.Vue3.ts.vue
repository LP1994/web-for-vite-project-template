<!--
Project: web-for-vite-project-template
FileDirPath: src/pages/upload/Upload.Vue3.ts.vue
Author: 12278
Email: 1227839175@qq.com
IDE: WebStorm
CreateDate: 2022-12-17 08:08:45 星期六
-->
<style
  scoped
  lang = 'scss'>
main {

  > .title {
    width: 100%;
    height: auto;

    font-family: 'MyFont_Helvetica', serif;
    color: green;

    line-height: 1;
    text-align: center;

    margin-bottom: 20px;
  }

  > .upload {
    box-sizing: border-box;

    width: 100%;
    height: auto;

    padding-left: 20px;
    margin-bottom: 40px;

    > h3 {
      width: 100%;
      height: auto;

      font-family: 'MyFont_Helvetica', serif;
      color: blue;

      line-height: 1;
      text-align: left;

      margin-bottom: 20px;
    }

    > section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      width: 100%;
      height: 50px;

      > input[type='file'] {
        width: 200px;
        height: 100%;
      }

      > input[type='file' i] {
        display: inline-block !important;
        height: 100% !important;
        color: red;

        &::-webkit-file-upload-button {
          display: inline-block !important;
          width: 80px !important;
          height: 100% !important;
          color: green;

          padding: 0;
          border: 1px solid palevioletred;
          border-radius: 5px;
          margin: 0 20px 0 0;
          outline: none;

          background-color: white;
        }
      }

      > button {
        box-sizing: border-box;

        width: 100px;
        height: 100%;

        font-family: 'MyFont_Helvetica', serif;
        color: black;
        font-size: 20px;

        line-height: 48px;
        text-align: center;

        border: 1px solid palevioletred;
        border-radius: 10px;
        margin-left: 40px;

        background-color: white;
      }

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
    <h1 class = 'css-reset title'>{{ state.titleText }}</h1>
    <article class = 'css-reset upload'>
      <h3 class = 'css-reset'>单个二进制文件流上传（uploadType=binary）：</h3>
      <section class = 'css-reset'>
        <input
          id = 'UploadForBinary'
          class = 'css-reset'
          type = 'file' />
        <button
          class = 'css-reset'
          type = 'button'
          @click.prevent = 'UploadForBinary'>上传
        </button>
      </section>
    </article>
    <article class = 'css-reset upload'>
      <h3 class = 'css-reset'>FormData的单文件上传（uploadType=single）：</h3>
      <section class = 'css-reset'>
        <input
          id = 'UploadForSingle'
          class = 'css-reset'
          type = 'file' />
        <button
          class = 'css-reset'
          type = 'button'
          @click.prevent = 'UploadForSingle'>上传
        </button>
      </section>
    </article>
    <article class = 'css-reset upload'>
      <h3 class = 'css-reset'>FormData的多文件上传（uploadType=multiple）：</h3>
      <section class = 'css-reset'>
        <input
          id = 'UploadForMultiple'
          class = 'css-reset'
          type = 'file'
          multiple />
        <button
          class = 'css-reset'
          type = 'button'
          @click.prevent = 'UploadForMultiple'>上传
        </button>
      </section>
    </article>
  </main>
</template>
<script
  setup
  type = 'module'
  lang = 'ts'>
'use strict';

import {
  sha512,
} from 'js-sha512';

import Mime from 'mime';

import {
  reactive,
  onMounted,
} from 'vue';

import {
  // type Router,
  type RouteLocationNormalizedLoaded,

  // useRouter,
  useRoute,
} from 'vue-router';

// const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

type T_State = {
  titleText: string;
  [ key: string | number ]: any;
};

function FileSRI( data: string | number[] | ArrayBuffer | Uint8Array ): string{
  return sha512.create().update( data ).hex();
}

function GetFileMIME( file: File ): string{
  return Mime.getType( file.name ) ?? 'application/octet-stream';
}

// @ts-expect-error
async function UploadForBinary( event: Event ): Promise<void>{
  const uploadForBinary: HTMLInputElement = document.querySelector( '#UploadForBinary' ) as HTMLInputElement,
    files: FileList = uploadForBinary.files as FileList;

  if( files.length !== 0 ){
    const file: File = files[ 0 ] as File;

    console.dir( file );

    fetch( `${ https4deno }/simulation_servers_deno/upload?uploadType=binary&fileName=${ file.name }&isForcedWrite=true`, {
      body: file.slice(),
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'content-type': GetFileMIME( file ),
        'deno-custom-file-sri': `${ FileSRI( new Uint8Array( await file.arrayBuffer() ) ) }`,
        ...httpRequestHeaders,
      },
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    } ).then(
      async ( res: Response ): Promise<Response> => {
        console.dir( await res.clone().json() );

        return res;
      },
      ( reject: unknown ): void => {
        console.error( reject );
      },
    ).catch( ( error: unknown ): void => {
      console.error( error );
    } );
  }
}

// @ts-expect-error
async function UploadForSingle( event: Event ): Promise<void>{
  const uploadForSingle: HTMLInputElement = document.querySelector( '#UploadForSingle' ) as HTMLInputElement,
    files: FileList = uploadForSingle.files as FileList;

  if( files.length !== 0 ){
    const file: File = files[ 0 ] as File;

    console.dir( file );

    const formData: FormData = new FormData();

    formData.append( 'uploadType', 'single' );
    formData.append( 'file', file, file.name );
    formData.append( 'fileName', `${ file.name }` );

    fetch( `${ https4deno }/simulation_servers_deno/upload?uploadType=single&isForcedWrite=false`, {
      body: formData,
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'deno-custom-file-sri': `${ FileSRI( new Uint8Array( await file.arrayBuffer() ) ) }`,
        ...httpRequestHeaders,
      },
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    } ).then(
      async ( res: Response ): Promise<Response> => {
        console.dir( await res.clone().json() );

        return res;
      },
      ( reject: unknown ): void => {
        console.error( reject );
      },
    ).catch( ( error: unknown ): void => {
      console.error( error );
    } );
  }
}

// @ts-expect-error
function UploadForMultiple( event: Event ): void{
  const uploadForMultiple: HTMLInputElement = document.querySelector( '#UploadForMultiple' ) as HTMLInputElement,
    files: FileList = uploadForMultiple.files as FileList;

  if( files.length !== 0 ){
    console.dir( files );

    const formData: FormData = new FormData();

    formData.append( 'uploadType', 'multiple' );

    Array.from( files ).forEach( ( file: File ): void => {
      formData.append( 'files', file, file.name );
    } );

    fetch( `${ https4deno }/simulation_servers_deno/upload?uploadType=multiple&isForcedWrite=false`, {
      body: formData,
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        ...httpRequestHeaders,
      },
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
    } ).then(
      async ( res: Response ): Promise<Response> => {
        console.dir( await res.clone().json() );

        return res;
      },
      ( reject: unknown ): void => {
        console.error( reject );
      },
    ).catch( ( error: unknown ): void => {
      console.error( error );
    } );
  }
}

const state: T_State = reactive( {
  titleText: `测试DIY的Deno服务器的文件上传`,
} );

onMounted( (): void => {
  console.log( `\n\n
src/pages/upload/Upload.Vue3.ts.vue，DOM已挂载。
\n\n` );

  console.dir( route.name );
  console.dir( route.path );
  console.dir( route.hash );
  console.dir( route.params );
  console.dir( route.query );
} );
</script>
