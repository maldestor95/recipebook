/** Express router providing user related routes
 * @module routers/auth
 */
import express, { NextFunction } from 'express'
import * as definition from '../lib/definition'

export const router = express.Router();


const checkLevelClearance = function (req: express.Request, topic: definition._application, role: definition._role) {
    if (req.session!.hasOwnProperty('passport')) {
        if (Object.keys(req.session!.passport.user.userApplication).includes(topic)) {
            let userLevel = req.session!.passport.user.userApplication[topic]
            if (role == null) { return userLevel }
            else {
                let tempdef = Object.keys(definition._role)
                let r = tempdef.indexOf(role) + 1
                let temprole = tempdef.splice(0, r)
                let rr = temprole.includes(userLevel)
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
export const isAuthorized = function (req: express.Request, res: express.Response, next: express.NextFunction, applicationName: definition._application, minimumLevelRequired: definition._role) {
    if (checkLevelClearance(req, applicationName, minimumLevelRequired)) {
        next()
    } else {
        res.status(401).send('not authorised') 
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
export const checkAuth = function (req: express.Request, res: express.Response, next: NextFunction, applicationName: definition._application) {
    if (!req.session!.passport) return res.status(401).send('no active session')
    try {
        if (Object.keys(req.session!.passport.user.userApplication).includes(applicationName)) {
            next()
        } else {
            res.status(401).send('not authorised')
        }
    } catch (error) {
        res.status(401).send('not authorised')
    }

}


