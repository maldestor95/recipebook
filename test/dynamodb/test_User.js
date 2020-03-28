var assert = require("chai").assert;
let User = require('../../lib/dynamodb/User').User
let UTable = require('../../lib/dynamodb/User')
const constants = require('../../lib/definition')





describe("User", function () {
    before(() => {
        let U = new User()
        U.createLogin('toto4', (err, data) => {})
        U.createLogin('toto3', (err, data) => {})
        U.createLogin('toto2', (err, data) => {})
        U.createLogin('last', (err, data) => {})
    });
    after(() => {
        let U = new User()
        // U.deleteLogin('toto4', (err, data) => {})
        U.deleteLogin('toto3', (err, data) => {})
        U.deleteLogin('toto2', (err, data) => {})
        U.deleteLogin('totocreate', (err, data) => {})
        U.deleteLogin('last', (err, data) => {})
    });
    it("shall create one user but fail creating it twice", done => {
        let U = new User()
        U.createLogin('totocreate', (err, data) => {
            console.log(JSON.stringify(data))
            assert.isNull(err, "creation successfull");
            U.createLogin('totocreate', (err, data) => {
                console.log(JSON.stringify(data))
                assert.equal(err.code, "ConditionalCheckFailedException", "creation successfull");
                done()
            })
        })
    })
    it("shall get one user", done => {
        let U = new User()
        U.getLogin('toto4', (err, data) => {
            // console.log(JSON.stringify(data))
            // console.log("U+" + JSON.stringify(U))
            assert.isNull(err, "[message]");
            done()
        })
    })
    it("shall delete one user", done => {
        let U = new User()
        U.deleteLogin('toto4', (err, data) => {
            console.log(JSON.stringify(data))
            assert.isNull(err, "successfully delete existing user");
            U.deleteLogin('none', (err, data) => {
                console.log(JSON.stringify(data))
                assert.equal(err.code, "ConditionalCheckFailedException", "deletion unsuccessful");
                done()
            })
        })
    })
    describe("update details", function () {
        var V = new User()
        before((done) => {
            V.createLogin("update", (err, data) => {
                if (err) {
                    V.getLogin("update", (err, data) => {
                        done()
                    })
                } else {
                    done()
                }
            })
        });
        afterEach((done) => {
            V.deleteLogin("update", null)
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
                phone: "1234"
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
            V.getLogin(V.login, (e1, d1) => {
                let initialversion = V.version
                V.updateLoginDetails(newdetails, (err, data) => {
                    console.log("FINAL  :" + JSON.stringify(V))
                    assert.isNull(err, "[message]");
                    V.getLogin("update", (err, data) => {
                        console.log("FINAL  :" + JSON.stringify(V))
                        assert.deepEqual(V.details.address, newdetails.address, "verification update");
                        assert.equal(V.version, initialversion + 1, "Version updated");
                        // console.log(V.version)
                        done()
                    })
                })
            })
        })
        // })

        it("shall change one pwd", done => {
            let newpwd = "newpwd"
            let newpwd2 = "newpwd2"

            assert.equal(V.login, "update", "[message]");

            V.getLogin(V.login, (e1, d1) => {
                let initialversion = V.version
                V.updateLoginPwd(newpwd, (err, data) => {
                    assert.isNull(err, "[message]");
                    V.getLogin("update", (err, data) => {
                        assert.deepEqual(V.pwd, newpwd, "verification pwd1");
                        V.updateLoginPwd(newpwd2, (err, data) => {
                            assert.isNull(err, "[message]");
                            V.getLogin("update", (err, data) => {
                                assert.deepEqual(V.pwd, newpwd2, "verification pwd2");
                                assert.equal(V.version, initialversion + 2, "Version updated");
                                console.log(V.version)
        
                                done()

                            })
                        })
                    })
                })
            })
        })
    })
    describe("update authorisations", function () {
        let V = new User()
        beforeEach((done) => {
            V.deleteLogin("Authorisation", (err, data) => {
                V.createLogin("Authorisation", (err, data) => {
                    V.getLogin(null, (err2, data2) => {
                        V.print("Initialised :")
                        done()
                    })
                })
            })
        });
        afterEach((done) => {
            V.deleteLogin("Authorisation", (err, data) => {
                // console.log(JSON.stringify(err),JSON.stringify(data))
                done()
            })
        });
        it("shall add a valid application", done => {
            V.updateApplication({
                applicationName: constants._application.Todo,
                authorisation: constants._role.Editor,
                operation: "ADD"
            }, (err, data) => {
                V.print("Initial :")
                assert.equal(err, null, "valid application");
                // V.print("Initial :")
                V.getLogin(V.login, (err, data) => {
                    V.print("Final :")
                    V.updateApplication({
                        applicationName: constants._application.Expenses,
                        authorisation: constants._role.Viewer,
                        operation: "ADD"
                    }, (err, data) => {
                        assert.equal(err, null, "valid application");
                        V.print("Initial2 :")
                        V.getLogin(V.login, (err, data) => {
                            V.print("Final2 :")
                            assert.equal(V.userApplication.Todo, "Editor")
                            assert.equal(V.userApplication.Expenses, "Viewer");
                            assert.equal(V.version, 2);
                            done()
                        })
                    })
                })
            })
        })

        it("shall fail ADD/DEL an  invalid operation", done => {
            V.updateApplication({
                applicationName: constants._application.Todo,
                authorisation: constants._role.Editor,
                operation: "VV"
            }, (err, data) => {
                assert.equal(err, constants._errorMessage.InvalidParam, "valid application");
                done()
            })
        })
        it("shall fail Add an  invalid role", done => {
            V.updateApplication({
                applicationName: constants._application.Todo,
                authorisation: "VV",
                operation: 'ADD'
            }, (err, data) => {
                assert.equal(err, constants._errorMessage.InvalidParam, "valid application");
                done()
            })
        })
        it("shall fail Add an  invalid application", done => {
            V.updateApplication({
                applicationName: "BAD APP",
                authorisation: constants._role.Editor,
                operation: 'ADD'
            }, (err, data) => {
                assert.equal(err, constants._errorMessage.InvalidParam, "valid application");
                done()
            })
        })
        it("shall remove a valid application", done => {
            V.updateApplication({
                applicationName: constants._application.Todo,
                authorisation: constants._role.Editor,
                operation: "ADD"
            }, (err, data) => {
                V.print("Initial :")
                assert.equal(err, null, "valid application");
                // V.print("Initial :")
                V.getLogin(V.login, (err, data) => {
                    assert.equal(V.version, 1);
                    V.print("Final :")
                    V.updateApplication({
                        applicationName: constants._application.Expenses,
                        authorisation: constants._role.Viewer,
                        operation: "ADD"
                    }, (err, data) => {
                        assert.equal(err, null, "valid application");
                        V.print("Initial2 :")
                        V.getLogin(V.login, (err, data) => {
                            V.print("Final2 :")
                            assert.equal(V.userApplication.Todo, "Editor")
                            assert.equal(V.userApplication.Expenses, "Viewer");
                            assert.equal(V.version, 2);
                            V.updateApplication({
                                applicationName: constants._application.Expenses,
                                authorisation: constants._role.Viewer,
                                operation: "DEL"
                            }, (err, data) => {
                                assert.equal(err, null, "valid application");
                                V.print("Initial3 :")
                                V.getLogin(V.login, (err, data) => {
                                    V.print("Final3 :")
                                    assert.deepEqual(V.userApplication, {
                                        "Todo": "Editor"
                                    })
                                    // assert.equal(V.userApplication.Expenses,"Viewer");
                                    assert.equal(V.version, 3);
                                    done()
                                })
                            })
                        })
                    })
                })
            })
        })
        it("shall add create a complete user", done => {
            const EntryUser = {
                login: "rty",
                pwd: "rtypwd",
                userApplication: {
                    'Todo': 'Root',
                    'Expenses': "Viewer"
                }
            }
            let T = new User()
            T.createLogin(EntryUser.login, (e1, r1) => {
                if (e1) {
                    console.log(e1)
                }
                    assert.equal(T.version, 0, "Version shall be updated to 0");
                    console.log(e1, r1)
                T.updateLoginPwd(EntryUser.pwd, (e2, r2) => {
                    if (e2) {
                        console.log(e2, r2)
                        assert.equal(T.version, 1, "Version shall be updated to 1");
                    } else {
                        T.updateApplicationList(EntryUser.userApplication, (err, data) => {
                            let V = new User()
                            assert.equal(T.version, 2, "Version shall be updated to 2");
                            V.getLogin(EntryUser.login, (err, data) => {
                                assert.deepEqual(EntryUser.login, data.Item.login, "[message]");
                                assert.deepEqual(EntryUser.pwd, data.Item.pwd, "[message]");
                                assert.deepEqual(EntryUser.userApplication, data.Item.userApplication, "[message]");
                                assert.equal(V.version, 2, "Version shall be updated to 2");
                                done()
                            })
                        })

                    }
                })
            })
        })
    })
    describe("Scan Users", function () {
        it("shall scan all", done => {
          UTable.scanUsers(null,(err,data)=>{
              console.log(data)
              assert.isNull(err, "[message]");
              done()
            })
            
        })
        it("shall scan from specific key", done => {
            UTable.scanUsers('update',(err,data)=>{
                console.log(data)
                assert.isNull(err, "[message]");
                done()
            })
        })
    })
})