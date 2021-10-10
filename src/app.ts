#!/usr/bin/env node

import { validaterecipefolder } from './validaterecipe'
import {generateRecipelist} from './recipelist'

 /*
 generateRecipelist()
 .then(data=>{
     console.log(data)
    })
.catch(data=>{
     console.log(data)
 })
*/
 validaterecipefolder()
