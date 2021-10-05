import { readFile } from "fs/promises";

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
const recipeYAMLvalidation = function (yml:string): void  {

}
export const  validaterecipe=function(filename:string):Boolean {
    //open file
    readFile(filename,{encoding:'utf-8'})
    .then((fileData:string)=>{
        //convert file
        const parsedFile = convertMarkdown(fileData)
        if (parsedFile.ok==false) return false
        //validation yml
            // title
            // link
            // ingredients
            console.log(parsedFile.yml)
        // description in markdown not empty

    })
    .catch((err)=>{
        console.log(err)
        return(false)
    })
    return true;
}

