const Server = require('../server.js');
const port = (process.env.PORT || 8080);
const app = Server.app();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');

  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

}

app.listen(port);

console.info(`Listening at http://localhost:${port}`);
