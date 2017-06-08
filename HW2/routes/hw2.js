/**
 * Created by wangdayuan on 6/8/17.
 */

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection
db.once('open', function(){
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})

const string = mongoose.model('string', stringSchema)

//This is the helper function to use database find things
const find = function find_1(s){
    string.find({string: s}, function(err,results){
        return results
    })
}

router.get('/', function(req, res, next){
    string.find({}, function(err, results){
        res.send(results);
    })
})

/*
//This is the function uses helper function
router.get('/:name', function(req, res, next){
    let s = req.params.name
    console.log(s)
    let s_len = s.length
    let f_result = find(s)
    if(f_result == {}){
        const aString = new string( {string : s, length: s_len} )
        aString.save(function(err){
            if(err) {res.send(err)}
            else{res.send(aString)}
        })
    }
    else{
        console.log("I am in else")
        res.json(f_result)
    }
})
*/

//This is the function does not use the helper function
router.get('/:name', function(req, res, next){
    let s = req.params.name
    console.log(s)
    string.find({string: s}, function(err, results){
        if(results == {}){
            const aString = new string({string: s, length:s.length})
            aString.save(function(err){
                if(err){res.send(err)}
                else{res.send(aString)}
            })
        }
        else {
            console.log("I do not need to insert in the database")
            res.send(results)
        }
    })
})

/*
//This is the function uses helper function
router.post('/', function(req, res, next){
    let s = req.body.input
    if(s == null){
        res.send({'message':"you did not passed a string"})
    }
    if(s.length == 0){
        res.send({'message':'you did not passed a string'})
    }
    console.log(s)
    let s_len = s.length
    let f_result = find(s)
    if(f_result == {}){
        const aString = new string( {string : s, length: s_len} )
        aString.save(function(err){
            if(err) {res.send(err)}
            else{res.send(aString)}
        })
    }
    else{
        console.log("I do not need to insert in the database")
        res.json(f_result)
    }
})
*/

//This is the function does not use the helper function
router.post('/', function(req, res, next){
    let s = req.body.input
    if(s == null){
        res.send({'message':"you did not passed a string"})
    }
    if(s.length == 0){
        res.send({'message':'you did not passed a string'})
    }
    console.log(s)
    string.find({string: s}, function(err, results){
        if(results == {}){
            const aString = new string({string: s, length:s.length})
            aString.save(function(err){
                if(err){res.send(err)}
                else{res.send(aString)}
            })
        }
        else {
            console.log("I do not need to insert in the database")
            res.send(results)
        }
    })
})

/*
//This is the function use the helper function
router.delete('/:name', function(req, res, next){
    let s = req.params.name
    let f_result = find(s)
    if(f_result == {}){
        res.send({'message':'String not found'})
    }
    else{
        string.remove( {string : s}, function(err, result){
            if(err){res.jason({'message':'Error deleting'});}
            else{res.json({'message':'Success'});}
        } )
    }
})
*/

//This is the function does not use the helper function
router.delete('/:name', function(req, res, next){
    let s = req.params.name
    string.find({string: s}, function(err, results){
        if(results == {}){
            res.send({'message':'String not found'})
        }
        else{
            string.remove( {string : s}, function(err, result){
                if(err){res.jason({'message':'Error deleting'});}
                else{res.json({'message':'Success'});}
            } )
        }
    })
})

module.exports = router;