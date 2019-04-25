const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const projectName = require('./package.json').name

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        sourceMap: false,
        modules: false,
        loaderOptions: {
            stylus: {
                // 全局引入index.styl文件
                import: [path.resolve(__dirname, './src/assets/css') + '/index.styl']
            }
        }
    },
    devServer: {
        port: 8001,
        open: true
    },
    configureWebpack: {
        name: projectName,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
