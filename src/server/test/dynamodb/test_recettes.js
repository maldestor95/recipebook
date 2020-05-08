var assert = require("chai").assert;
const constants = require('../../lib/definition')
let recettes = require('../../lib/dynamodb/recettes')

describe("Ingredients", function () {
    it("get", done => {
        recettes.getIngredients()
            .then(data => {
                console.log(data)
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })
    it("put", done => {
        recettes.putIngredients('tomates')
        .then(data=>{
            console.log(data)
            done()
        })
        .catch(err=>{
            console.log(err)

            done()
        })
    })
})