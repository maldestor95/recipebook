import { readFile, readdir } from "fs/promises";
import * as Joi from 'joi';
import * as Yaml from 'yaml'
import constants from './constants'

type recipeValidationType = Joi.ValidationError|{err:string}|boolean|{yml?:string|null,md?:string|null}
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

type validateRecipeOption = {
    yml? :boolean,
    md?: boolean,
}
const  validaterecipe=async function(filename:string,option?:validateRecipeOption):Promise<recipeValidationType> {
    return new Promise((resolve,reject)=>{
        const response = readFile(filename,{encoding:'utf-8'})
        .then((fileData:string)=>{
            //convert file
            const parsedFile = convertMarkdown(fileData)
            if (parsedFile.ok==false) reject ({err:`couldn\'t parse file ${filename}`})
            //validation yml
            const valid=recipeYAMLvalidation(parsedFile.yml)           
            if  (valid==undefined) {
                if (option== undefined )resolve(true)
                if (option?.yml) resolve({yml:parsedFile.yml})
                if (option?.md) resolve({md:parsedFile.md})
            }
            reject(valid)
        })
        .catch((err)=>{
            reject( err)
        })
    })
}
export const validaterecipefolder= async function():Promise<boolean>{
    let validaterecipePromise:Array<Promise<recipeValidationType>>=[]
    await readdir(constants.recipePath)
    .then(filenames => {
        for (let filename of filenames) {
            if (filename!='recettelist.md')
            validaterecipePromise.push(validaterecipe(`${constants.recipePath}${filename}`))
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

export const createRecipeArray= async function ():Promise<Array<{title:string, link:string}>> {
    let recipeArrayPromise:Array<Promise<recipeValidationType>>=[]
    await readdir(constants.recipePath)
    .then(filenames => {
        for (let filename of filenames) {
            if (filename!='recettelist.md')
            recipeArrayPromise.push(validaterecipe(`${constants.recipePath}${filename}`,{yml:true}))
        }
    })
    .catch(err => {
        throw(err)
    })
    
    let conclusion:Array<{title:string, link:string}> = []


    await Promise.all(recipeArrayPromise)
    .then(ymlstringArray=>{
        let ymldata=ymlstringArray.map(ymlstring=>{
            console.log(ymlstring)
            const parsedYML= Yaml.parse(<string>ymlstring)
            return {title:parsedYML.title, link:parsedYML.link}
        })
        return ymldata
    
    })
    .then(res=> {console.log(res)})
    .catch((err=>{ console.log(err)
        // conclusion= false
    }))
    
    return conclusion
}
/*export const generateRecipelist=async function():Promise<resultType> {
    return new Promise((resolve, reject) => {
        validaterecipefolder()
        .then((status)=>{
            if (status==false) reject ({err:"validation of recipes showed error"})// create table while parsing file
        })
        .then((datatable)=>{
            //  generate file
            resolve({data:"ok",err:null})
        })
        .catch((err:resultType)=>{
            reject(err)
        })
    });
}
*/