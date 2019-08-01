const path = require("path")
const context = path.resolve(__dirname, "../..")

module.exports = {
  entry: path.resolve(__dirname, "./src/app/index.tsx"),
  context,
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve("babel-loader")
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve("style-loader")
          },
          {
            loader: require.resolve("css-loader")
          }
        ]
      }
    ]
  },
  resolve: {
    // alias: {
    //   react: path.resolve(__dirname, '../../node_modules/react'),
    //   'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    // },
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx", ".json"]
  },
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, ".build"),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  devtool: "eval-source-map",
  devServer: {
    allowedHosts: ["app"],
    host: "0.0.0.0",
    port: 3000,
    contentBase: path.join(__dirname, "public"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true
  }
}
