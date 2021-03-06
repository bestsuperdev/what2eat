## React Less Boilerplate
这个脚手架项目专门为webpack+react开发单页应用定制，支持ie8以及其他现代浏览器，并采用less和postcss处理css。


### IE8 支持
将  package.josn 中 react 和 react-dom 改为 0.14.0 版本  
开发过程中，禁止使用 es6 module 写法  

### 开始

1. clone this repo
2. cd into folder
3. `npm install`
4. `npm start` 启动开发服务器
5. auto open http://yourIP:9000 (not localhost or 127.0.0.1 , for mobile test)



### 内置部件
webpack集成了对react jsx语法和es2015的支持，由babel实现。关于babel对es2015的支持情况，可以查看babel的相关文档[babel](http://babeljs.io/)
less预处理器
postcss 后处理器


### 启动restful测试数据服务器
`npm run mock` 启动测试数据服务器，数据配置在mock文件夹里，更详细的配置请参考[json-server文档](https://github.com/typicode/json-server)

### 代码规范检查
```
npm run lint
```
采用eslint对js代码进行检查，配置文件为.eslintrc.json ，可以参考官方文档[eslint](http://eslint.org/)

### 执行单元测试
```
npm run test
```
采用karma和jasmine的组合进行单元测试，karma是一个针对web前端进行单元测试的自动化环境，jasmine是单元测试框架。单元测试的代码支持es6，请在test文件夹中新建测试文件。
可以参考官方文档[karma](http://karma-runner.github.io/) [jasmine](http://jasmine.github.io/)




### 设置代理
`npm start`启动的是webpack-dev-server服务器并进行开发，如果需要请求api进行开发测试，那么就会存在跨域的问题，因此需要设置webpack-dev-server的代理服务器，将webpack-dev-server服务器的一个path映射到api服务器。请更改server.js文件中的new WebpackDevServer 第二个参数的proxy属性，示例如下：
```
// `/api/*` 会映射 http://127.0.0.1:3000/api/* ，如 `/api/todos` 映射 http://127.0.0.1:3000/api/todos
new WebpackDevServer(webpack(config), {
  proxy : {
    '/api/*' : {
      target : 'http://127.0.0.1:3000'
    }
  }
  
})
```
已经内置集成了一个restful测试数据服务器json-server，通过`npm run mock`启动，并从webpack-dev-server指向该服务，通过 `http://yourIP:9000/api` 可以访问，[点击查看json-server文档](https://github.com/typicode/json-server)

关于apiPath的另外一些tips，可以查看 [前后端分离下的前后端交互路径问题](https://github.com/mingzepeng/react-boilerplate/blob/master/doc/apiPath.md)


### 图片和字体引入
目前支持的图片引入为小于等于 30kb 的文件，会作为dataUrl编译在js或者css文件中，url返回dataUrl，超过该大小，会返回图片的url，css同理。
```javascript
var url = require('img.png')
var img = new Image
img.src = url
```

支持css引入字体文件，编译的时候会自动处理路径。

### 编译打包
会在dist文件中输出合并后的js，css，图片，字体等静态资源文件。
```
npm run deploy
```

### 打包完成之后与后台整合
在dist命令完成之后，会在dist文件夹中生成打包的文件，包括 index,js,css 以及图片字体等文件，请按照index.html的模板方式引入，head里面引入css文件，body底部引入js文件。

建议项目默认打包后的静态资源文件都放在后台项目的bundles文件夹中（index.html可以不需要添加）
