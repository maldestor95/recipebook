/**
 * Configure the connexion to the AWS SDK for development mode or production var self=(module.exports={
 *
 *
 })
 */


import  AWS from "aws-sdk";
import {ServiceConfigurationOptions} from 'aws-sdk/lib/service';

export function serviceConfigOptions(developmentMode:boolean=false):ServiceConfigurationOptions{
    let developmentServiceConfigOptions : ServiceConfigurationOptions = {
        region: "eu-west-3",
        maxRetries: 1,
        httpOptions: {
            timeout: 1000
        },
    };
    if (process.env.NODE_ENV == "development" || developmentMode) {
        const dynamoPort:string=process.env.dynamodbPort?process.env.dynamodbPort:'8000'
        developmentServiceConfigOptions.endpoint= `http://localhost:${dynamoPort}`
    }
    return developmentServiceConfigOptions
}

// export function setup(developmentPort=8000) {
//         const localEndPoint:string =`http://localhost:${developmentPort}`
//         let configOption: AWS.ConfigService
//         AWS.config.update(developmentServiceConfigOptions);
//     }



/*
let dynamodb = new AWS.DynamoDB(serviceConfigOptions);

let docClient = new AWS.DynamoDB.DocumentClient( {
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    convertEmptyValues: true
}); 
*/