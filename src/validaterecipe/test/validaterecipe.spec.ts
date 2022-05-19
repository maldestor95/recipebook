import {
    assert
} from "chai"
// import { createRecipeArray, validaterecipefolder } from './validaterecipe'
import {test  as valid} from '../validaterecipe'
import * as Yaml from 'yaml'

// import {generateRecipelist} from './recipelist'

/*
 generateRecipelist()
 .then(data=>{
     console.log(data)
    })
.catch(data=>{
     console.log(data)
 })
*/

// createRecipeArray()
describe("ValidateRecipe", function () {
	describe("convertMarkdoneRecipe", function () {
		const ymldata = {
			title: "Riz Cantonnais",
			link:  "rizcantonnais.md",
			ingredients:[
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
			
			const dummyMarkdown= '---\n'+Yaml.stringify(ymldata)+'\n...'+mddata
			const convertedMarkdown= valid.convertMarkdownRecipe(dummyMarkdown)
			assert(convertedMarkdown.err===null,`${convertedMarkdown.err}`)
			assert(convertedMarkdown.data.md==mddata,'error in markdown')
			assert(JSON.stringify(Yaml.parse(<string>convertedMarkdown.data.yml))===JSON.stringify(ymldata),'error in yml')
			done()
		})
		it("shall fail invalid Markdown", done => {
			
			// const dummyMarkdown= '---\n'+Yaml.stringify(ymldata)+'\n...'+mddata
			const dummyMarkdown= Yaml.stringify(ymldata)+'\n...'+mddata
			const convertedMarkdown= valid.convertMarkdownRecipe(dummyMarkdown)
			assert(convertedMarkdown.err==='no Yaml Data at the beginning of the markdown document',`${convertedMarkdown.err}`)
			assert(convertedMarkdown.data.md=="",'error in markdown')
			assert(convertedMarkdown.data.yml=="",'error in yml')
			done()
		})
	})
	describe("recipeYAMLvalidation ", () => {
		let  ymldata = {}
		this.beforeEach(()=>{
			ymldata = {
				title: "Riz Cantonnais",
				link:  "rizcantonnais.md",
				ingredients:[
					{
						ingredient: "riz",
						qty: 0
					}
				]
			}
		})
		it("shall pass check yml", done => {
			const result=valid.recipeYAMLvalidation(Yaml.stringify(ymldata))
			assert(JSON.stringify(result.yml)==JSON.stringify(ymldata),'yml extraction different')
			assert(result.err===null)
			done()
		})
		it("shall fail check yml", done => {
			// @ts-ignore: Object is possibly 'null'.
			delete(ymldata.title)
			const result=valid.recipeYAMLvalidation(Yaml.stringify(ymldata))
			//console.log(ymldata,result.yml)
			assert(result.err===null,result.err?result.err:'error')
			assert(JSON.stringify(result.yml)==JSON.stringify(ymldata),'yml extraction different')
			done()
			})
	})
	describe("validate recipe",()=>{
		it("shall pass ", done => {
			valid.validaterecipe('recipe/baraupetitlegume.md')
			.then(res=>{
				assert(res.err===null)
				done()}
			)
			.catch(err=>{
				assert(err==null)
				done()})
		})
		it("shall fail ", done => {
			valid.validaterecipe('src/validaterecipe/test/badformat.md')
			.then(res=>{
				assert(res===null)
				done()})
			.catch(err=>{

				assert(err.err=='src/validaterecipe/test/badformat.md:\nno Yaml Data at the beginning of the markdown document')
				done()})
		})
	})
	it("validaterecipefolder", done => {
        valid.validaterecipefolder()
            .then((result) => {
                assert(result === true, "Folder not validated")
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