var assert = require("chai").assert;
var axios = require("axios")
const testDef = require('./definition')

describe("Authentication", function () {
    var server;
    before( function () {
      server = require('../bin/www');
    });
    after( function () {
      server.close();
    });
    it("shall pass", done => {
        let url = testDef.baseURL + '/login'
        let params = {
            username: 'ludo',
            password: 'ceri'
        }
        axios.post(url, params)
            .then(res => {
                // console.log(res.data)
                assert.isObject(res.data)
                assert.typeOf(res.data.sessionID,'String', 'SessionID shall be a String')
                assert.typeOf(res.data.applicationPrivilege,'Object', 'applicationPrivilege shall be a Object')
                done()
            })
            .catch(err => {
                console.error(err);
                done()
            })
    }),
    it("shall fail on bad password", done => {
        let url = testDef.baseURL + '/login'
        let params = {
            username: 'ludo',
            password: 'badPWD'
        }
        axios.post(url, params)
            .then(res => {
                assert.deepEqual(res.data,"authentication Failed")
                done()
            })
            .catch(err => {
                console.error(err);
                done()
            })
    })
    it("shall fail on bad username", done => {
        let url = testDef.baseURL + '/login'
        let params = {
            username: 'unknowId',
            password: 'badPWD'
        }
        axios.post(url, params)
            .then(res => {
                assert.deepEqual(res.data,"authentication Failed")
                done()
            })
            .catch(err => {
                console.error(err);
                done()
            })
    })
})