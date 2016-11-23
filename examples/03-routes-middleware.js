const path = require('path');
const session = require('express-session');
const passport = require('passport');

const ezc = require('express-zero-config');

const app = ezc.createApp({
  router,
  use: [
    session({ secret: process.env.SESSION_SECRET }),
    passport.initialize(),
    passport.session()
  ],
  view_path: path.join(__dirname, 'views'),
  static_dir: path.join(__dirname, 'public')
});

const auth = require('./auth'); // Exports an express router
const api = require('./api'); // Exports an express router

const router = ezc.createRouter();
router.use('/auth', auth);
router.use('/api/v1', api);

const server = ezc.createServer(app);
server.start();
