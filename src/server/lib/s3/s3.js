// Load the AWS SDK for Node.js

var fs = require('fs')
var AWS = require('aws-sdk');
const definition = require('../definition')


AWS.config.update(definition.AWSconfigS3);

s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

// Create the parameters for calling listObjects
var bucketParams = {
    Bucket: 'maldestorbucket1',
};

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property

function listBucket(folder = '') {
    bucketParams.Prefix = folder
    return new Promise(function (resolve, reject) {
        s3.listObjectsV2(bucketParams, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    })
}

function getPic(folder = 'pics', fname, callback) {
   
// console.log('pics/new.jpg',`${folder}${fname}`)
    var s3Stream = s3.getObject({Bucket: 'maldestorbucket1', Key: `${folder}${fname}`}).createReadStream();

// Listen for errors returned by the service
s3Stream.on('error', function(err) {
    // NoSuchKey: The specified key does not exist
    console.error(err);
});

// var fileStream = fs.createWriteStream('./newP.jpg');
callback(s3Stream)
// .on('error', function(err) {
//     // capture any errors that occur when writing data to the file
//     console.error('File Stream:', err);
// }).on('close', function() {
//     console.log('Done.');
// })
// .on('end',stream());

}

function putPic(fname, callback) {
    // app.post('/addPhotoDetectFace', function(req, res) {
    //Convert base64 to Buffer Array for putobject function
    // var base64data = new Buffer(req.body.photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    var fileBuffer = fs.readFileSync(fname);
    // var base64data = new Buffer(req.body.photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    var params = {
        Bucket: 'maldestorbucket1',
        Key: `pics/${fname}`,
        Body: fileBuffer,
    };
    s3.putObject(params, function (err, data) {
        if (err) callback(err);
        else {
            callback('Successfully uploaded photo from bucket');
            //if upload Successfully detect faces will work
        }
    });
}

var self = (module.exports = {
    listBucket,
    getPic,
    putPic
})
// listBucket()
// let fname = '20191117_163838.jpg'
// // getPicStream(fname,console.log)
// fname = 'new.jpg'
// putPic(fname, console.log)