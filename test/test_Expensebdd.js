const expenseBdd = require("../lib/expensesbdd");
const fs = require("fs");
let expenseBddData = [{}];
var assert = require("chai").assert;

const tempdatabasepath = "temp/testbddExpense.json";

describe("ExpenseBdd", function () {
    beforeEach(done => {

        fs.copyFile("temp/testbddExpenseOrig.json", tempdatabasepath, err => {
            if (err) throw err;
            expenseBdd.readBdd(tempdatabasepath, (err, data) => {
                if (err) throw err;
                assert.equal(typeof {}, typeof data);
                expenseBddData = data;
                done();
            });
        });
    });
    afterEach(done => {
        fs.unlink(tempdatabasepath, err => {
            done()
        });
    });
    it("shall be properly initialised", function () {
        assert.lengthOf(expenseBddData, 5, "ExpenseBDDdata shall have 5 elements");
        assert.equal(expenseBddData[1].desc, "tata", "verify desc on 2nd entry");
    });
    it("shall write BddExpenseFile", function (done) {
        const newitem = {
            id: 1,
            desc: "new",
            category: "new",
            date: "21/12/2999",
            cost: 123
        };
        expenseBddData.push(newitem);
        expenseBdd.writeBdd(
            expenseBddData,
            (dest = tempdatabasepath),
            (err, data) => {
                done();
            }
        );
    });
    describe("find items", function () {
        it("by wrong id shall return empty array", done => {
            expenseBdd.find({
                    id: 10000
                },
                (err, res) => {
                    assert.equal(err, null);
                    assert.equal(res.length, 0);
                    assert.typeOf(res, Array);
                }
            );
            done();
        });
        it("by id", done => {
            expenseBdd.find({
                    id: 2
                },
                (err, res) => {
                    assert.equal(err, null);
                    assert.equal(res.length, 1);
                    assert.deepEqual(res[0], {
                        id: 2,
                        desc: "tata",
                        category: "general",
                        date: "21/12/2019",
                        cost: 125
                    });
                    done();
                }
            );
        });
        it("by description", done => {
            expenseBdd.find({
                    description: "tu"
                },
                (err, res) => {
                    assert.lengthOf(res, 2, "shall find 2 matches")
                    done();
                }
            );
        });
        it("by description or id", done => {
            expenseBdd.find({
                    description: "tu",
                    id: 2
                },
                (err, res) => {
                    assert.lengthOf(res, 3, "shall find 3 matches")
                    done();
                }
            );
        });
    });
    describe.skip("add item", function () {
        it("shall ", (done) => {
            done()
        })
    })
    describe.skip("remove item", function () {
        it("shall ", (done) => {
            done()
        })
    })
    describe.skip("update item", function () {
        it("shall ", (done) => {
            done()
        })
    })
});