const path = require('path');
const ezc = require('express-zero-config');

const router = ezc.createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  });
});

const app = ezc.createApp({
  router,
  view_path: path.join(__dirname, 'views'),
  static_dir: path.join(__dirname, 'public')
});

const server = ezc.createServer(app);

server.start();
