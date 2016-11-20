# Express Zero Config

Create an express app with minimal configuration. Based on the official express generator.

## Usage:

```js
const {createRouter} = require("express-zero-config");

const router = createRouter();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  })
});

router.startServer();
```
