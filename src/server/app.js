/**
 * Required libraries 
 */
const express = require("express");
const path=require('path')

const passport = require("passport")
const LocalStrategy = require("passport-local")

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
const User = require(path.resolve('./lib/dynamodb/User'))
var history = require('connect-history-api-fallback');
var bodyParser = require('body-parser')
const port = 3000;
const dev = process.env.NODE_ENV?process.env.NODE_ENV:"production";


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
app.use(history());

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
app.use(require("./route/Users_router"));
app.use('/apps',require("./route/Applications_router"));
// app.get("/", (req, res) => res.send("Hello toto!"));
app.use('/', express.static('J:/dev/nodejs/dist/client'))
app.use('/vue', express.static('J:/dev/nodejs/dist/client'))
app.use('/css', express.static('J:/dev/nodejs/dist/client/css'))
app.use('/js', express.static('J:/dev/nodejs/dist/client/js'))
app.use('/fonts', express.static('J:/dev/nodejs/dist/client/fonts'))

app.listen(process.env.PORT || port, () => {
    let d = Date().toLocaleString()
    console.log(`App listening on port ${port} since ${d}!`)
    console.log(`Server started in ${dev} mode`)
});