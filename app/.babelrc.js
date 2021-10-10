module.exports = {
  plugins: ["react-hot-loader/babel", "@babel/plugin-transform-typescript"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
