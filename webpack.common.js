import path from "path";

export default {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(path.dirname("./"), "dist"),
    },
    module: {
        rules: [
            { test: /\.html$/, use: ["html-loader"] },
            {
                test: /\.(svg|png|jpg|gif|flac|ogg|mp3|wav|mpe?g)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs",
                        },
                    },
                ],
                type: "javascript/auto",
            },
        ],
    },
};
