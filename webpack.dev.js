import HtmlWebpackPlugin from "html-webpack-plugin/index.js";
import path from "path";
import { merge } from "webpack-merge/dist/index.js";
import common from "./webpack.common.js";

export default merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(path.dirname("./"), "dist"),
        publicPath: "/",
    },
    plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
    module: {
        rules: [{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }],
    },
    devServer: {
        hot: true,
        liveReload: false,
        static: {
            directory: path.join(path.dirname("./"), "public"),
        },
        historyApiFallback: true,
    },
});
