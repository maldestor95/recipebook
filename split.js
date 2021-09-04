
const  fs = require( 'fs');
const result= fs.readFileSync('document.csv',{encoding:'utf8'})
const splitResult=result.split('"recette"')
// console.log(splitResult.length)

const recette= splitResult[3]
// console.log(recette)
console.log(getTitle(recette))
// console.log(getSteps(recette))
// console.log(getIngredients(recette))
const t={}
t.path=getTitle(recette)
t.data=prepareyml(getIngredients(recette)) + getSteps(recette)
// console.log(getIngredients(recette))
// getAll()
// console.log(removeSpace('trze trza'))
// saveFile({path:'test',data:'blabla'})
// saveFile(t)
// console.log(prepareyml(getIngredients(recette)))
writeAll()
function writeAll(){
    splitResult.forEach(rec=>{
        let tAll={}
        tAll.path=getTitle(rec)
        tAll.data=prepareyml(getIngredients(rec)) + getSteps(rec)
        saveFile(tAll)
    })
}
function getAll(){
    splitResult.forEach(t=>{
        console.log(getTitle(t))
        console.log(getSteps(t))
        console.log(getIngredients(t))
    })
}
function prepareyml(ingredients){
    let output='---\n'
    try {
        ingredients.forEach(ing => {
            output +='- ingredient: '+ ing.nom +'\n'
            output +='  qty: '+ing.qty+'\n'
        });  
    } catch (error) {
        
    }

    output +='...\n'
    return output
}
function saveFile(recette){
    fs.writeFileSync(`./${recette.path}.md`,recette.data,(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
})
}
function removeSpace(s){
    output=''
    for (const i in s){
        if (s[i] != ' '){ output +=s[i]}
        // console.log(s[i])
    }
    return output
}
function getTitle(input){
    return (input.split(',')[1].slice(1,-1))
}
function getIngredients(recette){
    try {
        
   
    ingredients=recette.split('","')[4]
    let endlist= ingredients.indexOf('}]"')
    ingredients= ingredients.slice(0,endlist+2)

    while (ingredients.indexOf('""')>0){
        ingredients=ingredients.replace('""','"')
    }

    // console.log(ingredients)
    ingredients= JSON.parse(ingredients)
    newIng= ingredients.map(ing=> { return {'nom':ing.M.nom.S,'qty':ing.M.qty.S}})
    return newIng
     } catch (error) {
        return ''
    }
}
function getSteps(recette){
    let startStep= recette.indexOf('","')
    return (recette.split('","')[1])
}