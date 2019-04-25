# vue2-echo 

![image](https://img.shields.io/badge/vue-2.6.10-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.3-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/mint--ui-2.2.13-blue.svg)
![image](https://img.shields.io/badge/vue--cli-3.0.0-green.svg)

##### 注：该项目是 [vue2-echo](https://github.com/uncleLian/vue2-echo) TypeScript 版本

## 目录结构

``` bash
├── src                          
│   ├── api                      // 请求api
│   ├── assets                   // 静态资源
│   ├── components               // 组件
│   ├── filters                  // 过滤方法
│   ├── mock                     // 模拟数据
│   ├── pages                   
│   |   ├── detail               // 详情页
│   |   ├── index                // 首页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── types                    // ts声明文件
│   ├── utils                   
│   |   ├── cache.ts             // 缓存方法
│   |   ├── request.ts           // 请求方法
│   |   ├── playMode.ts          // 播放模式
│   ├── App.vue
│   └── main.ts
├── .env.development             // 开发环境变量
├── .env.production              // 生产环境变量
├── package.json                 // 项目依赖
├── tsconfig.json                // ts配置
└── vue.config.js                // vue-cli 3.0配置
```

## 开发
```bash
# 克隆项目
git clone https://github.com/uncleLian/vue-blog.git

# 安装依赖
npm install

# 启动服务：localhost:8001
npm run dev
```
## 发布

```bash
# 构建生产环境
npm run build

# 查看构建报告：/dist/report.html
npm run build:report
```
