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
        recettes.putIngredients('jambon')
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
describe("recettes", function () {
    it("shall scan", done => {
    recettes.getRecettes()
    .then(data=>{
        console.log(data.Items)
        done()
    })
    .catch(err=>{
        console.log(err)

        done()
    })
    })

    it("shall get", done => {
        recettes.getRecette(1)
        .then(data=>{
            console.log(data)
            done()
        })
        .catch(err=>{
            console.log(err)
            done()
        })
    })
    it("shall post", done => {
        let rec={
            nom:'tarte'+new Date(),
            ingredients:["tomates"]
        }
        recettes.postRecette(rec)
        .then(data=>{
            console.log(data)
            done()
        })
        .catch(err=>{
            console.log(err)
            done()
        })
    })
    it("shall put", done => {
        
        let rec={
            id:'5512af64-2f2c-4680-9768-3d8d36e051a3',
            nom:'tarte'+new Date(),
            ingredients:["tomates",'orge']
        }
        recettes.putRecette(rec)
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