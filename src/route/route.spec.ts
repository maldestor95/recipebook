import chai, { expect } from 'chai'
import chaiHttp from "chai-http"
chai.use(chaiHttp);
import express from "express";
import {createServer} from "http"

import route from './route'

const testServer = express();
const initapp=(newport:number)=>{   
    const port = 3000 | newport ;
    testServer.set('port', port);
    // app.use('/fr',route)
    var server = createServer(testServer);
    server.listen(port,()=>{
        console.log(`server has started on port:${port} at ${new Date().toLocaleTimeString()}`)
        if (process.env.NODE_ENV) {
          console.log(`environment mode: ${process.env.NODE_ENV} `)
        }
        
      });
      server.on('error', onError);
      server.on('listening', onListening);
      function onError(error:any) {
        if (error.syscall !== 'listen') {
          throw error;
        }
      
        var bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port;
      
        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            // process.exit(1);
            break;
          default:
            throw error;
        }
      }
      function onListening() {
        var addr = server.address();
        if (addr){
      
          var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
          console.log('Listening on ' + bind);
        }
      }
}
const testServerPort = 3001
const testServerAddress = `http://localhost:${testServerPort}`;
describe("test route", function () {
    before(()=>{
        initapp(testServerPort)
        testServer.use('/test',route)
    })
    it("dir all", done => {
        expect(false, 'response is not an object');
            // console.log(data)
            done()
    })
    it("shall request", async ()=> {
        await chai.request(testServerAddress)
        .get('/test/fl')
        .then(data => {
            console.log(data)
            expect(data.status).to.eq(200)
            const result = data.body
            // expect(result.Items.length).to.eq(4)
            // expect(result.Count).to.eq(4)
            
        })
        .catch(err => {
            console.log(err)
            expect(err).to.be.null
        })
    })

})