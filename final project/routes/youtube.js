/**
 * Created by wangdayuan on 6/26/17.
 */

const express = require('express')
const router = express.Router()

const youtube = require('youtube-search');                        // request the package

let api_key = require('../config/google_image').api_key           // To get the config

const opts = {
    maxResults: 10,
    key: api_key
};

// This is the get method
router.get('/:name', function(req, res, next){
    console.log('hi')
    let searchkey = req.params.name
    youtube(searchkey, opts, function(error, response) {
        if(error){res.send(error)}
        else{
            console.log('in')
            res.json(response) }
    });
})

module.exports = router;