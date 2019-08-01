module.exports = {
  presets: [
    "@babel/preset-react",
    "@babel/typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"]
        },
        modules: false
      }
    ]
  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
