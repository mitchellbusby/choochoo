const path = require('path');
const express = require('express');

const tfnsw = require('./tfnsw');

module.exports = {
  app: () => {
    const app = express();
    const indexPath = path.join(__dirname, './dist/index.html');
    const publicPath = express.static(path.join(__dirname, './dist'));

    app.use('/dist', publicPath);
    app.get('/', function(_, res) {res.sendFile(indexPath)});

    app.get('/all_lines', (_, res) => {
      let api = new tfnsw.TfNswApi();
      api.fetch().then(response => {
        res.json(response);
      })
      .catch(err => {
        res.sendStatus(500);
      });
    });

    app.get('/service', (_, res) => {
      let api = new tfnsw.TfNswApi();
      api.service('').then(response => {
        res.json(response);
      })
      .catch(err => {
        res.sendStatus(500);
      });
    });

    app.get('/realtime', (_, res) => {
      let api = new tfnsw.TfNswApi();
      api.realtime().then(response => {
        res.json(response);
      })
      .catch(err => {
        res.send(err);
      });
    })

    return app;
  }
}
