/**
 * Project: web-for-vite-project-template
 * FileDirPath: simulation_servers/deno/src/database/mongo/MongooseConnect.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-12-07 08:34:26 星期三
 */

/**
 * 开始使用“mongoose”连接MongoDB数据库，导出2个操作函数供建立数据库连接：
 * 1、MongooseConnect函数，返回一个数据库连接实例，用于关闭、切换数据库等等操作。
 * 2、MongooseConnectForSingleton函数，返回1个对象，里面有2个属性：<br />
 * {<br />
 *   MyMongooseConnection：自定义类MyMongooseConnection的实例，其中自定义类MyMongooseConnection继承自“Mongoose”的“Connection类”。<br />
 *   注意，该自定义类重写了“Mongoose”的“Connection类”的“close函数”，用于在关闭数据库连接时执行变量mongooseConnectForSingleton的清空操作，也就是将其设置为null。<br />
 *   所以，要关闭数据库连接，要通过执行：MyMongooseConnection.close( true )，来关闭才能达到上面的清空操作。<br />
 *   其他的数据库操作，则可以通过下面的“MongooseClient”属性来操作，当然“MyMongooseConnection”属性也是可以的，但是还是推荐使用下面的“MongooseClient”属性。<br />
 * 
 *   MongooseClient：“Mongoose”的“Connection类”的实例，通过它可以进行数据库的各种操作。<br />
 *   但是要关闭数据库连接，则要通过上面的“MyMongooseConnection”属性执行：MyMongooseConnection.close( true )，详细见上面的描述。<br />
 * }<br />
 */

'use strict';

import {
  type Connection,

  Mongoose,
} from 'npm:mongoose';

import {
  config,
  dbName,
  uri,
} from './MongooseConfig.esm.mts';

/**
 * 自定义类型，表示一个函数类型。<br />
 *
 * 有一个函数参数：methodName，该参数目前仅有1个字符串类型的值：'close'，表示“mongoose”驱动器的“Connection类”执行了“close()”，无默认值，可选。
 */
export type TypeCBFun001 = ( methodName?: string ) => void;

/**
 * 自定义类型，1个对象，里面有2个属性：<br />
 * {<br />
 *   MyMongooseConnection：自定义类MyMongooseConnection的实例，其中自定义类MyMongooseConnection继承自“Mongoose”的“Connection类”。<br />
 *   注意，该自定义类重写了“Mongoose”的“Connection类”的“close函数”，用于在关闭数据库连接时执行变量mongooseConnectForSingleton的清空操作，也就是将其设置为null。<br />
 *   所以，要关闭数据库连接，要通过执行：MyMongooseConnection.close( true )，来关闭才能达到上面的清空操作。<br />
 *   其他的数据库操作，则可以通过下面的“MongooseClient”属性来操作，当然“MyMongooseConnection”属性也是可以的，但是还是推荐使用下面的“MongooseClient”属性。<br />
 * 
 *   MongooseClient：“Mongoose”的“Connection类”的实例，通过它可以进行数据库的各种操作。<br />
 *   但是要关闭数据库连接，则要通过上面的“MyMongooseConnection”属性执行：MyMongooseConnection.close( true )，详细见上面的描述。<br />
 * }<br />
 */
export type TypeMongooseConnectForSingleton = {
  /**
   * 自定义类MyMongooseConnection的实例，其中自定义类MyMongooseConnection继承自“Mongoose”的“Connection类”。<br />
   * 注意，该自定义类重写了“Mongoose”的“Connection类”的“close函数”，用于在关闭数据库连接时执行变量mongooseConnectForSingleton的清空操作，也就是将其设置为null。<br />
   * 所以，要关闭数据库连接，要通过执行：MyMongooseConnection.close( true )，来关闭才能达到上面的清空操作。<br />
   * 其他的数据库操作，则可以通过下面的“MongooseClient”属性来操作，当然“MyMongooseConnection”属性也是可以的，但是还是推荐使用下面的“MongooseClient”属性。<br />
   */
  MyMongooseConnection: MyMongooseConnection;
  /**
   * “Mongoose”的“Connection类”的实例，通过它可以进行数据库的各种操作。<br />
   * 但是要关闭数据库连接，则要通过上面的“MyMongooseConnection”属性执行：MyMongooseConnection.close( true )，详细见上面的描述。<br />
   */
  MongooseClient: Connection;
};

/**
 * @type {TypeMongooseConnectForSingleton | null} 单例变量。
 */
let mongooseConnectForSingleton: TypeMongooseConnectForSingleton | null;

/**
 * 该自定义“MyMongooseConnection”类是继承了“Mongoose”驱动器的“Connection类”。<br />
 * 1、扩展了在关闭数据库连接时（即“mongoose”驱动器的“Connection类”执行了“close()”时）执行回调函数（函数类型见TypeCBFun001），用于处理指定的逻辑。<br />
 * 2、这个回调函数（函数类型见TypeCBFun001）的初始化是在该自定义“MyMongooseConnection”类在被实例化时，传给构造函数的参数，该参数的数据类型为一个函数（函数类型见TypeCBFun001）。<br />
 */
export class MyMongooseConnection
  extends ( new Mongoose() ).Connection {

  /**
   * 该私有属性是一个函数（函数类型见TypeCBFun001）。<br />
   * 该函数（函数类型见TypeCBFun001）是在关闭数据库连接时（即“mongoose”驱动器的“Connection类”执行了“close()”时，用于处理指定的逻辑。<br />
   *
   * @param {string} methodName 该参数的值目前仅有一个：'close'，表示“mongoose”驱动器的“Connection类”执行了“close()”，无默认值，可选。
   */
  #cb: TypeCBFun001 = (
    // @ts-expect-error
    methodName?: string
  ): void => {
  };

  /**
   * 该自定义“MyMongooseConnection”类是继承了“Mongoose”驱动器的“Connection类”。<br />
   * 1、扩展了在关闭数据库连接时（即“mongoose”驱动器的“Connection类”执行了“close()”时）执行回调函数（函数类型见TypeCBFun001），用于处理指定的逻辑。<br />
   * 2、这个回调函数（函数类型见TypeCBFun001）的初始化是在该自定义“MyMongooseConnection”类在被实例化时，传给构造函数的参数，该参数的数据类型为一个函数（函数类型见TypeCBFun001）。<br />
   *
   * @param {TypeCBFun001 | undefined} cb 该函数（函数类型见TypeCBFun001）是在关闭数据库连接时（即“mongoose”驱动器的“Connection类”执行了“close()”时）执行的，用于处理指定的逻辑，默认值：( methodName?: string ): void => {}，可选。
   */
  constructor( cb: TypeCBFun001 | undefined = (
    // @ts-expect-error
    methodName?: string
  ): void => {
  } ){
    super();

    this.#cb = cb;
  }

  /**
   * 用于关闭数据库连接，并在关闭后执行指定的回调函数（函数类型见TypeCBFun001），并为该回调函数传入一个字符串'close'，表示“mongoose”驱动器的“Connection类”执行了“close()”。
   *
   * @param {boolean} force 是否强制关闭连接，true表示强制关闭连接，默认值：true，可选。
   *
   * @returns {Promise<void>}
   */
  override async close( force: boolean = true ): Promise<void>{
    await super.close( force );

    this.#cb( 'close' );
  }

}

/**
 * 开始使用“mongoose”连接MongoDB数据库，并返回一个数据库连接实例，用于关闭、切换数据库等等操作。<br />
 *
 * @returns {Connection} 返回一个数据库连接实例，用于关闭、切换数据库等等操作。
 */
function MongooseConnect(): Connection{
  return new Mongoose().createConnection( uri, config ).useDb( dbName );
}

/**
 * 单例的，开始使用“mongoose”连接MongoDB数据库，并返回1个对象，里面有2个属性：<br />
 * {<br />
 *   MyMongooseConnection：自定义类MyMongooseConnection的实例，其中自定义类MyMongooseConnection继承自“Mongoose”的“Connection类”。<br />
 *   注意，该自定义类重写了“Mongoose”的“Connection类”的“close函数”，用于在关闭数据库连接时执行变量mongooseConnectForSingleton的清空操作，也就是将其设置为null。<br />
 *   所以，要关闭数据库连接，要通过执行：MyMongooseConnection.close( true )，来关闭才能达到上面的清空操作。<br />
 *   其他的数据库操作，则可以通过下面的“MongooseClient”属性来操作，当然“MyMongooseConnection”属性也是可以的，但是还是推荐使用下面的“MongooseClient”属性。<br />
 *
 *   MongooseClient：“Mongoose”的“Connection类”的实例，通过它可以进行数据库的各种操作。<br />
 *   但是要关闭数据库连接，则要通过上面的“MyMongooseConnection”属性执行：MyMongooseConnection.close( true )，详细见上面的描述。<br />
 * }<br />
 *
 * @returns {Promise<TypeMongooseConnectForSingleton>}
 */
async function MongooseConnectForSingleton(): Promise<TypeMongooseConnectForSingleton>{
  if( !mongooseConnectForSingleton ){
    const myMongooseConnection: MyMongooseConnection = new MyMongooseConnection( ( methodName?: string ): void => {
      if( methodName === 'close' ){
        mongooseConnectForSingleton = null;
      }
    } );

    mongooseConnectForSingleton = {
      MyMongooseConnection: myMongooseConnection,
      MongooseClient: ( await myMongooseConnection.openUri( uri, config ) ).useDb( dbName ),
    };
  }

  return mongooseConnectForSingleton as TypeMongooseConnectForSingleton;
}

export {
  MongooseConnect,
  MongooseConnectForSingleton,
};

export default {
  MongooseConnect,
  MongooseConnectForSingleton,
};
