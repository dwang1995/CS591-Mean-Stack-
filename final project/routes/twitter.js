/**
 * Created by wangdayuan on 6/19/17.
 */
const express = require('express')
const router = express.Router()

const request = require("request");

var Twitter = require('twitter');

// Get the config key
let c_k = require('../config/twitter_2').CONSUMER_KEY
let c_s = require('../config/twitter_2').CONSUMER_SECRET
let a_t_k = require('../config/twitter_2').access_token_key
let a_t_s = require('../config/twitter_2').access_token_secret

// Pass in the configuation to get the OAUTH working
var client = new Twitter({
    consumer_key: c_k,
    consumer_secret: c_s,
    access_token_key: a_t_k,
    access_token_secret: a_t_s
});

// THis is the get method
// it will use the API to call the twitter to get the twits based on the keyword
router.get('/:name', function(req, res, next){
    let searchkey = req.params.name
    client.get('search/tweets', {q: searchkey}, function(error, tweets, response) {
    //console.log(tweets);
    res.json(tweets)
    });
})
module.exports = router