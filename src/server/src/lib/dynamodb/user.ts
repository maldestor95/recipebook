"use strict"
import * as constants from '../definition'
import AWS from 'aws-sdk'
import { serviceConfigOptions } from './aws_setup'

import { GroupClass, RoleClass } from './GroupAndRoles'

export interface userError extends AWS.AWSError {
    err_msg?: string
}
export interface applicationOption {
    application: constants._application
    role: constants._role
}
export interface UserInterface {
    login: string | null
    group?: []
    version: number,
    details: userDetails
    userApplication: constants.AppList
    pwd: string | null
}
export interface userDetails {
    address: string | null
    email: string | null
    phone: string | null
}
export enum userUpdateOperation {
    ADD = 'ADD',
    DEL = 'DEL',
}
export type DBPromiseResult = { err: Partial<AWS.AWSError> | null, res: UserInterface | null }
export class User implements UserInterface {
    login: string | null = null
    version: number = 0
    details: userDetails = { phone: null, email: null, address: null }
    userApplication: constants.AppList = {}
    pwd: string | null = null
    invalid?: boolean = false
    readonly tableName: string = "Users"
    private documentdb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions())
    /**
     * 
     * @param login shall have a length between 1 and 79 characters
     */
    constructor(login: string) {
        if (login.length == 0 || login.length > 80) this.invalid = true
        else {
            this.login = login
        }
    }
    print(): UserInterface {
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
        return new Promise((resolve, reject) => {
            this.documentdb.put(params, (err, data) => {
                if (err) reject({ err, res: null })
                resolve({ err: null, res: this.print() })
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
            if (newPwd.length == 0) resolve({ err: { message: 'invalid password' }, res: null })
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
                if (err) reject({ err, res: null })
                this.version += 1
                this.pwd = newPwd
                resolve({ err: null, res: this.print() })
            })
        })


    }
    updateDetails(newDetails: userDetails): Promise<DBPromiseResult> {
        return new Promise((resolve, reject) => {

            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                ConditionExpression: "attribute_exists(#u) and #v = :version",
                UpdateExpression: "set #Details = :details, #v =:newversion",
                ExpressionAttributeNames: {
                    '#Details': "details",
                    "#u": "login",
                    "#v": "version",
                },
                ExpressionAttributeValues: {
                    ":details": newDetails,
                    ":version": Number(this.version),
                    ":newversion": Number(this.version) + 1
                },
            }
            this.documentdb.update(params, (err, data) => {
                if (err) reject({ err, res: null })
                this.version += 1
                this.details = { ...newDetails }
                resolve({ err: null, res: this.print() })
            })
        })
    }
    /**
     * 
     * Update one application for one user
     * @param {applicationOption} newApplication - application & role
     * @param {userUpdateOperation} operation - shall be `ADD` or `DEL`
    */
    updateApplication(newApplication: applicationOption, operation: userUpdateOperation): Promise<DBPromiseResult> {
        return new Promise((resolve, reject) => {
            let app = new GroupClass()
            let auth = new RoleClass()

            if ((!app.isvalid(newApplication.application)) || (!auth.isvalid(newApplication.role))) reject({ err: "invalig application or role", res: null })

            let tempUserApplication = { ...this.userApplication }
            if (operation=='ADD') tempUserApplication[newApplication.application] = newApplication.role
            if (operation=='DEL') delete tempUserApplication[newApplication.application]

            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                ConditionExpression: "attribute_exists(#u) and #v = :version",
                UpdateExpression: "set #UserApplication =:userApplication ,  #v =:newversion",
                ExpressionAttributeNames: {
                    '#UserApplication': "userApplication",
                    "#u": "login",
                    '#v': "version"
                },
                ExpressionAttributeValues: {
                    ':userApplication': tempUserApplication,
                    ":version": Number(this.version),
                    ":newversion": Number(this.version) + 1
                }
            }
            this.documentdb.update(params, (err, res) => {
                if (err) reject({ err, res: null })
                this.version += 1
                this.userApplication = { ...tempUserApplication }
                resolve({ err: null, res: this.print() })
            })
        });

    }
    updateApplicationList(newApplication: Record<string, string>): Promise<DBPromiseResult> {
        return new Promise((resolve, reject) => {
            const tempUserApplication = convertApplist(newApplication)
            if (Object.keys(tempUserApplication).length == 0) reject({ err: "invalid application or role", res: null })

            let params = {
                TableName: this.tableName,
                Key: {
                    "login": this.login
                },
                ConditionExpression: "attribute_exists(#u) and #v = :version",
                UpdateExpression: "set #UserApplication =:userApplication ,  #v =:newversion",
                ExpressionAttributeNames: {
                    '#UserApplication': "userApplication",
                    "#u": "login",
                    '#v': "version"
                },
                ExpressionAttributeValues: {
                    ':userApplication': tempUserApplication,
                    ":version": Number(this.version),
                    ":newversion": Number(this.version) + 1
                }
            }
            this.documentdb.update(params, (err, res) => {
                if (err) reject({ err, res: null })
                this.version += 1
                this.userApplication = { ...tempUserApplication }
                resolve({ err: null, res: this.print() })
            })
        });

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
                // default:
                //     break
            }
        })
    }
}


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


/**
 * Convert Record<string,string> to  an application
 * returns {} is the input is not valid
 * @param newAppList 
 */
export function convertApplist(newAppList: Record<string, string>): Partial<Record<constants._application, constants._role>> {
    let output: Partial<Record<constants._application, constants._role>> = {}
    let isValid = true
    Object.keys(newAppList).map((k) => {
        if (!(k in constants._application)) isValid = false
        if (!(newAppList[k] in constants._role)) isValid = false
    })
    if (!isValid) return {}
    Object.keys(newAppList).map((k) => output[<constants._application>k] = <constants._role>newAppList[k])
    return output
}