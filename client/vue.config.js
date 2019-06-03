// const { CleanWebpackPlugin }= require('clean-webpack-plugin');
// const path = require('path');

module.exports = {
    // 基本路径
    baseUrl: '/',
    // 输出文件目录
    outputDir: '../server/dist',
    lintOnSave: false,
    configureWebpack: {
        // plugins: [
        //     new CleanWebpackPlugin({
        //         root: path.join(__dirname, '../server/dist')
        //     })
        // ]
    }
}