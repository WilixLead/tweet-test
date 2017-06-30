'use strict';

const Tweet = require('./../models').tweet;

class StartsController {
  /**
   * @apiUrl {get} /stars/ Get stared
   *
   * @apiResult {Boolean} success
   * @apiResult {Array<Tweet>} items Array of items
   */
  getStarred(req, res, next) {
    Tweet
      .findAll({order: ['stared']})
      .then(tweets => {
        res.send({
          success: true,
          items: tweets
        })
      })
      .catch(err => next(err))
  }

  /**
   * @apiUrl {get} /stars/add Add tweet to stared
   *
   * @apiParam {Object} Raw tweet object
   *
   * @apiResult {Boolean} success
   */
  starTweet(req, res, next) {
    if (!req.body || !req.body.id) {
      return next('Bad params');
    }
    
    req.body.stared = new Date();
    
    Tweet
      .create(req.body)
      .then(() => {
        res.send({
          success: true
        })
      })
      .catch(err => next(err))
  }

  /**
   * @apiUrl {get} /stars/remove/:id Remove tweet by id
   *
   * @apiParam {Number} id Tweet id
   *
   * @apiResult {Boolean} success
   */
  unstarTweet(req, res, next) {
    if (!req.params || !req.params.id) {
      return next('Bad params. Id not specified');
    }
    Tweet
      .findById(req.params.id)
      .then((tweet) => {
        return tweet.destroy()
      })
      .then(() => {
        res.send({
          success: true
        })
      })
      .catch(err => next(err))
  }
}

module.exports = StartsController;