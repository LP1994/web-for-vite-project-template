This is a WEB for Vite project template.<br />

<br />

介绍：<br />
1、这是一个可以“即开即用”基于Vite 5.X的WEB前端项目开发模板，目前对于“微前端架构（目前使用的是“Module Federation 2”）”的支持正在测试中。<br />
2、用于WEB前端项目的快速搭建、开发、编译、打包等WEB前端项目流程操作。<br />
3、内置了大多数WEB前端项目都会有的各种配置。<br />
4、内置支持Vue（默认使用的是Vue 3版本）、TypeScript，也允许自定义扩展成自己想要的WEB项目开发环境（如扩展成：React、Angular等等）。<br />
5、“src/tools”文件夹下有几个个人总结的JS工具类及其详细的文档。<br />
6、“subsystems”文件夹下都是“微前端架构（目前使用的是“Module Federation 2”）”中各个“子系统”工程的文件夹。<br />
7、“element-ui”有2.0的也有3.0（element-plus）的，默认使用3.0的element-plus。<br />
8、“simulation_servers/deno”下有基于HTTP/2实现的服务端（提供https://、wss://服务），本人亲自对比过，HTTP/2确实在并发方面强于HTTP1.1，强的不是一星半点，对比见“simulation_servers/deno/notes/关于HTTP2跟HTTP1_1的直观对比”文件夹下的4张图片。<br />
9、在“simulation_servers/deno/src/database/mongo/test”中有“npm包的mongoose”、“npm包的mongodb”的配置参考，编写了这两者的“deno”、“node”版本，都测试通过了，可用，但是有些许差异。<br />

<br />

基于vite的使用Worker的说明和注意事项。<br />
1、要想让vite处理Worker文件中的各种文件的导入处理、第3方库的导入处理、ts代码的编译等等，就要使用这些写法来创建Worker：<br />
<code>
import TestWorker from './test.worker.ts?worker';
</code>
<br />
<code>
import TestWorker from './test.worker.ts?worker&inline';
</code>
<br />
<code>
import TestWorker from './test.worker.ts?sharedworker';
</code>
<br />
<code>
import TestWorker from './test.worker.ts?sharedworker&inline';
</code>
<br />
只有这些写法才能成功编译并被成功执行。<br />

2、当是如果是使用这些写法，那就无法处理上诉提到的各种处理：<br />
?worker&url、<br />
?sharedworker&url、<br />
new Worker( new URL( './test.worker.ts', import.meta.url ) )、<br />
<code>
import TestWorker from './test.worker.ts?worker&url';
new Worker( TestWorker );
</code>

3、关于在vite中Worker构造函数的第2个参数option.type的说明：<br />
生产模式用'classic'，开发用'module'。<br />
开发模式下，被Vite强制设置成'module'，所以，如果在编码时需要设置option.type的值，也要遵循这个规定，也就是开发时设置成'module'。<br />
生产模式下，Vite是没强制设置的，但是最好用'classic'，也就是在编码时需要设置option.type的值，最好设置成'classic'，因为火狐浏览器在'classic'下不会出现BUG，但是如果是'module'，火狐浏览器会报错。<br />
所以，vite.worker.format也要设置成'iife'，才会在生产模式时，vite能启用正确的设置。<br />
强烈建议：<br />
开发时，将Worker构造函数的第2个参数option.type的值设置成'module'。<br />
生产时，将Worker构造函数的第2个参数option.type的值设置成'classic'。<br />
并且始终保持vite.worker.format的值为'iife'。<br />
而且开发调试时，也不要用火狐浏览器进行调式。<br />
