/**
 * Required libraries 
 */
const express = require("express");
const path=require('path')

const passport = require("passport")
const LocalStrategy = require("passport-local")
let auth= require('./route/auth')

var session = require("express-session")
var AWS = require("aws-sdk");

var DynamoDBStore = require('connect-dynamodb')({
    session: session
}); // more doc on https://www.npmjs.com/package/connect-dynamodb
var DynamoDBStoreOptions = {
    client: new AWS.DynamoDB({
        endpoint: process.env.NODE_ENV=="developmentLocal"?new AWS.Endpoint('http://localhost:8000'):null,
        region: "eu-west-3",
    })
    // AWSConfigPath:'.pathtoCredentials.json' //TODO add credentials when going to production
}
if (process.env.NODE_ENV=="developmentLocal") {
    DynamoDBStoreOptions.client.config.update({endpoint: "http://localhost:8000"})
}
const User = require('./lib/dynamodb/user')

var history = require('connect-history-api-fallback');

var bodyParser = require('body-parser')
const port = 3000;
const dev = process.env.NODE_ENV?process.env.NODE_ENV:"production";


// Logger Function
var myLogger = function (req, res, next) {
    let t=new Date()
    console.log(t,   req.path);
    next();
};


//Passport session management
passport.serializeUser(function (user, done) {
    done(null, {login:user.login,userApplication:user.userApplication});
});

passport.deserializeUser(function (login, done) {
    let U = new User()
    U.getLogin(login, function (err, user) {
        done(err, user);
    });
});


//APP
const app = express();

app.disable("x-powered-by");
app.use(myLogger);

app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json


app.use(bodyParser.json())

app.use(passport.initialize())
app.use(session({
    store: new DynamoDBStore(DynamoDBStoreOptions),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
})); 
// more doc on https://www.npmjs.com/package/express-session
app.use(passport.session())


app.get("/tot", function (req, res) {
    res.send("Hello World!");
});
app.get('/lok',(req,res,next)=>{auth.checkAuth(req,res,next,'Users')},function(req,res){
    res.send('success')
})

app.use(require("./route/Users_router"));
app.use(require("./route/login"));
app.use(require("./route/auth").router);
app.use(require("./route/recette"))
app.use(require("./route/document"))
app.use('/apps',require("./route/Applications_router"));
app.use('/', express.static(__dirname+'/static'))
app.use('/tt', (req,res)=>res.sendFile(__dirname+'/static'))



module.exports=app

