var assert = require("chai").assert;
let User = require('../../lib/dynamodb/User').User
let UTable = require('../../lib/dynamodb/User')
const constants = require('../../lib/definition')





describe("User", function () {

    it("create and delete", done => {
        const createLoginName = 'Mochatotocreate'
        let U = new User()
        U.createLogin(createLoginName, (err, data) => {
            assert.isNull(err, "creation successfull");
            U.createLogin(createLoginName, (err, data) => {
                assert.equal(err.code, "ConditionalCheckFailedException", "creation successfull");
                U.deleteLogin(createLoginName, (err, data) => {
                    assert.isNull(err, "deletion successfull");
                    done()
                })
            })
        })
    })
    it("get one user", done => {
        const createLoginName = 'Mochatotoget'

        let U = new User()
        U.createLogin(createLoginName, (err, data) => {

            U.getLogin(createLoginName, (err, data) => {
                assert.equal(U.login, createLoginName, "[get Login] NOK");
                assert.isNull(err, "[message]");
                U.deleteLogin(createLoginName, (err, data) => {
                    assert.isNull(err, "deletion successfull");
                    done()
                })
            })
        })
    })

    describe("update details", function () {
        var V = new User()
        const MochaTestUser = "MochaUpdate"
        before((done) => {
            V.createLogin(MochaTestUser, (err, data) => {
                if (err) {
                    V.getLogin(MochaTestUser, (err, data) => {
                        done()
                    })
                } else {
                    done()
                }
            })
        });
        after((done) => {
            V.deleteLogin(MochaTestUser, done)
            // done()
        });
        // describe("shall", function () {
        it("add all ", done => {
            let newdetails = {

                phone: "123",
                address: "ici",
                email: "tre@tre.com"

            }
            assert.equal(V.login, MochaTestUser, "[message]");
            V.updateLoginDetails({
                details: newdetails,
                version: V.version
            }, (err, data) => {
                assert.isNull(err, "[message]");
                V.getLogin(MochaTestUser, (err, data) => {
                    assert.deepEqual(V.details.email, newdetails.email, "verification update");
                    done()
                })
            })
        })

        it("add email only ", done => {
            let newdetails = {
                email: "tre1@tre.com"
            }
            assert.equal(V.login, MochaTestUser, "[message]");
            V.updateLoginDetails({
                details: newdetails,
                version: V.version
            }, (err, data) => {
                assert.isNull(err, "[message]");
                V.getLogin(MochaTestUser, (err, data) => {
                    assert.deepEqual(V.details.email, newdetails.email, "verification update");
                    done()
                })

            })
        })
        it("add phone only ", done => {
            let newdetails = {
                phone: "1234"
            }
            assert.equal(V.login, MochaTestUser, "[message]");
            V.updateLoginDetails({
                details: newdetails,
                version: V.version
            }, (err, data) => {
                assert.isNull(err, "[message]");
                V.getLogin(MochaTestUser, (err, data) => {
                    assert.deepEqual(V.details.phone, newdetails.phone, "verification update");
                    done()
                })

            })
        })
        it("add address only ", done => {
            let newdetails = {
                address: "trenew@tre.com"
            }
            assert.equal(V.login, MochaTestUser, "[message]");
            V.getLogin(V.login, (e1, d1) => {
                let initialversion = V.version
                V.updateLoginDetails({
                    details: newdetails,
                    version: V.version
                }, (err, data) => {
                    assert.isNull(err, "[message]");
                    V.getLogin(MochaTestUser, (err, data) => {
                        assert.deepEqual(V.details.address, newdetails.address, "verification update");
                        assert.equal(V.version, initialversion + 1, "Version updated");
                        done()
                    })
                })
            })
        })
        // })

        it("shall change one pwd", done => {
            let newpwd = "newpwd"
            let newpwd2 = "newpwd2"

            assert.equal(V.login, MochaTestUser, "[message]");

            V.getLogin(V.login, (e1, d1) => {
                let initialversion = V.version
                V.updateLoginPwd({
                    pwd: newpwd,
                    version: V.version
                }, (err, data) => {
                    assert.isNull(err, "[message]");
                    V.getLogin(MochaTestUser, (err, data) => {
                        assert.deepEqual(V.pwd, newpwd, "verification pwd1");
                        V.updateLoginPwd({
                            pwd: newpwd2,
                            version: V.version
                        }, (err, data) => {
                            assert.isNull(err, "[message]");
                            V.getLogin(MochaTestUser, (err, data) => {
                                assert.deepEqual(V.pwd, newpwd2, "verification pwd2");
                                assert.equal(V.version, initialversion + 2, "Version updated");

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
        const MochaAuthorisationUser = "MochaAuthorisationUser"
        before((done) => {
            V.createLogin(MochaAuthorisationUser, (err, data) => {
                V.getLogin(null, (err2, data2) => {
                    // V.print("Initialised :")
                    done()
                })
            })
        });
        after((done) => {
            V.deleteLogin(MochaAuthorisationUser, done)
            // done()
        });
        it("shall add a valid application", done => {
            V.getLogin(MochaAuthorisationUser, (err, data) => {
                V.updateApplication({
                    applicationName: constants._application.Todo,
                    authorisation: constants._role.Editor,
                    operation: "ADD"
                }, (err, data) => {
                    // V.print("Initial :")
                    assert.equal(err, null, "valid application");
                    // V.print("Initial :")
                    V.getLogin(MochaAuthorisationUser, (err, data) => {
                        // V.print("Final :")
                        V.updateApplication({
                            applicationName: constants._application.Expenses,
                            authorisation: constants._role.Viewer,
                            operation: "ADD"
                        }, (err, data) => {
                            assert.equal(err, null, "valid application");
                            // V.print("Initial2 :")
                            V.getLogin(MochaAuthorisationUser, (err, data) => {
                                // V.print("Final2 :")
                                assert.equal(V.userApplication.Todo, "Editor")
                                assert.equal(V.userApplication.Expenses, "Viewer");
                                done()
                            })
                        })
                    })
                })
            })

        })

        it("shall fail ADD/DEL an  invalid operation", done => {
            const MochaInvalid="MochaInvalid"
            V.createLogin(MochaInvalid,(err1,data1)=>{

                V.updateApplication({
                    applicationName: constants._application.Todo,
                    authorisation: constants._role.Editor,
                    operation: "VV"
                }, (err, data) => {
                    assert.equal(err, constants._errorMessage.InvalidParam, "valid application");
                    V.deleteLogin(MochaInvalid,done)
                })
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
            const MochaREmoveTest = "MochaRemoveTest";
            V.createLogin(MochaREmoveTest, (err1, res1) => {
                V.getLogin(MochaREmoveTest, (err1, res1) => {
                    V.updateApplication({
                        applicationName: constants._application.Todo,
                        authorisation: constants._role.Editor,
                        operation: "ADD"
                    }, (err, data) => {
                        // V.print("Initial :")
                        assert.equal(err, null, "valid application");
                        // V.print("Initial :")
                        V.getLogin(V.login, (err, data) => {
                            // V.print("Final :")
                            V.updateApplication({
                                applicationName: constants._application.Expenses,
                                authorisation: constants._role.Viewer,
                                operation: "ADD"
                            }, (err, data) => {
                                assert.equal(err, null, "valid application");
                                // V.print("Initial2 :")
                                V.getLogin(V.login, (err, data) => {
                                    // V.print("Final2 :")
                                    assert.equal(V.userApplication.Todo, "Editor")
                                    assert.equal(V.userApplication.Expenses, "Viewer");
                                    V.updateApplication({
                                        applicationName: constants._application.Expenses,
                                        authorisation: constants._role.Viewer,
                                        operation: "DEL"
                                    }, (err, data) => {
                                        assert.equal(err, null, "valid application");
                                        // V.print("Initial3 :")
                                        V.getLogin(V.login, (err, data) => {
                                            // V.print("Final3 :")
                                            assert.deepEqual(V.userApplication, {
                                                "Todo": "Editor"
                                            })
                                            V.deleteLogin(MochaREmoveTest,done)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    })
   
    describe("Scan Users", function () {
        it("shall scan all", done => {
            UTable.scanUsers(null, (err, data) => {
                console.log(data)
                assert.isNull(err, "[message]");
                done()
            })

        })
        it("shall scan from specific key", done => {
            UTable.scanUsers('update', (err, data) => {
                console.log(data)
                assert.isNull(err, "[message]");
                done()
            })
        })
    })
})