
"use strict"

import AWS from 'aws-sdk'
import AWSSetup, { serviceConfigOptions } from './aws_setup'
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