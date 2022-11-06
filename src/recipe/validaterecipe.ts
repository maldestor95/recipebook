/**
 * Recipes
 * contains utilities for Recipe Extraction and validation of files
 */
import { readFile, readdir } from "fs/promises";
import * as Joi from 'joi';
import constants from './constants'
import { existsSync } from 'fs';
import { RecipeUtility } from "./RecipeUtility";

type recipeValidationType = {
    err: Joi.ValidationError | null
    data: { yml: string | null, md: string | null }
}
type validateRecipeOption = {
    yml: boolean,
    md: boolean,
}
export async function validaterecipefolder (recipePath: string): Promise<boolean> {
        let validaterecipePromise: Array<Promise<recipeValidationType>> = []
        if (!existsSync(recipePath)) { return false }
        await readdir(recipePath,{withFileTypes:true})
        .then(direntItem => {
            const filenames= direntItem.filter(dItem=>dItem.isFile)
            for (let filename of filenames) {
                if (filename.name!='recipelist.yml')
                validaterecipePromise.push(validaterecipe(`${recipePath}${filename.name}`))
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

        return true
    }
export async function validaterecipe (filename: string): Promise<recipeValidationType> {
    return new Promise((resolve, reject) => {
        const response = readFile(filename, { encoding: 'utf-8' })
            .then((fileData: string) => {
                const parsedFile = RecipeUtility.extractRecipeFromMarkdown(fileData)
                if (parsedFile.err) reject({ err: `${filename}:\n${parsedFile.err}` })

                const isYamlValid = RecipeUtility.recipeYAMLvalidation(parsedFile.data.yml)
                if (!isYamlValid.err) {
                    resolve(
                        {
                            err: null,
                            data: {
                                yml: parsedFile.data.yml,
                                md: parsedFile.data.md
                            }
                        }
                    )
                }
                reject({ err: { filename, yamlvalidation: isYamlValid.err } })
            })
            .catch((err) => {
                console.log(filename, err);

                reject({ err: JSON.stringify({ err, filename }) })
            })
    })
}
export const createRecipeArray = async function (): Promise<Array<{ title: string, link: string }>> {
    let recipeArrayPromise: Array<Promise<recipeValidationType>> = []
    await readdir(constants.recipePath)
        .then(filenames => {
            for (let filename of filenames) {
                if (filename != 'recettelist.yml') recipeArrayPromise.push(validaterecipe(`${constants.recipePath}${filename}`))
            }
        })
        .catch(err => {
            throw (err)
        })

    let conclusion: Array<{ title: string, link: string }> = []


    await Promise.all(recipeArrayPromise)
        .then(ymlstringArray => {
            // let ymldata=ymlstringArray.map(ymlstring=>{
            //     console.log(ymlstring)
            //     const parsedYML= Yaml.parse(<string>ymlstring)
            //     return {title:parsedYML.title, link:parsedYML.link}
            // })
            // return ymldata
            // let t = ymlstringArray[1]
            // console.log(t?t.yml:'none')
            return ymlstringArray[2]
        })
        .then(res => { console.log(res) })
        .catch((err => {
            console.log(err)
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

