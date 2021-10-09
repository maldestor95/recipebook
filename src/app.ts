#!/usr/bin/env node

import { validaterecipe } from './validaterecipe'
import * as fs from 'fs/promises'

const validaterecipefolder= function():void{

    const recipePath='recipe/'
    fs.readdir(recipePath)
    .then(filenames => {
        for (let filename of filenames) {
            if (filename!='recettelist.md')
            validaterecipe(`${recipePath}${filename}`)
            .then((result)=>{
                if (result!=true) console.log(filename, result)

            })
            .catch((err)=>{console.log(filename,err)})
        }
        console.log('validation complete')
    })
    .catch(err => {
        throw(err)
    })
}

validaterecipefolder()
