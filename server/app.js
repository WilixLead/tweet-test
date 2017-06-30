'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const appConfig = require('jconf');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join('..', 'frontend', 'dist')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

require('./routes')(app);

let port = process.env.PORT || appConfig.server.port || 8080

db
  .sequelize
  .sync()
  .then(function() {
    app.listen(port, () => {
      console.log('Server listen ' + port);
    })
  });
