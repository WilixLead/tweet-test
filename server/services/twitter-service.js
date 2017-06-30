'use strict';

const Twit = require('twit');
const appConfig = require('jconf');
const Tweet = require('./../models').tweet;

class TwitterService {
  constructor() {
    this.twitter = new Twit(appConfig.twitter);
    
    if (!appConfig.keywords || !appConfig.keywords.length) {
      throw 'Config error! Keywords not set';
    }
  }
  
  getTweets(count) {
    return new Promise((resolve, reject) => {
      this.twitter.get('search/tweets', { q: appConfig.keywords, count: count || 50 }, (err, data) => {
        if (err) {
          return reject(err);
        }
        let items = [];
        if (data.statuses && data.statuses.length) {
          items = data
            .statuses
            .map(tweet => Tweet.normalizeTweet(tweet));
        }
        resolve(items);
      });
    })
  }
}

module.exports = new TwitterService();