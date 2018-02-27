#  vue2-echo

![image](https://img.shields.io/badge/vue-2.5.13-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/muse--ui-2.1.0-blue.svg)

## 前言
这一年多一直用Vue写项目，所以准备分享一些经验和记录成果。目前vue学习项目大多数都是音乐、购物车，后台管理那方面，可能因为这方面需求比较多吧。考虑之后打算从容易 -> 中等 -> 困难， 3个复杂度和不同类型的项目，一步步地带领大家熟悉和深入Vue。这些系列项目将会涉及Vue的大部分知识，如果都能掌握，那么就可以随心所欲地使用Vue去写单页面应用了。

此开源系列全部都线上实践过，会考虑到细节、兼容和使用体验等问题，所以在项目里我会尽可能地写上注释去帮助大家快速解决需求。

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
> 如果此开源系列对你有帮助，你可以点右上角 "star"一下，以表支持，非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下作者，我正在不断开源更多实用的项目

> 如有问题可以直接在 Issues 中提，或者加入我们下方Vue群更进一步地交流

## 最终目标
Vue学习系列
- 第一阶段：[vue2-echo](https://github.com/uncleLian/vue2-echo) —— echo回声（ 移动端，难度：★★☆☆☆  入门项目）
- 第二阶段：[vue2-news](https://github.com/uncleLian/vue2-news) —— 今日头条（ 移动端，难度：★★★☆☆ 过渡项目）
- 第三阶段：[vue2-health](https://github.com/uncleLian/vue2-health) —— 头条号（ pc端，难度：★★★☆☆ 过渡项目）
- 第四阶段：[vue2-native](https://github.com/uncleLian/vue2-native) —— 今日头条（ native端，难度：★★★★☆ 进阶项目）

##### 注：此系列只关注前端项目的实现，后端等知识不是此系列的范围，但会告知一二。

## 效果演示 

[项目演示请戳这里](http://echo.liansixin.win)（请使用手机模式预览）

<img src="https://github.com/uncleLian/vue2-echo/raw/master/screenshots/echo_QRcode.png" width="250" height="250"/>

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放行为：播放、暂停、下一首、一键播放
- [x] 播放模式：默认、随机播放、单曲循环、列表循环
- [x] 播放视图：播放进度条（可调节）、播放列表（可增删、切换）
- [x] ...
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
│   |   ├── request.js           // 请求方法
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
npm run build（File in the docs folder）
```

## 更新日志
[发行说明](https://github.com/uncleLian/vue2-echo/releases)中记录了每个版本的详细更改。

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- QQ：771674109
- Vue交流群：338241465 —— 广州-小鑫

## License

[MIT](https://github.com/uncleLian/vue2-echo/blob/master/LICENSE)

Copyright (c) 2017-present，uncleLian
