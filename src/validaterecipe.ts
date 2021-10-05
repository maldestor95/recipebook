import { promises } from "dns";
import { readFile } from "fs/promises";
import * as Joi from 'joi';
import { string } from "joi";
import * as Yaml from 'yaml'

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
export const  validaterecipe=async function(filename:string):Promise<Joi.ValidationError|{err:string}|boolean> {
    //open file
    const response = await readFile(filename,{encoding:'utf-8'})
    .then((fileData:string)=>{
        //convert file
        const parsedFile = convertMarkdown(fileData)
        if (parsedFile.ok==false) throw {err:`couldn\'t parse file ${filename}`}
        //validation yml
        const valid=recipeYAMLvalidation(parsedFile.yml)           
        if  (valid==undefined) return true
        throw valid
    })
    .catch((err)=>{
        // console.log(err)
        // throw {err: `couldn\'t open file ${filename}`}
        return err
    })
    return response
}

