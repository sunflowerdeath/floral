const baseConfig = require('gnoll/config/webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(baseConfig, {
	externals: [nodeExternals()]
})
