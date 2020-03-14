let User = require('../../lib/dynamodb/User').User

let defaultTable = [{
        login: "aze",
        pwd: "azepwd"
    },
    {
        login: "qsd",
        pwd: "qsdpwd"
    },
    {
        login: "wxc",
        pwd: "wxcpwd"
    },
    {
        login: "rty",
        pwd: "rtypwd",
        userApplication: {
            'Todo': 'Root',
            'Expenses': "Viewer"
        }
    }
]

let createEntry = function (EntryUser, callback) {

    let T = new User()
    T.createLogin(EntryUser.login, (e1, r1) => {
        if (e1) {
            console.log(e1)
            callback(e1, r1)
        }
        T.updateLoginPwd(EntryUser.pwd, (e2, r2) => {
            if (e2) {
                callback(e2, r2)
            } else {
                if (Object.hasOwnProperty('userApplication')) {

                    T.updateApplicationList(EntryUser.userApplication)
                }
                else {

                    callback(null, T)
                }
            }
        })
    })
}

defaultTable.forEach(x => createEntry(x, console.log))