/* This code is to ensure that this script is executed in an NODE_ENV=development mode to avoid corrupting production database*/
const safety = require('./safety.js')
safety.test()

const {
    User,
    create_userTable,
    delete_userTable,
    scan_userTable,
    scanUsers,
    test
} = require('../user')

const {
    expect,
    assert
} = require('chai')

const constants = require('../../definition')

const user = require('../user')

const {
    forEach
} = require('lodash')



describe("users with local dynamodB support", function () {
    before((done) => {
        create_userTable((err, data) => {
            if (err) {
                switch (err.message) {
                    case 'connect ECONNREFUSED 127.0.0.1:8000':
                        console.log(' please launch in another powershell cmd:  npm run dynamodblocal')
                        break;
                    case 'Cannot create preexisting table':
                        done()
                        break;
                    default:
                        console.log(err.message)
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
                switch (err.message) {
                    case 'connect ECONNREFUSED 127.0.0.1:8000':
                        console.log(' please launch in another powershell cmd:  npm run dynamodblocal')
                        break;

                    default:
                        console.log(err.message)
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
            expect(Array.isArray(data.Items)).to.eq(true)
            expect(data.Count).to.eq(0)
            done()
        })
    })
    describe("class User", function () {
        this.timeout(4000)
        it("shall check constructor", done => {
            const User1 = new User('User1login')
            expect(User1.login).to.eq('User1login')
            expect(User1.pwd).to.eq('')
            expect(Array.isArray(User1.userApplication)).to.eq(false)
            const UserNull = new User()
            expect(UserNull.login).to.eq(null)
            expect(UserNull.pwd).to.eq('')

            done()
        })
        describe("create", function () {

            it("shall create 2 different login", done => {
                Promise.all([createPromise('toto'), createPromise('toto2')])
                    .then((res) => {
                        expect(res[0].ConsumedCapacity.TableName).to.eq('Users')
                        expect(res[1].ConsumedCapacity.TableName).to.eq('Users')
                        done()
                    })
                    .catch((err) => {
                        console.log(err)
                        expect(err).to.eq(null)
                        done()
                    })
            })
            it("shall fail creating an existing login", done => {
                Promise.all([createPromise('toto')])
                    .then((res) => {
                        expect(res[0].ConsumedCapacity.TableName).to.eq
                        done()
                    })
                    .catch((err) => {
                        expect(err.message).to.eq('The conditional request failed')
                        done()
                    })
            })
        })
        describe("delete", function () {
            let invalidDataSet = [null, undefined, 'unknown']
            invalidDataSet.forEach(dataset => {

                it(`shall fail deleting an non existing login : ${dataset}`, done => {
                    deleteLoginPromise(dataset)
                        .then((res) => {
                            expect(res[0].Attributes.login).to.eq(dataset)
                            done()
                        })
                        .catch((err) => {
                            // console.log(err)
                            expect(err.message).to.eq('The conditional request failed')
                            done()
                        })
                })
            })
            it("shall  deleting a login", done => {
                deleteLoginPromise('toto2')
                    .then((res) => {
                        expect(res.Attributes.login).to.eq('toto2')
                        done()
                    })
                    .catch((err) => {
                        // console.log(err)
                        expect(err).to.eq(null)
                        done()
                    })
            })
        })
        describe("getLogin", function () {
            let invalidDataSet = [null, undefined, 'unknow1111']
            invalidDataSet.forEach(dataset => {
                it(`shall getting an non existing login : ${dataset}`, done => {
                    const userlogin = dataset
                    const newUser = new User()
                    newUser.getLogin(userlogin, (err, data) => {
                        if (err) {
                            expect(err).to.not.eq(null)
                            expect(data).to.eq(null)
                            expect(err).to.not.eq(undefined)
                        } else {
                            expect(data).to.eq(undefined)
                        }
                        done()
                    })
                })
            })
            it("shall  get a login", done => {
                const userlogin = 'toto'
                const newUser = new User()
                newUser.getLogin(userlogin, (err, data) => {
                    expect(err).to.eq(null)
                    expect(areKeysPresent(['login', 'version'], Object.keys(data))).to.eq(1)
                    done()
                })
            })
        })
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
                    emptyLog.updateLoginDetails(newdetails,(err,res)=>{
                        expect(err).to.not.eq(null)
                        done()
                    })
                })
                it("shall fail updating with undefined details", done => {
                    let newdetails
                    const emptyDetails = new User('tt')
                    emptyDetails.updateLoginDetails(newdetails,(err,res)=>{
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
                     Users: "Root" ,
                     Todo: "Viewer" ,
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
                emptyLog.updateLoginDetails(userToUpdateDetails.userApplication,(err,res)=>{
                    expect(err).to.eq('missing login')
                    done()
                })
            })
            it.skip("shall fail with an invalid application List", done => {
                done()
            })
        })
        // updateLoginDetails
    })

    describe("support tests fonction", function () {
        it("areKeysPresent", done => {
            source = [34, 78, 89]
            refB = [78, 67, 34, 99, 56, 89] //true
            refC = [78, 67, 99, 56, 89] //false
            refD = [78, 67, 99, 56, 89] //false
            expect(areKeysPresent(source, refB)).to.eq(1)
            expect(areKeysPresent(source, refC)).to.eq(0)
            expect(areKeysPresent(source, refD)).to.eq(0)
            done()
        })
    })
})

let createPromise = function (userlogin) {
    return new Promise(function (resolve, reject) {
        const newUser = new User(userlogin)
        newUser.createLogin(userlogin, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    });
}
let deleteLoginPromise = function (userlogin) {
    return new Promise(function (resolve, reject) {
        const newUser = new User(userlogin)
        newUser.deleteLogin(userlogin, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    });
}
let areKeysPresent = function (sourceArray, referenceArray) {
    return sourceArray.reduce((acc, current) => acc & referenceArray.includes(current), true)
}