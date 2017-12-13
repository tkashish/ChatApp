// var IconsPlugin = require('./node_modules/icons-loader/IconsPlugin');
//
// const RUN_TIMESTAMP = Math.round(Date.now() / 1000)

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff2|woff|eot)$/i,
        loader: "file-loader?name=/public/icons/[name].[ext]"
      }

    ]
  }
}
