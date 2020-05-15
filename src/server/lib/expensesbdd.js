"use strict";
const fs = require("fs");
const _ = require("lodash");

const bddFilePath = "bdd/bddExpense.json";
var validate = require("validate.js");

var test = class {
  constructor() {
    this.a = 12;
  }
  bar() {
    return "hello world " + this.a;
  }
};

var TestA = new test();

/**
 * Add item after validation
 * @param {object} item
 * @param {function} callback
 */
function add(item, callback) {
  var constraintExpense = {
    desc: { presence: true, type: "string" },
    category: { presence: true, type: "string" },
    date: { presence: true, type: "string" },
    cost: { presence: true, type: "number" }
  };

  let isValid = validate(item, constraintExpense);
  if (isValid == undefined) {
    //get new id
    //update table
    //write bdd
    callback(null, TestA.bar());
  } else callback(null, isValid);
}

function update(id) {}

function remove(id) {
  find(
    {
      id: id
    },
    (err, data) => {
      console.log(err, data);
    }
  );
}
/**
 * find - item by searching through the database
 * @param {object} search
 * @param {date} search.start - start date
 * @param {date} search.stop - stop date
 * @param {integer} search.id - id
 * @param {string} search.description - regex that contain the description
 * @param {*} callback
 */
function find(search, callback) {
  let searchObject = {
    start: search.start ? search.start : null,
    stop: search.stop ? search.stop : null,
    id: search.id ? search.id : null,
    description: search.description ? search.description : null
  };
  readBdd(null, (err, bdd) => {
    let data = _.filter(bdd, o => {
      let filter_id = o.id == searchObject.id;
      const regex = RegExp(searchObject.description);
      let filter_desc = regex.test(o.desc);
      return filter_id | filter_desc;
    });
    callback((err = null), data);
  });
}
/**
 * readBdd- Load Database
 * @param {string} dest  -location of the database bdd
 * @param {function} callback
 */
function readBdd(dest, callback) {
  if (!dest) {
    dest = bddFilePath;
  }

  let rawdata = fs.readFile(dest, "utf8", (err, data) => {
    if (err) throw err;
    callback(err, JSON.parse(data));
  });
}

/**
 * writeBdd - write Database
 * @param {object} ExpenseData - database loaded in memory
 * @param {string} dest - location of the database bdd
 */
function writeBdd(ExpenseData, dest = bddFilePath, callback) {
  if (!!ExpenseData) {
    let fileData = JSON.stringify(ExpenseData);
    fs.writeFile(dest, fileData, err => {
      if (err) throw err;
      // console.log('bddExpenseUpdated')
      callback(err, "Write Database successful");
    });
  }
}

var self = (module.exports = {
  add,
  update,
  remove,
  find,
  readBdd,
  writeBdd
});
