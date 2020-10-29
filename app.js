const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');

const app = express();
app.use(bodyParser.json());
morganBody(app, {prettify: false, logReqUserAgent : false});
app.listen(3000, 'localhost',() => {
  console.log("listening http://localhost:3000");
});

module.exports = app;
