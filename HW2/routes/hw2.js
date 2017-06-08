/**
 * Created by wangdayuan on 6/8/17.
 */

/*
From now I am going to make connection to my mongoDB database
*/
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection
db.once('open', function(){
    console.log('Connection successful.')
})
//Finished set up the connection


/*
Now I am going to set up the Schema for the data
 */
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})

const string = mongoose.model('string', stringSchema)
//Finished Schema part


//This is the helper function to use database find things
const find = function find_1(s){
    string.find({string: s}, function(err,results){
        return results
    })
}

/*
Now I am going to write all the get methods
 */

//This is the function to find all of the data in the database
router.get('/', function(req, res, next){
    string.find({}, function(err, results){
        res.send(results);
    })
})

/*
//This method will take one paramiter. If it is in the database, just return the
//record in the database
//If the paramiter is not in the database, add it to the database.
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

//This method will take one paramiter. If it is in the database, just return the
//record in the database
//If the paramiter is not in the database, add it to the database.
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

//ends all the function for get

/*
Now I am going to write all the functions for post.
 */

/*
 //This method will take one paramiter. If it is in the database, just return the
 //record in the database
 //If the paramiter is not in the database, add it to the database.
 //If user does not have a input, send a message to tell them
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

//This method will take one paramiter. If it is in the database, just return the
//record in the database
//If the paramiter is not in the database, add it to the database.
//If user does not have a input, send a message to tell them
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
            const aString = new string({string : s, length : s.length})
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


//ends all the function for get


//Now I am going to write all the request for delete

/*
//This function will take a paramiter.
//It will go to database to try to find it
//If you cannot find it in the database
//send a message to front end.
//if it is in the database,
//remove it from database.
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

//This function will take a paramiter.
//It will go to database to try to find it
//If you cannot find it in the database
//send a message to front end.
//if it is in the database,
//remove it from database.
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


//Ends for all the functions in delete

module.exports = router;