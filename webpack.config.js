module.exports = {
  entry: {
    app: './src/app.js',
    vendor: ['jquery', 'underscore'],
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName = */"vendor", /* filename= */"vendor.bundle.js")
  ]
};
