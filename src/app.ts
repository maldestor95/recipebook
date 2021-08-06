
 import * as RECIPE from './recipe';

// let recipeList = new RECIPE.Ingredients()

// recipeList.addIngredient({ingredient:'tomates',qty:12});
// recipeList.addIngredient({ingredient:'oignons',qty:5});
// recipeList.addIngredient({ingredient:'sel',qty:'une pincée'});

// console.log(recipeList.list)
// console.log(recipeList.ingredientsToYAML())

const recette=new RECIPE.Recipe()

type menuType = {
    id:number,
    text: string,
    cb:void|null
}
const menu:menuType[] = [
    {id:4,text:'Set Recipe Name',cb:null},
    {id:3,text:'show Ingredients',cb:null},
    {id:2,text:'Add Ingredients',cb:null},
    {id:1,text:'Create New Recipe',cb:null},
    {id:0,text:'Quit', cb:null},
]
function showMenu():void{
    menu.forEach(element => {
        console.log(`${element.id}: ${element.text}`)
    });
}

showMenu()

process.stdin.on('data', data => {
    const dataString = data.toString().slice(0, -2)
    const choice = <number><unknown> dataString
    switch (choice) {
        case 0:
            console.log('bye')
            process.exit();            
            break;
        default:

            break;
    }
    // showMenu();
});
