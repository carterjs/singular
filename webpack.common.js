const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.ts"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
                to: "lib/webcomponents-bundle.js"
            }
        ]),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    }
}
