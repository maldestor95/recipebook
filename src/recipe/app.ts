#!/usr/bin/env node
/**
* Copyright © 2022, Maldestor
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
* and associated documentation files (the “Software”), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
* subject to the following conditions: 
* 
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
* The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties
*  of merchantability, fitness for a particular purpose and noninfringement. 
* In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, 
* whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or 
* other dealings in the Software. 
* Except as contained in this notice, the name of Maldestor shall not be used in advertising or otherwise to promote the sale,
* use or other dealings in this Software without prior written authorization from Maldestor.
 */
"use strict"

/**
 * This application facilitates 
 *  Validation of the recipe created in the Yaml Format described in the Readme.md file.
 *  Generation of the inventory to be parsed by a third party application once deployed to github.
 */

import { validaterecipefolder } from './validaterecipe'
import { generateRecipelistFile } from './recipelist'
const recipePath = "recipe/"

/*
generateRecipelist()
*/
validaterecipefolder(recipePath).then(msg => { console.log(`is validation successfull? ${msg}`) })
    .then(d =>
        generateRecipelistFile(recipePath, 'recipe/recipelist.yml')
    ).catch(err => console.log)
//createRecipeArray()