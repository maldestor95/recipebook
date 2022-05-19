import {recipeReference, recipeType} from './recipe'
import * as Yaml from 'yaml'
import axios from "axios" 
import { parseRecipe } from './recipelist'
import { convertMarkdownRecipe } from './validaterecipe'

const pathToRecipeRepository=`https://raw.githubusercontent.com/maldestor95/recipebook/master/recipe/`
/**
 * Get recipe List from published repository 
 * @returns array of Recipe reference [{title:'example',link:'link example'}]
 */
export async function getRecipeList():Promise<Array<recipeReference>> {
     const t:Array<recipeReference>=[{title:'toto',link:'tata'}]
    const recipePath=`${pathToRecipeRepository}recipelist.yml`
     const result = await axios.get(recipePath)
     return new Promise((resolve, reject) => {
        if(result.status!=200) reject(`could not access ${recipePath}`)
        resolve (Yaml.parse(result.data));
     });
}
/**
 * Get recipe from the recipe Repository
 * @param recipeUrl name of the file to open from the repository
 * @returns a recipe with the list of ingredients and instructions
 */
export async function getRecipeFromURL(recipeUrl: string):Promise<recipeType> {
   const recipePath = `${pathToRecipeRepository}${recipeUrl}`
   // console.log(recipePath)
   const result = await axios.get(recipePath)
   return new Promise((resolve, reject) => {
      if(result.status!=200) reject(`could not access ${recipeUrl}`)

      const recipeRawMarkdown=convertMarkdownRecipe(result.data)
      if (recipeRawMarkdown.err) reject (`error while processing  ${recipeUrl}`)
      const parsedYML= Yaml.parse(<string>recipeRawMarkdown.data.yml)
      resolve(
         {
               ...parsedYML, instructions: recipeRawMarkdown.data.md
         }
      )

   });
}
