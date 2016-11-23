const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

function createApp(options = {}) {
  const app = express();

  // view engine setup
  const views = [path.join(__dirname, 'views')];
  if(options.view_path) {
    views.push(options.view_path);
  }

  app.set('views', views);
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if(!options.use || options.use.constructor != 'Array') {
    options.use = [];
  }

  if(options.use.length > 0) {
    options.use.forEach(app.use);
  }

  if(options.static_dir) {
    app.use(express.static(options.static_dir));
  }

  if(options.router) {
    app.use('/', options.router);
  }

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  /* eslint-disable no-unused-vars */
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    const develop = app.get('env') === 'development';
    const accept = req.get('accept');
    const error = {
      message: err.message,
      error: develop ? err : {},
      stack: develop && err.stack ? err.stack : {}
    };

    if(accept.includes('json')) {
      res.json(error);
    } else {
      res.render('error', error);
    }

  });
  /* eslint-enable no-unused-vars */

  return app;
}

module.exports = {createApp};
