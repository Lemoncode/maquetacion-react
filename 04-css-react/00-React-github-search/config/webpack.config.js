const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const helpers = require("./helpers");

module.exports = {
	context: helpers.resolveFromRootPath("src"),
	resolve: {
		alias: {
			common: helpers.resolveFromRootPath("src/common"),
			core: helpers.resolveFromRootPath("src/core"),
			layout: helpers.resolveFromRootPath("src/layout"),
			model: helpers.resolveFromRootPath("src/model"),
			pods: helpers.resolveFromRootPath("src/pods"),
			scenes: helpers.resolveFromRootPath("src/scenes"),
		},
		extensions: [".js", ".ts", ".tsx"],
	},
	entry: {
		app: ["regenerator-runtime/runtime", "./index.tsx"],
		// appStyles: ["./styles/styles.css", "./scenes/members-scene.styles.css"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.(png|jpg)$/,
				type: "asset/resource",
			},
			{
				test: /\.html$/,
				loader: "html-loader",
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "all",
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
		}),
		new CleanWebpackPlugin(),
	],
};
