/**
 * Project: web-for-vite-project-template
 * FileDirPath: simulation_servers/deno/src/services/upload_resources_service/ResponseHandle.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-11-03 02:25:42 星期四
 */

/**
 * 测试文件上传时，不可尽信“postman”这个工具，不知道是什么原因有时测试上传会不成功，而服务器又没出现报错信息！
 * 用浏览器测，就没出现“postman”的上述问题。
 */

/**
 * 用于响应HTTP服务的上传操作（支持POST请求、PUT请求），支持的请求URL有：
 * https://127.0.0.1:9200/simulation_servers_deno/upload、https://127.0.0.1:9200/simulation_servers_deno/upload/
 *
 * 更多的对应关系见“src/configures/route_map_config/RouteMapConfig.esm.mts”中的变量“methodByPostForRouteHandle”、“methodByPutForRouteHandle”中的配置。
 */

/**
 * 1、自建的HTTPS证书，记得要给客户端安装，比如给电脑（除了本机要安装，火狐浏览器也要安装）、手机、平板等安装。
 * 2、安装证书如下：
 * “openssl/HTTPSSL001”文件夹下的3个：
 * 001根CA证书：HTTPSSL001_Root_CA.crt，安装到“受信任的根证书颁发机构”，手机、平板等非电脑的移动设备，只要安装这个“根CA证书”即可。
 * 002服务端CA证书：HTTPSSL001_Servers_CA.crt，安装到“受信任的根证书颁发机构”。
 * 003客户端CA证书：HTTPSSL001_Clients_CA.crt，安装时选择自动识别证书类型，系统会自行将其安装到相应的类型下。
 * 3、遇到HTTPS协议下载文件时出现无法下载的话，就改用HTTP协议，比如迅雷就会遇到这种情况。
 */

/**
 * 该模块，必须部署一个默认的导出值，且该值的类型必须为可执行的函数，详细见下面的Handle函数注解。
 */

/**
 * 本文件上传功能，提供了5种类型的上传方式，除大文件上传没有文件大小的限制外，其他的文件上传方式都会限制上传的文件不能大于1GB（该阈值可由下面的常量maxFileSize控制调节），详细使用说明见：
 * UploadByBigFile.esm.mts（单个大文件上传）、
 * UploadByBigFileForPart.esm.mts（单个大文件的分块上传）、
 * UploadByBinary.esm.mts（单个二进制文件流上传）、
 * UploadByMultiple.esm.mts（多文件批量上传）、
 * UploadBySingle.esm.mts（单文件上传）
 */

'use strict';

import {
  type T_Response001,

  HttpResponseHeadersFun,
  resMessageStatus,
} from 'configures/GlobalParameters.esm.mts';

import {
  type T_QueryOneResult,
  type I_UploadFileSRISchema,

  QueryOne,
} from 'mongo/simulation_servers_deno/upload_file_sri/UploadFileSRI.esm.mts';

/**
 * 单个二进制文件流上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=true
 *
 * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
 *
 * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=binary”。
 * 3、特别注意！请求头必须包含“content-type”！
 * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
 * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
 */
import UploadByBinary from './UploadByBinary.esm.mts';

/**
 * 单文件上传（支持POST请求、PUT请求）。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=single&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=single&isForcedWrite=true
 *
 * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
 *
 * 1、客户端上传的body必须是用FormData包装。
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=single”。
 * 3、FormData中必须要有的字段：
 *    uploadType：值为'single'。
 *    file：其值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
 *    关于如何创建Blob见：
 *    https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 4、可选字段有：
 *    fileName：用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好带扩展名）。
 */
import UploadBySingle from './UploadBySingle.esm.mts';

/**
 * 多文件批量上传（支持POST请求、PUT请求）。
 * 第1种多文件的上传方式：
 * 只使用“uploadType”、“files”字段，其中“files”字段对应的值里保存了多个需要上传的文件。
 * 客户端可以通过FormData的append方法，多次设置“files”字段，如：formData.append( 'files', File_001, 'File_001.png' )、formData.append( 'files', File_002, 'File_001.png' )、......。
 * formData.append()的第3个参数用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好还是带扩展名）。
 * “files”字段对应的值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
 *   关于如何创建Blob见：
 *   https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *
 * 第2种多文件的上传方式：
 * 只使用“uploadType”、“quantity”、“fileX”、“fileNameX”字段，其中“quantity”字段表示有多少个文件被上传。
 * 然后“fileX”、“fileNameX”字段中的“X”就会用index来代替，index从0开始，总数等于“quantity”字段值。
 * 如：quantity: 5
 * file0：File_000
 * fileName0：'File_000.png'
 * file0：File_001
 * fileName0：'File_001.png'
 * ......
 * file0：File_004
 * fileName0：'File_004.png'
 *
 * 第3种，当然也可以结合上面2种方式：
 * uploadType: 'multiple'
 * files: [ File | Blob, ...... ]
 * quantity: 5
 * file0：File_000
 * fileName0：'File_000.png'
 * file0：File_001
 * fileName0：'File_001.png'
 * ......
 * file0：File_004
 * fileName0：'File_004.png'
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=multiple&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=multiple&isForcedWrite=true
 *
 * 1、客户端上传的body必须是用FormData包装。
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=multiple”。
 * 3、FormData中必须要有的字段：
 *    uploadType：值为'multiple'。
 *    files：其值类型为数组，其中的每一个成员的类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
 *      关于如何创建Blob见：
 *      https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *    quantity：其值类型为Number，表示有多少个文件被上传。
 *    fileX：其值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
 *      关于如何创建Blob见：
 *      https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 4、可选字段有：
 *    fileNameX：用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好还是带扩展名）。
 */
import UploadByMultiple from './UploadByMultiple.esm.mts';

/**
 * 单个大文件上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *
 * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&fileName=001.zip&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
 * 单个大文件上传不需要在URL上包含查询参数“type”，添加了它，就会执行单个大文件的分块上传的逻辑。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&fileName=001.zip&isForcedWrite=true
 *
 * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=bigFile”。
 * 3、特别注意！请求头必须包含“content-type”！
 * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
 * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
 */
import UploadByBigFile from './UploadByBigFile.esm.mts';

/**
 * 单个大文件的分块上传（支持POST请求、PUT请求）。
 * 客户端将大文件分成多个小块，一个一个小块上传，服务端接收后将这些小块存储在临时文件夹中，待全部接受完毕后，再合并它们，再删除临时文件夹。
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&type=part&fileName=001.zip&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带。
 * 单个大文件的分块上传必须在URL上包含查询参数“type”，其值必须是“part”。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&type=part&fileName=001.zip&isForcedWrite=true
 */
import UploadByBigFileForPart from './UploadByBigFileForPart.esm.mts';

/**
 * 单位为字节，除大文件上传没有文件大小的限制外，其他的文件上传方式都会限制上传的文件不能大于1GB。
 *
 * @type {number}
 */
const maxFileSize: number = 1 * 1024 * 1024 * 1024;

/**
 * 校验请求头中是否携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值。<br />
 * PS：<br />
 * 1、取自定义的请求头标识“deno-custom-file-sri”的值会被转成全部小写的字符串。<br />
 * 2、如果没取到自定义的请求头标识“deno-custom-file-sri”的值，也就是请求头中不带该自定义的请求头标识“deno-custom-file-sri”，会直接使用空字符串代替。<br />
 * 3、最后该函数的返回值要么是一个null表示没有找到对应SRI值（自定义的请求头标识“deno-custom-file-sri”的值）的文件信息，要么是一个为自定义类型I_UploadFileSRISchema的对象，表示找到了跟SRI值（自定义的请求头标识“deno-custom-file-sri”的值）一样的文件信息。<br />
 * 4、该自定义的请求头标识“deno-custom-file-sri”的功用是提供一个可以提前校验文件是否已经存在的校验能力，这样就不用走后面的各个逻辑处理，加快了文件上传的响应，毕竟存在了相同的文件，就不用再重复写入，而是直接响应给客户端一个已经存在的此文件的信息。<br />
 *
 * @param {Request} request 请求对象，无默认值，必须。
 *
 * @returns {Promise<T_QueryOneResult>} 返回值类型为null（null表示没有找到对应SRI值（自定义的请求头标识“deno-custom-file-sri”的值）的文件信息）、自定义类型I_UploadFileSRISchema（是一个对象，表示找到了跟SRI值（自定义的请求头标识“deno-custom-file-sri”的值）一样的文件信息）。
 */
async function ValidateReqHeadSRI( request: Request ): Promise<T_QueryOneResult>{
  const x_file_sri: string = ( request.headers.get( 'deno-custom-file-sri' ) ?? '' ).trim().toLowerCase();

  if( x_file_sri.length === 0 ){
    return null;
  }
  else{
    return await QueryOne( x_file_sri );
  }
}

/**
 * 当满足“Condition.esm.mts”中的条件时就会被执行以响应请求的处理函数。
 *
 * @param {Request} request 请求对象，无默认值，必须。
 *
 * @returns {Promise<T_Response001>} 返回值类型为Promise<T_Response001>。
 */
async function ResponseHandle( request: Request ): Promise<T_Response001>{
  const url: URL = new URL( request.url ),
    uploadType: string = ( url.searchParams.get( 'uploadType' ) ?? '' ).trim(),
    httpResHeaders: Record<string, string> = HttpResponseHeadersFun( request ) as Record<string, string>;

  let result: T_Response001;

  /**
   * 单个二进制文件流上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
   * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
   * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
   * 关于如何创建Blob见：
   * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   *
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=false
   * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
   * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=true
   *
   * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
   *
   * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
   * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
   * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
   * 关于如何创建Blob见：
   * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=binary”。
   * 3、特别注意！请求头必须包含“content-type”！
   * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
   * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
   */
  if( uploadType === 'binary' ){
    let result001: T_QueryOneResult = await ValidateReqHeadSRI( request ),
      contentLength: string = ( request.headers.get( 'content-length' ) ?? '' ).trim().toLowerCase();

    /**
     * 如果已经存在跟上传的文件一样的SRI值，那么就直接响应给客户端该文件的信息。
     */
    if( result001 ){
      result001 = result001 as I_UploadFileSRISchema;

      /**
       * 这步操作很关键！
       * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
       * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
       * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
       */
      await request.clone().arrayBuffer();

      result = new Response( JSON.stringify( {
        data: {
          // true表示上传成功，反之，表示失败。
          success: true,
          // 描述性说明。
          message: `已存在跟此文件（${ result001.fileName }，文件类型：${ result001.fileType }）的SRI值一致的文件，本次上传不写入此文件、不更新此文件信息。`,
          // 该属性值可供客户端再次获取上传到服务器的文件，值格式为“/simulation_servers_deno/upload/json/XXXXXX.json”，使用时直接发起GET请求“https://127.0.0.1:9200/simulation_servers_deno/upload/json/XXXXXX.json”即可获取到。
          filePath: `${ result001.filePath }`
        },
        messageStatus: resMessageStatus[ 200 ]
      } ), {
        status: 200,
        statusText: 'OK',
        headers: {
          ...httpResHeaders,
          'content-type': 'application/json; charset=utf-8',
        },
      } );
    }
    // 上传的文件大小大于设置的阈值时，会走这个响应给客户端，表示上传失败。
    else if( Number( contentLength ) > maxFileSize ){
      /**
       * 这步操作很关键！
       * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
       * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
       * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
       */
      await request.clone().arrayBuffer();

      result = new Response( JSON.stringify( {
        data: {
          // true表示上传成功，反之，表示失败。
          success: false,
          // 描述性说明。
          message: `不支持上传大于1GB的文件（本文件大小为：${ Number( Number( contentLength ) / 1024 / 1024 / 1024 ).toFixed( 2 ) }GB）。`,
        },
        messageStatus: resMessageStatus[ 1005 ]
      } ), {
        status: 200,
        statusText: 'OK',
        headers: {
          ...httpResHeaders,
          'content-type': 'application/json; charset=utf-8',
        },
      } );
    }
    // 如果不走上面的两个情况，就直接开始文件上传的具体操作等等。
    else{
      result = UploadByBinary( request );
    }
  }
  /**
   * 单文件上传（支持POST请求、PUT请求）。
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=single&isForcedWrite=false
   * 查询参数“isForcedWrite”是可选的。
   * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=single&isForcedWrite=true
   *
   * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
   *
   * 1、客户端上传的body必须是用FormData包装。
   * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=single”。
   * 3、FormData中必须要有的字段：
   *    uploadType：值为'single'。
   *    file：其值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
   *    关于如何创建Blob见：
   *    https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   * 4、可选字段有：
   *    fileName：用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好带扩展名）。
   */
  else if( uploadType === 'single' ){
    let result001: T_QueryOneResult = await ValidateReqHeadSRI( request ),
      contentLength: string = ( request.headers.get( 'content-length' ) ?? '' ).trim().toLowerCase();

    /**
     * 如果已经存在跟上传的文件一样的SRI值，那么就直接响应给客户端该文件的信息。
     */
    if( result001 ){
      result001 = result001 as I_UploadFileSRISchema;

      /**
       * 这步操作很关键！
       * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
       * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
       * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
       */
      await request.clone().arrayBuffer();

      result = new Response( JSON.stringify( {
        data: {
          // true表示上传成功，反之，表示失败。
          success: true,
          // 描述性说明。
          message: `已存在跟此文件（${ result001.fileName }，文件类型：${ result001.fileType }）的SRI值一致的文件，本次上传不写入此文件、不更新此文件信息。`,
          // 该属性值可供客户端再次获取上传到服务器的文件，值格式为“/simulation_servers_deno/upload/json/XXXXXX.json”，使用时直接发起GET请求“https://127.0.0.1:9200/simulation_servers_deno/upload/json/XXXXXX.json”即可获取到。
          filePath: `${ result001.filePath }`
        },
        messageStatus: resMessageStatus[ 200 ]
      } ), {
        status: 200,
        statusText: 'OK',
        headers: {
          ...httpResHeaders,
          'content-type': 'application/json; charset=utf-8',
        },
      } );
    }
    // 上传的文件大小大于设置的阈值时，会走这个响应给客户端，表示上传失败。
    else if( Number( contentLength ) > maxFileSize ){
      /**
       * 这步操作很关键！
       * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
       * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
       * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
       */
      await request.clone().arrayBuffer();

      result = new Response( JSON.stringify( {
        data: {
          // true表示上传成功，反之，表示失败。
          success: false,
          // 描述性说明。
          message: `不支持上传大于1GB的文件（本文件大小为：${ Number( Number( contentLength ) / 1024 / 1024 / 1024 ).toFixed( 2 ) }GB）。`,
        },
        messageStatus: resMessageStatus[ 1005 ]
      } ), {
        status: 200,
        statusText: 'OK',
        headers: {
          ...httpResHeaders,
          'content-type': 'application/json; charset=utf-8',
        },
      } );
    }
    // 如果不走上面的两个情况，就直接开始文件上传的具体操作等等。
    else{
      result = UploadBySingle( request );
    }
  }
  /**
   * 多文件批量上传（支持POST请求、PUT请求）。
   * 第1种多文件的上传方式：
   * 只使用“uploadType”、“files”字段，其中“files”字段对应的值里保存了多个需要上传的文件。
   * 客户端可以通过FormData的append方法，多次设置“files”字段，如：formData.append( 'files', File_001, 'File_001.png' )、formData.append( 'files', File_002, 'File_001.png' )、......。
   * formData.append()的第3个参数用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好还是带扩展名）。
   * “files”字段对应的值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
   *   关于如何创建Blob见：
   *   https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   *
   * 第2种多文件的上传方式：
   * 只使用“uploadType”、“quantity”、“fileX”、“fileNameX”字段，其中“quantity”字段表示有多少个文件被上传。
   * 然后“fileX”、“fileNameX”字段中的“X”就会用index来代替，index从0开始，总数等于“quantity”字段值。
   * 如：quantity: 5
   * file0：File_000
   * fileName0：'File_000.png'
   * file0：File_001
   * fileName0：'File_001.png'
   * ......
   * file0：File_004
   * fileName0：'File_004.png'
   *
   * 第3种，当然也可以结合上面2种方式：
   * uploadType: 'multiple'
   * files: [ File | Blob, ...... ]
   * quantity: 5
   * file0：File_000
   * fileName0：'File_000.png'
   * file0：File_001
   * fileName0：'File_001.png'
   * ......
   * file0：File_004
   * fileName0：'File_004.png'
   *
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=multiple&isForcedWrite=false
   * 查询参数“isForcedWrite”是可选的。
   * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=multiple&isForcedWrite=true
   *
   * 1、客户端上传的body必须是用FormData包装。
   * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=multiple”。
   * 3、FormData中必须要有的字段：
   *    uploadType：值为'multiple'。
   *    files：其值类型为数组，其中的每一个成员的类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
   *      关于如何创建Blob见：
   *      https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   *    quantity：其值类型为Number，表示有多少个文件被上传。
   *    fileX：其值类型可以是File、Blob二者之一，其他数据类型可以先转换成Blob再上传。
   *      关于如何创建Blob见：
   *      https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   * 4、可选字段有：
   *    fileNameX：用来备注上传文件的文件名（如带扩展名的：1.png），虽然可选，但尽量还是设置吧，有没有带扩展名都行（最好还是带扩展名）。
   */
  else if( uploadType === 'multiple' ){
    result = UploadByMultiple( request );
  }
  /**
   * 单个大文件上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
   * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
   * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
   * 关于如何创建Blob见：
   * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   *
   * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
   *
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&fileName=001.zip&isForcedWrite=false
   * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
   * 单个大文件上传不需要在URL上包含查询参数“type”，添加了它，就会执行单个大文件的分块上传的逻辑。
   * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
   * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&fileName=001.zip&isForcedWrite=true
   *
   * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
   * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
   * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
   * 关于如何创建Blob见：
   * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
   * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=bigFile”。
   * 3、特别注意！请求头必须包含“content-type”！
   * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
   * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
   */
  else if( uploadType === 'bigFile' ){
    let result001: T_QueryOneResult = await ValidateReqHeadSRI( request ),
      type001: string = ( url.searchParams.get( 'type' ) ?? '' ).trim();

    /**
     * 如果已经存在跟上传的文件一样的SRI值，那么就直接响应给客户端该文件的信息。
     */
    if( result001 ){
      result001 = result001 as I_UploadFileSRISchema;

      /**
       * 这步操作很关键！
       * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
       * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
       * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
       */
      await request.clone().arrayBuffer();

      result = new Response( JSON.stringify( {
        data: {
          // true表示上传成功，反之，表示失败。
          success: true,
          // 描述性说明。
          message: `已存在跟此文件（${ result001.fileName }，文件类型：${ result001.fileType }）的SRI值一致的文件，本次上传不写入此文件、不更新此文件信息。`,
          // 该属性值可供客户端再次获取上传到服务器的文件，值格式为“/simulation_servers_deno/upload/json/XXXXXX.json”，使用时直接发起GET请求“https://127.0.0.1:9200/simulation_servers_deno/upload/json/XXXXXX.json”即可获取到。
          filePath: `${ result001.filePath }`
        },
        messageStatus: resMessageStatus[ 200 ]
      } ), {
        status: 200,
        statusText: 'OK',
        headers: {
          ...httpResHeaders,
          'content-type': 'application/json; charset=utf-8',
        },
      } );
    }
    /**
     * 单个大文件的分块上传（支持POST请求、PUT请求）。
     * 客户端将大文件分成多个小块，一个一个小块上传，服务端接收后将这些小块存储在临时文件夹中，待全部接受完毕后，再合并它们，再删除临时文件夹。
     *
     * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&type=part&fileName=001.zip&isForcedWrite=false
     * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带。
     * 单个大文件的分块上传必须在URL上包含查询参数“type”，其值必须是“part”。
     * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
     * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=bigFile&type=part&fileName=001.zip&isForcedWrite=true
     */
    else if( type001 === 'part' ){
      result = UploadByBigFileForPart( request );
    }
    // 这个是处理客户端发起的“单个大文件上传”。
    else{
      result = UploadByBigFile( request );
    }
  }
  /**
   * 如果客户端发起的请求的URL上缺少查询参数“uploadType”或者其值不为“binary”、“single”、“multiple”、“bigFile”之一就会走这里的逻辑，响应给客户端一个不成功的信息。
   */
  else{
    /**
     * 这步操作很关键！
     * 因为当服务器验证了请求头里的文件sri值已经存在数据库中，那么会立即返回响应，同时也会关闭对应的连接！
     * 而此时，客户端发起的请求连接中还有数据正在上传，那么会因为服务端已经结束并关闭了对应的连接！导致正在上传的数据出现无法写入服务器等等的错误报告！
     * 有个解决方案就是等请求的数据接收完，再返回各个逻辑的响应给客户端。
     */
    await request.clone().arrayBuffer();

    result = new Response( JSON.stringify( {
      data: {
        // true表示上传成功，反之，表示失败。
        success: false,
        // 描述性说明。
        message: `请求的url（${ url.pathname }${ url.search }）上缺少查询参数“uploadType”，其有效值有：“binary”、“single”、“multiple”、“bigFile”。`,
      },
      messageStatus: resMessageStatus[ 1003 ],
    } ), {
      status: 200,
      statusText: 'OK',
      headers: {
        ...httpResHeaders,
        'content-type': 'application/json; charset=utf-8',
      },
    } );
  }

  return result;
}

// 必须部署这个默认的导出值。
export default ResponseHandle;
