
const isportbusy = require('../isportbusy');
const {dummyServer} = require ('../dummyserver')
const { expect } = require('chai');

const serverport=10000

describe("dummy server", function () {
    this.timeout(10000)
    let count=0
    let serverList=[]
    beforeEach((done)=>{
        serverList.push(new dummyServer(serverport+count))
        count +=1
        setTimeout(done,1000)
    })
    after(()=>{
        serverList.forEach(sv=>sv.close())
    })
    it(`confirms server is started on port ${serverport+0}`, done => {
        isportbusy(serverport,{timeout:1000, host:'127.0.0.1'})
        .then((res)=>{
            expect(res).to.eq(true)
            done()
        })
    })
    it(`confirms server is started on port ${serverport+1}`, done => {
        isportbusy(serverport+1,{timeout:1000, host:'127.0.0.1'})
        .then((res)=>{
            expect(res).to.eq(true)
            done()
        })
    })
    it(`confirms server is started on port ${serverport+2} and free on port ${serverport-1} `, done => {
        let freeport= isportbusy(serverport-1,{timeout:1000, host:'127.0.0.1'})
        let busyport= isportbusy(serverport+2,{timeout:1000, host:'127.0.0.1'})
        Promise.all([freeport,busyport])
        .then((data)=>{
            // console.log(data)
            expect(data[0]).to.eq(false)
            expect(data[1]).to.eq(true)
            done()
        })
    })
})

// const server=new dummyServer(10100)
// console.log('tt')
