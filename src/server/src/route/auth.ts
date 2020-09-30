/** Express router providing user related routes
 * @module routers/auth
 */
import express from 'express'
import * as definition from '../lib/definition'

export const router = express.Router();



/**
 * Route redirection if there is no session linked to the user
 * @name get/nosession
 * @function
 * @static
 * @memberof module:routers/auth
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/noSession', (req, res) => {
    var context = req.app.locals.specialContext;
    req.app.locals.specialContext = null;
    res.send('no active session while connecting '+context)
})
/**
 * Route redirection if there is the user is not authorised to access the route
 * @name get/notAuthorised
 * @function
 * @static
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/notAuthorised', (req, res) => {
    var context = req.app.locals.specialContext;
    req.app.locals.specialContext = null;
    res.send('not authorized to access  '+context)

})
/**
 * checkLevelClearance to access the userApplication with level
 * @name checkLevelClearance
 * @inner
 * @param {Object} req Express middleware
 * @param {String} topic (voir definition.js)
 * @param {String} role (voir definition.js)
 */
export const  checkLevelClearance = function (req:express.Request, topic:definition._application,role:definition._role) {
    if (req.session!.hasOwnProperty('passport')) {
        if (Object.keys(req.session!.passport.user.userApplication).includes(topic)) {
            let userLevel=req.session!.passport.user.userApplication[topic]
            if (role==null) {return userLevel}
            else
            {
                let tempdef=Object.keys(definition._role)
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
 * middleware  to secure access to an express route
 * if not authorised, send message 'notAuthorised' with a status 403
 * @name isAuthorised
 * @function
 * @param {Object} req Express middleware
 * @param {Object} res Express middleware
 * @param {Object} next Express middleware
 * @param {String} applicationName   (voir definition.js)
 * @param {Sring} minimumLevelRequired (voir definition.js)
 * @example
 * #in the route add a dedicated function
 * 
 *  function recetteAuthEditor(req, res, next) {
 *      auth.isAuthorized(req,res,next, definition._application.Recettes,definition._role.Editor)
 *  }
 * 
 * 
 * # that will be used as middleware 
 * 
 * .put(recetteAuthEditor, (req, res) => { ...}
 */
export const  isAuthorized=function(req:express.Request,res:express.Response,next:express.NextFunction,applicationName:definition._application,minimumLevelRequired:definition._role){
    if (checkLevelClearance(req, applicationName, minimumLevelRequired)) {
        next()
    } else {
        res.status(403).send('notAuthorised')  // TODO add meaningful text
    }
}
/**
*  Check if the user can acces the route for a specific Application
* @name checkAuth
* @function
 * @param {Object} req Express middleware
 * @param {Object} res Express middleware
 * @param {Object} next Express middleware
 * @param {String} userApplicationName Application Name such as "Recettes"
 */
export const checkAuth = function (req:express.Request,res:express.Response,next:express.NextFunction,applicationName:definition._application) {
    if (!req.session!.passport) {
        req.app.locals.specialContext = req.path
        res.redirect('/noSession')
    } else {
        if (Object.keys(req.session!.passport.user.userApplication).includes(applicationName)) {
            next()
        } else {
            req.app.locals.specialContext = req.path
            res.redirect('/notAuthorised')
        }
    }
}


