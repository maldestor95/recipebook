#!/usr/bin/env node

import { ValidateRecipe } from './validaterecipe'
import {generateRecipelist} from './recipelist'

 /*
 generateRecipelist()
*/
ValidateRecipe.validaterecipefolder("recipe").then(console.log)
.then(d=>
    generateRecipelist('recipe','recipe/recipelist.yml')
).catch(err=> console.log)
//createRecipeArray()