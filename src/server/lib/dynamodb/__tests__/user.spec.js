const {
    User,
    create_userTable,
    delete_userTable,
    scan_userTable,
    scanUsers,
    test
} = require('../user')
const {
    expect
} = require('chai')
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
                        MochaTestUser.getLogin(MochaTestUser.login,(e2,d2)=>{
                            expect(e2).to.eq(null)
                            expect(d2.pwd).to.eq('testPwd')
                        })
                        done()
                    })
                })

                testPwd = [null,undefined]
                testPwd.forEach(pwd => {
                    it(`shall change invalid  password: ${pwd}`, done => {
                        MochaTestUser.getLogin(MochaTestUser.login,(err,data)=>{
                            MochaTestUser.updateLoginPwd({
                                pwd: pwd,
                                version:MochaTestUser.version,
                            }, (err, data) => {
                                expect(typeof err).to.eq('string')
                                expect(typeof data).to.eq('object')
                                done()
                            })
                        })
                    })
                })
            })
        })
        // updateLoginDetails
        // updateApplication
        // updateApplicationList
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