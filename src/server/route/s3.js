"use strict"
var express = require('express');
var router = express.Router();

var s3lib = require('../lib/s3/s3')

const auth = require('./auth')
let multer = require('multer')
let multerS3 = require('multer-s3')
const UPLOAD_PATH = 'uploads';

let definition = require('../lib/definition')

const AWS = require('aws-sdk');
var s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});
const BUCKET = 'maldestorbucket1'
const PICSFOLDER = 'pics/'
AWS.config.update(definition.AWSconfigS3);

var bucketParams = {
    Bucket: BUCKET,
};

var uploadPics = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
                filename: file.originalname
            });
        },
        key: function (req, file, cb) {
            cb(null, 'pics/' + file.originalname)
        }
    })
})

var targetFolder = function (req, res, next) {
    let path = req.originalUrl.length < 4 ? '' : req.originalUrl.replace(/^\/dir\//, '')
    req.targetFolder = path
    next()
}
/**
 * Middleware applyied to specific route to ensure the user has a minimum privilege of Editor
 * @function
 * @param {Object} req Express middleware
 * @param {Object} res Express middleware
 * @param {Object} next Express middleware
 */
function AuthEditor(req, res, next) { //TODO
    auth.isAuthorized(req,res,next, req.params.application,definition._role.Editor)
    next()
}

router.route(/(^\/dir\/\w)|(^\/dir$)/)
    .get((req, res) => {
        let path = req.originalUrl.length < 4 ? '' : req.originalUrl.replace(/^\/dir\//, '')
        let prefix = path.slice(0, path.indexOf('/') == -1 ? path.length : path.indexOf('/'))
        // TODO check authorisation on this path
        s3lib.listObjects({
            prefix: prefix
        }, (err, data) => {
            if (err) res.send(err)
            res.send(data)
        })
    })

router.route(/(^\/res\/\w)/)
    .get((req, res, next) => {
        let path = req.originalUrl.replace(/^\/res\//, '')
        let pos = path.lastIndexOf('/')
        pos = pos < 0 ? 0 : pos + 1
        let fname = path.slice(pos, path.length)
        path = path.slice(0, path.length - fname.length)

        req.targetFile = `${path}${fname}`
        next()

    }, s3lib.getPic)

router.route('/newres/:application/:id')
    .post(AuthEditor,(req, res, next) => {
        req.targetFolder = req.params.application;
        next()
    }, s3lib.uploadPics.array('photos'), (req, res) => {
           res.send('upload successful ' + req.originalUrl)

    })

module.exports = router;