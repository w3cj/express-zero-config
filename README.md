# Express Zero Config

Create an express app with minimal configuration. Based on the official express generator.

Includes Handlebars view engine. Includes 404 and uncaught error handlers.

Included middleware:
* express
* morgan (development logger)
* cookie-parser
* body-parser

## Basic Usage:

```js
const ezc = require("express-zero-config");

const router = ezc.createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  })
});

ezc.startServer(router);
```

## Usage with configuration

```js
const ezc = require("express-zero-config");
const path = require("path");

const router = ezc.createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  })
});

const app = ezc.createApp({
  router,
  view_path: path.combine(__dirname, 'views'),
  static_dir: path.combine(__dirname, 'public')
});

const server = ezc.createServer(app);

server.start();
```
