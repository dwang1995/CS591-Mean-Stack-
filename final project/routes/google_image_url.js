/**
 * Created by wangdayuan on 6/21/17.
 */

// construct for the router
const express = require('express')
const router = express.Router()

// get the API call
const google_image = require('google-image-query');

router.get('/:name', function(req,res,next){
    google_image.search(req.params.name, 10, function(url_list){
        let url_str = url_list.join('\n')
        console.log(url_str)
        res.json(url_str)
    })
})

router.get('/', function(req,res,next){
    console.log("i am in")
    google_image.search("girl", 10, function(url_list){
        console.log("i am in")
        let url_str = url_list.join('\n')
        console.log(url_str)
        res.json(url_str)
    })
})

module.exports = router