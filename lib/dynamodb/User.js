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

var AWS = require("aws-sdk");

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

    dynamodb.createTable(params, (err,data)=>{
        // if (err) throw err;
        callback(err,data);
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
class User {
    constructor() {
        this.login = null
        this.pwd = ""
        this.group = []
        this.usersright = []

        this.isgroup = undefined
        this.details = {
            address: undefined,
            email: undefined,
            phone: undefined
        }
        this.version = undefined
        this.tableName = "Users"
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
            if (!err) {
                this.login = data.Item.login
                this.pwd = data.Item.pwd
                this.group = data.Item.group
                this.usersright = data.Item.usersright

                this.isgroup = data.Item.isgroup
                if (data.Item.hasOwnProperty('details')) {
                    this.details = {
                        address: data.Item.details.address,
                        email: data.Item.details.email,
                        phone: data.Item.details.phone
                    }
                }
                this.version = data.Item.version
            }
            callback(err, data)
        })
    }
    createLogin(login, callback) {
        let documentDB = new AWS.DynamoDB.DocumentClient()
        let params = {
            "TableName": this.tableName,
            Item: {
                "login": login,
                "details": {}
            },
            ConditionExpression: "attribute_not_exists(#u)",
            ExpressionAttributeNames: {
                "#u": "login"
            }
        }
        documentDB.put(params, (err, data) => {
            if (err) {
                callback(err, data)
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
                    // ":currvers": this.version,
                    ":newvers": this.version == undefined ? 0 : this.version + 1,
                }
            }
            documentDB.update(params, callback)
        }

    }
    updateLoginAuthorisation() {

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
                // ConditionExpression: "attribute_exists(login)",
                UpdateExpression: "set #Details.#Address = :address, #Details.#Phone=:phone , #Details.#Email=:email",
                ExpressionAttributeNames: {
                    '#Address': "address",
                    '#Phone': "phone",
                    '#Details': "details",
                    '#Email': "email"
                },
                ExpressionAttributeValues: {
                    ':address': details.address ? details.address : this.details.address?this.details.address:null,
                    ':phone': details.phone ? details.phone : this.details.phone?this.details.phone:null,
                    ':email': details.email ? details.email : this.details.email?this.details.email:null
                }
            }
            documentDB.update(params, (err, res) => {
                if (details.address){
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
}

var self = (module.exports = {
    User,
    create_userTable,
    delete_userTable
})