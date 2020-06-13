const HtmlWebpackPlugin = require("html-webpack-plugin"); //provides and html file
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //extract minified css to a file
const PurifyCSSPlugin = require("purifycss-webpack"); //remove unwanted css

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};
exports.htmlPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
  ],
});
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: false,
    overlay: true,
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => ([
                require("autoprefixer"),
                require("precss"),
              ]),
            },
          },],
      },
    ],
  },
});