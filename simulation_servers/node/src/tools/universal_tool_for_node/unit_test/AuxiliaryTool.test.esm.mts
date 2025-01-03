/**
 * Project: web-for-vite-project-template
 * FileDirPath: simulation_servers/node/src/tools/universal_tool_for_node/unit_test/AuxiliaryTool.test.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 给单元测试用的辅助工具。
 */

'use strict';

import chalk from 'chalk';

export type T_MyExpect001 = any;

export type T_Error001 = {
  // 预期值。
  expect: T_MyExpect001;
  // 一个用于描述错误信息的字符串。
  message: string;
  // 实际值。
  result: any;
  // 是否成功。
  isSuccess: boolean;
};

/**
 * 使用“!==”比较的对比函数Equal001。<br />
 * PS：<br />
 * 1、如果不相等，会抛出一个异常类MyError001的实例。<br />
 *
 * @param {any} result 被测试对象的实际返回值，必需。
 *
 * @returns {{toBe: (expect: (T_MyExpect001)) => void}} 返回一个对象，里头有一个toBe函数，它接收一个预期值expect，用于跟实际值对比。
 */
export function Equal001( result: any ): {
  toBe: ( expect: T_MyExpect001 ) => void;
}{
  return {
    /**
     * toBe函数，它接收一个预期值expect，用于跟实际值对比。
     *
     * @param {T_MyExpect001} expect 预期值，必需。
     */
    toBe( expect: T_MyExpect001 ): void{
      if( result !== expect ){
        throw new MyError001( {
          message: '实际值和预期值不全等（使用“!==”比较）！',
          result,
          expect,
          isSuccess: false,
        } );
      }
      else{
        throw new MyError001( {
          message: '实际值和预期值全等（使用“===”比较）！',
          result,
          expect,
          isSuccess: true,
        } );
      }
    },
  };
}

/**
 * 继承Error类的自定义异常类MyError001。<br />
 * PS：<br />
 * 1、new这个类时，必传一个对象作为初始化数据，其结构为{ message:一个用于描述错误信息的字符串，必需, result:实际值，必需, expect:预期值，必需, isSuccess:是否成功，必需 }，这样捕获该异常时，就会收到这个对象（既try...catch( error )中的error）。<br />
 */
export class MyError001
  extends Error {

  /**
   * 预期值。
   *
   * @type {T_MyExpect001}
   */
  public expect: T_MyExpect001;

  /**
   * 实际值。
   *
   * @type {any}
   */
  public result: any;

  /**
   * 是否成功。
   *
   * @type {boolean}
   */
  public isSuccess: boolean;

  /**
   * 构造函数，必传一个对象作为初始化数据，这样捕获该异常时，就会收到这个对象（既try...catch( error )中的error）。
   *
   * @param {object} config 构造函数的初始参数，是一个对象。
   *
   * @param {T_MyExpect001} config.expect 预期值，必需。
   *
   * @param {string} config.message 一个用于描述错误信息的字符串，必需。
   *
   * @param {any} config.result 实际值，必需。
   *
   * @param {boolean} config.isSuccess 是否成功，必需。
   */
  public constructor( {
    expect,
    message,
    result,
    isSuccess,
  }: T_Error001 ){
    super();

    this.expect = expect;
    this.message = message;
    this.result = result;
    this.isSuccess = isSuccess;
  }

}

/**
 * 执行测试代码的测试函数Test001。<br />
 * PS：<br />
 * 1、如果没通过测试，会捕获一个异常，并输出异常信息。<br />
 *
 * @param {string} desc 用于描述测试对象，必需。
 *
 * @param {() => void} fn 执行函数，必需。
 */
export function Test001( desc: string, fn: () => void ): void{
  try{
    fn();
  }
  catch( error: unknown ){
    const {
      expect,
      message,
      result,
      isSuccess,
    } = ( error as T_Error001 );

    if( isSuccess ){
      console.log( chalk.green( `
${ desc }，${ message }
实际值：
${ String( result ) }
预期值：
${ String( expect ) }
` ) );
    }
    else{
      console.error( chalk.red( `
${ desc }，${ message }
实际值：
${ String( result ) }
预期值：
${ String( expect ) }
` ) );
    }
  }
}

export {
  chalk,
};

export default {
  chalk,
  Equal001,
  MyError001,
  Test001,
};
