import {
    assert
} from "chai"

import {
    getRecipeFromURL,
    getRecipeList,
} from '../api'

describe("RecipeAPI", function () {
    it("shall get recipelist", async() => {
    await  getRecipeList()
    .then(result=>{
        assert.isArray(result,'Recipe list received')
    })
    .catch(err=>{console.log(err)})
    })
    it("shall get recipe", async() => {
        const recipeTarget='baraupetitlegume.md'
        await getRecipeFromURL(recipeTarget)
        .then((recipe)=>{
            assert(recipe.ingredients.length>0)
        })
        .catch((err)=>{console.log(err)})
    })
})


