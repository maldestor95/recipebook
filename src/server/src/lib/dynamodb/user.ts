"use strict"
const merge = require('deepmerge')

import * as constants from '../definition'

import AWS from 'aws-sdk'

import {
    serviceConfigOptions
    // ,     AWSConverter
} from './aws_setup'

import { create_userTable, delete_userTable, scan_userTable } from './usertable'


var GroupRole = require('./GroupAndRoles').Manager

export interface userError extends AWS.AWSError {
    err_msg?: string
}

// export interface applicationOption {
//     key: constants._application
//     role: constants._role
// }

export interface UserInterface {
    login: string | null
    group?: []
    version: number,
    details: Details
    userApplication: constants.AppList
    pwd: string | null
}
type Details =
    {
        address?: string
        email?: string
        phone?: string
    }
export enum userUpdateOperation {
    ADD = 'ADD',
    DEL = 'DEL',
}
export type DBPromiseResult = { err: object | null, res: UserInterface | null }

export class User implements UserInterface {
    login: string | null = null
    version: number = 0
    details: Details = {}
    userApplication: constants.AppList = {}
    pwd: string | null = null
    invalid?: boolean = false
    readonly tableName: string = "Users"
    private documentdb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions())

    constructor(login: string) {
        if (login.length == 0 || login.length > 20) this.invalid = true
        else {
            this.login = login
        }
    }
    getUser(): UserInterface {
        const res = {
            login: this.login,
            version: this.version,
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

    async get(login?: string | null): Promise<DBPromiseResult> {
        if (!login) return ({ err: null, res: null })
        let params = {
            "TableName": this.tableName,
            "Key": {
                "login": login ? login : this.login
            }
        }
        return new Promise((resolve, reject) => {
            this.documentdb.get(params, (err, data) => {
                if (err) reject({ err, res: null }) //TODO change to resolve?
                if (data.Item) {
                    let resultUser = <UserInterface>data.Item
                    const resultkeys = Object.keys(resultUser)
                    this.assignRestultToThis(resultkeys, resultUser)
                    resolve({ err: null, res: resultUser })
                }
            })
        })
    }

    async createLogin(): Promise<DBPromiseResult> {
        let params = {
            "TableName": this.tableName,
            Item: {
                "login": this.login,
                "details": {},
                "userApplication": {},
                "version": 0,
                "pwd": "new"
            },
            ConditionExpression: "attribute_not_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "login"
            },
            ReturnConsumedCapacity: "TOTAL",
            ReturnItemCollectionMetrics: "SIZE",
            ReturnValues: "ALL_OLD"
        }
        return new Promise((resolve) => {
            this.documentdb.put(params, (err, data) => {
                if (err) resolve({ err, res: null })
                resolve({ err: null, res: this.getUser() })
            })
        })
    }

    async deleteLogin(): Promise<DBPromiseResult> {
        let params = {
            "TableName": this.tableName,
            Key: {
                "login": this.login
            },
            ConditionExpression: "attribute_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "login"
            },
            ReturnValues: "ALL_OLD"
        }
        const documentPromise = (): Promise<UserInterface> => {
            return new Promise((resolve, reject) => {
                this.documentdb.delete(params, (err, data) => {
                    if (err) reject(err)
                    resolve()
                })
            });
        }
        return await returnPromise(documentPromise)

    }


    async updatePwd(newPwd: string): Promise<DBPromiseResult> {
        return new Promise((resolve, reject) => {
            if (newPwd.length==0) reject({message:'invalid password'})
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
                    ":mypwd": newPwd,
                    ":version": Number(this.version),
                    ":newvers": Number(this.version) + 1,
                }
            }
            this.documentdb.update(params, (err, data) => {
                if (err) resolve({ err, res: null })
                this.version += 1
                this.pwd = newPwd
                resolve({ err: null, res: this.getUser() })
            })
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

    private assignRestultToThis(resultkeys: string[], resultUser: UserInterface): void {
        resultkeys.forEach(k => {
            switch (k) {
                case 'login': this.login = <string>resultUser[k]
                    break
                case 'version': this.version = resultUser[k]
                    break
                case 'details': this.details = JSON.parse(JSON.stringify(resultUser[k]))
                    break
                case 'userApplication': JSON.parse(JSON.stringify(this.userApplication = resultUser[k]))
                    break
                case 'pwd': this.pwd = resultUser[k]
                    break
                default:
                    break
            }
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

// var self = (module.exports = {
//     User,
//     create_userTable,
//     delete_userTable,
//     scan_userTable,
//     // scanUsers,

// })

// FEATURE error management when dynamoDB is not accessible
// FEATURE error msg to be meaningful (login do not exist...)
// FEATURE transform class to function returning promises
async function returnPromise(method: Function): Promise<DBPromiseResult> {
    try {
        const result = await method()
        // some methods such as delete don't expect to return a UserInterface but a null
        return ({ err: null, res: result ? result : null })
    }
    catch (error) {
        return ({ err: error, res: null })
    }

}
