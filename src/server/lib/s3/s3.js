const definition = require('../definition')
let multer = require('multer')
let multerS3 = require('multer-s3')

var AWS = require('aws-sdk');
AWS.config.update(definition.AWSconfigS3);

s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

const BUCKET = 'maldestorbucket1'
const PICSPREFIX = 'pics/'

// Create the parameters for calling listObjects
var bucketParams = {
    Bucket: BUCKET,
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property

function listObjects(params = {
    prefix: PICSPREFIX
}, callback) {
    s3.listObjects({
        Bucket: BUCKET,
        Prefix: params.prefix
    }, callback)
}

function getPic(req, res, next) {
    if (!req.targetFile) res.status(404).send('picture name shall not be null')

    var s3Stream = s3.getObject({
        Bucket: BUCKET,
        Key: req.targetFile
    }).createReadStream();

    s3Stream.on('error', function (err) {
        // NoSuchKey: The specified key does not exist
        res.status(500).send(`could not get ${req.targetFile} file - server error ${err}`)
    }, next);

    s3Stream.pipe(res)

}
/**
 * multi files upload to S3 based on multer &nd multer-s3
 * https://github.com/expressjs/multer#readme
 */
var  uploadPics= 
    multer({
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
            cb(null, req.targetFolder +'/'+ file.originalname)
        }
    })
})


var self = (module.exports = {
    listObjects,
    getPic,
    uploadPics,

})