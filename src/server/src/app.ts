
import express from "express";
import * as bodyParser from 'body-parser'

const path = require('path')

//Create Express Server
const app = express();

var history = require('connect-history-api-fallback');

const port = 3000;
const dev = process.env.NODE_ENV ? process.env.NODE_ENV : "production";


// Logger Function
var myLogger = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let t = new Date()
    console.log(t, req.path, req.method);
    next();
};


app.disable("x-powered-by");
app.use(myLogger);

app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json


app.use(bodyParser.json())


app.get("/tot", function (req, res) {
    res.send("Hello World!");
});


// app.use(require("./route/recette"))

// app.use('/', express.static(__dirname + '/static'))
app.use('/tt', (req, res) => res.sendFile(__dirname + '/static'))

export default app