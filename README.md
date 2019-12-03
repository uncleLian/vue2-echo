#  vue2-echo（v2.0.0）

![image](https://img.shields.io/badge/vue-2.5.13-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/muse--ui-2.1.0-blue.svg)

> 该分支为vue-cli-2.x构建，部分功能已脱离master分支，建议前往 [master分支](https://github.com/uncleLian/vue2-echo)

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

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放行为：播放、暂停、下一首、一键播放
- [x] 播放模式：默认、随机播放、单曲循环、列表循环
- [x] 播放视图：播放进度条（可调节）、播放列表（可增删、切换）

## 项目截图

![image](https://unclelian.github.io/vue2-echo/screenshots/echo_index.png)

![image](https://unclelian.github.io/vue2-echo/screenshots/echo_detail.png)

![image](https://unclelian.github.io/vue2-echo/screenshots/echo_mode.png)

## 目录结构

``` bash
├── build                        // 构建相关  
├── config                       // 配置相关
├── src                          
│   ├── assets                   // 样式、图标等
│   ├── components               // 全局公用组件
│   |   ├── banner.vue
│   |   ├── list.vue 
│   |   ├── musicBar.vue
│   |   ├── sheet.vue
│   ├── utils                    // 全局公用方法
│   |   ├── cache.js             // 缓存
│   |   ├── request.js           // 请求
│   ├── mock                     // 模拟数据
│   ├── page                   
│   |   ├── detail               // 详情页
│   |   ├── index                // 首页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── App.vue
│   └── main.js
├── static                       // 不打包文件夹                  
├── .babelrc                     // babel-loader 配置
├── eslintrc.js                  // eslint 配置项
├── .gitignore                   // git 忽略项
├── index.html                   // html模板
└── package.json                 // 项目依赖
```

## 安装运行

``` bash
# 安装依赖
npm install

# 运行项目：localhost:8001
npm run dev

# 打包项目
npm run build
```

## 更新日志
[发行说明](https://github.com/uncleLian/vue2-echo/releases)中记录了每个版本的详细更改。

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- Vue交流群：338241465

## License

[MIT](https://github.com/uncleLian/vue2-echo/blob/master/LICENSE)

Copyright (c) 2017-present，uncleLian
