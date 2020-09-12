/* This code is to ensure that this script is executed in an NODE_ENV=development mode to avoid corrupting production database*/
const safety = require('./safety.js')
safety.test()

import {
    User,
    userError,
    UserInterface
} from '../user'
import {
    create_userTable,
    delete_userTable,
    scan_userTable,
} from '../usertable'

const { expect } = require('chai')

const constants = require('../../definition')

describe.only("users with local dynamodB support", function () {
    before((done) => {
        create_userTable((err, data) => {
            if (err) {
                switch (err.err_msg) {
                    case 'connect ECONNREFUSED 127.0.0.1:8000':
                        console.log(' please launch in another powershell cmd:  npm run dynamodblocal')
                        break;
                    case 'Cannot create preexisting table':
                        done()
                        break;
                    default:
                        console.log(err.err_msg)
                        break;
                }
            } else {
                done()
            }
        })
    })
    after((done) => {
        delete_userTable((err, data) => {
            if (err) {
                switch (err.err_msg) {
                    case 'connect ECONNREFUSED 127.0.0.1:8000':
                        console.log(' please launch in another powershell cmd:  npm run dynamodblocal')
                        break;

                    default:
                        console.log(err.err_msg)
                        break;
                }
            } else {
                done()
            }
        })
        // done()
    })
    it("shall scan user table", done => {
        scan_userTable((err, data) => {
            expect(err).to.eq(null)
            // console.log(data)
            // expect(Array.isArray(data.Items)).to.eq(true)
            // expect(data.Count).to.eq(0)
            done()
        })
    })
    describe("class User", function () {
        this.timeout(4000)
        it("shall check constructor", done => {
            const User1 = new User('User1login')
            expect(User1.login).to.eq('User1login')
            expect(User1.pwd).to.eq(null)
            expect(Array.isArray(User1.userApplication)).to.eq(false)
            const User3 = new User("")
            expect(User3.invalid).to.eq(true)
            expect(User3.login).to.eq(null)

            done()
        })
        describe("create", function () {
            it("shall create 2 different login", async () => {
                const res1 = {
                    login: 'toto',
                    version: 0,
                    tableName: "Users",
                    details: {
                    },
                    userApplication: {},
                    pwd: "",
                }
                const User1 = new User(res1.login)

                const User2 = new User('tata')

                const p1 = await User1.createLogin()
                const p2 = await User2.createLogin()

                expect(p1.err).to.eq(null)
                if (p1.res) {
                    expect(p1.res.login).to.deep.eq(res1.login)
                }
                expect(p2.err).to.eq(null)
                if (p2.res) {
                    expect(p2.res.login).to.eq('tata')
                    expect(User2.invalid).to.eq(false)
                    expect(User2.version).to.eq(0)
                }
            })

            it("shall fail creating an existing login", async () => {
                const User2 = new User('tata')

                const p2 = await User2.createLogin()
                // console.log(p2)
                expect(p2.err).to.not.eq(null)
                expect(p2.res).to.eq(null)

            })
        })

        describe("delete", function () {

            it(`shall succeed with an existing login : `, async () => {
                const User2 = new User('tataToDel')
                const p2C = await User2.createLogin()
                if (p2C.res) {
                    const p2D = await User2.deleteLogin()
                    expect(p2D.err).to.eq(null)
                    expect(p2D.res).to.eq(null)
                }
            })
            it(`shall fail with a non existing login : `, async () => {
                const User2 = new User('tataToDelo')
                const p2D = await User2.deleteLogin()
                expect(p2D.err).to.not.eq(null)
                expect(p2D.res).to.eq(null)
            })
        })
        describe("getLogin", function () {
            const dummyUser: UserInterface = {
                login: 'dummy',
                pwd: 'dummypwd',
                details: {},
                userApplication: {},
                version: 1000,
            }
            it(`an existing login`, async () => {
                let newUser = new User('existingUser')
                // force write wrong data

                let existingUser = await newUser.createLogin()

                if (existingUser.res) {
                    expect(newUser.pwd).to.eq(null) //check creation

                    newUser.login = dummyUser.login
                    newUser.pwd = dummyUser.pwd
                    newUser.details = dummyUser.details
                    newUser.userApplication = dummyUser.userApplication
                    newUser.version = dummyUser.version

                    expect(newUser.pwd).to.eq(dummyUser.pwd) //check dummyfy

                    let getExistingUSer = await newUser.get(existingUser.res.login)

                    expect(getExistingUSer.err).to.eq(null)
                    if (getExistingUSer.res) { //check newUser.get
                        const FinalUser = getExistingUSer.res
                        expect(FinalUser.pwd).to.eq('new')
                        expect(FinalUser.details).to.deep.eq({})
                        // expect(FinalUser.details).to.deep.eq({address:undefined,email:undefined,phone:undefined})
                    }
                }
            })
            it(`an unknown login`, async () => {
                let newUser = new User('unknownUser789')
                let getExistingUSer = await newUser.get()
                expect(getExistingUSer.err).to.eq(null)
                expect(getExistingUSer.res).to.eq(null)
            })
        })

    })/*
        describe("print", function () {
            it("shall print", done => {
                const userToPrint = new User()
                userToPrint.createLogin('userToPrint', (err, data) => {
                    userToPrint
                        .getLogin('userToPrint', (err, data) => {
                            userToPrint.print()
                            userToPrint.print('pre', 'post')
                            done()
                        })
                })
            })
        })
        describe("update", function () {
            const MochaTestUser = new User('updateUser')

            before((done) => {
                MochaTestUser.createLogin(MochaTestUser.login, (err, data) => {
                    if (err) {
                        MochaTestUser.getLogin(MochaTestUser.login, (err, data) => {
                            done()
                        })
                    } else {
                        done()
                    }
                })
            })
            describe("LoginPwd", function () {
                let testPwd = 'validPwd'
                it(`shall change valid  password: ${testPwd}`, done => {
                    MochaTestUser.updateLoginPwd({
                        "pwd": 'testPwd',
                        "version": MochaTestUser.pwd
                    }, (err, data) => {
                        MochaTestUser.getLogin(MochaTestUser.login, (e2, d2) => {
                            expect(e2).to.eq(null)
                            expect(d2.pwd).to.eq('testPwd')
                        })
                        done()
                    })
                })

                testPwd = [null, undefined]
                testPwd.forEach(pwd => {
                    it(`shall change invalid  password: ${pwd}`, done => {
                        MochaTestUser.getLogin(MochaTestUser.login, (err, data) => {
                            MochaTestUser.updateLoginPwd({
                                pwd: pwd,
                                version: MochaTestUser.version,
                            }, (err, data) => {
                                expect(typeof err).to.eq('string')
                                expect(typeof data).to.eq('object')
                                done()
                            })
                        })
                    })
                })
            })
            describe("updateLoginDetails", function () {
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
                it("shall fail updating an empty login", done => {
                    let newdetails = {

                        phone: "123",
                        address: "ici",
                        email: "tre@tre.com"

                    }
                    const emptyLog = new User()
                    emptyLog.updateLoginDetails(newdetails, (err, res) => {
                        expect(err).to.not.eq(null)
                        done()
                    })
                })
                it("shall fail updating with undefined details", done => {
                    let newdetails
                    const emptyDetails = new User('tt')
                    emptyDetails.updateLoginDetails(newdetails, (err, res) => {
                        expect(err).to.eq('missing details')
                        done()
                    })
                })

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
                    const MochaInvalid = "MochaInvalid"
                    V.createLogin(MochaInvalid, (err1, data1) => {

                        V.updateApplication({
                            applicationName: constants._application.Todo,
                            authorisation: constants._role.Editor,
                            operation: "VV"
                        }, (err, data) => {
                            assert.equal(err, constants._errorMessage.InvalidParam, "valid application");
                            V.deleteLogin(MochaInvalid, done)
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
                                                    V.updateApplication({
                                                        applicationName: constants._application.Todo,
                                                        authorisation: constants._role.Editor,
                                                        operation: "DEL"
                                                    }, (err, data) => {
                                                        assert.equal(err, null, "valid application");
                                                        // V.print("Initial3 :")
                                                        V.getLogin(V.login, (err, data) => {
                                                            // V.print("Final3 :")
                                                            assert.deepEqual(V.userApplication, {})
                                                            V.deleteLogin(MochaREmoveTest, done)
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
                })

            })
        })
        describe("updateApplicationList", function () {
            const userToUpdate = new User
            let userToUpdateDetails = {
                'login': 'userToUpdateLogin',
                userApplication: {
                    Users: "Root",
                    Todo: "Viewer",
                    Expenses: "Manager"
                }
            }
            before((done) => {
                userToUpdate.createLogin(userToUpdateDetails.login, done)
            })
            after((done) => {
                userToUpdate.deleteLogin(userToUpdateDetails.login, done)
            })
            it("shall succeed with a valid application List", done => {
                const ValidAppUser = new User()
                ValidAppUser.getLogin(userToUpdateDetails.login, (e1, d1) => {
                    ValidAppUser.updateApplicationList(userToUpdateDetails.userApplication, (e2, d2) => {
                        ValidAppUser.getLogin(userToUpdateDetails.login, (e3, d3) => {
                            expect(ValidAppUser.version).to.eq(1)
                            expect(ValidAppUser.login).to.eq(userToUpdateDetails.login)
                            expect(ValidAppUser.userApplication).to.deep.eq(userToUpdateDetails.userApplication)
                            done()
                        })
                    })
                })
            })
            it("shall fail updating an empty login", done => {

                const emptyLog = new User()
                emptyLog.updateLoginDetails(userToUpdateDetails.userApplication, (err, res) => {
                    expect(err).to.eq('missing login')
                    done()
                })
            })
            it.skip("shall fail with an invalid application List", done => {
                done()
            })
        })
        // updateLoginDetails
    */
})

describe("support tests fonction", function () {
    it("areKeysPresent", done => {
        const source = ['34', '78', '89']
        const refB = ['78', '67', '34', '99', '56', '89'] //true
        const refC = ['78', '67', '99', '56', '89'] //false
        const refD = ['78', '67', '99', '56', '89'] //false
        expect(areKeysPresent(source, refB)).to.eq(true)
        expect(areKeysPresent(source, refC)).to.eq(false)
        expect(areKeysPresent(source, refD)).to.eq(false)
        done()
    })
})

let areKeysPresent = function (sourceArray: Array<string>, referenceArray: Array<string>) {
    return sourceArray.reduce((acc, current) => acc && referenceArray.includes(current), true)
}

