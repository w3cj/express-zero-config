#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('simplexpress:server');
const express = require('express');
const http = require('http');
const {createApp} = require('./app');

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

  const server = http.createServer(app);

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
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${  addr}`
      : `port ${  addr.port}`;
    debug(`Listening on ${  bind}`);
  }

  return server;
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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

  const bind = typeof port === 'string'
    ? `Pipe ${  port}`
    : `Port ${  port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind  } requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind  } is already in use`);
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
  createRouter() {
    const router = express.Router();
    router.startServer = function(port) {
      startServer(router, port);
    };
    return router;
  }
};
