module.exports = {
    // chainWebpack: config => {
    //     config
    //         .plugin('html')
    //         .tap(args => {
    //             args[0].title = '最胖猪猪'
    //             return args
    //         });
    //     // 移除 preload(预载) 插件
    //     config.plugins.delete('preload')
    //     // 移除 prefetch(预取) 插件
    //     config.plugins.delete('prefetch')
    // },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://127.0.0.1:7001',
                headers: {
                    Connection: "keep-alive",
                },
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}