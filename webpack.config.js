const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const name = 'Cloud Desktop';
module.exports = {
    entry: [
        './src/index.js'
    ],
    devtool:'inline-source-map',
    devServer: {
        contentBase:'./dist',
        hot:true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["url-loader?limit=8192"]
            },
            {
                test: function(n){
                    let reg = /(\.(\w*?))\.html$/gi;
                    let r = reg.exec(n);
                    if(r){
                        let str = r[2];
                        if(str.substring(str.lastIndexOf('.'),str.length) !== 'tmpl'){
                            return true;
                        }
                    }
                    return false;
                },
                use: ["html-loader"]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: name,
            template: 'src/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        // new copyWebpackPlugin([
        //     {context:'src',from:'image/**',to:'../dist/'}
        // ])
    ]
};