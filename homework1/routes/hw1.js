/**
 * Created by wangdayuan on 6/3/17.
 */


const express = require('express');
const router = express.Router();
const request = require("request");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:name', function(req,res,next){
    let parName = req.params.name
    let thelength = req.query.length
    res.send({'string' : parName, 'length' : thelength})
})

/**
 router.post('/:name',function(req,res,next){
    console.log(req.body.short)
    let parName = req.params.name
    let thelength = req.query.breed
    res.send({'string' : parName, 'length' : thelength})
    //res.send("hello")

})*/

router.post('/', function (req, res, next) {
    res.json(req.body.test)
    //res.send("hello")
})



module.exports = router;