const {
    subprocess
} = require('../subprocess');
const isPortBusy = require('../isportbusy');
const expect = require('chai').expect

subProcessToStart='node ./utils/dummyserver.js'

describe("subprocess", function () {
    this.timeout(10000)
    it("shall start a subprocess", done => {
        const sb = new subprocess(subProcessToStart)
        sb.start(1000, () => {
            isPortBusy(10000).then(res => {
                expect(res).to.eq(false)
                done()
            })
        })
    })
    it.skip("shall stop a subprocess", done => {
        const sb = new subprocess(subProcessToStart)
        sb.start(1000 )
        setTimeout(()=>{
            sb.stop(1000)
        },2000)
        setTimeout(() => {
            isPortBusy(10000).then(res => {
                expect(res).to.eq(true)
                done()
            })
        },5000)

    })
})