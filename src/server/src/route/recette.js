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
var recettes = require('../lib/dynamodb/recettes')
let definition =require('../lib/definition')
/**
 * Middleware applyied to specific route to ensure the user has a minimum privilege of Editor
 * @function
 * @param {Object} req Express middleware
 * @param {Object} res Express middleware
 * @param {Object} next Express middleware
 */
function recetteAuthEditor(req, res, next) {
    auth.isAuthorized(req,res,next, definition._application.Recettes,definition._role.Editor)
}

router.route('/recettes')
/** @name get/recettes
 * returns a JSON object with the recettes
 * @function
 * @static
 * 
 */
    .get((req, res) => {
        recettes.getRecettes()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    })

router.route('/ingredients')
/** @name put/ingredients
 * add a new ingredient to the  ingredients list
 * @function
 * @static
 * @param {String} req.body.ingredient
 */
    .put((req, res) => {
        let newIngredient = qs.parse(req.body).ingredient
        recettes.putIngredients(newIngredient)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })

    })
    /** @name get/ingredients
 * returns a JSON object with the ingredients list
 * @function
 * @static
 */
    .get((req, res) => {
        recettes.getIngredients().then(
            data => res.send(data)
        ).catch(
            err => res.send(err)
        )
    })

router.route('/recette/:recette_id')
    .put(recetteAuthEditor, (req, res) => { 
        let newRecette = qs.parse(req.body).recette
        recettes.putRecette(newRecette)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    })
    .get((req, res) => { 
        recettes.getRecette(req.params.recette_id)
            .then(data =>
                res.send(data)
            )
            .catch(err => res.send(err))
    })
    .post(recetteAuthEditor, (req, res) => { 
        let newRecette = qs.parse(req.body).recette
        console.log(newRecette)
        recettes.postRecette(newRecette)
            .then()
            .catch()
    })

module.exports = router;