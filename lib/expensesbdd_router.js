var express = require('express');
var expensebdd = require('./expensesbdd')

var path = require('path');


var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), '\n OriginUrl', req.originalUrl, '=>Path:', req.path);

    next();
});
router.route('/expenses')
    .get((req, res, next) => {
        res.send("GET expenses list with current time period")
        next()
    })
    .post((req, res, next) => {
        res.send("POST new expense")
    })
router.route('/expenses/expense/:id')
    .get((req, res, next) => {
        res.send("GET expense id" + req.params.id)
        expensebdd.readBdd((e, d) => {
            res.send(d)
        })
    })
    .put((req, res, next) => {
        res.send("PUT expense id" + req.params.id)
    })
    .delete((req, res, next) => {
        res.status(503).send('not implemented yet')
    })




module.exports = router;