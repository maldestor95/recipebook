/**
 * Configure the connexion to the AWS SDK for development mode or production var self=(module.exports={
 *
 *
 })
 */


var AWS = require("aws-sdk");
var self = (module.exports = {
    setup(developmentPort=8000) {
        AWS.config.update({
            region: "eu-west-3",
            maxRetries: 1,
            httpOptions: {
                timeout: 1000
            }
        });
        if (process.env.NODE_ENV == "development") {
            AWS.config.update({
                endpoint: `http://localhost:${developmentPort}`
            })
        }
    }
})