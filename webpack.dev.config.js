const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "development"

const development = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build/development"),
        filename: "js/[name].[contenthash:4].js",
        // chunkFilename: "js/[name].[contenthash:4].chunk.js",
        publicPath: "/",
        pathinfo: true,
        globalObject: 'this'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
            filename: "js/[name].[contenthash:4].chunk.js"
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimize: false
    },
    module: {
        strictExportPresence: true,
        rules: [
            {parser: {requireEnsure: false}},
            {
                oneOf: [
                    {
                        test: /\.(jsx?|tsx?)$/,
                        exclude: /node_modules/,
                        use: ["babel-loader"],
                        include: path.resolve(__dirname, "src"),
                    },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
                            {
                                loader: "css-loader"
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpg)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[contenthash:4].[ext]",
                                    outputPath: "images"
                                }
                            }
                        ]
                    },
                    {
                        test: /\.svg$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[contenthash:4].[ext]",
                                    outputPath: (url, resourcePath) => {
                                        if (/[\/\\]fonts[\/\\]/.test(resourcePath))
                                            return `fonts/${url}`;
                                        return `images/${url}`;
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(eot|ttf|woff|woff2)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[contenthash:4].[ext]",
                                    outputPath: "fonts"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/resources/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:4].css",
            chunkFilename: "css/[name].[contenthash:4].chunk.css"
        })
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: ["ts", "tsx", "js", "jsx", "web.js", "web.ts", "web.jsx", "web.tsx"].map((ext) => `.${ext}`)
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
        historyApiFallback: true
    }
}

module.exports = development;