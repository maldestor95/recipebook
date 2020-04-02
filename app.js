/**
 * Required libraries 
 */
const express = require("express");

const passport = require("passport")
const LocalStrategy = require("passport-local")

var session = require("express-session")
var AWS = require("aws-sdk");
var DynamoDBStore = require('connect-dynamodb')({
    session: session
}); // more doc on https://www.npmjs.com/package/connect-dynamodb
var DynamoDBStoreOptions = {
    client: new AWS.DynamoDB({
        endpoint: new AWS.Endpoint('http://localhost:8000'),
        region: "eu-west-3",
    })
    // AWSConfigPath:'.pathtoCredentials.json' //TODO add credentials when going to production
}
const User = require('./lib/dynamodb/User')

var bodyParser = require('body-parser')
const port = 3000;
const dev = process.env.NODE_ENV !== "production";


// Logger Function
var myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
};

//Passport session management
passport.serializeUser(function (user, done) {
    done(null, user.login);
});

passport.deserializeUser(function (login, done) {
    //TODO
    let U = new User()
    U.getLogin(login, function (err, user) {
        done(err, user);
    });
});


//APP
const app = express();

app.disable("x-powered-by");
app.use(myLogger);


// parse application/x-www-form-urlencoded
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
// app.use("/API/", require("./lib/expensesbdd_router"));
app.use("/API", require("./lib/API_router"));
app.get("/", (req, res) => res.send("Hello toto!"));

app.listen(process.env.PORT || port, () => {
    let d = Date().toLocaleString()
    console.log(`App listening on port ${port} since ${d}!`)
    console.log(`Server started in ${dev?"Development":"Production"} mode`)
});