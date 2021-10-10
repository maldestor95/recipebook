// import { promises } from "dns";
import { readFile } from "fs/promises";
import * as Joi from 'joi';
// import { string } from "joi";
import * as Yaml from 'yaml'
import * as fs from 'fs/promises'

const recipePath='recipe/'
type recipeValidationType = Joi.ValidationError|{err:string}|boolean
const convertMarkdown= function(mdData:string):{ok:boolean,yml:string|null,md:string|null} {
    const errorMsg:{ok:boolean,yml:string|null,md:string|null}={ok:false,yml:null,md:null}

    const startYamlPosition = mdData.indexOf('---');
    if (startYamlPosition <0) return errorMsg
    
    const endYamlPosition = mdData.indexOf('...');
    if (endYamlPosition<startYamlPosition) return errorMsg
    if (endYamlPosition<0) errorMsg

    //find YAML part
    const yml= mdData.substring(0, endYamlPosition + 3);
    
    //find MD part
    const md= mdData.substring(endYamlPosition + 3);

    return {ok:true,yml,md}
}
const recipeYAMLvalidation = function (yml:string|null): Joi.ValidationError|undefined  {
    const parsedYML=Yaml.parse(<string>yml)
    const schema = Joi.object({
        title: Joi.string(),
        link: Joi.string(),
        ingredients: Joi.array().items({
            ingredient:Joi.string(),
            qty:[Joi.string(),Joi.number()]
        })
            .min(1)
    })
    const valid=schema.validate(parsedYML)
    return valid.error
}

const  validaterecipe=async function(filename:string):Promise<recipeValidationType> {
    return new Promise((resolve,reject)=>{
        const response = readFile(filename,{encoding:'utf-8'})
        .then((fileData:string)=>{
            //convert file
            const parsedFile = convertMarkdown(fileData)
            if (parsedFile.ok==false) reject ({err:`couldn\'t parse file ${filename}`})
            //validation yml
            const valid=recipeYAMLvalidation(parsedFile.yml)           
            if  (valid==undefined) resolve(true)
            reject(valid)
        })
        .catch((err)=>{
            reject( err)
        })
    })
}
export const validaterecipefolder= async function():Promise<boolean>{
    let validaterecipePromise:Array<Promise<recipeValidationType>>=[]
    await fs.readdir(recipePath)
    .then(filenames => {
        for (let filename of filenames) {
            if (filename!='recettelist.md')
            validaterecipePromise.push(validaterecipe(`${recipePath}${filename}`))
        }
    })
    .catch(err => {
        throw(err)
    })
    
    let conclusion=false

    await Promise.all(validaterecipePromise)
    .then(validate=>{conclusion=true})
    .catch((err=>{ console.log(err)
        conclusion= false
    }))
    
    return conclusion
}
