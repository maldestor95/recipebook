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

}

function find(search, callback) {
    let searchObject = {
        "start": search.start ? search.start : null,
        "stop": search.stop ? search.stop : null,
        "id": search.id ? search.id : null,
        "description": search.description ? search.description : null
    }
    readBdd(function (err, bdd) {
        let data = _.filter(bdd, (o => {
            let filter_id = o.id == searchObject.id
            let filter_desc = o.desc == searchObject.description
            return filter_id | filter_desc
        }))
        callback(err = null, data)
    })
}

function readBdd(cb) {
    let rawdata = fs.readFile(bddFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        cb(err, JSON.parse(data));
    })
}

function writeBdd(ExpenseData, dest = bddFilePath) {
    if (!!ExpenseData) {
        let fileData = JSON.stringify(ExpenseData)
        fs.writeFileSync(dest, fileData, (err) => {
            if (err) throw err;
            console.log('bddExpenseUpdated')
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