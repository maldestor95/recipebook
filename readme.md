This repository contains Recipes for maldestor95


Recipes a stored in the `recipe folder` while a set of utilities are located in the `src folder`


# How to use

## Build & validate the recipes

 `npm run start` will  launch the standard application and perform the validation of all the recipes, ensuring they are matching the recipeFormat described below.

# Create a recipe
* `npm run cli`
* use snippets `new-recipe`or `ingredient-new` to ease the edit of the recipe.
  
# Recipe Format

## Header  YML: 

```
  ---
  title: Bar aux petits légumes
  link:  baraupetitlegume.md
  - ingredient: Bar
    qty: 800g
  ...
```
## Body in Markdown

```
Préparer le bar : le vider, l'écailler, couper la tête.

etc
```
 
# Development
Fairly common scripts have been developped for this repository:
* `npm run start`to launch the standard application,


