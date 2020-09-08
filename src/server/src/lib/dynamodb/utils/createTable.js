let Users = require('./User')


function createT(callback) {
    Users.create_userTable((err, data) => {
        if (err) {
            if (err.message == "Cannot create preexisting table") {
                console.log("Cannot create preexisting table we continue...")
                setTimeout(() => {
                    callback(err, data)
                }, 2000)
            }
        } else {
            setTimeout(() => {
                console.log('table created')
                callback(err, data), 2000
            })
        }

    })
};




createT((err, data) => {
    console.log('table created')
})