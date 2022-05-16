import {recipeReference} from './recipe'
import * as Yaml from 'yaml'
import axios from "axios" 

const rootPath="https://maldestor95.github.io/recipebook/"
/**
 * Get recipe List from published repository "https://maldestor95.github.io/recipebook/"
 * @returns array of Recipe reference [{title:'example',link:'link example'}]
 */
export async function getRecipeList():Promise<Array<recipeReference>> {
     const t:Array<recipeReference>=[{title:'toto',link:'tata'}]
    const recipePath=`${rootPath}recipe/recipelist.yml`
     const result = await axios.get(recipePath)
     return new Promise((resolve, reject) => {
        if(result.status!=200) reject(`could not access ${recipePath}`)
        resolve (Yaml.parse(result.data));
     });
}