'use strict';
const fs = require('fs')
const _ = require('lodash')

const bddFilePath = 'bdd/bddExpense.json'



var bddexpenseout = {
    data: [1, 2, 3],
    print: () => {
        console.log(this.parent.data)
    }
}


function add(item) {

}

function update(id) {

}

function remove(id) {
    find({
        "id": id
    }, (err, data) => {
        console.log(err, data)
    })
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
        "start": search.start ? search.start : null,
        "stop": search.stop ? search.stop : null,
        "id": search.id ? search.id : null,
        "description": search.description ? search.description : null
    }
    readBdd(null, (err, bdd) => {
        let data = _.filter(bdd, (o => {
            let filter_id = o.id == searchObject.id
            const regex = RegExp(searchObject.description);
            let filter_desc = regex.test(o.desc)
            return filter_id | filter_desc
        }))
        callback(err = null, data)
    })
}
/**
 * readBdd- Load Database
 * @param {string} dest  -location of the database bdd 
 * @param {function} callback 
 */
function readBdd(dest, callback) {
    if (!dest) {
        dest = bddFilePath
    }

    let rawdata = fs.readFile(dest, 'utf8', (err, data) => {
        if (err) throw err;
        callback(err, JSON.parse(data));
    })
}

/**
 * writeBdd - write Database
 * @param {object} ExpenseData - database loaded in memory
 * @param {string} dest - location of the database bdd
 */
function writeBdd(ExpenseData, dest = bddFilePath, callback) {
    if (!!ExpenseData) {
        let fileData = JSON.stringify(ExpenseData)
        fs.writeFile(dest, fileData, (err) => {
            if (err) throw err;
            // console.log('bddExpenseUpdated')
            callback(err, "Write Database successful")
        })
    }
}

var self = module.exports = {
    add,
    update,
    remove,
    find,
    readBdd,
    writeBdd,
    bddexpenseout
};