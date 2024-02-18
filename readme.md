This repository contains Recipes for maldestor95


Recipes a stored in the `recipe folder` while a set of utilities are located in the `src folder`


# How to use

## Build & validate the recipes

 `npm run start` will  launch the standard application and perform the validation of all the recipes, ensuring they are matching the recipeFormat described below.

# Create a recipe
Below are the steps to create and publish a new recipe.
* `npm run cli`
  * use snippets `new-recipe`or `ingredient-new` to ease the edit of the recipe.
* `npm run validate` to perform the validation of all the recipes _, ensuring they are matching the recipeFormat described below._
*  `commit on master` to make the recipe available.
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

# Revision
* 1.1.0 creation of a CLI to initiate recipe creation via templating `npm run cli`
* 1.0.1 Validation capability to ensure accurate formatting of the recipe