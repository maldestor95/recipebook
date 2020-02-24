// var assert = require("chai").assert;
const expenseBdd = require('../lib/expensesbdd')

let expenseBddData = [{}]
var assert = require('chai').assert
describe("ExpenseBdd", function () {
    before(() => {

        }),
        it("shall read BddExpenseFile", function (done) {
            expenseBdd.readBdd(
                (err, data) => {
                    if (err) throw err
                    assert.equal(typeof ({}), typeof (data))
                    expenseBddData = data
                    done();

                }
            )
        });
    it("shall write BddExpenseFile", function () {
        const newitem = {
            id: 1,
            desc: 'new',
            category: 'new',
            date: '21/12/2999',
            cost: 123
        }
        expenseBddData.push(newitem)
        expenseBdd.writeBdd(expenseBddData, dest = 'temp/t.json')
    });

    it("Shall find item by id", (done) => {
        expenseBdd.find({
            "id": 2
        }, function (err, res) {
            done()
        })

    })
    it("Shall find item by descrition", (done) => {
        expenseBdd.find({
            "description": 'tata'
        }, (err, res) => {
            done()
        })

    })
    it("Shall find item by descrition or id", (done) => {
        expenseBdd.find({
            "description": 'tata',
            "id": 4
        }, (err, res) => {
            done()
        })

    })
    describe("ExpenseBddout", function () {
        it("shall manage object", () => {
            let ii = expenseBdd.bddexpenseout
            ii.print()
        })
    })

});