/**
 * Created by wangdayuan on 6/19/17.
 */
const express = require('express')
const router = express.Router()

const request = require("request");

const GoogleImages = require('google-images')                     // require the API
let cse_id = require('../config/google_image').cse_id             // To get the config
let api_key = require('../config/google_image').api_key           // To get the config

const client = new GoogleImages(cse_id, api_key)

router.get('/:name', function(req,res,next){                      // HTTP get method
    let searchkey = req.params.name
    client.search(searchkey, {page:2})
        .then(function(result){
            res.send(result)
        })
})

module.exports = router