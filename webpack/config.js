const path = require("path");
const envSettings = require("./environment.config.js");

const getLoaders = require("./loaders.js");
const webpack = require("webpack");

const assetsPath = path.resolve(__dirname, "..", "build", "assets");

module.exports = env => {
  let config = {
    context: path.resolve(__dirname, ".."),
    entry: {
      main: ["./src/js/main.js", "./src/scss/styles.scss"]
    },
    mode: env.production ? "production" : "development",
    output: {
      path: assetsPath,
      filename: env.production ? "[name].js" : "[name]-[hash].js",
      chunkFilename:
        env.production ? "[name].js" : "[name]-[chunkhash].js",
      publicPath: "/assets/"
    },
    module: {
      rules: getLoaders()
    }
  };

  return envSettings(config, env);
};
