// Generated using webpack-cli https://github.com/webpack/webpack-cli
const PackageJSON = require('./package.json');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');



const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;
const distDir = path.resolve(__dirname, `dist/${PackageJSON.primo.institution}-${PackageJSON.primo.vidId}`);

const config = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, `${distDir}`),
        filename: 'js/custom.js',
        clean: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                // { from: "resources/general", to: distDir },
                { from: "resources/general/html", to: `${distDir}/html` },
                { from: "resources/general/img", to: `${distDir}/img` },
                { from: `resources/${PackageJSON.primo.institution}-${PackageJSON.primo.vidId}/html`, to: `${distDir}/html` },
                { from: `resources/${PackageJSON.primo.institution}-${PackageJSON.primo.vidId}/img`, to: `${distDir}/img` },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "css/custom1.css"
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [path.resolve(__dirname, `./src/css`)],
                    copy: [
                        { source: "resources/general/css", destination: path.resolve(__dirname, `./src/css`) },
                        { source:  `resources/${PackageJSON.primo.institution}-${PackageJSON.primo.vidId}/css/index.css`, destination: path.resolve(__dirname, `./src/index.css`) },
                        { source:  `resources/${PackageJSON.primo.institution}-${PackageJSON.primo.vidId}/css/*.css`, destination: path.resolve(__dirname, `./src/css/`) },
                      ],
                },
                onEnd: {
                    delete: [path.resolve(__dirname, `./src/css`), path.resolve(__dirname, `./src/index.css`)]
                }
            }
        })

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "plugins": [
                            "import-directory",
                            "@babel/plugin-transform-runtime"
                        ],
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": "defaults"
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            {
                test: /\.(html)$/i,
                loader: "html-loader",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
