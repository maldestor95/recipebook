var AWS = require("aws-sdk");
myConfig = new AWS.Config();
myConfig.update({region: 'eu-west-3'});
console.log("Region: ", myConfig.region);


AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
  });

  let dynamodb = new AWS.DynamoDB(myConfig);

  function create_Table(TableName,callback) {("test",console.log)

    let params = {
        TableName: TableName,
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

create_Table("test",console.log)
