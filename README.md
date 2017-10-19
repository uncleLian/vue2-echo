#  vue2-echo

![image](https://img.shields.io/badge/vue-2.3.3-blue.svg)
![image](https://img.shields.io/badge/music--ui-2.1.0-blue.svg)
![image](https://img.shields.io/badge/license-MIT-blue.svg)

## 前言
这半年多一直用Vue写项目，感觉用的挺得心应手，所以准备分享一些经验和记录成果。我上网搜了Vue的练手项目和视频教程，目前大多数都是音乐、购物车，后台管理那方面，可能因为这方面需求比较多吧。考虑之后打算从容易 -> 中等 -> 困难 3个复杂度和不同类型的项目，一步步地带领大家深入Vue。作为上线项目，完成基本功能还是不行的，还需要很多细节的处理、优化、修复，往往这些细节就是最烦的，网上很多也搜索不到，又要自己去分析、实践，才能运用到自己项目上，这里会浪费大量大量的时间，所以在项目里我注释大量的提示：都是我在上线项目实践过的一些经验，供大家参考。

这里先贴一下我接下来Vue项目的分享过程：
```
第一阶段：音乐类：ehco回声 —— 移动端 （难度：简单 ~ 中等）
第二阶段：新闻类：今日头条 —— 移动端 & native app （功能高度还原，也做了很多修改。难度：中等 ~ 困难，我觉得这个项目可以算困难了~）
第三阶段：后台类：头条号 —— pc端 & 也会接入native app （配套第二阶段，主要是服务第二阶段的文章编辑和管理。难度：中等 ~ 困难）
```
##### 注：此系列只关注前端项目的实现，后端等知识不是此系列的范围，但会告知一二。

## 技术栈

> Vue-cli、Vue2.x、Vuex、Vue-router、vue-awesome-swiper、vue-progressbar

> axios、muse-ui、Mockjs、flexible.js、Material Icons

> ES6/7、Stylus、ESlint、webpack、

## 说明
> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！^_^

> 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

> 开发环境 macOS 10.12.6、Chrome 61、 nodejs 8.4.0

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍


#### 最终目标

- 第一阶段：echo回声（移动端） —— [仓库地址](https://github.com/uncleLian/vue2-echo) —— [项目效果请戳这里](http://echo.liansixin.win)

- 第二阶段：今日头条（移动端 & native app） —— 仓库地址：正在完善，敬请期待！ —— [项目效果请戳这里](http://m.toutiaojk.com)

- 第三阶段：头条号（pc端） —— 仓库地址：还在开发，敬请期待！

#### 注意
```
1、因为vue-router 使用 hitstory 模式，所以线上项目刷新是会出现404的，这里是需要后端配置一下的。在开发环境不会出现这种问题，建议下载项目查看最佳效果。具体解释在router里免。
2、因为是纯前端项目，数据是使用mock模拟的，数据结构跟官方保持一致，只是没有了一些其他功能的数据，类似评论等。
3、示例demo是直接build之后托管在Github的
4、手机查看项目有些浏览器不支持自动播放音乐的，需要手动触发。
```

## 效果演示 

[查看deme请戳这里](http://echo.liansixin.win)（请使用chrome手机模式预览）

### 移动端扫描下方二维码

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_QRcode.png" width="250" height="250"/>

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放 & 暂停 & 下一首
- [x] 播放模式： 默认、随机播放、单曲循环、列表循环
- [x] 播放进度条 & 可调节播放进度
- [x] 播放列表 & 可删除播放列表 & 可点击切换音乐
- [x] 一键播放
- [ ] 弹幕 （太耗移动web性能和个人时间，暂不实现啦）
- [ ] 手机铃声（好像只有app获取用户手机权限才能实现，web暂不可能实现，如果可以实现请告知我）

## 项目截图

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_index.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_index.gif" width="365" height="619"/>

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_detail.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_detail.gif" width="365" height="619"/>

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_fn.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_fn.gif" width="365" height="619"/>

## 目录结构

``` bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── assets                 // 样式、图标等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 全局公用方法
│   ├── mock                   // mock数据
│   ├── page                   // 应用页面
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 空文件夹，只作为github保留
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json
```

## 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build

本项目没有依赖JQuery，如需要使用JQuery，打开build目录的webpack.dev.conf.js 和 webpack.prod.conf.js 里面的JQuery代码，并npm install jquery -save
```

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- QQ：771674109
- WX：L771674109


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present，uncleLian
