#!/usr/bin/env node

import { validaterecipefolder } from './validaterecipe'
import {generateRecipelist} from './recipelist'

 /*
 generateRecipelist()
*/
validaterecipefolder().then(console.log)
.then(d=>
    generateRecipelist('recipe','recipe/recipelist.yml')
)
//createRecipeArray()