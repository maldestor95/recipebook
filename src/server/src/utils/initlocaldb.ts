process.env.NODE_ENV = "development"

/** Creation of local database data for development purposes */
const userDataPath = './src/utils/developmentdata.json'

import { UserInterface, User } from "../lib/dynamodb/user"
import AWS from "aws-sdk"
import { serviceConfigOptions } from "../lib/dynamodb/aws_setup"

let dynamodb = new AWS.DynamoDB(serviceConfigOptions());
import fs from "fs"

/** Table Users creation based on JSON input variable 'userDataPath' */
export const initdb = async () => {
    fs.readFile(userDataPath, 'utf8', async (err, jsonData) => {
        const UserArray = JSON.parse(jsonData).filter((t: { table: string }) => t.table == "Users")[0].data
        const userTable = createUserTable()

        await userTable.catch(error => console.log(error.message))
            .then((data: any) => {
                console.log(`Table ${data.TableDescription.TableName} created`)
            })
        if (userTable) {
            await createUsers(UserArray)
        }
    })
}
const createUserTable = async () => {
    return new Promise((resolve, reject) => {
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
            if (err) return reject(err);
            else resolve(data)
        })
    })
}


const createUsers = async (userArray: Array<User>) => {
    userArray.map(async (u: UserInterface) => {
        const createUser = new User("blank")
        try {
            const currentUserInDB = await createUser.get(<string>u.login)
            if (!currentUserInDB.res) {
                createUser.login = u.login
                await createUser.createLogin()
                    .then(data => console.log(`${createUser.login} created`))
                    .catch(err => console.log(createUser.login, err));

            }
            await createUser.updatePwd(<string>u.pwd)
            await createUser.updateApplicationList(<Record<string, string>>u.userApplication)
            await createUser.updateDetails(u.details)
        } catch (error) {
            console.log(error);

        }
    })
}

// initdb()