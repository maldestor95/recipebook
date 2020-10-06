
import express from "express";
import * as session from "express-session"
import * as bodyParser from 'body-parser'
import * as  AWS from "aws-sdk"

// Development specific setting
import {initdb } from "./utils/initlocaldb"
if (process.env.NODE_ENV=="development") {
    initdb() // initialisation of the local database that has to be started by `npm run dynamodblocal`
}

// import * as MySession from "./session"

const path = require('path')

const passport = require("passport")
const LocalStrategy = require("passport-local")

// constants and definition
import * as definition from './lib/definition'

// route handlers
import * as authRouter from './route/auth'  //authentication and authorisation
import  usersRouter from './route/Users_router'

//Create Express Server
const app = express();

// Connect to DynamoDB

var DynamoDBStore = require('connect-dynamodb')({
    session: session
}); // more doc on https://www.npmjs.com/package/connect-dynamodb
var DynamoDBStoreOptions = {
    client: new AWS.DynamoDB({
        endpoint: process.env.NODE_ENV == "developmentLocal" ? 'http://localhost:8000' : undefined,
        region: "eu-west-3",
    })
    // AWSConfigPath:'.pathtoCredentials.json' //TODO add credentials when going to production
}

// const User = require('./lib/dynamodb/user')
import { User } from './lib/dynamodb/user'

var history = require('connect-history-api-fallback');

const port = 3000;
const dev = process.env.NODE_ENV ? process.env.NODE_ENV : "production";


// Logger Function
var myLogger = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let t = new Date()
    console.log(t, req.path, req.method);
    next();
};


//Passport session management
passport.serializeUser(function (user: any, done: any) {
    done(null, {
        login: user.login,
        userApplication: user.userApplication
    });
});

passport.deserializeUser(async (login: string, done: any) => {
    const candidateUser = new User(login)
    const { err, res } = await candidateUser.get()
    console.log({ err, res });
    done(err, res);
});




app.disable("x-powered-by");
app.use(myLogger);

app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json


app.use(bodyParser.json())

app.use(passport.initialize())
app.use(session.default({
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
app.get('/lok', (req, res, next) => {
    authRouter.checkAuth(req, res, next, definition._application.Users)
}, function (req, res) {
    res.send('success')
})

app.use('/users/',
    ((req, res, next) => authRouter.checkAuth(req, res, next, definition._application.Users)),
    usersRouter
);

app.use(require("./route/login"));
app.use(authRouter.router);
app.use(require("./route/recette"))
app.use(require("./route/document"))
app.use(require("./route/s3"))
app.use('/apps', require("./route/Applications_router"));
app.use('/', express.static(__dirname + '/static'))
app.use('/tt', (req, res) => res.sendFile(__dirname + '/static'))

const cvFolder = __dirname.replace('server', 'cv/dist')
app.use('/cv', (req, res, next) => {
    console.log(cvFolder);
    next()
}, express.static(cvFolder))

app.use('/test', (req, res) => res.send({
    dirname: __dirname,
    cvFolder: cvFolder
}))

export default app