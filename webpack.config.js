const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const target = process.env.NODE_ENV === 'production' ? 'web' : 'browserslist'

module.exports = {
	mode,
	entry: './src/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './build'),
		assetModuleFilename: 'images/[hash][ext][query]'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.s?css$/i,
				use: [
					mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	devtool: mode === 'production' ? false : 'source-map',

	devServer: {
		static: './dist'
	},

	plugins: [
		new CleanWebpackPlugin,
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin
	]
}
