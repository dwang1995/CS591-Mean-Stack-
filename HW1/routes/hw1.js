/**
 * Created by wangdayuan on 6/3/17.
 */


const express = require('express');
const router = express.Router();
const request = require("request");

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// http://localhost:3000/hw1/short
router.get('/:name', function(req,res,next){
    let parName = req.params.name
    //let thelength = req.query.length
    res.send({'string' : parName, 'length' : parName.length})
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
    console.log(req.body)
    res.send({"string": req.body.test1, "length" : req.body.test1.length})
});



module.exports = router;