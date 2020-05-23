/**
 * Express router providing recette related routes
 * @module routers/recette
 */
"use strict"
var express = require('express');
var router = express.Router();
var validate = require("validate.js");
var qs = require("qs")
const auth = require('./auth')
var doc = require('../lib/dynamodb/document')
let definition = require('../lib/definition')

const docCategory = "fournisseur"
const applicationName = definition._application.Recettes
const minimumRole = definition._role.Editor

/**
 * Middleware applyied to specific route to ensure the user has a minimum privilege of Editor
 * @function
 * @param {Object} req Express middleware
 * @param {Object} res Express middleware
 * @param {Object} next Express middleware
 */
function AuthEditor(req, res, next) { //TODO
    // auth.isAuthorized(req,res,next, req.params.category,minimumRole)
    next()
}

router.route('/doc/:category')
    /** @name get/suppliers
     * returns a JSON object with the suppliers
     * @function
     * @static
     * 
     */
    .get((req, res, next) => {
        doc.getDocuments(req.params.category)
            .then(data => {
                res.send(data)
            })
            .catch(err => res.send(err))
    })
    .post(AuthEditor, (req, res) => {
 
        let newDoc = qs.parse(req.body)
        doc.postDocument(newDoc.data, req.params.category)
            .then(data =>
                res.send(data)
            )
            .catch(err => res.send(err))
    })


router.route('/doc/:category/:id')
    .put(AuthEditor, (req, res) => {
        console.log(req.body)
        let newDoc = qs.parse(req.body)
        doc.putDocument(req.params.id, newDoc.data, req.params.category)
            .then(data => {
                
                res.send(data)
            })
            .catch(err => res.send(err))
    })
    .get((req, res) => {
        console.log(req.body)
        doc.getDocument(req.params.id)
            .then(data =>{
                console.log(data)
                res.send(data)
            }
            )
            .catch(err => res.send(err))
    })


module.exports = router;