#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('simplexpress:server');
var express = require('express');
var http = require('http');
var {createApp} = require('./app');

/**
 * Create HTTP server.
 */

function startServer(router, port) {
  const app = createApp({
    router
  });

  const server = createServer(app, port);
  server.start();
}

function createServer(app, port) {
  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(port || process.env.PORT || '3000');
  app.set('port', port);

  var server = http.createServer(app);

  server.start = function() {
    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

  };

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  return server;
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

module.exports = {
  startServer,
  createServer,
  createApp,
  createRouter: function() {
    var router = express.Router();
    router.startServer = function(port) {
      startServer(router, port);
    };
    return router;
  }
};
