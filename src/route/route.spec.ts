
import chai, { expect } from 'chai'
import chaiHttp from "chai-http"
chai.use(chaiHttp);

describe("test route", function () {
    before( ()=>{})
    after(()=>{})
    beforeEach(()=>{ })
    it("shall async get", (done) => {
        // console.log(tServer.Address)
        chai.request('http://localhost:3000')
        .get('/fr/fl')
        .then(data=>{console.log(data.text);done()})
        .catch(err=> {console.log(err);done()})
        expect(true);
    })


    })
