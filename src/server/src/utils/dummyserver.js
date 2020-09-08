const net = require('net');

const serverPort = 10000
class dummyServer {
    constructor(port = serverPort,done=null) {
        this.server = net.createServer((c) => {
            // 'connection' listener
            // console.log('client connected');
            c.on('end', () => {
                  console.log(`serv disconnected from ${JSON.stringify(this.server.address())}`);
            });
            // c.write('hello\r\n');
            // c.pipe(c);
        });
        this.server.on('error', (err) => {
            throw err;
        });
        this.server.listen(port, () => {

            console.log(`server bound on port ${port} ${JSON.stringify(this.server.address())}`);
        });
    }
    close(done){
        this.server.close(done)
    }
}

var self=(module.exports={
    dummyServer
})
