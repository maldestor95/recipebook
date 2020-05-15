/**
 * Copyright © 2020, Maldestor
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
 * The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties
 *  of merchantability, fitness for a particular purpose and noninfringement. 
 * In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, 
 * whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or 
 * other dealings in the Software. 
 * Except as contained in this notice, the name of Maldestor shall not be used in advertising or otherwise to promote the sale,
 * use or other dealings in this Software without prior written authorization from Maldestor.
 */
"use strict"
var constants = require('../definition')
var dynamo_error_msg = require('./definition_dynamodb').error_msg
var AWS = require("aws-sdk");
var uuid = require('uuid');

AWS.config.update({
    region: "eu-west-3",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }
});
if (process.env.NODE_ENV == "developmentLocal") {
    AWS.config.update({
        endpoint: "http://localhost:8000"
    })
}

let dynamodb = new AWS.DynamoDB(AWS.config);

function putIngredients(ingredientString) {

    return new Promise(function (resolve, reject) {
        getIngredients().then(ingredients => {
                let documentDB = new AWS.DynamoDB.DocumentClient()
                let updatedIngredients = [...ingredients.filter(x => x != ingredientString), ingredientString]
                let params = {
                    "TableName": "definitions",
                    "Key": {
                        "nom": "ingredients"
                    },
                    UpdateExpression: "set #A = :ing",
                    ExpressionAttributeNames: {
                        '#A': "data"
                    },
                    ExpressionAttributeValues: {
                        ":ing": updatedIngredients,
                    }
                }

                documentDB.update(params, (err, data) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(updatedIngredients)
                })

            })
            .catch(err => {
                reject(err)
            })
    })
}

function getIngredients() {
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "definitions",
            "Key": {
                "nom": "ingredients"
            }
        }
        documentDB.get(params, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data.Item.data)
        })
    })
}

function getRecettes() {
    return new Promise(function (resolve, reject) {
        let params = {
            TableName: "document",
            FilterExpression: "#cat = :val",
            ExpressionAttributeNames: {
                "#cat": "categorie"
            },
            ExpressionAttributeValues: {
                ":val": {
                    "S": "recette"
                },
            }
        }
        dynamodb.scan(params, (err, data) => {
            if (err) {
                reject(err.stack)
            } else {
                let result=data.Items.map(x=> {return {"nom":x.nom.S,"id":x.id.S} })
                resolve(result)
            }
        });
    })
}

function putRecette(recette) {
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            Item: {
                "id": recette.id,
                "categorie": "recette",
                "nom": recette.nom,
                "ingredients": recette.ingredients,
                "nbPersonnes": recette.nbPersonnes,
                "temps": recette.temps,
                "processDescription": recette.processDescription
            },
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            ReturnValues: "ALL_OLD"
        }
        documentDB.put(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function getRecette(recetteId) {
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            "Key": {
                "id": recetteId
            }
        }
        documentDB.get(params, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data.Item)
        })
    })
}

function postRecette(recette) {
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            Item: {
                "id": uuid.v4(),
                "categorie": "recette",
                "nom": recette.nom,
                "ingredients": recette.ingredients,
                "version": 0
            },
            ConditionExpression: "attribute_not_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "id"
            },
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            ReturnValues: "ALL_OLD"
        }
        documentDB.put(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}

var self = (module.exports = {
    getIngredients,
    putIngredients,
    getRecettes,
    getRecette,
    postRecette,
    putRecette
})