'use strict';

const express = require('express');
const router = express.Router();

const StartsController = require('./../controllers/stars');
const startsCtrl = new StartsController();

router.get('/', startsCtrl.getStarred.bind(startsCtrl));
router.post('/add', startsCtrl.starTweet.bind(startsCtrl));
router.get('/remove/:id', startsCtrl.unstarTweet.bind(startsCtrl));

module.exports = router;