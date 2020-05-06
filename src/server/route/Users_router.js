/**
 * Copyright © 2020, Maldestor
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
 * The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties
 *  of merchantability, fitness for a particular purpose and noninfringement. 
 * In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, 
 * whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or 
 * other dealings in the Software. 
 * Except as contained in this notice, the name of Maldestor shall not be used in advertising or otherwise to promote the sale,
 * use or other dealings in this Software without prior written authorization from Maldestor.
 */
"use strict"
var express = require('express');
var BDDUser = require('../lib/dynamodb/user').User
var CUser = require('../lib/dynamodb/user')
var router = express.Router();
var validate = require("validate.js");
var qs = require("qs")
const auth=require('./auth')
const validLogin={login: { presence: true, type: "string" } }

router.use('/users',(req, res, next)=> { auth.checkAuth(req,res,next,'Users') });

router.route('/users/:login_id')
/**
* Modify a specific User
*/
    .get((req, res, next) => {
        let U = new BDDUser()
        U.getLogin(req.params.login_id, (err, data) => {
            if (err) {
                res.send(err, null)
            } else {
                if (data != undefined) {
                    res.send({
                        err,
                        data
                    })
                } else {
                    res.status(404).send(req.originalUrl + " not found")
                }

            }
        })
    })
    .post((req, res,next) => {
        if (!validate(req.body, validLogin)) {
            let U = new BDDUser()
            U.createLogin(req.body.login, (err, data) => {
                res.send({
                    err,
                    data
                })
            })
        } else {
            res.send("bad login")
        }
    })
    .delete((req, res,next) => {
        let U = new BDDUser()
        U.deleteLogin(req.params.login_id, (err, data) => {
            res.send({
                err,
                data
            })
        })
    })

router.route('/users/:login_id/:action')
/** 
 * update pwd, details or applications rights
 * @param {details} parameters to pass
 * details.version
 * details.pwd for action "pwd"
 * details.details for action "details"
 * details.application for action "application"
 */
.put((req, res,next) => {
        let details = req.body
        let parsedDetails = qs.parse((details))
        let U = new BDDUser()
        let action = req.params.action
        //TODO gerer la version et le constructor à parametrer
        U.login = req.params.login_id
        switch (action) {
            case "details":
                U.updateLoginDetails(parsedDetails, (err, data) => {
                    res.send({
                        err,
                        data
                    })
                })
                break;
            case "pwd":
                U.updateLoginPwd(parsedDetails, (err, data) => {
                    res.send({
                        err,
                        data
                    })
                })
                break;
            case "application":
                U.updateApplicationList(parsedDetails, (err, data) => {
                    res.send({
                        err,
                        data
                    })
                })
                break;
            default:
                res.status(404).send({
                    err: `unknown action on ${req.params.login_id}`,
                    data: null
                })
                break;
        }
    })
    router.route('/users')
    /**
     * Scan Users Table
     */
    .get((req, res,next) => {
        let U = CUser.scanUsers(null, (err, data) => {
            res.send((err, data))
        })
    })

    /**
     * Scan Users Table from a specific login
     */
    .post((req, res,next) => {
        let details = req.body
        let parsedDetails=qs.parse((details))
        //TODO gerer la version et le constructor à parametrer
        // U.login = req.params.login_id
        let U = CUser.scanUsers(parsedDetails.login, (err, data) => {

            res.send((err, data))
        })
    })

module.exports = router;