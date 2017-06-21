var path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  config = require('../config'),
  Mock = require('mockjs'),
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig = require('./webpack.dev.conf'),
  // default port where dev server listens for incoming traffic
  port = process.env.PORT || config.dev.port,
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable = config.dev.proxyTable,
  app = express(),
  compiler = webpack(webpackConfig),
  devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }),
  hotMiddleware = require('webpack-hot-middleware')(compiler);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

// mock
var mockConf = require('../mock/config')
  , dataTpl = {message: '获取成功！', code: 200, data: null};

app.use(function (req, res, next) {
  mockConf.map(function (val) {
    if (new RegExp(val.reg).test(req.url)) {
      var data = Mock.mock(val.data());

      dataTpl.data = data.data || data;

      return res.send(dataTpl);
    }
  });
});


module.exports = app.listen(port, function (err, b, c) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
