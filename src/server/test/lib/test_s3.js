var assert = require("chai").assert;
var s3 = require('../../lib/s3/s3')

describe("S3 file exchange", function () {

    describe("list files in a specific folder", function () {
        it("dir all", done => {
            s3.listBucket().then((data) => {
                assert.isObject(data, 'response is not an object');
                // console.log(data)
                done()
            }).catch((err) => {
                // console.log(err)
                done()
            })
        })
        it("shall dir /recettes only", done => {
            s3.listBucket('recettes').then((data) => {
                assert.isObject(data, 'response is not an object');
                // console.log(data)
                done()
            }).catch((err) => {
                // console.log(err)
                done()
            })
        done()
        })
        it("shall fail accessing unknow folder", done => {
            s3.listBucket('unknown').then((data) => {
                assert.isObject(data, 'response is not an object');
                assert.equal(data.Contents.length,0, "empty array");
                // console.log(data)
                done()
            }).catch((err) => {
                assert.isObject(err, 'response is not an object');
                // console.log(err)
                done()
            })        })
    })
    describe("read file", function () {})
    describe("write file", function () {})
})