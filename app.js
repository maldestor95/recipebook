const express = require("express");
var bodyParser = require('body-parser')
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

var myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
};
const app = express();

app.disable("x-powered-by");
app.use(myLogger);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.get("/tot", function (req, res) {
    res.send("Hello World!");
});
// app.use("/API/", require("./lib/expensesbdd_router"));
app.use("/API", require("./lib/Users_router"));
app.use("/API", require("./lib/Applications_router"));
app.get("/", (req, res) => res.send("Hello toto!"));

app.listen(process.env.PORT || port, () => {
    let d = Date().toLocaleString()
    console.log(`App listening on port ${port} since ${d}!`)
    console.log(`Server started in ${dev?"Development":"Production"} mode`)
});