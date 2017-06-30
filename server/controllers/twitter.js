'use strict';

const twitterService = require('./../services/twitter-service');

class TwitterController {
  /**
   * @apiUrl {get} /twitter/
   * 
   * @apiParam {Number} [count] Tweets load count
   * 
   * @apiResult {Boolean} success
   * @apiResult {Array<Tweet>} items Array of items
   */
  getTweets(req, res, next) {
    let count = 50;
    if (req.query && req.query.count) {
      count = req.query.count;
    }
    twitterService
      .getTweets(count)
      .then(tweets => {
        res.send({
          success: true,
          items: tweets
        })
      })
      .catch(err => next(err));
  }
}

module.exports = TwitterController;