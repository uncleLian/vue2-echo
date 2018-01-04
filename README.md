#  vue2-echo

![image](https://img.shields.io/badge/vue-2.5.2-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/muse--ui-2.1.0-blue.svg)

## 前言
这半年多一直用Vue写项目，感觉用的挺得心应手，所以准备分享一些经验和记录成果。我上网搜了Vue的练手项目和视频教程，目前大多数都是音乐、购物车，后台管理那方面，可能因为这方面需求比较多吧。考虑之后打算从容易 -> 中等 -> 困难， 3个复杂度和不同类型的项目，一步步地带领大家深入Vue。这3个阶段的项目将会涉及Vue的大部分知识，如果你都能掌握，那么你就可以随心所欲地使用Vue去写单页面应用了。

此开源系列的知识点全部都是线上实践过的，会考虑到细节、兼容和使用体验的问题，所以在项目里我会尽可能地写上注释去帮助大家快速了解项目和解决所需。

## 技术栈
1. [vue](https://cn.vuejs.org/v2/guide/)
2. [vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)
3. [vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)
4. [axios（请求库）](https://github.com/axios/axios)
5. [muse-ui（移动端UI库）](http://www.muse-ui.org/#/install)
6. [vue-awesome-swiper（轮播图）](https://github.com/surmon-china/vue-awesome-swiper)
7. [vue-progressbar（加载进度条）](https://github.com/hilongjw/vue-progressbar)
8. [amfe-flexible（淘宝适配库）](https://github.com/amfe/lib-flexible)
9. [mockjs（数据模拟）](http://mockjs.com/)
10. [Material Icons（google图标库）](http://google.github.io/material-design-icons/)
11. [Stylus（css预处理器）](https://github.com/stylus/stylus)
12. [ES6/7（JS语法）](https://github.com/lukehoban/es6features)
13. [ESlint（JS语法规范）](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)

## 说明
> 如果对您有帮助，您可以点右上角 "star"一下， 您的支持是我最大的动力！非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下，我会不断开源更多实用的项目。

> 如有问题可以直接在 Issues 中提，或者加入我们下方的vue群更进一步地交流。

> 该项目是此开源系列的其中一个阶段，更多内容查看下方的最终目标

## 最终目标

- 第一阶段：echo回声（移动端，难度：简单 ~ 中等） —— [仓库地址](https://github.com/uncleLian/vue2-echo) —— [演示地址](http://echo.liansixin.win)

- 第二阶段：今日头条（移动端 & native，难度：困难） —— [仓库地址](https://github.com/uncleLian/vue2-news) —— [web演示地址](http://toutiao.liansixin.win)， [native端演示地址](http://native.liansixin.win)

- 第三阶段：头条号（pc端，难度：中等 ~ 困难） —— [仓库地址](https://github.com/uncleLian/vue2-health) —— [演示地址](http://health.liansixin.win)  （还在开发，敬请期待！已实现核心功能）

##### 注：此系列只关注前端项目的实现，后端等知识不是此系列的范围，但会告知一二。

## 其他开源项目
- 后台类应用模板（vue全家桶 + element-ui） —— [仓库地址](https://github.com/uncleLian/vue2-blog) —— [演示地址](http://blog.liansixin.win/) 

## 效果演示 

[查看deme请戳这里](http://echo.liansixin.win)（请使用chrome手机模式预览）

### 移动端扫描下方二维码

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_QRcode.png" width="250" height="250"/>

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放行为：播放、暂停、下一首、一键播放
- [x] 播放模式：默认、随机播放、单曲循环、列表循环
- [x] 播放视图：播放进度条（可调节）、播放列表（可增删、切换）
- [ ] 弹幕 （没有评论数据，暂不实现啦T T~）
- [ ] 手机铃声（网页没有不能调用手机底层，不能实现）

## 项目截图

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_index.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_detail.png" width="365" height="619"/>

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_fn.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_detail.gif" width="365" height="619"/>

## 目录结构

``` bash
├── build                        // 构建相关  
├── config                       // 配置相关
├── src                          
│   ├── assets                   // 静态资源 样式、图标等静态资源
│   ├── components               // 全局公用组件
│   |   ├── banner.vue           // banner组件
│   |   ├── list.vue             // 列表组件
│   |   ├── musicBar.vue         // 音乐条组件
│   |   ├── sheet.vue            // 模态框组件
│   ├── utils                   
│   |   ├── cache.js             // 缓存方法
│   |   ├── fetch.js             // 请求方法
│   |   ├── tool.js              // 工具方法
│   ├── mock                     // mock数据
│   ├── page                   
│   |   ├── detail               //  详情页
│   |   ├── index                //  首页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── App.vue                  // 入口页面
│   └── main.js                  // 入口配置
├── static                       //空文件夹，只作为github保留                   
├── .babelrc                     // babel-loader 配置
├── eslintrc.js                  // eslint 配置项
├── .gitignore                   // git 忽略项
├── index.html                   // html模板
└── package.json                 // 项目依赖
```

## 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build
```

## 更新日志
[发行说明](https://github.com/uncleLian/vue2-echo/releases)中记录了每个版本的详细更改。

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- QQ：771674109
- Vue交流群：338241465 —— 广州-小鑫

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present，uncleLian
