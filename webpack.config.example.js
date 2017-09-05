let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let config = require('gnoll/config/webpack.js')

config.entry = './example/index.js'

config.plugins.push(new HtmlWebpackPlugin({
	title: 'Floral example',
	template: 'example/index.html',
	inject: true
}))

module.exports = config
