/**
 * Created by Dayuan Wang on 2017/6/10.
 */

// connecting to database
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection
db.once('open', function(){
    console.log('Connection successful.')
})

// Create the schema for all the record.
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})

// Create a new collection in the database to store all the record
const string = mongoose.model('string', stringSchema)

// This is the helper function
// This function will go to database to find based on keyword.
let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        string.find({string: checkName}, function (err, results) {
            if (results.length > 0) {
                resolve({found: results})
            }
            else {
                reject({found: false})
            }
        })
    })
}

// The get method. It will return everything in the database
router.get('/', function(req, res, next){
    string.find({}, function(err, results){
        res.send(results);
    })
})

// This is the get request. It will take one paramiter
// It will use the param to find in database.
// If find it, return to the front end
// if not find it, store it to the database.
router.get('/:name', function(req, res, next){
    let s = req.params.name
    let s_len = s.length
    findByName(s)
        .then(function(status){
            console.log("I do not need to insert in the database")
            res.json(status)
        })
        .catch(function(status){
            const aString = new string( {string : s, length: s_len} )
            aString.save(function(err){
                if(err) {res.send(err)}
                else{res.send(aString)}
            })
        })
})

// This is the post request, but it is same with the get method above.
router.post('/',function(req, res, next){
    let s = req.body.input
    if(s == null){
        res.send({'message':'you did not enter a string'})
    }
    else if(s.length == 0){
        res.send({'message':'you did not enter a string'})
    }
    else{
    let s_len = s.length
    findByName(s)
        .then(function(status){
            console.log("I do not need to insert in the database")
            res.json(status)
        })
        .catch(function(status){
            const aString = new string( {string : s, length: s_len} )
            aString.save(function(err){
                if(err) {res.send(err)}
                else{res.send(aString)}
            })
        })}
})

// This is the delete request.
// It will take one paramiter.
// If the data is not find in the database, return the method to front end
// if the data is in the database, delete that from the database. 
router.delete('/:name',function(req, res, next){
    let s = req.params.name
    findByName(s)
        .then(function(status){
            string.remove( {string : s}, function(err, result){
                if(err){res.jason({'message':'Error deleting'});}
                else{res.json({'message':'Delete Successful'});}
            } )
        })
        .catch(function(status){
            console.log("Did not found in the database")
            res.send({'message':'String not found'})
        })
})

module.exports = router;