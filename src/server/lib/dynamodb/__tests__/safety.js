/* This code is to ensure that this script is executed in an NODE_ENV=development mode to avoid corrupting production database*/

function test(){
    if (process.env.NODE_ENV!='development') throw `Mocha test must run in development mode
    
    if using npm, ensure to refer to mocha.env.js that set "process.env.NODE_ENV = 'development'"
    
    typical command line can be:
    "mocha  -r mocha.env.js --watch"

    `
}
module.exports={test}