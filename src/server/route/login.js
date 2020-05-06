"use strict"
var express = require('express');
const passport = require("passport")
var BDDUser = require('../lib/dynamodb/user').User
var CUser = require('../lib/dynamodb/user')

const validate = require("validate.js");

const LocalStrategy = require("passport-local")
var qs = require("qs")


var router = express.Router();

passport.use(new LocalStrategy(
    function (username, password, done) {
        let U = new BDDUser()

        U.getLogin(username, (err, user) => {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done("unknow user", false);
            }
            if (user.pwd != password) {
                return done("wrong password", false);
            }
            console.log(`User "${username}" authenticated`)
            return done(null, user);
        });
    }))






// REST descriptions
/*  /users
        => get => scan users
        => post => scan users from specific id
    /users/{user_id}
        => post => create users
        => get => get user
        => delete => delete user
        
    /users/{user_id}/{action}    
        => put/:action => modify user according to :action
*/
const validLogin = {
    login: {
        presence: true,
        // length:{maximum:12}
    }
}

let notImplementedYet = function (req, res) {
    res.status(503).send(`${req.path} -- ${req.method}  not implemented yet`)
}


router.route('/login')
    .post(passport.authenticate('local', {
        session: true,
        failureRedirect: 'fail'
    }), (req, res) => {
        console.log(`/login \n ${req.sessionID} \n ${JSON.stringify(req.body)}`)
        res.send({
            Session: req.session,
            sessionID: req.sessionID,
            applicationPrivilege:req.user.userApplication,
            msg: 'login  OK '
        })
    })
router.route('/logout')
    .post((req, res) => {
        console.log('/logout  ' + req.sessionID)
        let sess = req.sessionID
        req.session.destroy()
        res.clearCookie('connect.sid');  //FIXME need to have the same path for connect.sid when clearing; doesn't work on edge 
        //more details on https://expressjs.com/en/4x/api.html#res.clearCookie
        res.send({
            sessionID: sess,
            msg: 'logout OK '
        })
    })

router.get('/fail', (req, res) => {
    console.log(req.body)
    res.send("auth NOK")
})

module.exports = router