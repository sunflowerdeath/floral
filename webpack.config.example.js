const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('gnoll/utils/merge')
const config = require('gnoll/config/webpack.js')

module.exports = merge(config, {
	entry: './src/example/index.js',
	plugins: [
		new HtmlWebpackPlugin({ title: 'Floral example', template: 'src/example/index.html' })
	]
})
