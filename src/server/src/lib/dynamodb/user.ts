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
import * as constants from '../definition'

import { error_msg as dynamo_error_msg, error_msg } from './definition_dynamodb'

import AWS from 'aws-sdk'
var AWSSetup = require('./aws_setup')
AWSSetup.setup()

const {
    json
} = require('body-parser');
var GroupRole = require('./GroupAndRoles').Manager


let dynamodb = new AWS.DynamoDB(AWS.config);

function create_userTable(callback: (err: object, res: object) => void): void {

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
function delete_userTable(callback: (err: object, res: object) => void): void {

    let params = {
        TableName: "Users"
    };
    dynamodb.deleteTable(params, (err, data) => {
        callback(err, data)
    });

}

function scan_userTable(callback: (err: object, res: object) => void): void {

    let params = {
        TableName: "Users"
    };
    dynamodb.scan(params, (err, data) => {
        // this.connectionStatus = !err ? err : err.message
        callback(err, data)
    });

}
export interface UserInterface {
    login: string
    group: []
    version: number,
    tableName: string
    details: {
        address?: string
        email?: string
        phone?: string
    }

}
class User  implements UserInterface{
    constructor(login: string) {
        this.login = login
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
        this.defaultDynamoParam = {

        }
    }
    getLogin(login, callback: (err: object, res: object) => void)): void {
        if(login == null | login == undefined) return callback({
            message: 'invalid input'
        }, null)
let documentDB = new AWS.DynamoDB.DocumentClient()
let params = {
    "TableName": this.tableName,
    "Key": {
        "login": login
    }
}
documentDB.get(params, (err, data) => {
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
    callback(err, data.Item)

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
            "userApplication": {},
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
    if (login == null | login == undefined) callback({
        message: 'The conditional request failed'
    })
    let documentDB = new AWS.DynamoDB.DocumentClient()
    let params = {
        "TableName": this.tableName,
        Key: {
            "login": login
        },
        ConditionExpression: "attribute_exists(#u)",
        ExpressionAttributeNames: {
            "#u": "login"
        },
        ReturnValues: "ALL_OLD"
    }
    documentDB.delete(params, callback)

}
/**
 * print outputs to console the user
 * @param {string} pre 
 * @param {string} post 
 */
print(pre = null, post = null) {
    if (pre) {
        console.log(pre)
    }
    console.log(JSON.stringify(this))
    if (post) {
        console.log(post)
    }
}
updateLoginPwd(data = null, callback) {
    //data={pwd:newpwd,version:version}!
    if (data == null | data == undefined) return callback("missing data", null)
    if (this.login == null || data.pwd == null || data.pwd == undefined) {
        return callback("invalid login and pwd", null)
    } else {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            TableName: this.tableName,
            Key: {
                "login": this.login
            },
            ConditionExpression: "attribute_exists(#u) and #V = :version",
            UpdateExpression: "set #A = :mypwd ,  #V =:newvers",
            ExpressionAttributeNames: {
                '#A': "pwd",
                '#V': "version",
                "#u": "login",
            },
            ExpressionAttributeValues: {
                ":mypwd": data.pwd,
                ":version": Number(data.version),
                ":newvers": Number(data.version) + 1,
            }
        }
        documentDB.update(params, (err, data) => {
            if (!err) {
                this.version = Number(data.version) + 1
            }
            callback(err, data)
        })
    }

}
updateLoginDetails(data = null, callback) {
    if (this.login == null) {
        callback("missing login", null)
    }
    if (data == null) {
        return callback("missing details", null)
    } else {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            TableName: this.tableName,
            Key: {
                "login": this.login
            },
            ConditionExpression: "attribute_exists(#u) and #v = :version",
            UpdateExpression: "set #Details.#Address = :address, #Details.#Phone=:phone , #Details.#Email=:email, #v =:newversion",
            ExpressionAttributeNames: {
                '#Address': "address",
                '#Phone': "phone",
                '#Details': "details",
                '#Email': "email",
                "#u": "login",
                "#v": "version",
            },
            ExpressionAttributeValues: {
                ':address': data.details.address ? data.details.address : this.details.address,
                ':phone': data.details.phone ? data.details.phone : this.details.phone,
                ':email': data.details.email ? data.details.email : this.details.email,
                ":version": Number(data.version),
                ":newversion": Number(data.version) + 1
            },
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            ReturnValues: "ALL_OLD"
        }
        documentDB.update(params, (err, res) => {
            if (data.details.address) {
                this.details.address = data.details.address
            }
            if (data.details.phone) {
                this.details.phone = data.details.phone
            }
            if (data.details.email) {
                this.details.email = data.details.email
            }
            if (!err) {
                this.version = Number(data.version) + 1
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
    if ((!app.isvalid(applicationName)) || (!auth.isvalid(authorisation)) || !(['DEL', 'ADD'].includes(operation))) {
        callback(constants._errorMessage.InvalidParam, null)
    } else {
        auth.add(authorisation)

        let tempUserApplication = this.userApplication
        switch (operation) {
            case 'ADD':
                tempUserApplication[applicationName] = authorisation
                break;
            case 'DEL':
                delete tempUserApplication[applicationName]
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
                ":newvers": Number(this.version) + 1,
                // ":version": Number(this.version)
            }

        }


        documentDB.update(params, (err, res) => {
            this.version += 1
            this.userApplication[applicationName] = authorisation
            callback(err, res);
        })
    };
}
updateApplicationList(applicationList = {}, callback) {
    /* application list is an  object, e.g
    {
        { Users: "Root" },
        { Todo: "Viewer" },
        { Expenses: "Manager" }
    }*/

    if (!this.login == null) return callback("missing login", null)
    // TODO check application list is valid
    let documentDB = new AWS.DynamoDB.DocumentClient()

    let params = {
        TableName: this.tableName,
        Key: {
            "login": this.login
        },
        ConditionExpression: "version < :newvers",
        UpdateExpression: "set #UserApplication =:userApplication , #V =:newvers ",
        ExpressionAttributeNames: {
            '#UserApplication': "userApplication",
            '#V': "version"
        },
        ExpressionAttributeValues: {
            ':userApplication': applicationList,
            ":newvers": Number(this.version) + 1,
        }

    }
    documentDB.update(params, (err, res) => {
        this.version += 1
        this.userApplication = applicationList
        callback(err, res);
    })

}
}
//TODO SCAN USER
/*function scanUsers(lastlogin = null, callback) {
    var params = {
        TableName: 'Users',
        ExclusiveStartKey: lastlogin ? {
            "login": lastlogin
        } : null
    };

    let documentClient = new AWS.DynamoDB.DocumentClient();

    documentClient.scan(params, function (err, data) {
        if (err) console.log(err);
        // else console.log(data);
        callback(err, data)
    });
}*/

var self = (module.exports = {
    User,
    create_userTable,
    delete_userTable,
    scan_userTable,
    // scanUsers,

})

// FEATURE error management when dynamoDB is not accessible
// FEATURE error msg to be meaningful (login do not exist...)
// FEATURE transform class to function returning promises