const path = require("path")
module.exports = {
    webpack: {
        devServer: {
            client: {
                overlay: false,
            },
        },
        mode: 'development',
        devtool: "eval-cheap-module-source-map",
        alias: {
            "@": path.resolve("src")
        },
        resolve: {
            mainFields: ['index']
        },
        configure: {
            module: {
                rules: [
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset/resource"
                    },
                    {
                        enforce: 'pre',
                        test: /\.tsx?/,
                        loader: path.resolve(__dirname, "plugins/urlResolve.js")
                    }
                ],
            },
        },
        plugins: {
            add: []
        },
        target: "es5"
    },
    env: {},
    devServer: {
        client: {
            overlay: false,
        },
    },
}