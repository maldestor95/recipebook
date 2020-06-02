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
// const s3 = require('../lib/s3/s3')
let definition = require('../lib/definition')

const AWS = require('aws-sdk');
    var s3 = new AWS.S3({
        apiVersion: '2006-03-01'
    });
AWS.config.update(definition.AWSconfigS3);

var bucketParams = {
    Bucket: 'maldestorbucket1',
};

AWS.Request.prototype.forwardToExpress = function forwardToExpress(res, next) {
    // source code from https://stackoverflow.com/questions/35782434/streaming-file-from-s3-with-express-including-information-on-length-and-filetype
    this
    .on('httpHeaders', function (code, headers) {
        if (code < 300) {
            res.set(_.pick(headers, 'content-type', 'content-length', 'last-modified')); //FIXME  _. do not exist (lodash...)
        }                            
    })
    .createReadStream()
    .on('error', next)
    .pipe(res);
};    


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

router.route(/(^\/dir\/\w)|(^\/dir$)/)
    .get((req, res) => {
        let path = req.originalUrl.length < 4 ? '' : req.originalUrl.replace(/^\/dir\//, '')
        s3.listBucket(path).then((data) => {
            res.send(data)
        }).catch(err => res.send(err))
    })
    .post((req, res, next) => {
        res.status(403).send('not implemented yet: ' + req.originalUrl)
        next()
    })
    .delete((req, res, next) => {
        res.status(403).send('not implemented yet: ' + req.originalUrl)
        next()
    })

router.route(/(^\/res\/\w)/)
    .get((req, res, next) => {
        let path = req.originalUrl.replace(/^\/res\//, '')
        let pos = path.lastIndexOf('/')
        pos = pos < 0 ? 0 : pos + 1
        let fname = path.slice(pos, path.length)
        path = path.slice(0, path.length - fname.length)

        // s3.getPic(path, fname, data=>data.pipe(res))
        s3.getObject({Bucket: 'maldestorbucket1', Key: `${path}${fname}`}).forwardToExpress(res, next);

        
    })
    .post((req, res, next) => {
        res.status(403).send('not implemented yet: ' + req.originalUrl)
        next()
    })
    .delete((req, res, next) => {
        res.status(403).send('not implemented yet: ' + req.originalUrl)
        next()
    })



module.exports = router;