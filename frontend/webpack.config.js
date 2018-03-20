
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'SERVICE_URL': JSON.stringify("localhost:4000"),
      'AUTHENTICATION_SERVER_URL': JSON.stringify("localhost:5000") 
    })
  ],
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
