
import express from "express";
import * as pug from 'pug'
import  frouter from './route/route'

const path = require('path')

//Create Express Server
const app = express();

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

function prepareRoute(app:express.Application) {

    app.use('/dirname',  function(req,res) { 
        res.send(__dirname);
    } )   
    app.get("/", function (req, res) {
        res.send("Hello World!");
    });
    app.get("/pug",function(req,res){
        const html = pug.render("p #{name}'s Pug source code!", {name:'toto'} )
        console.log(html)
        res.send(html)
    })
    app.use('/fr',frouter)
}

    prepareRoute(app)
    export default app