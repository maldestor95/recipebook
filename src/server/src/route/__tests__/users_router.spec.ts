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
testServer.use('/', UserRouter.router)

let serverRef, httpTerminator: any


describe('users router', () => {
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
                    console.log(`\ttable Users initiated with \n \t\t${JSON.stringify(data, null, 2)}`)
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
    it('test get', (done) => {
        chai.request('http://localhost:3000')
            .get('/lui')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.eq('lui bien reçu');
                done();
            });
    })
    describe.skip('scan users', () => {
        it('from beginning', async () => { })
        it('from specific id', async () => { })
    })
    describe('/:login_id', function () {
        this.timeout(5000)
        it('create User POST', async () => {
            const createLogin = await chai.request('http://localhost:3000')
                .post('/createlogin')
            // .set('content-type', 'application/x-www-form-urlencoded')
            // .send({ login: 'createlogin'})
            // console.log(createLogin)
            expect(createLogin.status).to.eq(200);
            expect(createLogin.text).to.eq('success');

            const checkUser = new User('createlogin')
            await checkUser.get('createlogin')
                .then((dataCheckUser) => {
                    expect(dataCheckUser.res!.login).to.eq('createlogin')
                    // console.log(checkUser.print())
                });
        })
        it('get User GET', async () => {
            const getLogin = await chai.request('http://localhost:3000')
                .get('/createlogin')

            const data = JSON.parse(getLogin.text)
            expect(getLogin.status).to.eq(200);
            expect(data.login).to.eq('createlogin');
            expect(data.pwd).to.eq('new');

            const getUnknownLogin = await chai.request('http://localhost:3000')
                .get('/ukn')
            expect(getUnknownLogin.status).to.eq(404);
            expect(getUnknownLogin.text).to.eq('/ukn not found')
        });

        it('delete User DELETE', async () => {
            const tempLogin = await chai.request('http://localhost:3000')
                .post('/loginToDelete')
            const loginToDelete = await chai.request('http://localhost:3000')
                .delete('/loginToDelete')
            expect(loginToDelete.status).to.eq(200);
            expect(loginToDelete.text).to.eq('');

            const getUnknownLogin = await chai.request('http://localhost:3000')
                .delete('/ukn')
            expect(getUnknownLogin.status).to.eq(404);
            expect(getUnknownLogin.text).to.eq('/ukn not found')
        })
    })
})
describe.skip('/:login_id/:action', () => {
    it('/:login_id/pwd PUT', async () => { })
    it('/:login_id/details PUT', async () => { })
    it('/:login_id/application PUT', async () => { })
})
