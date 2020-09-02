const checkport =require('../isportreachable')
const net = require('net');
var expect= require("chai").expect;

const serverPort=10000
describe("checkport ", function () {
    let server
    before(()=>{
        server = net.createServer((c) => {
            // 'connection' listener
            // console.log('client connected');
            c.on('end', () => {
            //   console.log('serv disconnected');
            });
            // c.write('hello\r\n');
            // c.pipe(c);
          });
          server.on('error', (err) => {
            throw err;
          });
          server.listen(serverPort, () => {
            // console.log('server bound');
        });
        
    })
    after(()=>{
        server.close()
        // console.log('server closed');
    })
    it("shall check valid port", done => {
        checkport(serverPort,{host:'127.0.0.1'})
        .then((res)=>{
           expect(res).to.eq(true)
           done()
        })
        .catch((res)=>{
            expect.fail('an error happened: Ensure server has been started')
            done()
        })
    })
    it("shall check invalid port", done => {
        checkport(serverPort+1,{host:'127.0.0.1'})
        .then((res)=>{
           expect(res).to.eq(false)
           done()
        })
        .catch((res)=>{
            expect.fail('an unexpected error happened')
            done()
        })
    })
})