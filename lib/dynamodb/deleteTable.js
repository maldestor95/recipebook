let Users= require('./User')
Users.delete_userTable((err,data)=>{
    if (err) throw (err)
    else console.log (err,data)
})
