var assert = require("chai").assert;
var axios = require("axios")
var qs = require("qs")
var uuid = require('uuid').v4

const baseURL = "http://localhost:3000"
describe("Users router", function () {
    describe("scanusers", function () {
        it('/users', done => {
            data = null
            axios.request({
                    method: "get",
                    url: baseURL + '/users',
                    data: qs.stringify(data)
                })
                .then((response) => {
                    assert.equal(response.status, 200)
                    assert.isTrue(response.data.Count > 0, "")
                    assert.isTrue(response.data.ScannedCount > 0, "")
                    done()
                })
        })
        it("/users get after admin", done => {
            data = {
                login: "admin"
            }
            axios.request({
                    method: "post",
                    url: baseURL + '/users',
                    data: qs.stringify(data)
                })
                .then((response) => {
                    assert.equal(response.status, 200)
                    assert.isTrue(response.data.Count > 0, "")
                    assert.isTrue(response.data.ScannedCount > 0, "")
                    done()
                })
        })

    })
    describe("get user", function () {
        it("/users/user_id get", done => {
            let url = baseURL + '/users/datalogin'
            axios.request({
                    method: "get",
                    url: url
                })
                .then((response) => {
                    assert.equal(response.status, 200)
                    assert.equal(response.data.err, null, "login properly created");
                    done()
                })
                .catch((err) => {
                    assert.equal(err.response.statusText, "Not Found", "not found")
                    done()
                })
        })
    }) 
    describe("add users", function () {
        it("/users/user_id  post", done => {
            let t = new Date()
            let data = {
                login: uuid()
            }
            axios.request({
                    method: "post",
                    url: baseURL + '/users/' + data.login,
                    data: qs.stringify(data)
                })
                .then((response) => {
                    assert.equal(response.status, 200)
                    assert.equal(response.data.err, null, "login properly created");
                    done()
                })
                .catch((err) => {
                    assert.equal(err.response.statusText, "Not Found", "not found")
                    done()
                })
        })
        it("/users/new with null data", done => {
            data = null
            axios.request({
                    method: "post",
                    url: baseURL + '/users/'+uuid(),
                    data: qs.stringify(data)
                })
                .then((response) => {
                    assert.equal(response.status, 200)
                    assert.equal(response.data, "bad login", "[message]");
                    done()
                })
                .catch((err) => {
                    assert.equal(err.response.statusText, "Not Found", "not found")
                    done()
                })
        })
    }) 
    describe("modify user", function () {
        let modifiedUser = {
            login: "modifieduser",
            pwd: "rtypwd",
            userApplication: {
                'Todo': 'Root',
                'Expenses': "Viewer"
            }
        }
        beforeEach((done) => {
            axios.request({
                    method: "post",
                    url: baseURL + '/users/new',
                    data: qs.stringify(modifiedUser)
                })
                .then((response) => {
                    done()
                })
            axios.request({
                    method: "post",
                    url: baseURL + '/users/new',
                    data: qs.stringify({
                        "login": "userToDelete"
                    })
                })
                .then((response) => {
                    done()
                })
        });
        afterEach((done) => {
            // axios.request({
            //         method: "delete",
            //         url: baseURL + '/API/Users/modifieduser',
            //     })
            //     .then((response) => {
            //         done()
            //     })
        })
        it(" get /users/modifieduser", done => {
            axios.get(baseURL + '/users/modifieduser')
                .then((response) => {
                    assert.equal(response.data.data.login, modifiedUser.login, "[get /API/Users/modifieduser] not successful");
                    done()
                })
        })
        it(" get /users/unknownuser", done => {
            axios.get(baseURL + '/users/unknownuser')
                .then((response) => {
                    done()
                })
                .catch((response) => {
                    console.log(response)
                    assert.equal(response.response.status, 404)
                    assert.equal(response.response.data, "/API/Users/unknownuser not found")
                    done()

                })
        })

        it("put /API/Users/modifieduser/pwd", done => {
            let data = {
                pwd: "abc"
            }
            axios.get(baseURL + '/API/Users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version

                    axios.request({
                            url: baseURL + '/API/Users/modifieduser/pwd',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            axios.get(baseURL + '/API/Users/modifieduser')
                                .then((responseGet) => {
                                    assert.equal(responseGet.status, 200)
                                    assert.isNull(responseGet.data.err)
                                    assert.equal(responseGet.data.data.pwd, data.pwd)
                                    done()

                                })
                        })
                })
                .catch((modUser) => {
                    done()
                })
        })
        it("put /API/Users/modifieduser/details", done => {
            let data = {
                details: {
                    "address": "ici",
                    "email": "no@where.com",
                    "phone": "013235468"
                }
            }
            axios.get(baseURL + '/API/Users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version
                    axios.request({
                            url: baseURL + '/API/Users/modifieduser/details',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            assert.equal(response.data.err, null)
                            done()
                        })
                })
        })

        it("put /API/Users/modifieduser/application", done => {
            let data = {
                userApplication: [{
                    "ToDo": "Viewer"
                }]
            } // Object of applicationName:authorisation  (e.g "ToDo": "Viewer"`
            axios.get(baseURL + '/API/Users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version
                    axios.request({
                            url: baseURL + '/API/Users/modifieduser/application',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            assert.equal(response.data.err, null)
                            done()
                        })
                })
        })
        it("delete /API/Users/userToDelete", done => {
            axios.delete(baseURL + '/API/Users/userToDelete')
                .then((deleteResponse) => {
                    assert.equal(deleteResponse.status, 200);
                    assert.isNull(deleteResponse.data.err);
                    done()
                })
        })
        it("delete /API/Users/unknownUserToDelete", done => {
            axios.delete(baseURL + '/API/Users/unknownUserToDelete')
                .then((deleteResponse) => {
                    assert.isNotNull(deleteResponse.err, "[unknownUserToDelete] shall fail");
                    assert.equal(deleteResponse.status, 200);
                    axios.get(baseURL + '/API/Users/scan')
                        .then((scanResponse) => {
                            assert.equal(scanResponse.status, 200);
                            done()
                        })
                })
        })
    })
})

function AxiosQuery(test) {
    it(`${test.description} - ${test.method} - ${test.url} - `, done => {
        axios({
                method: test.method,
                url: test.url,
                data: qs.stringify(test.data)
            })
            .then((response) => {
                assert.equal(response.status, 200, "Query received");
                // res=JSON.parse(response.data)
                if (typeof (test.valid) == 'string') {
                    assert.equal(reponse.data, test.valid, "Query received");
                    done();
                } else {
                    for (let [key, value] of Object.entries(test.valid)) {
                        assert.isTrue(Object.keys(response.data).includes(key), `[${test.method} Failed]  ---- missing key ${key} in response`);
                        assert.equal(response.data[key], value, `[${test.method} Failed]  ---- expected equality on ${key} to be ${value}`);
                    }
                    console.log(res.data);
                    done();
                }
            })
            .catch((response) => {
                assert.notEqual(response.response.status, 503, "Not implemented yet");
                assert.notEqual(response.message, "Request failed with status code 503", "Not implemented yet");
                console.log(JSON.stringify(response.message));
                done();
            });
    });
}