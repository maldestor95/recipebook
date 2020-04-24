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
        it(" get /users/unknownuser", done => {
            axios.get(baseURL + '/users/unknownuser')
                .then((response) => {
                    done()
                })
                .catch((response) => {
                    console.log(response)
                    assert.equal(response.response.status, 404)
                    assert.equal(response.response.data, "/users/unknownuser not found")
                    done()

                })
        })
    })
    describe("add users", function () {
        it("/users/user_id  post and delete", done => {
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
                })
                .then((next) => {
                    axios.delete(baseURL + '/users/' + data.login)
                        .then((deleteResponse) => {
                            assert.equal(deleteResponse.status, 200);
                            assert.isNull(deleteResponse.data.err);
                            done()
                        })
                })
                .catch((err) => {
                    assert.equal(err.response.statusText, "Not Found", "not found")
                    done()
                })
        })
        it("/users/new post with null data", done => {
            data = null
            axios.request({
                    method: "post",
                    url: baseURL + '/users/' + uuid(),
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
        it("/users/unknownUserToDelete delete", done => {
            axios.delete(baseURL + '/users/unknownUserToDelete')
                .then((deleteResponse) => {
                    assert.isNotNull(deleteResponse.err, "[unknownUserToDelete] shall fail");
                    assert.equal(deleteResponse.status, 200);
                            done()
                })
                .catch((err) => {
                        console.log(err)
                        done()
                    }
                )
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
                .then(
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

                )
        });
        afterEach((done) => {
            axios.request({
                    method: "delete",
                    url: baseURL + '/users/modifieduser',
                })
                .then((response) => {
                    done()
                })
        })
        it("/users/modifieduser/pwd  put", done => {
            let data = {
                pwd: "abc"
            }
            axios.get(baseURL + '/users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version

                    axios.request({
                            url: baseURL + '/users/modifieduser/pwd',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            axios.get(baseURL + '/users/modifieduser')
                                .then((responseGet) => {
                                    assert.equal(responseGet.status, 200)
                                    assert.isNull(responseGet.data.err)
                                    assert.equal(responseGet.data.data.pwd, data.pwd)
                                    done()

                                })
                        })
                })
                .catch((modUser) => {
                    console.log(modUser)
                    done()
                })
        })
        it("/users/modifieduser/details put", done => {
            let data = {
                details: {
                    "address": "ici",
                    "email": "no@where.com",
                    "phone": "013235468"
                }
            }
            axios.get(baseURL + '/users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version
                    axios.request({
                            url: baseURL + '/users/modifieduser/details',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            assert.equal(response.data.err, null)
                            done()
                        })
                })
        })

        it("/users/modifieduser/application put", done => {
            let data = {
                userApplication: [{
                    "ToDo": "Viewer"
                }]
            } // Object of applicationName:authorisation  (e.g "ToDo": "Viewer"`
            axios.get(baseURL + '/users/modifieduser')
                .then((modUser) => {
                    data.version = modUser.data.data.version
                    axios.request({
                            url: baseURL + '/users/modifieduser/application',
                            method: 'put',
                            data: qs.stringify(data)
                        })
                        .then((response) => {
                            assert.equal(response.data.err, null)
                            axios.get(baseURL + '/users/modifieduser')
                            .then((response) => {
                                assert.equal(response.data.data.userApplication[0].ToDo, data.userApplication[0].ToDo, "[get /users/modifieduser] not successful");
                                done()
                            })                        })
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