const express = require("express");
const app = express();
const port = 3000;
const dev = process.env.NODE_ENV !== "production";

var myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
};
app.disable("x-powered-by");
app.use(myLogger);

app.get("/tot", function (req, res) {
    res.send("Hello World!");
});
app.use("/API", require("./lib/expensesbdd_router"));
app.get("/", (req, res) => res.send("Hello toto!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));