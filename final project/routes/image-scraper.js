/**
 * Created by wangdayuan on 6/21/17.
 */

// Going to request the express and the router module first
const express = require('express')
const router = express.Router()

// Going to call the package
const Scraper = require ('images-scraper')
    , google = new Scraper.Google();

// This is the get method. if nothing is passing in, just find the image for "earth"
router.get('/', function(req, res, next){
    google.list({
        keyword: 'Earth',
        num: 10,
        detail: true,
        nightmare: {
            show: true
        }
    })
        .then(function (result) {
            console.log('first 10 results from google', result);
            res.json(result)
        }).catch(function(error) {
        console.log('err', error);
    });
})

// This is the get method.
// it will base on the keyword to find the image for me.
router.get('/:name', function(req, res, next){
    google.list({
        keyword: req.params.name,
        num: 10,
        detail: true,
        nightmare: {
            show: true
        }
    })
        .then(function (result) {
            //console.log('first 10 results from google', result);
            res.json(result)
        }).catch(function(error) {
        console.log('err', error);
    });
})


module.exports = router