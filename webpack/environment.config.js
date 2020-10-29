const resolvers = require("./resolvers.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const url = require("url");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

const assetsPath = path.resolve(__dirname, "..", "public", "assets");

function isProduction(env) {
  return env === "production";
}

function getPlugins(env) {
  let plugins = [new webpack.ProgressPlugin({ profile: false })];
  return [
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: env == "development" ? "[name].css" : "[name]-[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new WebpackAssetsManifest({
      output: "../../data/manifest.json",
      transform: (assets, manifest) => {
        let output = {};
        Object.keys(assets).forEach(assetName => {
          const batchName = assetName.replace(/\.[^/.]+$/, ""),
            outputName = assets[assetName];

          if (typeof output[batchName] == "undefined") {
            output[batchName] = {};
          }

          if (outputName.endsWith(".js")) {
            output[batchName].js = outputName;
          } else if (outputName.endsWith(".css")) {
            output[batchName].css = outputName;
          }
        });
        return output;
      }
    })
  ];
}

module.exports = (config, env, target) => {
  if (!isProduction(env)) {
    config.devtool = "eval-source-map";
  } else {
    // config.devtool = "hidden-source-map";
  }
  config.resolve = resolvers;
  config.plugins = getPlugins(env);
  config.externals = {
    window: "window"
  };
  config.optimization = { 
    minimize: isProduction(env),
    minimizer: [new TerserPlugin()] 
  };

  return config;
};
