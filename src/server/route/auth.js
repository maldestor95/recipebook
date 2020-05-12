var express = require('express');
var router = express.Router();
let def=require('../lib/definition')

router.get('/noSession', (req, res) => {
    var context = req.app.locals.specialContext;
    req.app.locals.specialContext = null;
    res.send('no active session while connecting '+context)
})
router.get('/notAuthorised', (req, res) => {
    var context = req.app.locals.specialContext;
    req.app.locals.specialContext = null;
    res.send('not authorized to access  '+context)

})
let checkLevelClearance = function (req, topic,role=null) {
    if (req.session.hasOwnProperty('passport')) {
        if (Object.keys(req.session.passport.user.userApplication).includes(topic)) {
            let userLevel=req.session.passport.user.userApplication[topic]
            if (role==null) {return userLevel}
            else
            {
                let tempdef=Object.keys(def._role)
                let r=tempdef.indexOf(role)+1
                let temprole=tempdef.splice(0,r)
                let rr= temprole.includes(userLevel)
                return rr
            }
        } else return false
    } else {
        return false
    }
}
/**
 * isAuthorised est à utiser dans un middleware d'une application
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {String} applicationName   (voir definition.js)
 * @param {Sring} minimumLevelRequired (voir definition.js)
 */
let isAuthorized=function(req,res,next,applicationName,minimumLevelRequired){
    if (checkLevelClearance(req, applicationName, minimumLevelRequired)) {
        next()
    } else {
        res.status(403).send('/notAuthorised')  // TODO add meaningful text
    }
}

let checkAuth = function (req, res, next, role) {
    if (!req.session.passport) {
        req.app.locals.specialContext = req.path
        res.redirect('/noSession')
    } else {
        if (Object.keys(req.session.passport.user.userApplication).includes(role)) {
            next()
        } else {
            req.app.locals.specialContext = req.path
            res.redirect('/notAuthorised')
        }
    }
}


var self = (module.exports = {
    isAuthorized,
    checkAuth,
    router
})