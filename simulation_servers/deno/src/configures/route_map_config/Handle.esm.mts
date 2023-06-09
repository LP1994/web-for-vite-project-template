/**
 * Project: web-for-vite-project-template
 * FileDirPath: simulation_servers/deno/src/configures/route_map_config/Handle.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-11-02 17:08:50 星期三
 */

'use strict';

import {
  type TypeFun001,
  type TypeFilePath001,
  type TypeResult001,
} from 'configures/GlobalParameters.esm.mts';

import {
  IterateToNestForPromise,
} from 'public/PublicTools.esm.mts';

type TypeRouteMapConfig = {
  [ key: string ]: TypeFilePath001;
};

type TypeRouteHandleConfig = Array<[ string | URL, string | URL ]>;

type TypeFun002 = ( request: Request ) => boolean | Promise<boolean>;

type TypeMap001 = Map<TypeFun002, TypeFun001>;

type TypeRouteMapHandle = {
  [ key: string ]: TypeFun001;
};

type TypeRouteHandle = ( request: Request ) => Promise<TypeResult001>;

type TypeObj001 = {
  [ key: string ]: string;
};

/**
 * 根据传入的“文件地址”值返回其对应的文件地址的字符串形式的值，给import()使用的。
 *
 * @param {TypeFilePath001} filePath 文件地址，必需。
 *
 * @returns {string} 文件地址的字符串形式的值，给import()使用的。
 */
function Handle001( filePath: TypeFilePath001 ): string{
  if( Object.prototype.toString.call( filePath ) === '[object URL]' ){
    if( ( filePath as URL ).protocol === 'file:' ){
      return ( filePath as URL ).href;
    }
    else{
      throw new Error( 'import()只接受“string”类型的参数值，且表示文件地址。' );
    }
  }
  else{
    return filePath as string;
  }
}

/**
 * “一对一”的路由映射配置，根据“文件地址”读取其对应的函数，并重新生成配置。
 *
 * @param {TypeRouteMapConfig} routeMapConfig “一对一”的路由映射配置，必需。
 *
 * @returns {Promise<TypeRouteMapHandle>} “一对一”的路由映射配置，根据“文件地址”读取其对应的函数，并重新生成配置。
 */
async function GeneratorRouteMap( routeMapConfig: TypeRouteMapConfig ): Promise<TypeRouteMapHandle>{
  const obj001: TypeObj001 = Object.fromEntries(
    Object.entries( routeMapConfig ).map(
      (
        [ key, value ]: [ string, TypeFilePath001 ],
      ): [ string, string ] => {
        if( Object.prototype.toString.call( value ) === '[object URL]' ){
          if( ( value as URL ).protocol === 'file:' ){
            return [
              key,
              ( value as URL ).href
            ];
          }
          else{
            throw new Error( 'import()只接受“string”类型的参数值，且表示文件地址。' );
          }
        }
        else{
          return [
            key,
            value as string
          ];
        }
      }
    )
  );

  const arr001: Array<Promise<[ string, TypeFun001 ]>> = Object.entries( obj001 ).map(
      async (
        [ key, value ]: [ string, string ],
      ): Promise<[ string, TypeFun001, ]> => {
        return [
          key,
          ( await import( value ) ).default
        ];
      }
    ),
    // @ts-ignore
    arr002: Array<[ string, TypeFun001 ]> = await Array.fromAsync( arr001 );

  return Object.fromEntries( arr002 );
}

/**
 * 有“条件”的路由映射配置，根据“文件地址”读取其对应的函数，并重新生成配置。
 *
 * @param {TypeRouteHandleConfig} routeHandleConfig 有“条件”的路由映射配置，必需。
 *
 * @returns {TypeRouteHandle} 有“条件”的路由映射配置，根据“文件地址”读取其对应的函数，并重新生成配置。
 */
function GeneratorRouteHandle( routeHandleConfig: TypeRouteHandleConfig ): TypeRouteHandle{
  return async ( request: Request ): Promise<TypeResult001> => {
    let myRouteHandleConfig: TypeRouteHandleConfig | TypeMap001 = routeHandleConfig;

    const arr001: Array<Promise<[ TypeFun002, TypeFun001 ]>> = myRouteHandleConfig.map(
        async (
          [ key, name ]: [ string | URL, string | URL ],
        ): Promise<[ TypeFun002, TypeFun001 ]> => {
          return [
            ( await import( Handle001( key ) ) ).default,
            ( await import( Handle001( name ) ) ).default
          ];
        }
      ),
      // @ts-ignore
      arr002: Array<[ TypeFun002, TypeFun001 ]> = await Array.fromAsync( arr001 );

    myRouteHandleConfig = new Map( arr002 );

    let fun001: TypeFun002 | null = null;

    for( let item002 of
      myRouteHandleConfig.keys() ){
      if( ( await IterateToNestForPromise( item002( request ) ) ) as boolean ){
        fun001 = item002;

        break;
      }
      else{
        fun001 = null;
      }
    }

    if( fun001 ){
      return ( myRouteHandleConfig.get( fun001 as TypeFun002 ) ) as TypeFun001;
    }
    else{
      return false;
    }
  };
}

export {
  GeneratorRouteMap,
  GeneratorRouteHandle,
};

export default {
  GeneratorRouteMap,
  GeneratorRouteHandle,
};
