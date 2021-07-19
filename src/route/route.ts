"use strict"
import express from 'express';
var frouter = express.Router();
// frouter.use(express.json);
frouter.all('*',(req,res,next)=>{
    console.log('req,res')
    next()
})
frouter.get('/fl',(req,res)=>{
    res.send('ok')
})
frouter.post('/setfolder', (req,res)=>{
    console.log(req.body.name)
    res.send('setfolder')
})
export = frouter;