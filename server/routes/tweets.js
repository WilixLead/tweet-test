const express = require('express');
const router = express.Router();

const TwitterController = require('./../controllers/twitter');
const twitterCtrl = new TwitterController();

router.get('/', twitterCtrl.getTweets.bind(twitterCtrl));

module.exports = router;