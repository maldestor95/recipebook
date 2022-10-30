import {
    assert
} from "chai"

import {
    generateRecipelist,
    parseRecipe 
} from '../recipelist'


describe("RecipeList", function () {
    it("extract recipe data", done => {
        parseRecipe('recipe/baraupetitlegume.md')
            .then(res => {
                assert(res.title === 'Bar aux petits légumes')
                assert(res.link === 'baraupetitlegume.md')
                assert(res.ingredients.length>0)
                assert(res.instructions.length>0)
                done()
            })
            .catch(err => {
                assert(err == null,JSON.stringify(err))
                done()
            })
    })
})