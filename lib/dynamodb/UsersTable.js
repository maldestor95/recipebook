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

/**
 * DynamoDb user management
 * @module lib/dynamodb/Users
 * 
 */
"use strict"
var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-3",
    endpoint: "http://localhost:8000",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }

});
// let dynamodb = new AWS.DynamoDB();
// var mT = require("./manageTables")

/** User basic Bdd Operation */
class User {
    /**
     * create a connection to the database
     */
    constructor() {
        this.dynamodb = new AWS.DynamoDB();
        this.tableName = "Users"
        this.documentDB = new AWS.DynamoDB.DocumentClient()
        this.dynamodb.listTables({}, (err, data) => {
            this.connectionStatus = !err ? err : err.message
            console.log(this.connectionStatus)
        })
    }

    /**
     * Send a request.
     * @param {Requester~requestCallback} cb - The callback that handles the response.
     */
    create_userTable(callback) {
        let params = {
            TableName: this.tableName,
            KeySchema: [{
                    AttributeName: "login",
                    KeyType: "HASH"
                } //Partition key

            ],
            AttributeDefinitions: [{
                AttributeName: "login",
                AttributeType: "S"
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };

        this.dynamodb.createTable(params, callback);
    }

    /**
     * delete_userTable
     * @param {function} callback 
     */
    delete_userTable(callback) {
        let params = {
            TableName: this.tableName
        };
        this.dynamodb.deleteTable(params, (err, data) => {
            this.connectionStatus = !err ? err : err.message
            callback(err, data)
        });

    }
    /**
     * Scan Users database
     * @param {function} callback 
     */
    scanUser(callback) {
        let params = {
            TableName: this.tableName,
        }
        this.documentDB.scan(params, callback)

    }
    /**
     * Add user
     * @param {Object} item 
     * @param {function} callback  - return {err,data}
     */
    addUser(item, callback) {
        let params = {
            "TableName": this.tableName,
            "Item": item
        }
        this.getUserByLogin(item.login, (err, data) => {
            if (err) {
                callback(err, data)
            }
            if (data.hasOwnProperty("login")) {
                callback(`Cannot Add login ${item.login} as it already exists `, null)
            } else {
                this.documentDB.put(params, callback)
            }
        })

    }
    /**
     * 
     * @param {*} item 
     * @param {*} callback 
     */
    updateUser(item, callback) {
        let params = {
            "TableName": this.tableName,
            Key:{login: item.login},
            UpdateExpression: 'set #a = :p',
            ExpressionAttributeNames: {
                '#a': 'pwd'
            },
            ExpressionAttributeValues: {
                ':p': item.pwd,
            }
        }

        this.documentDB.update(params, callback)


    }
    /**
     * delete user that has the login $item
     * @param {object} login  - 
     * @param {*} callback - err ,data
     * return a message{string} corresponding to the error
     * 
     */
    deleteUser(item, callback) {
        let params = {
            "TableName": this.tableName,
            Key: {
                login: item.login
            }
        }
        this.getUserByLogin(item.login, (err, data) => {
            if (err) {
                callback(err, data)
            }
            if (!data.hasOwnProperty("login")) {
                callback(`Cannot delete login ${item.login} as it doesn't exist `, null)
            } else {
                this.documentDB.delete(params, callback)
            }
        })
        return true
    }
    /**
     * get User By Login
     * @param {String} login 
     * @param {function} callback 
     */
    getUserByLogin(login, callback) {
        if (typeof (login) != "string") {
            callback('invalid format - String expected', null)
        } else {
            let params = {
                "TableName": this.tableName,
                "Key": {
                    "login": login
                }
            }
            this.documentDB.get(params, (err, data) => {
                try {
                    callback(err, data.hasOwnProperty("Item") ? data.Item : {})
                } catch (error) {
                    callback(error, {})
                }
            })
        }
    }


}

var self = (module.exports = {
    /** User */
    User

})