const { merge } = require("webpack-merge");
const helpers = require("./helpers");
const base = require("./webpack.config");

module.exports = merge(base, {
	mode: "development",
	devtool: "eval-source-map",
	output: {
		filename: "[name].js",
	},
	devServer: {
		port: 9000,
		stats: "errors-only",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: "[path][name]__[local]",
								localIdentContext: helpers.resolveFromRootPath("src"),
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
				use: ["style-loader", "css-loader"],
				// {
				// 	loader: "css-loader",
				// 	options: {
				// 		modules: {
				// 			exportLocalsConvention: "camelCase",
				// 			localIdentName: "[path][name]__[local]--[hash:base64:5]",
				// 			localIdentContext:  helpers.resolveFromRootPath("src"),
				// 		},
				// 	},
				// },
			},
		],
	},
});
