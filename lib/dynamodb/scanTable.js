let Users= require('./User')
Users.scan_userTable((err,data)=>{
    if (err) throw (err)
    else console.log (JSON.stringify(data).replace(/,/g,'\n').replace(/{"userApplication"/g,'\n{"userApplication"'))
})
