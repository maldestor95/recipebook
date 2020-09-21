"use strict"
import express from 'express';
// var User = require('../lib/dynamodb/user').User
import { scanUsers, User } from "../lib/dynamodb/user"
var router = express.Router();
var validate = require("validate.js");
var qs = require("qs")
const auth = require('./auth')
const validLogin = { login: { presence: true, type: "string" } }
// TODO update middleware
// router.use('/users',(req, res, next)=> { auth.checkAuth(req,res,next,'Users') });
router.get('/lui', (req, res) => {
    res.send('lui bien reçu')
})

router.route('/:login_id')
    .get(async (req, res) => {
        let newUser = new User(req.params.login_id)
        await newUser.get(req.params.login_id)
            .then(data => {
                res.send(data)
            })
            .catch(error => {
                res.status(404).send(req.originalUrl + " not found")
            })
    })
    .post(async (req, res) => {
        // if (!validate(req.body, validLogin)) {
        let newUser = new User(req.originalUrl.replace(/\//g,''))
        await newUser.createLogin()
            .catch((err) => res.send(JSON.stringify(err)))
            .then(() => res.send("success"))
        // } else {
        //     res.send("bad login")
        // }
    })
    .delete(async (req, res) => {
        let newUser = new User(req.params.login_id)
        await newUser.deleteLogin()
            .then(data => {
                res.send(`success`)
            })
            .catch(error => {
                res.send(error)
            })
    })

router.route('/:login_id/application')
    .put(async (req, res) => {
        let details = req.body
        let parsedDetails = qs.parse((details))
        let newUser = new User(req.params.login_id)
        //TODO gerer la version et le constructor à parametrer
        await newUser.updateApplicationList(parsedDetails)
            .then(data => { })
            .catch(error => { })
    })
router.route('/:login_id/details')
    .put(async (req, res) => {
        let details = req.body
        let parsedDetails = qs.parse((details))
        let newUser = new User(req.params.login_id)
        //TODO gerer la version et le constructor à parametrer
        newUser.login = req.params.login_id
        await newUser.updateDetails(parsedDetails)
            .then(data => { })
            .catch(error => { })
    })

router.route('/:login_id/pwd')
    .put(async (req, res) => {
        let details = req.body
        let parsedDetails = qs.parse((details))
        let newUser = new User(req.params.login_id)
        //TODO gerer la version et le constructor à parametrer
        await newUser.updatePwd(parsedDetails)
            .then(data => { })
            .catch(error => { })
    })
/* TODO
router.route('/users')
    .get(async (req, res) => {
        let userList = await scanUsers.scanUsers()
        res.send(userList)
    })
    .post(async (req, res) => {
        let idToStartFrom: string = qs.parse((req.body))
        //TODO gerer la version et le constructor à parametrer
        let userList = await scanUsers.scanUsers(idToStartFrom)
        res.send(userList)
    })
*/
export default {
    router
}