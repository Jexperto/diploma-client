const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

process.env.NODE_ENV = "production"

const production = {
    mode: "production",
    devtool: false,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build/production"),
        filename: "js/[name].[contenthash].js",
        // chunkFilename: "js/[chunkhash].chunk.js",
        publicPath: "/",
        globalObject: 'window'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
            filename: "js/[contenthash].chunk.js"
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true,
                        keep_classnames: false,
                        keep_fnames: false,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                }
            }),
            new CssMinimizerPlugin({
                sourceMap: false,
                minimizerOptions: {
                    preset: ['default', {minifyFontValues: {removeQuotes: false}}]
                }
            })
        ]
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
                                    name: "[contenthash].[ext]",
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
                                    name: "[contenthash].[ext]",
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
                                    name: "[contenthash].[ext]",
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
            template: "./src/resources/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
        new MiniCssExtractPlugin({
            filename: "css/[contenthash].css",
            chunkFilename: "css/[contenthash].chunk.css"
        })
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: ["ts", "tsx", "js", "jsx", "web.js", "web.ts", "web.jsx", "web.tsx"].map((ext) => `.${ext}`)
    }
}

module.exports = production;