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



function getDocuments(category) { //TODO
    let documentDB = new AWS.DynamoDB.DocumentClient()
    return new Promise(function (resolve, reject) {
        let params = {
            TableName: "document",
            FilterExpression: "#cat = :val",
            ExpressionAttributeNames: {
                "#cat": "categorie"
            },
            ExpressionAttributeValues: {
                ":val": category

            }
        }
        documentDB.scan(params, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                let result = data.Items
                resolve(result)
            }
        });
    })
}

function putDocument(Id, docData, category) { //TODO
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            Item: {
                "id": Id,
                "categorie": category,
                "data": docData,
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

function getDocument(Id) { //TODO
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            "Key": {
                "id": Id
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

function postDocument(docData, category) {
    return new Promise(function (resolve, reject) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": "document",
            Item: {
                "id": uuid.v4(),
                "categorie": category,
                "data": docData,
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
                resolve(params.Item)
            }
        })
    })
}

function deleteDocument(id) {
    return new Promise(function (resolve, reject) {
            let documentDB = new AWS.DynamoDB.DocumentClient()
            let params = {
                "TableName": "document",
                Key: {
                    "id": id
                },
                ConditionExpression: "attribute_exists(#u)",
                ExpressionAttributeNames: {
                    "#u": "id"
                }
            }
            documentDB.delete(params, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)

            })
        }

    )
}



var self = (module.exports = {

    getDocuments,
    getDocument,
    postDocument,
    putDocument,
    deleteDocument
})