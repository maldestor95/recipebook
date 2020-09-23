import { expect } from "chai"
import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp);
import express from "express"
import { createHttpTerminator, HttpTerminatorConfig } from "http-terminator"

import {
    create_userTable,
    delete_userTable,
    scan_userTable,
} from '../../lib/dynamodb/usertable'
import { User } from "../../lib/dynamodb/user"
import UserRouter from "../Users_router"

const testServer: express.Application = express()
testServer.use(express.json())
testServer.use(express.urlencoded({ extended: true }))
testServer.use('/', UserRouter.router)

let serverRef, httpTerminator: any


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
        serverRef = testServer.listen(3000, function () {
            // console.log('App is listening on port 3000!');
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
            await chai.request('http://localhost:3000')
                .get('/users')
                .then(data => {
                    expect(data.status).to.eq(200)
                    const result = data.body
                    expect(result.Items.length).to.eq(4)
                    expect(result.Count).to.eq(4)
                })
                .catch(err => {console.log(err)})
        })
        it('from specific id', async () => {
            const startString=await chai.request('http://localhost:3000')
            .get('/users').then(data=> data.body )
            expect(startString.Count).to.eq(4);
            
            await chai.request('http://localhost:3000')
            .get('/users')
            .set('content-type', 'application/json')
            // WARNING Items in scan are not given in alphabetical order!
            .send({ start: startString.Items[1].login })  // we then chose the 2nd item
            .then(data => {
                expect(data.status).to.eq(200)
                const result = data.body
                expect(result.Items.length).to.eq(2)
                expect(result.Count).to.eq(2)
            })
            .catch(err => {console.log(err)})
         })
    })
    describe('/:login_id', function () {
        this.timeout(5000)
        it('create User POST', async () => {
            const createLogin = await chai.request('http://localhost:3000')
                .post('/createlogin')
            expect(createLogin.status).to.eq(200);
            expect(createLogin.text).to.eq('success');
            const checkUser = new User('createlogin')
            await checkUser.get('createlogin')
                .then((dataCheckUser) => {
                    expect(dataCheckUser.res!.login).to.eq('createlogin')
                });
        })
        describe('get User GET', () => {

            it('existing user', async () => {
                const getLogin = await chai.request('http://localhost:3000')
                    .get('/createlogin')

                const data = JSON.parse(getLogin.text)
                expect(getLogin.status).to.eq(200);
                expect(data.login).to.eq('createlogin');
                expect(data.pwd).to.eq('new');
            })
            it('unknown user', async () => {
                const getUnknownLogin = await chai.request('http://localhost:3000')
                    .get('/ukn')
                expect(getUnknownLogin.status).to.eq(404);
                expect(getUnknownLogin.text).to.eq('/ukn not found')
            });
        })
        describe("delete User DELETE", function () {
            it('existing user', async () => {
                const tempLogin = await chai.request('http://localhost:3000')
                    .post('/loginToDelete')
                const loginToDelete = await chai.request('http://localhost:3000')
                    .delete('/loginToDelete')
                expect(loginToDelete.status).to.eq(200);
                expect(loginToDelete.text).to.eq('');
            })
            it("unknown user ", async () => {
                const getUnknownLogin = await chai.request('http://localhost:3000')
                    .delete('/ukn')
                expect(getUnknownLogin.status).to.eq(404);
                expect(getUnknownLogin.text).to.eq('/ukn not found')
            })
        })
    })

    describe('/:login_id/:action', function () {
        describe("/:login_id/pwd PUT", function () {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request('http://localhost:3000')
                    .post('/pwdPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                const tempLogin = await chai.request('http://localhost:3000')
                    .put('/pwdPUT/pwd')
                    // .set('content-type', 'application/x-www-form-urlencoded')
                    // .send(JSON.stringify({ pwd: 'modifiedPassword' }))
                    .set('content-type', 'application/json')
                    .send({ version: 0, pwd: 'modifiedPassword' })
                expect(tempLogin.status).to.eq(200);
                const resultOfChangePwd = JSON.parse(tempLogin.text)
                expect(resultOfChangePwd!.pwd).to.eq('modifiedPassword');
                expect(resultOfChangePwd!.login).to.eq('pwdPUT');
            })
            it('unknown login', async () => {

                const putPwdUnknownLogin = await chai.request('http://localhost:3000')
                    .put('/ukn/pwd')
                    .set('content-type', 'application/json')
                    .send({ version: 0, pwd: 'modifiedPassword' })
                expect(putPwdUnknownLogin.status).to.eq(404);
                expect(putPwdUnknownLogin.text).to.eq('/ukn/pwd not found with method PUT')
            })
            it('no pwd given', async () => {
                const putPwdnokeyw = await chai.request('http://localhost:3000')
                    .put('/pwdPUT/pwd')
                    .set('content-type', 'application/json')
                    .send({ version: 0, nokeyw: 'modifiedPassword' })
                expect(putPwdnokeyw.status).to.eq(404);
                expect(putPwdnokeyw.text).to.eq('PUT /pwdPUT/pwd "invalid password"')
            })
            it('invalid pwd given', async () => {
                const putPwdBadPwd = await chai.request('http://localhost:3000')
                    .put('/pwdPUT/pwd')
                    .set('content-type', 'application/json')
                    .send({ version: 1, pwd: '' })
                expect(putPwdBadPwd.status).to.eq(404);
                expect(putPwdBadPwd.text).to.eq('PUT /pwdPUT/pwd "with params {"version":1,"pwd":""} can\'t contain empty string (but null is authorised)"')
            })
        })
        describe('/:login_id/details PUT', () => {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request('http://localhost:3000')
                    .post('/detailsPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                let createdUser
                const tempLogin = await chai.request('http://localhost:3000')
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
            it('unknown login', async () => {
                const putDetailsUnknownLogin = await chai.request('http://localhost:3000')
                    .put('/ukn/details')
                    .set('content-type', 'application/json')
                    .send({ version: 0, details: { address: 'newAddress', email: 'mymail@test.com', toto: '27' } })
                expect(putDetailsUnknownLogin.status).to.eq(404);
                expect(putDetailsUnknownLogin.text).to.eq('/ukn/details not found with method PUT')
            })
            it('no details given', async () => {
                const putDetailsnokeyw = await chai.request('http://localhost:3000')
                    .put('/detailsPUT/details')
                    .set('content-type', 'application/json')
                    .send({ version: 1, details: { toto: '27' } })
                expect(putDetailsnokeyw.status).to.eq(200);
                expect(JSON.parse(putDetailsnokeyw.text).details).to.deep.eq({})
                expect(JSON.parse(putDetailsnokeyw.text).version).to.deep.eq(2)
            })
            it('empty strings', async () => {

                const putDetailsEmptyString = await chai.request('http://localhost:3000')
                    .put('/detailsPUT/details')
                    .set('content-type', 'application/json')
                    .send({ version: 2, details: { phone: '' } })
                expect(putDetailsEmptyString.status).to.eq(404);
                expect(putDetailsEmptyString.text)
                    .to.eq(`PUT /detailsPUT/details "with params {"version":2,"details":{"phone":""}} can\'t contain empty string (but null is authorised)"`)
            })
        })
        describe('/:login_id/application PUT', () => {
            it('nominal case', async () => {
                const createPwdPUTUser = await chai.request('http://localhost:3000')
                    .post('/applicationPUT')
                expect(createPwdPUTUser.status).to.eq(200);
                let createdUser
                const tempLogin = await chai.request('http://localhost:3000')
                    .put('/applicationPUT/application')
                    .set('content-type', 'application/json')
                    .send({ version: 0, applicationList: { 'Users': 'Manager', 'Recettes': 'Editor' } })

                expect(tempLogin.status).to.eq(200);
                const resultOfChangeDetails = JSON.parse(tempLogin.text)

                expect(resultOfChangeDetails!.userApplication).to.deep.eq({ 'Users': 'Manager', 'Recettes': 'Editor' });
                expect(resultOfChangeDetails!.login).to.eq('applicationPUT');
            })
            it('unknown login', async () => {
                const putApplicationUnknownLogin = await chai.request('http://localhost:3000')
                    .put('/ukn/application')
                    .set('content-type', 'application/json')
                    .send({ version: 0, applicationList: { 'Users': 'Manager', 'Recettes': 'Editor' } })
                expect(putApplicationUnknownLogin.status).to.eq(404);
                expect(putApplicationUnknownLogin.text).to.eq('/ukn/application not found with method PUT')
            })
            it('no details given', async () => {
                const putApplicationNokeyw = await chai.request('http://localhost:3000')
                    .put('/detailsPUT/application')
                    .set('content-type', 'application/json')
                    .send({ version: 1, toto: '27' })
                expect(putApplicationNokeyw.status).to.eq(404);
                expect(putApplicationNokeyw.text).to.eq(`/detailsPUT/application not found with method PUT`)
            })
            it('empty strings', async () => {

                const putDetailsEmptyString = await chai.request('http://localhost:3000')
                    .put('/detailsPUT/application')
                    .set('content-type', 'application/json')
                    .send({ version: 2, applicationList: { 'Users': 'Manager', 'Recettes': '' } })
                expect(putDetailsEmptyString.status).to.eq(404);
                expect(putDetailsEmptyString.text)
                    .to.eq(`PUT /detailsPUT/application "with params {"version":2,"applicationList":{"Users":"Manager","Recettes":""}} can\'t contain empty string (but null is authorised)"`)
            })
        })
    })

    describe("full user router sequence", function () {
        const fullTestUser = new User('fullTestUser')
        it("shall create some user and do some initial update", async () => {
            await chai.request('http://localhost:3000')
                .post(`/${fullTestUser.login}`)
                .then(data => { expect(data.status).to.eq(200) })

            await chai.request('http://localhost:3000')
                .put(`/${fullTestUser.login}/pwd`)
                .set('content-type', 'application/json')
                .send({ version: 0, pwd: '27' })
                .then(data => {
                    expect(data.status).to.eq(200)
                })

            await chai.request('http://localhost:3000')
                .put(`/${fullTestUser.login}/details`)
                .set('content-type', 'application/json')
                .send({ version: 1, details: { address: 'ici' } })
                .then(data => {
                    expect(data.status).to.eq(200)
                })
            await chai.request('http://localhost:3000')
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
            await chai.request('http://localhost:3000')
                .put(`/${fullTestUser.login}/pwd`)
                .set('content-type', 'application/json')
                .send({ version: 2, pwd: '27' })
                .then(data => {
                    expect(data.status).to.eq(200)
                })

            await chai.request('http://localhost:3000')
                .put(`/${fullTestUser.login}/details`)
                .set('content-type', 'application/json')
                .send({ version: 3, details: { address: 'labas', phone: '123' } })
                .then(data => {
                    expect(data.status).to.eq(200)
                    const resultat = JSON.parse(data.text)
                    expect(resultat.version).to.eq(4)

                })
            await chai.request('http://localhost:3000')
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
            await chai.request('http://localhost:3000')
                .delete(`/${fullTestUser.login}`)
                .then(data => {
                    expect(data.status).to.eq(200)
                    expect(data.text).to.eq("")
                })
            await chai.request('http://localhost:3000')
                .get(`/${fullTestUser.login}`)
                .then(data => {
                    expect(data.status).to.eq(404)
                })


        })
    })
})
