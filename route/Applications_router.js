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
var path = require('path');
var def = require('../lib/definition')

const validate = require("validate.js");


var router = express.Router();
const rootPath = '/Apps'

let notImplementedYet = function (req, res) {
    res.status(503).send(`${req.path} -- ${req.method}  not implemented yet`)
}

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log(rootPath + '-----Time: ', Date.now(), '\n OriginUrl', req.originalUrl, '=>Path:', req.path);

    next();
});
router.get('/AvailableAppsList', (req, res) => {
    let AvailableOptions = {
        application: Object.values(def._application),
        role: Object.values(def._role)
    }
    res.send({
        err: null,
        data: AvailableOptions
    })
})

module.exports = router;