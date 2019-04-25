#  vue2-echo

![image](https://img.shields.io/badge/vue-2.6.10-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.3-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/mint--ui-2.2.13-blue.svg)
![image](https://img.shields.io/badge/vue--cli-3.x-green.svg)

> master分支是基于vue-cli-3.x

##### 其他分支：
- [vue-cli-2.x](https://github.com/uncleLian/vue2-echo/tree/v2.0)
- [TypeScript版本](https://github.com/uncleLian/vue2-echo/tree/typescript)

## 前言
这是一个Vue学习系列，难度：容易 -> 中等 -> 困难， 3个复杂度和不同类型的项目，一步步地带领大家熟悉和深入Vue。这些系列项目将会涉及Vue的大部分知识，如果都能熟悉和掌握，那么就可以随心所欲地使用Vue去写单页面应用了。

##### 注：此开源系列的知识点全部经历过线上实践，会考虑到细节、兼容和使用体验等问题。

## 技术栈
1. [vue](https://cn.vuejs.org/v2/guide/)、 [vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)、 [vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)
2. [axios（请求库）](https://github.com/axios/axios)
3. [mint-ui（饿了么移动端UI库）](http://mint-ui.github.io/docs/#/zh-cn2)
4. [vue-progressbar（加载进度条）](https://github.com/hilongjw/vue-progressbar)
5. [amfe-flexible（淘宝适配库）](https://github.com/amfe/lib-flexible)
6. [mockjs（数据模拟）](http://mockjs.com/)
7. [ES6/7（JS语法）](https://github.com/lukehoban/es6features)、[ESlint（JS语法规范）](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
8. [Stylus（css预处理器）](https://github.com/stylus/stylus)
9. [IconFont（阿里字体库）](http://www.iconfont.cn/)

## 说明
> 如果此开源系列对你有帮助，你可以点右上角 "star"支持一下，非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下作者，我正在不断开源更多实用的项目

> 如有问题可以直接在 Issues 中提，或者加入我们下方Vue群更进一步地交流

## 最终目标
Vue学习系列
- 第一阶段：[vue2-echo](https://github.com/uncleLian/vue2-echo) —— echo回声（ 移动端，难度：★★☆☆☆  入门项目）
- 第二阶段：[vue2-news](https://github.com/uncleLian/vue2-news) —— 今日头条（ 移动端，难度：★★★☆☆ 过渡项目）
- 第三阶段：[vue2-health](https://github.com/uncleLian/vue2-health) —— 头条号（ pc端，难度：★★★☆☆ 过渡项目）
- 第四阶段：[vue2-native](https://github.com/uncleLian/vue2-native) —— 今日头条（ native端，难度：★★★★☆ 进阶项目）

## 效果演示 

[在线链接](http://echo.liansixin.win)（请使用手机模式预览）

<img src="https://github.com/uncleLian/vue2-echo/raw/gh-pages/screenshots/echo_QRcode.png" width="250" height="250"/>

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放行为：播放、暂停、下一首、一键播放
- [x] 播放模式：默认、随机播放、单曲循环、列表循环
- [x] 播放视图：播放进度条（可调节）、播放列表（可增删、切换、清空）

## 项目截图

![image](https://github.com/uncleLian/vue2-echo/raw/gh-pages/screenshots/echo_index.png)

![image](https://github.com/uncleLian/vue2-echo/raw/gh-pages/screenshots/echo_detail.png)

## 目录结构

``` bash
├── src                          
│   ├── api                      // 请求api
│   ├── assets                   // 静态资源
│   ├── components               // 全局组件
│   ├── filters                  // 全局过滤
│   ├── mock                     // 模拟数据
│   ├── page                   
│   |   ├── detail               // 详情页
│   |   ├── index                // 首页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── utils                    // 公用方法
│   ├── App.vue
│   └── main.js
├── .env.development             // 开发环境变量
├── .env.production              // 生产环境变量
├── package.json                 // 项目依赖
└── vue.config.js                // vue-cli 3.0配置
```

## 开发和发布

``` bash
# 安装依赖
npm install

# 启动项目：localhost:8001
npm run dev

# 打包项目
npm run build

# 查看构建报告：/dist/report.html
npm run build:report
```

## 更新日志
[发行说明](https://github.com/uncleLian/vue2-echo/releases)中记录了每个版本的详细更改。

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- Vue交流群：338241465

## License

[MIT](https://github.com/uncleLian/vue2-echo/blob/master/LICENSE)

Copyright (c) 2017-present，uncleLian
