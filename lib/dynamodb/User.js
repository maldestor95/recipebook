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
var dynamo_error_msg=require('./definition_dynamodb').error_msg
var AWS = require("aws-sdk");
var GroupRole = require('./GroupAndRoles').Manager

AWS.config.update({
    region: "eu-west-3",
    endpoint: "http://localhost:8000",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }

});

let dynamodb = new AWS.DynamoDB();

function create_userTable(callback) {

    let params = {
        TableName: "Users",
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

    dynamodb.createTable(params, (err, data) => {
        // if (err) throw err;
        callback(err, data);
    })
}

/**
 * delete_userTable
 * @param {function} callback 
 */
function delete_userTable(callback) {

    let params = {
        TableName: "Users"
    };
    dynamodb.deleteTable(params, (err, data) => {
        this.connectionStatus = !err ? err : err.message
        callback(err, data)
    });

}
function scan_userTable(callback) {

    let params = {
        TableName: "Users"
    };
    dynamodb.scan(params, (err, data) => {
        this.connectionStatus = !err ? err : err.message
        callback(err, data)
    });

}

class User {
    constructor() {
        this.login = null
        this.group = []
        this.version = 0
        this.tableName = "Users"
        this.details = {
            address: undefined,
            email: undefined,
            phone: undefined
        }
        this.userApplication = {} // Object of applicationName:authorisation  (e.g "ToDo": "Viewer"`
        this.pwd = ""
    }
    getLogin(login, callback) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": this.tableName,
            "Key": {
                "login": login
            }
        }
        documentDB.get(params, (err, data) => {
            if (data == null) {
                callback(err, null)
            } else {
                if (!err & Object.keys(data).length > 0) {
                    this.login = data.Item.login
                    this.pwd = data.Item.pwd
                    this.group = data.Item.group
                    if (data.Item.hasOwnProperty('details')) {
                        this.details = {
                            address: data.Item.details.address,
                            email: data.Item.details.email,
                            phone: data.Item.details.phone
                        }
                    }
                    if (data.Item.hasOwnProperty('userApplication')) {
                        this.userApplication = data.Item.userApplication
                    }

                    this.version = data.Item.version
                }
                callback(err, data)
            }
        })
    }
    /**
     * method create login
     * @param {string} login  - shall be less than 12 chars longs, unique
     * @param {function} callback  - returns (err,res) where
     *  err= dynamoDB result
     * data = // COMMENT error msg of method create login to describe
     */
    createLogin(login, callback) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": this.tableName,
            Item: {
                "login": login,
                "details": {},
                "userApplication": [],
                "version": 0
            },
            ConditionExpression: "attribute_not_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "login"
            },
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            ReturnValues: "ALL_OLD"
        }
        documentDB.put(params, (err, data) => {
            if (err) {
                callback(err, dynamo_error_msg.loginAlreadyExist)
            } else {
                this.login = login
                callback(err, data)
            }
        })
    }

    deleteLogin(login, callback) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": this.tableName,
            Key: {
                "login": login
            },
            ConditionExpression: "attribute_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "login"
            }
        }
        documentDB.delete(params, callback)

    }
    print(pre = null, post = null) {
        if (pre) {
            console.log(pre)
        }
        console.log(JSON.stringify(this))
        if (post) {
            console.log(post)
        }
    }
    updateLoginPwd(newPwd = null, callback) {
        if (this.login == null) {
            callback("missing login", null)
        } else {
            let documentDB = new AWS.DynamoDB.DocumentClient()
            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                // ConditionExpression: "attribute_exists(login)",
                UpdateExpression: "set #A = :mypwd ,  #V =:newvers",
                ExpressionAttributeNames: {
                    '#A': "pwd",
                    '#V': "version"
                },
                ExpressionAttributeValues: {
                    ":mypwd": newPwd,
                    ":newvers": this.version == undefined ? 0 : this.version + 1,
                }
            }
            documentDB.update(params, callback)
        }

    }
    updateLoginDetails(details = null, callback) {
        if (this.login == null) {
            callback("missing login", null)
        }
        if (details == null) {
            callback("missing details", null)
        } else {
            let documentDB = new AWS.DynamoDB.DocumentClient()
            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                // TODO add version in update details
                ConditionExpression: "attribute_exists(#u) ",//, #v = :version",
                UpdateExpression: "set #Details.#Address = :address, #Details.#Phone=:phone , #Details.#Email=:email, #UserApplication =:userApplication",
                ExpressionAttributeNames: {
                    '#Address': "address",
                    '#Phone': "phone",
                    '#Details': "details",
                    '#Email': "email",
                    '#UserApplication': "userApplication",
                    "#u": "login",
                    // "#v": "version"
                },
                ExpressionAttributeValues: {
                    ':address': details.address ? details.address : this.details.address ? this.details.address : null,
                    ':phone': details.phone ? details.phone : this.details.phone ? this.details.phone : null,
                    ':email': details.email ? details.email : this.details.email ? this.details.email : null,
                    ":userApplication": []
                    // ":version": this.version
                },
                ReturnConsumedCapacity: "TOTAL",
                ReturnItemCollectionMetrics: "SIZE",
                ReturnValues: "ALL_OLD"
            }
            documentDB.update(params, (err, res) => {
                if (details.address) {
                    this.details.address = details.address
                }
                if (details.phone) {
                    this.details.phone = details.phone
                }
                if (details.email) {
                    this.details.email = details.email
                }
                callback(err, res)
            })
        }
    }
    /**
     * 
     * @param {Object} param 
     * @param {string} param.applicationName - Name of the application
     * @param {string} param.authorisation -  Authorisation
     * @param {string} param. operation - shall be `ADD` or `DEL`
     * @param {*} callback 
     * @example
     * //updateApplication{applicationName:"ToDo", authorisation: "Viewer", operation:"ADD"}, (err,data)=>{console.log(err)}
     */
    updateApplication({
        applicationName = null,
        authorisation = constants._role.Viewer,
        operation = null
    }, callback) {

        let app = new GroupRole(Object.values(constants._application))
        let auth = new GroupRole(Object.values(constants._role))
        if ((!app.isvalid(applicationName)) || (!auth.isvalid(authorisation))) {
            callback(constants._errorMessage.InvalidParam, null)
        } else {
            auth.add(authorisation)

            let tempUserApplication = this.userApplication
            switch (operation) {
                case 'ADD':
                    tempUserApplication[applicationName] = authorisation
                    break;
                case 'DEL':
                    if (!Object.keys(tempUserApplication).includes(applicationName)) {
                        callback(constants._errorMessage.InvalidParam, null)
                    } else {
                        delete tempUserApplication[applicationName]
                    }
                    break;
                default:
                    callback(constants._errorMessage.InvalidParam, null)
                    break;
            }

            let documentDB = new AWS.DynamoDB.DocumentClient()

            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                ConditionExpression: "version < :newvers",
                UpdateExpression: "set #UserApplication =:userApplication ,  #V =:newvers",
                ExpressionAttributeNames: {
                    '#UserApplication': "userApplication",
                    '#V': "version"
                },
                ExpressionAttributeValues: {
                    ':userApplication': tempUserApplication,
                    ":newvers": this.version = this.version + 1,
                }

            }


            documentDB.update(params, (err, res) => {
                this.version += 1
                this.userApplication = tempUserApplication
                // console.log(err, res)
                // console.log("Version " + this.version + " -- " + JSON.stringify(this.userApplication))
                callback(err, res);
            })
        };
    }
    updateApplicationList(applicationList, callback) {

        // TODO check application list is valid
        let documentDB = new AWS.DynamoDB.DocumentClient()

        let params = {
            TableName: this.tableName,
            Key: {
                "login": this.login
            },
            // ConditionExpression: "version < :newvers",
            UpdateExpression: "set #UserApplication =:userApplication ",
            ExpressionAttributeNames: {
                '#UserApplication': "userApplication",
            },
            ExpressionAttributeValues: {
                ':userApplication': applicationList,
                // ":newvers": this.version = this.version + 1,
            }

        }


        documentDB.update(params, (err, res) => {
            this.version += 1
            this.userApplication = applicationList
            // console.log(err, res)
            // console.log("Version " + this.version + " -- " + JSON.stringify(this.userApplication))
            callback(err, res);
        })

    }
}
//TODO SCAN USER
function scanUser(callback) {
    var params = {
        TableName: 'Users',
        FilterExpression: 'Year = :this_year',
        ExpressionAttributeValues: {
            ':this_year': 2015
        }
    };

    var documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

var self = (module.exports = {
    User,
    create_userTable,
    delete_userTable,
    scan_userTable
})

// FEATURE error management when dynamoDB is not accessible
// FEATURE transform class to function returning promises
