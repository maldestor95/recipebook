var express = require('express');
var router = express.Router();

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
let isAuthorized = function (req, topic) {
    let user = req.session
    if (!user) {
        if (Object.keys(req.session.passport.user.userApplication).includes(topic)) {
            return req.session.passport.user.userApplication[topic]
        } else return false
    } else {
        return false
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