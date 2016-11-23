const ezc = require('express-zero-config');

const router = ezc.createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  });
});

ezc.startServer(router);
