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
import AWSSetup, { serviceConfigOptions } from './aws_setup'

const {
    json
} = require('body-parser');
var GroupRole = require('./GroupAndRoles').Manager

let dynamodb = new AWS.DynamoDB(AWSSetup.serviceConfigOptions());
export interface userError extends AWS.AWSError {
    err_msg?: string
}
export function create_userTable(callback: (err: userError | null, res: object) => void): void {

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
        if (err) return callback({ ...err, err_msg: 'could not create database' }, data);
        else return callback(null, data)
    })
}

/**
 * delete_userTable
 * @param {function} callback 
 */
export function delete_userTable(callback: (err: userError | null, res: object) => void): void {

    let params = {
        TableName: "Users"
    };
    dynamodb.deleteTable(params, (err, data) => {
        callback(err, data)
    });

}

export function scan_userTable(callback: (err: userError, res: object) => void): void {

    let params = {
        TableName: "Users"
    };
    dynamodb.scan(params, (err, data) => {
        // this.connectionStatus = !err ? err : err.message
        callback(err, data)
    });

}
// export interface applicationOption {
//     key: constants._application
//     role: constants._role
// }
export interface UserInterface {
    login: string
    group?: []
    version: number,
    tableName: string
    details: {
        address?: string
        email?: string
        phone?: string
    }
    userApplication: constants.AppList
    pwd: string

}
export enum userUpdateOperation {
    ADD = 'ADD',
    DEL = 'DEL',
}
export type DBPromiseResult = { err: object | undefined, res: UserInterface | null }

export class User implements UserInterface {
    login: string
    version: number
    tableName: string
    details: {
        address?: string
        email?: string
        phone?: string
    }
    userApplication: constants.AppList
    pwd: string
    documentdb: AWS.DynamoDB.DocumentClient
    constructor(login: string) {
        this.login = login
        this.version = 0
        this.tableName = "Users"
        this.details = {}
        this.userApplication = {} // Object of applicationName:authorisation  (e.g "ToDo": "Viewer"`
        this.pwd = ""
        this.documentdb = new AWS.DynamoDB.DocumentClient(AWSSetup.serviceConfigOptions());


    }
    getUser(): UserInterface {
        const res= {
            login: this.login,
            version: this.version,
            tableName: this.tableName,
            details: {
                address: this.details.address,
                email: this.details.email,
                phone: this.details.phone
            },
            userApplication: this.userApplication,
            pwd: this.pwd,
        }
        return res
    }
    getLogin(login: string, callback: (err: userError, res: object | null) => void) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": this.tableName,
            "Key": {
                "login": login
            }
        }
        documentDB.get(params, (err, data) => {
            if (!err && data.Item) {
                this.login = data.Item.login
                this.pwd = data.Item.pwd
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
            callback(err, data.Item ? data.Item : data)

        })
    }
    /**
     * method create login
     * @param {string} login  - shall be less than 12 chars longs, unique
     * @param {function} callback  - returns (err,res) where
     *  err= dynamoDB result
     * data = // COMMENT error msg of method create login to describe
     */

    // async (userlogin: string):Promise<{data:User,err:userError}> => {
    async createLogin(login: string): Promise<DBPromiseResult> {
        // async createLogin (login: string):Promise<{err:object|undefined, res: object | null}>  {
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

        const putOrderPromise = (): Promise<UserInterface> => {
            return new Promise((resolve, reject) => {
                this.documentdb.put(params, (err: object, data: object) => {
                    if (err) reject(err)
                    resolve( this.getUser() )
                })
            });
        }
        try {
            const putOrder = await putOrderPromise()
            return ({ err: undefined, res: putOrder })
        }
        catch (error) {
            return ({ err: error, res: null })
        }

    }

    async deleteLogin(login: string): Promise<DBPromiseResult> {
        // deleteLogin(login: string, callback: (err: userError, res: object | null) => void) {
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
        // this.documentdb.delete(params, callback)
        const documentPromise = (fn = this.documentdb.delete): Promise<DBPromiseResult> => {
            return new Promise((resolve, reject) => {
                fn(params, (err: object, data: object) => {
                    if (err) reject(err)
                    resolve()
                })
            });
        }
        try {
            const Order = await documentPromise()
            return ({ err: undefined, res: null })
        }
        catch (error) {
            return ({ err: error, res: null })
        }

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
    updateLoginPwd(inputData: UserInterface, callback: (err: userError, res: object | null) => void) {

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
                ":mypwd": inputData.pwd,
                ":version": Number(inputData.version),
                ":newvers": Number(inputData.version) + 1,
            }
        }
        documentDB.update(params, (err, data) => {
            if (!err) {
                this.version = Number(inputData.version) + 1
            }
            callback(err, data)
        })


    }
    updateLoginDetails(inputData: UserInterface, callback: (err: object, res: object | null) => void) {
        if (this.login == null) {
            callback({ error_msg: "missing login" }, null)
        }
        if (inputData == null) {
            return callback({ error_msg: "missing details" }, null)
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
                    ':address': inputData.details.address ? inputData.details.address : this.details.address,
                    ':phone': inputData.details.phone ? inputData.details.phone : this.details.phone,
                    ':email': inputData.details.email ? inputData.details.email : this.details.email,
                    ":version": Number(inputData.version),
                    ":newversion": Number(inputData.version) + 1
                },
                ReturnConsumedCapacity: "TOTAL",
                ReturnItemCollectionMetrics: "SIZE",
                ReturnValues: "ALL_OLD"
            }
            documentDB.update(params, (err, res) => {
                if (inputData.details.address) {
                    this.details.address = inputData.details.address
                }
                if (inputData.details.phone) {
                    this.details.phone = inputData.details.phone
                }
                if (inputData.details.email) {
                    this.details.email = inputData.details.email
                }
                if (!err) {
                    this.version = Number(inputData.version) + 1
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
    updateApplication(inputData: {

        applicationName: constants._application,
        authorisation: constants._role,
        operation: userUpdateOperation
    }, callback: (err: object, res: object | null) => void) {

        let app = new GroupRole(Object.values(constants._application))
        let auth = new GroupRole(Object.values(constants._role))
        if ((!app.isvalid(inputData.applicationName)) || (!auth.isvalid(inputData.authorisation)) || !inputData.operation) {
            callback({ error_msg: constants._errorMessage.InvalidParam }, null)
        } else {
            auth.add(inputData.authorisation)

            let tempUserApplication = this.userApplication
            switch (inputData.operation) {
                case 'ADD':
                    tempUserApplication[inputData.applicationName] = inputData.authorisation
                    break;
                case 'DEL':
                    delete tempUserApplication[inputData.applicationName]
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
                this.userApplication[inputData.applicationName] = inputData.authorisation
                callback(err, res);
            })
        };
    }

    updateApplicationList(applicationList = {}, callback: (err: object, res: object | null) => void) {
        /* application list is an  object, e.g
        {
            { Users: "Root" },
            { Todo: "Viewer" },
            { Expenses: "Manager" }
        }*/

        if (!this.login == null) return callback({ error_msg: "missing login" }, null)
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