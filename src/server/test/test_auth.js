var assert = require("chai").assert;
var axios = require("axios")
const testDef = require('./definition')



describe("Authentication", function () {
it("shall pass", done => {
        let url = testDef.baseURL + '/login'
        let params = {
            username: 'ludo',
            password: 'ceri'
        }
        axios.post(url, params)
            .then(res => {
                console.log(res)
                done()
            })
            .catch(err => {
                console.error(err);
                done()
            })
    }),
    it("shall get user", done => {
        axios.get(testDef.baseURL + '/users')
            .then(res => {
                done()
            })
            .catch(err => {
                done()
            })
    })

})