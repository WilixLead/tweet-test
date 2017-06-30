'use strict';

const tweets = require('./tweets');
const stars = require('./starts');

module.exports = function(app) {
  app.use('/api/tweets', tweets);
  app.use('/api/stars', stars);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next('Route not found');
  });

  // Catch other errors
  app.use((err, req, res, next) => {
    console.error(err);
    res.send({
      success: false,
      error: err
    });
  });
  
  return app;
};