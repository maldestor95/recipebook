import { expect } from "chai"
import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp);
import express from "express"
import { createHttpTerminator, HttpTerminatorConfig } from "http-terminator"

const testServer: express.Application = express()
let serverRef, httpTerminator: any
describe('Test Description', () => {
    before(() => {
        testServer.get('/toto', (req, res) => {
            res.send('Hello World')
        })
        testServer.get('/tata', (req, res) => {
            res.send('Hello tata')
        })
        serverRef = testServer.listen(3000, function () {
            // console.log('App is listening on port 3000!');
        });
        httpTerminator = createHttpTerminator({ server: serverRef });

    })
    after(async () => {
        await httpTerminator.terminate();
    })
    it('test toto', (done) => {
        chai.request('http://localhost:3000')
        .get('/toto')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.text).to.eq('Hello World');
            done(); 
          });
    })
    it('test tata', (done) => {
        chai.request('http://localhost:3000')
        .get('/tata')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.text).to.eq('Hello tata');
            done(); 
          });
    })
})