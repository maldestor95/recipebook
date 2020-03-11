var assert = require("chai").assert;
let User = require('../../lib/dynamodb/User').User
let UTable = require('../../lib/dynamodb/User')

before(function (done) {
    try {
        UTable.create_userTable(done)
    } catch (error) {
        throw error

    }
});
after(function (done) {
    UTable.delete_userTable((err, data) => {
        console.log('after')
        done()
    })

});
describe("User", function () {
    it("shall create one user", done => {
        let U = new User()
        U.createLogin('toto4', (err, data) => {
            console.log(JSON.stringify(data))
            assert.isNull(err, "[message]");
            done()
        })
    })
    it("shall get one user", done => {
        let U = new User()
        U.getLogin('toto4', (err, data) => {
            console.log(JSON.stringify(data))
            console.log("U+" + JSON.stringify(U))
            assert.isNull(err, "[message]");
            done()
        })
    })
    it("shall delete one user", done => {
        let U = new User()
        U.deleteLogin('toto4', (err, data) => {
            console.log(JSON.stringify(data))
            assert.isNull(err, "[message]");
            done()
        })
    })
    describe("update details", function () {
        let V = new User()
        beforeEach((done) => {
            V.deleteLogin("update", (err, data) => {
                V.createLogin("update", (err, data) => {
                    done()
                })
            })
        });
        // describe("shall", function () {
        it("add all ", done => {
            let newdetails = {
                phone: "123",
                address: "ici",
                email: "tre@tre.com"
            }
            assert.equal(V.login, "update", "[message]");
            V.updateLoginDetails(newdetails, (err, data) => {
                assert.isNull(err, "[message]");
                V.getLogin("update", (err, data) => {
                    assert.deepEqual(V.details.email, newdetails.email, "verification update");
                    done()
                })
            })
        })

        it("add email only ", done => {
            let newdetails = {
                email: "tre@tre.com"
            }
            assert.equal(V.login, "update", "[message]");
            V.updateLoginDetails(newdetails, (err, data) => {
                // console.log("FINAL  :" + JSON.stringify(V))
                assert.isNull(err, "[message]");
                V.getLogin("update", (err, data) => {
                    // console.log("FINAL  :" + JSON.stringify(V))
                    assert.deepEqual(V.details.email, newdetails.email, "verification update");
                    done()
                })

            })
        })
        it("add phone only ", done => {
            let newdetails = {
                phone: "tre@tre.com"
            }
            assert.equal(V.login, "update", "[message]");
            V.updateLoginDetails(newdetails, (err, data) => {
                console.log("FINAL  :" + JSON.stringify(V))
                assert.isNull(err, "[message]");
                V.getLogin("update", (err, data) => {
                    console.log("FINAL  :" + JSON.stringify(V))
                    assert.deepEqual(V.details.phone, newdetails.phone, "verification update");
                    done()
                })

            })
        })
        it("add address only ", done => {
            let newdetails = {
                address: "tre@tre.com"
            }
            assert.equal(V.login, "update", "[message]");
            V.updateLoginDetails(newdetails, (err, data) => {
                console.log("FINAL  :" + JSON.stringify(V))
                assert.isNull(err, "[message]");
                V.getLogin("update", (err, data) => {
                    console.log("FINAL  :" + JSON.stringify(V))
                    assert.deepEqual(V.details.address, newdetails.address, "verification update");
                    done()
                })
            })
        })
        // })
        afterEach((done) => {
            V.deleteLogin("update", (err, data) => {
                // console.log(JSON.stringify(err),JSON.stringify(data))
                done()
            })
        });
        it("shall change one pwd", done => {
            let newpwd = "newpwd"
            let newpwd2 = "newpwd2"

            assert.equal(V.login, "update", "[message]");
            // assert.equal(V.pwd, '', "[message]");

            V.updateLoginPwd(newpwd, (err, data) => {
                // console.log("FINAL  :" + JSON.stringify(V))
                assert.isNull(err, "[message]");
                V.getLogin("update", (err, data) => {
                    // console.log("FINAL  :" + JSON.stringify(V))
                    assert.deepEqual(V.pwd, newpwd, "verification pwd1");
                    V.updateLoginPwd(newpwd2, (err, data) => {
                        // console.log("FINAL  :" + JSON.stringify(V))
                        assert.isNull(err, "[message]");
                        V.getLogin("update", (err, data) => {
                            // console.log("FINAL  :" + JSON.stringify(V))
                            assert.deepEqual(V.pwd, newpwd2, "verification pwd2");
                            done()
                        })
                    })
                })
            })
        })
    })
})