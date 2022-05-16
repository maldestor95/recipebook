import {
    assert
} from "chai"

import {
    getRecipeList,
} from '../api'

describe("RecipeAPI", function () {
    it("shall get recipelist", async() => {
    await  getRecipeList()
    .then(result=>{console.log(result)})
    .catch(err=>{console.log(err)})
    })
})