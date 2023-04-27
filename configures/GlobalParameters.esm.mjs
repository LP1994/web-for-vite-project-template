/**
 * Project: web-for-vite-project-template
 * FileDirPath: configures/GlobalParameters.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 用于存放项目中全局的配置属性、变量等等。
 * 1、尽量在这里写供全局用的属性、变量等等，方便一处修改自动作用到任何使用它们的地方。
 */

'use strict';

/**
 * 给浏览器调试用的主机名，不是给“server.host”用的。<br />
 * 1、实测注意一点，当用'0.0.0.0'这个值设置给“server.host”时，会让服务器可以从外部访问，包括：本地（localhost）、局域网（192.168.1.3）、IPV6等等，但是不能用'0.0.0.0'来访问（Windows系统上是访问不了'0.0.0.0'的！），还是得通过：本地（localhost）、局域网（192.168.1.3）来访问的。<br />
 */
const localHost = 'localhost';

/**
 * 给Vite的顶级配置项“server”用的参数，分2种环境dev_server、local_server。<br />
 */
const devServerGlobalParameters = {
  /**
   * 环境dev_server用。<br />
   */
  dev_server: {
    /**
     * 不是给“server.host”用的，是给“server.open”用的在浏览器打开页面的host。<br />
     * 1、可以是：'localhost'、'192.168.1.3'等等。<br />
     */
    host: localHost,
    /**
     * 指定一个端口号来监听请求，给“server.port”用的。<br />
     * 1、有效值类型有：number。<br />
     */
    port: 8500,
  },
  /**
   * 环境local_server用。<br />
   */
  local_server: {
    /**
     * 不是给“server.host”用的，是给“server.open”用的在浏览器打开页面的host。<br />
     * 1、可以是：'localhost'、'192.168.1.3'等等。<br />
     */
    host: localHost,
    /**
     * 指定一个端口号来监听请求，给“server.port”用的。<br />
     * 1、有效值类型有：number。<br />
     */
    port: 8600,
  },
};

export {
  devServerGlobalParameters,
};

export default {
  devServerGlobalParameters,
};
