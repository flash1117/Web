const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode :'development',
    devtool : 'eval',
    resolve: {
        extensions: ['.js','.vue'],
    },
    entry: {

        app: path.join(__dirname, './main.js'),
    },
    module: {
        rules: [{

            test: /\.vue$/,
            loader: 'vue-loader',
        }],

    },
    plugins: [

        new VueLoaderPlugin(),
    ],
    output: {
        filename : '[name].js',
        path : './dist'

    },

};

