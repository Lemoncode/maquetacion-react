const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const helpers = require("./helpers");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.js");

module.exports = merge(base, {
	mode: "production",
	output: {
		path: helpers.resolveFromRootPath("dist"),
		filename: "js/[name].[chunkhash].js",
		assetModuleFilename: "images/[hash][ext][query]",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: "css/[path][name]__[local]--[hash:base64:5]",
								localIdentContext: helpers.resolveFromRootPath("src"),
								localIdentHashPrefix: "my-custom-hash",
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[chunkhash].css",
			chunkFilename: "[id].css",
		}),
		new CompressionPlugin({
			filename: "gzip/[name].[chunkhash].gz",
			algorithm: "gzip",
			test: /\.js$|\.jsx$|\.scss$|\.css$|\.html$/,
			threshold: 1024,
			minRatio: 0.8,
		}),
	],
});
