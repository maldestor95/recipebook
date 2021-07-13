import { expect } from "chai"
import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp);
import express from "express"
import { createHttpTerminator } from "http-terminator"
import sinon, { SinonStub } from "sinon"

import {
    create_userTable,
    delete_userTable,
    scan_userTable,
} from '../../lib/dynamodb/usertable'
import { User } from "../../lib/dynamodb/user"
import UserRouter from "../Users_router"
import * as auth from "../auth"
import { _application, _role } from "../../lib/definition"

const testServer: express.Application = express()
const testServerPort = 3001
const testServerAddress = `http://localhost:${testServerPort}`;
testServer.use(express.json())
testServer.use(express.urlencoded({ extended: true }))
testServer.use('/', UserRouter)

let serverRef, httpTerminator: any

const fakeauth = function (req: express.Request, res: express.Response, next: express.NextFunction, applicationName: _application, minimumLevelRequired: _role) {
    return next()
}

describe('--- users router ---', () => {
    before((done) => {
        process.env.NODE_ENV = 'development'
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
                scan_userTable((err, data) => {
                    // console.log(`\ttable Users initiated with \n \t\t${JSON.stringify(data, null, 2)}`)
                    console.log(`\tInfo: table Users initiated `)
                    done()
                })
            }
        })
        serverRef = testServer.listen(testServerPort, function () {
            // console.log('App is listening on port ${testServerAddress}!');
        });
        httpTerminator = createHttpTerminator({ server: serverRef });
    })
    after((done) => {
        httpTerminator.terminate();
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
    })
    describe('scan users', () => {
        before(async () => {
            const arrayOfUser = [new User('scan1'), new User('scan2'), new User('scan3'), new User('scan4')]
            for (let i in arrayOfUser) {
                await arrayOfUser[i].createLogin()
            }
        })
        it('from beginning', async () => {
            await chai.request(testServerAddress)
                .get('/')
                .then(data => {
                    expect(data.status).to.eq(200)
                    const result = data.body
                    expect(result.Items.length).to.eq(4)
                    expect(result.Count).to.eq(4)
                })
                .catch(err => {
                    console.log(err)
                    expect(err).to.be.null
                })
        })
        it('from specific id', async () => {
            const startString = await chai.request(testServerAddress)
                .get('/').then(data => data.body)
            expect(startString.Count).to.eq(4);

            await chai.request(testServerAddress)
                .get('/')
                .set('content-type', 'application/json')
                // WARNING Items in scan are not given in alphabetical order!
                .send({ start: startString.Items[1].login })  // we then chose the 2nd item
                .then(data => {
                    expect(data.status).to.eq(200)
                    const result = data.body
                    expect(result.Items.length).to.eq(2)
                    expect(result.Count).to.eq(2)
                })
                .catch(err => { console.log(err) })
        })
    })
    describe('/:login_id', function () {
        this.timeout(5000)
        it('create User POST', async () => {

            const authstub = sinon.stub(auth, "isAuthorized").callsFake(fakeauth)
            const createLogin = await chai.request(testServerAddress)
                .post('/createlogin')
            expect(createLogin.status).to.eq(200);
            expect(createLogin.text).to.eq('success');
            const checkUser = new User('createlogin')
            await checkUser.get('createlogin')
                .then((dataCheckUser) => {
                    expect(dataCheckUser.res!.login).to.eq('createlogin')
                });
            authstub.restore()
        })
        describe('get User GET', () => {

            it('existing user', async () => {
                const getLogin = await chai.request(testServerAddress)
                    .get('/createlogin')

                const data = JSON.parse(getLogin.text)
                expect(getLogin.status).to.eq(200);
                expect(data.login).to.eq('createlogin');
                expect(data.pwd).to.eq('new');
            })
            it('unknown user', async () => {
                const getUnknownLogin = await chai.request(testServerAddress)
                    .get('/ukn')
                expect(getUnknownLogin.status).to.eq(404);
                expect(getUnknownLogin.text).to.eq('/ukn not found')
            });
        })
        describe("delete User DELETE", function () {
            it('existing user', async () => {
                const authstub = sinon.stub(auth, "isAuthorized").callsFake(fakeauth)

                const tempLogin = await chai.request(testServerAddress)
                    .post('/loginToDelete')
                const loginToDelete = await chai.request(testServerAddress)
                    .delete('/loginToDelete')
                expect(loginToDelete.status).to.eq(200);
                expect(loginToDelete.text).to.eq('');
                authstub.restore()
            })
            it("unknown user ", async () => {
                const authstub = sinon.stub(auth, "isAuthorized").callsFake(fakeauth)

                const getUnknownLogin = await chai.request(testServerAddress)
                    .delete('/ukn')
                expect(getUnknownLogin.status).to.eq(404);
                expect(getUnknownLogin.text).to.eq('/ukn not found')
                authstub.restore()

            })
        })
    })

    describe('/:login_id/:action', function () {
        let authstub: SinonStub
        beforeEach(() => {
            authstub = sinon.stub(auth, "isAuthorized").callsFake(fakeauth)
        })
        afterEach(() => {
            authstub.restore()
        })
        describe("/:login_id/pwd PUT", function () {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request(testServerAddress)
                    .post('/pwdPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                const tempLogin = await chai.request(testServerAddress)
                    .put('/pwdPUT/pwd')
                    .set('content-type', 'application/json')
                    .send({ version: 0, pwd: 'modifiedPassword' })
                expect(tempLogin.status).to.eq(200);
                const resultOfChangePwd = JSON.parse(tempLogin.text)
                expect(resultOfChangePwd!.pwd).to.eq('modifiedPassword');
                expect(resultOfChangePwd!.login).to.eq('pwdPUT');
            })

            const testParams = [
                { name: "invalid pwd", address: '/pwdPUT/pwd', params: { version: 1, pwd: '' }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "missing version", address: '/pwdPUT/pwd', params: { pwd: 'tt' }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "invalid version", address: '/pwdPUT/pwd', params: { version: 100, pwd: 'tt' }, returns: { status: 400, text: "invalid params" } },
                { name: "unknown login", address: '/ukn/pwd', params: { version: 1, pwd: 'tt' }, returns: { status: 400, text: "invalid params" } }
            ]
            for (let tparam in testParams) {
                it(`${testParams[tparam].name}`, async () => {
                    const putPwdBadPwd = await chai.request(testServerAddress)
                        .put(testParams[tparam].address)
                        .set('content-type', 'application/json')
                        .send(testParams[tparam].params)
                    expect(putPwdBadPwd.status).to.eq(testParams[tparam].returns.status);
                    expect(putPwdBadPwd.text).to.eq(testParams[tparam].returns.text)
                })
            }
        })
        describe('/:login_id/details PUT', () => {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request(testServerAddress)
                    .post('/detailsPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                let createdUser
                const tempLogin = await chai.request(testServerAddress)
                    .put('/detailsPUT/details')
                    .set('content-type', 'application/json')
                    .send({ version: 0, details: { address: 'newAddress', email: 'mymail@test.com', toto: '27' } })

                expect(tempLogin.status).to.eq(200);
                const resultOfChangeDetails = JSON.parse(tempLogin.text)

                expect(resultOfChangeDetails!.details!.address).to.eq('newAddress');
                expect(resultOfChangeDetails!.details!.email).to.eq('mymail@test.com');
                expect(resultOfChangeDetails!.details!.phone).to.eq(undefined);
                expect(resultOfChangeDetails!.login).to.eq('detailsPUT');
            })
            const testParams = [
                { name: "empty details", address: '/pwdPUT/details', params: { version: 1, details: {} }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "no details", address: '/pwdPUT/details', params: { version: 1 }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "all details", address: '/pwdPUT/details', params: { version: 1, details: { 'phone': '123', address: 'ici', email: 'voila@tt.fr' } }, returns: { status: 200, text: `{"login":"pwdPUT","version":2,"details":{"address":"ici","email":"voila@tt.fr","phone":"123"},"userApplication":{},"pwd":null}` } },
                { name: "missing version", address: '/pwdPUT/details', params: { details: { 'phone': '123' } }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "invalid version", address: '/pwdPUT/details', params: { version: 100, details: { 'phone': '123' } }, returns: { status: 404, text: "/pwdPUT/details not found with method PUT" } },
                { name: "unknown login", address: '/ukn/details', params: { version: 1, details: { 'phone': '123' } }, returns: { status: 404, text: "/ukn/details not found with method PUT" } }
            ]
            for (let tparam in testParams) {
                it(`${testParams[tparam].name}`, async () => {
                    const putPwdBadPwd = await chai.request(testServerAddress)
                        .put(testParams[tparam].address)
                        .set('content-type', 'application/json')
                        .send(testParams[tparam].params)
                    expect(putPwdBadPwd.status).to.eq(testParams[tparam].returns.status);
                    expect(putPwdBadPwd.text).to.eq(testParams[tparam].returns.text)
                })
            }

        })
        describe('/:login_id/application PUT', () => {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request(testServerAddress)
                    .post('/applicationPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                let createdUser
                const tempLogin = await chai.request(testServerAddress)
                    .put('/applicationPUT/application')
                    .set('content-type', 'application/json')
                    .send({ version: 0, applicationList: { 'Users': 'Manager', 'Recettes': 'Editor' } })

                expect(tempLogin.status).to.eq(200);
                const resultOfChangeDetails = JSON.parse(tempLogin.text)

                expect(resultOfChangeDetails!.userApplication).to.deep.eq({ 'Users': 'Manager', 'Recettes': 'Editor' });
                expect(resultOfChangeDetails!.login).to.eq('applicationPUT');
            })
            const testParams = [
                { name: "unknown login", address: '/ukn/application', params: { version: 1, applicationList: { 'Users': 'Manager' } }, returns: { status: 404, text: "/ukn/application not found with method PUT" } },
                { name: "missing version", address: '/pwdPUT/application', params: { applicationList: { 'Users': 'Manager' } }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "invalid version", address: '/pwdPUT/application', params: { version: 100, applicationList: { 'Users': 'Manager' } }, returns: { status: 404, text: "/pwdPUT/application not found with method PUT" } },
                { name: "empty application", address: '/pwdPUT/application', params: { version: 1, applicationList: {} }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "no application", address: '/pwdPUT/application', params: { version: 1 }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "bad Application", address: '/pwdPUT/application', params: { version: 1, applicationList: { 'BADAPP': 'Manager' } }, returns: { status: 400, text: "error in params, body or cookie" } },
                { name: "bad Role", address: '/pwdPUT/application', params: { version: 1, applicationList: { 'Users': 'BadRole' } }, returns: { status: 400, text: "error in params, body or cookie" } },
            ]
            for (let tparam in testParams) {
                it(`${testParams[tparam].name}`, async () => {
                    const putPwdBadPwd = await chai.request(testServerAddress)
                        .put(testParams[tparam].address)
                        .set('content-type', 'application/json')
                        .send(testParams[tparam].params)
                    expect(putPwdBadPwd.status).to.eq(testParams[tparam].returns.status);
                    expect(putPwdBadPwd.text).to.eq(testParams[tparam].returns.text)
                })
            }
        })
    })

    describe("full user router sequence", function () {
        const fullTestUser = new User('fullTestUser')
        let authstub: SinonStub
        beforeEach(() => {
            authstub = sinon.stub(auth, "isAuthorized").callsFake(fakeauth)
        })
        afterEach(() => {
            authstub.restore()
        })
        it("shall create some user and do some initial update", async () => {
            await chai.request(testServerAddress)
                .post(`/${fullTestUser.login}`)
                .then(data => { expect(data.status).to.eq(200) })

            await chai.request(testServerAddress)
                .put(`/${fullTestUser.login}/pwd`)
                .set('content-type', 'application/json')
                .send({ version: 0, pwd: '27' })
                .then(data => {
                    expect(data.status).to.eq(200)
                })

            await chai.request(testServerAddress)
                .put(`/${fullTestUser.login}/details`)
                .set('content-type', 'application/json')
                .send({ version: 1, details: { address: 'ici' } })
                .then(data => {
                    expect(data.status).to.eq(200)
                })
            await chai.request(testServerAddress)
                .get(`/${fullTestUser.login}`)
                .then(data => {
                    const resultat = JSON.parse(data.text)
                    expect(resultat.version).to.eq(2)
                    expect(resultat.login).to.eq(fullTestUser.login)
                    expect(resultat.details.address).to.eq('ici')
                    expect(data.status).to.eq(200)
                })
        })
        it("shall do some more user  update", async () => {
            await chai.request(testServerAddress)
                .put(`/${fullTestUser.login}/pwd`)
                .set('content-type', 'application/json')
                .send({ version: 2, pwd: '27' })
                .then(data => {
                    expect(data.status).to.eq(200)
                })

            await chai.request(testServerAddress)
                .put(`/${fullTestUser.login}/details`)
                .set('content-type', 'application/json')
                .send({ version: 3, details: { address: 'labas', phone: '123' } })
                .then(data => {
                    expect(data.status).to.eq(200)
                    const resultat = JSON.parse(data.text)
                    expect(resultat.version).to.eq(4)

                })
            await chai.request(testServerAddress)
                .get(`/${fullTestUser.login}`)
                .then(data => {
                    const resultat = JSON.parse(data.text)
                    expect(resultat.version).to.eq(4)
                    expect(resultat.login).to.eq(fullTestUser.login)
                    expect(resultat.details.address).to.eq('labas')
                    expect(resultat.details.phone).to.eq('123')
                    expect(data.status).to.eq(200)
                })
        })
        it("shall delete the user", async () => {
            await chai.request(testServerAddress)
                .delete(`/${fullTestUser.login}`)
                .then(data => {
                    expect(data.status).to.eq(200)
                    expect(data.text).to.eq("")
                })
            await chai.request(testServerAddress)
                .get(`/${fullTestUser.login}`)
                .then(data => {
                    expect(data.status).to.eq(404)
                })


        })
    })
})
