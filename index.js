const express = require('express')
const app = express()
const port = 3000


var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)

app.get('/tot', function (req, res) {
    res.send('Hello World!')
})
app.use('/wiki', require('./wiki/routewiki'));
app.get('/', (req, res) => res.send('Hello toto!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))