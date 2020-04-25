// var assert = require("chai").assert;
const expenseBdd = require("../lib/expensesbdd");
const axios = require("axios");

let expenseBddData = [{}];
var assert = require("chai").assert;
describe.skip("ExpenseBddRouter - tests REST API", function () {
    before(() => {
            rootpath = "http://localhost:3000";
        }),
        it("shall get all expenses", done => {
            axios
                .get(rootpath + "/API/expenses")
                .then(res => {
                    assert.equal(res.data, "GET expenses list with current time period", "Get");
                })
                .catch(err => {
                    console.error(err);
                })
                .then(() => {
                    done()
                })
        }),
        it("shall access on expense", done => {
            axios
                .get(rootpath + "/API/expense/12")
                .then(res => {
                    console.log(res.data)
                    assert.equal(res.data, "GET expenses list with current time period", "Get");
                    done()
                })
                .catch(err => {
                    console.error(err);
                    done()
                })
                .then(() => {})
        });
    it("shall delete an expense", (done) => {

        axios
            .delete(rootpath + "/API/expense/12")
            .then(res => {
                console.log(res.data)
                assert.equal(res.data, "GET expenses list with current time period", "Get");
                done()
            })
            .catch(err => {
                console.error(err);
                done()
            })
            .then(() => {})
    })

});