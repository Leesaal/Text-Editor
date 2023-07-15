const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // simplifies the creation of HTML files to serve webpack bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack plugin",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        name: "JATE Text-Editor",
        description: "Just Another Text Editor",
        short_name: "JATE",
        start_url: "./",
        fingerprints: false,
        inject: true,
        background_color: "#6597c2",
        theme_color: "#6597c2",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("./assets", "icons"),
          },
        ],
      }),
    ],

    // pattern matching on css files to create a rule to follow for css files
    // add babel loader

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-end", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
  };
};
