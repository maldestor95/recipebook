import express from "express";
import { createServer } from "http";

 const testApp = express();
 const initapp = (newport: number) => {
  const port = 3000 | newport;
  testApp.set('port', port);
  var server = createServer(testApp);
  server.listen(port, () => {
    console.log(`server has started on port:${port} at ${new Date().toLocaleTimeString()}`);
    if (process.env.NODE_ENV) {
      console.log(`environment mode: ${process.env.NODE_ENV} `);
    }

  });
  server.on('error', onError);
  server.on('listening', onListening);
  function onError(error: any) {
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
        // console.error(bind + ' is already in use');
        // process.exit(1);
        break;
      default:
        throw error;
    }
  }
  function onListening() {
    var addr = server.address();
    if (addr) {

      var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      console.log('Listening on ' + bind);
    }
  }
};
 const route = (enpoint:string, route:express.Router)=>{
    testApp.use(enpoint,route)
 }
 const deleteRoute = (enpoint:string)=>{
    testApp.delete(enpoint)
 }

const Port=3001;
export const testServer = {
    Port : Port,
    Address : `http://localhost:${Port}`,
    app: initapp,
    route:route,
    delete: deleteRoute
}
