const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: ['../../../src/main/webapp/src/app.js', '../../../src/main/webapp/scss/app.scss']
    },
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../../../src/main/resources/static/built'),
        filename: 'bundle.js'
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'bundle.css'
    })],
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Extracts CSS into separate files
                    MiniCssExtractPlugin.loader,
                    // Interprets and resolves @import and url()
                    "css-loader",
                    // Loads a Sass/SCSS file and compiles it to CSS.
                    "sass-loader",
                ],
            },
        ]
    }
};