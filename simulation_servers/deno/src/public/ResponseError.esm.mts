/**
 * Project: web-for-vite-project-template
 * FileDirPath: simulation_servers/deno/src/public/ResponseError.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-11-01 15:17:36 星期二
 */

/**
 * 通用的用于返回给客户端，表示服务端返回的是一个表示错误的响应，但是响应状态码不一定都是404、505之类的4XX、5XX。
 */

'use strict';

import {
  ejsDir,

  httpHeaders,
} from 'configures/GlobalParameters.esm.mts';

import {
  dejs,
} from './ThirdPartyModules.esm.mts';

import {
  mime,
} from './PublicTools.esm.mts';

/**
 * 通用的用于返回给客户端，表示服务端返回的是一个表示错误的响应。
 */
class ResponseError {

  /**
   * @type {Request} 请求对象。
   *
   * @private
   */
  readonly #request: Request;

  /**
   * @type {string} 客户端的请求方式，值如：“get”、“post”等等。
   * 目前有9种请求方式：
   * GET
   * HEAD
   * POST
   * PUT
   * DELETE
   * CONNECT
   * OPTIONS
   * TRACE
   * PATCH
   *
   * @private
   */
  readonly #method: string;

  /**
   * @type {URL} URL对象实例，表示客户端发起的URL。
   *
   * @private
   */
  readonly #myURL: URL;

  /**
   * @type {string} 客户端发起的URL中的路径，路径中不包括查询参数和锚点。
   *
   * @private
   */
  readonly #pathName: string;

  /**
   * @type {string} 客户端发起的URL中的查询参数，值形如：“?name=lmf1&age=11”。
   *
   * @private
   */
  readonly #search: string;

  /**
   * 构造函数。
   *
   * @param {Request} request 请求对象，必需。
   */
  public constructor( request: Request ){
    this.#request = request;
    this.#method = this.#request.method.toLowerCase();
    this.#myURL = new URL( this.#request.url );
    this.#pathName = decodeURI( this.#myURL.pathname );
    this.#search = decodeURI( this.#myURL.search );
  }

  /**
   * 返回给客户端的是一个HTML页面，里面有错误信息，响应状态为404。
   * 通常表示客户端发起的请求在服务端是不存在的。
   *
   * @returns {Promise<Response>}
   */
  public async resPage404(): Promise<Response>{
    const filePath: URL = new URL( import.meta.resolve( `${ ejsDir }/404.ejs` ) ),
      html: string = await dejs.renderToString( Deno.readTextFileSync( filePath ), {
        message: `未找到“${ this.#method }”请求方法的“${ this.#pathName + this.#search }”资源。`,
      } );

    return new Response( html, {
      status: 404,
      statusText: 'Not Found',
      headers: {
        ...httpHeaders,
        'content-type': mime.getType( filePath.href ),
      },
    } );
  }

  /**
   * 返回给客户端的是一个HTML页面，里面有错误信息，响应状态为500。
   * 通常表示服务端在处理中遇到某些错误（可能是客户端引起的，也可能是服务端处理出现异常等等），它将返回给客户端，表明是什么样的错误。
   *
   * @param {object} config 对象参数。
   *
   * @param {string} config.title 页面的标题，默认值为空字符串，可选。
   *
   * @param {string} config.message 要展示给客户端的表示错误的信息，默认值为空字符串，可选。
   *
   * @returns {Promise<Response>}
   */
  public static async ResPageError( {
    title = '',
    message = '',
  }: {
    title: string;
    message: string;
  } = {
    title: '',
    message: '',
  } ): Promise<Response>{
    const filePath: URL = new URL( import.meta.resolve( `${ ejsDir }/Error.ejs` ) ),
      html: string = await dejs.renderToString( Deno.readTextFileSync( filePath ), {
        title,
        message,
      } );

    return new Response( html, {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        ...httpHeaders,
        'content-type': mime.getType( filePath.href ),
      },
    } );
  }

}

export {
  ResponseError,
};

export default ResponseError;
