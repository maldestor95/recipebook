#!/usr/bin/env node

import { validaterecipe } from './validaterecipe'
import * as fs from 'fs/promises'

// console.log(validaterecipe('recipe/taboule.md'))
// validaterecipe('recipe/truiteaufour.md').then((r)=>{console.log(r)})
// 

    	const recipePath='recipe/'
    fs.readdir(recipePath)
  
    // If promise resolved and
    // datas are fetched
    .then(filenames => {
        for (let filename of filenames) {
            validaterecipe(`${recipePath}${filename}`)
            .then((result)=>{console.log(filename, result)})
            .catch((err)=>{console.log(filename,err)})
        }
    })
  
    // If promise is rejected
    .catch(err => {
        console.log(err)
    })