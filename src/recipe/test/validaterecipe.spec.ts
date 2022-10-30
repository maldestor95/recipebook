import {
	assert
} from "chai"
import { RecipeUtility, ValidateRecipe as valid, ValidateRecipe } from '../validaterecipe'
import * as Yaml from 'yaml'
const recipePath = "recipe"


// createRecipeArray()
describe("ValidateRecipe", function () {
	describe("RecipeUtilityClass", function () {
		describe("convertMarkdoneRecipe", function () {
			const ymldata = {
				title: "Riz Cantonnais",
				link: "rizcantonnais.md",
				ingredients: [
					{
						ingredient: "riz",
						qty: 0
					}
				]
			}
			const mddata = `# titre 1
		
		* list 1
		* list 2
		* `
			it("shall convert valid Markdown", done => {

				const dummyMarkdown = '---\n' + Yaml.stringify(ymldata) + '\n...' + mddata
				const convertedMarkdown = RecipeUtility.extractRecipeFromMarkdown(dummyMarkdown)
				assert(convertedMarkdown.err === null, `${convertedMarkdown.err}`)
				assert(convertedMarkdown.data.md == mddata, 'error in markdown')
				assert(JSON.stringify(Yaml.parse(<string>convertedMarkdown.data.yml)) === JSON.stringify(ymldata), 'error in yml')
				done()
			})
			it("shall fail invalid Markdown", done => {

				// const dummyMarkdown= '---\n'+Yaml.stringify(ymldata)+'\n...'+mddata

				const dummyMarkdown = Yaml.stringify(ymldata) + '\n...' + mddata
				const convertedMarkdown = RecipeUtility.extractRecipeFromMarkdown(dummyMarkdown)
				assert(convertedMarkdown.err === 'no Yaml Data at the beginning of the markdown document', `${convertedMarkdown.err}`)
				assert(convertedMarkdown.data.md == "", 'error in markdown')
				assert(convertedMarkdown.data.yml == "", 'error in yml')
				done()
			})
		})
		describe("recipeYAMLvalidation ", () => {
			let ymldata = {}
			this.beforeEach(() => {
				ymldata = {
					title: "Riz Cantonnais",
					link: "rizcantonnais.md",
					ingredients: [
						{
							ingredient: "riz",
							qty: 0
						}
					]
				}
			})
			it("shall pass check yml", done => {
				const result = RecipeUtility.recipeYAMLvalidation(Yaml.stringify(ymldata))
				assert(JSON.stringify(result.yml) == JSON.stringify(ymldata), 'yml extraction different')
				assert(result.err === null)
				done()
			})
			it("shall fail check yml", done => {
				// @ts-ignore: Object is possibly 'null'.
				delete (ymldata.title)
				const result = RecipeUtility.recipeYAMLvalidation(Yaml.stringify(ymldata))
				//console.log(ymldata,result.yml)
				assert(result.err === null, result.err ? result.err : 'error')
				assert(JSON.stringify(result.yml) == JSON.stringify(ymldata), 'yml extraction different')
				done()
			})
		})
	})
	describe("validate single recipe", () => {
		it("shall pass single validation", done => {
			// valid.validaterecipe('recipe/baraupetitlegume.md')
			ValidateRecipe.validaterecipe('recipe/baraupetitlegume.md')
				.then(res => {
					assert(res.err === null)
					done()
				}
				)
				.catch(err => {
					assert(err == null)
					done()
				})
		})
		it("shall fail ", done => {
			valid.validaterecipe('src/recipe/test/badformat.md')
				.then(res => {
					assert(res === null)
					done()
				})
				.catch(err => {

					assert(err.err == 'src/recipe/test/badformat.md:\nno Yaml Data at the beginning of the markdown document')
					done()
				})
		})
	})
	describe("validate recipe folder", function () {

		it("validaterecipefolder good path", done => {
			ValidateRecipe.validaterecipefolder(recipePath)
				.then((result) => {
					assert(result === true, "Folder not validated")
					done()
				})
				.catch(err => {
					assert(err === 'no error', `${err}`)
					done()
				})
		})
		it("validaterecipefolder bad path", done => {
			ValidateRecipe.validaterecipefolder("Bad Path")
				.then((result) => {
					assert(result === false, "Folder not validated")
					done()
				})
				.catch(err => {
					assert(err === 'no error', `${err}`)
					done()
				})
		})
		it.skip("createRecipeArray", done => {
			done()
		})
	})
})