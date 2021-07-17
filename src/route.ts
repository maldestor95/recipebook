"use strict"
import express from 'express';
var frouter = express.Router();

frouter.get('/fl',(req,res)=>{
    res.send('ok')
})

export = frouter;