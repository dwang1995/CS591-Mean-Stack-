/**
 * Created by wangdayuan on 6/19/17.
 */
const express = require('express')
const router = express.Router()

const request = require("request");



const {Facebook, FacebookApiException} = require('fb')
fbOptions = {version: 'v2.4'};
fb = new Facebook(fbOptions);



fb.extend({appId: '1674332769542921', appSecret: 'ce57c13643a2ba49ca3a4dea05edad2a', userToken:'EAAXyyZCn24wkBAB4sutfx4HKEWiMY4Xn2iLZA9pE71gUbyNches0u0v9Cpg0ZBjYoPTOMNh0YgG1ma5fxgIw2KfESv3kBuMD8hXVKskGDCC3KkkGjN6pRwxQXyXJiTcbRBJ8vvjZA5H8PyhMN2gdYHaZCuDr5pfpcvrInOMgsB2zxEzZBC2ayXRqEFjvYAxTsZD', appToken:'1674332769542921|iZ6jxJXhVnSLrwVaeZCl1pN0DGk'})

router.get('/:name', function(req, res, next){
    let searchkey = req.params.name
    fb.api('4', { fields: [searchkey], access_token:'1674332769542921|iZ6jxJXhVnSLrwVaeZCl1pN0DGk' }, function (result) {
        if(!result || result.error) {
            console.log(!result ? 'error occurred' : result.error);
            res.err = result.error;
            res.statusCode = 401
            next()
        }
        console.log(result.id);
        console.log(result.name);
        res.json(result)
    });
})

module.exports = router