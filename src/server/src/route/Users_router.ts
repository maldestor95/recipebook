"use strict"
import express from 'express';
import { scanUsers, User } from "../lib/dynamodb/user"
var router = express.Router();

const areLoginVersionPresent = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const version = req.body.version
    const login = req.params.login_id

    const isBodyAppListInvalid = /""/g.test(JSON.stringify(req.body))

    if (isBodyAppListInvalid) return res.status(404).send(`${req.method} ${req.originalUrl} "with params ${JSON.stringify(req.body)} can't contain empty string (but null is authorised)"`)

    if (version != undefined && login ? true : false) return next()
    return res.status(404).send(`${req.method} ${req.originalUrl} "missing login or version"`)
}

router.route('/')
    .get((req, res) => {
        scanUsers(req.body.start)
            .then(data => res.send(data))
            .catch(err => res.status(500).send(`${req.originalUrl}: error during scan \n${err}`))
    })
router.route('/:login_id')
    .get(async (req, res) => {
        let newUser = new User(req.params.login_id)
        await newUser.get()
            .then(data => {
                if (data.res) res.send(data.res)
                else res.status(404).send(req.originalUrl + " not found")
            })
            .catch(error => {
                res.status(404).send(req.originalUrl + " not found with method GET")
            })
    })
    .post(async (req, res) => {
        let newUser = new User(req.originalUrl.replace(/\//g, ''))
        await newUser.createLogin()
            .catch((err) => res.send(JSON.stringify(err)))
            .then(() => res.send("success"))

    })
    .delete(async (req, res) => {
        let userToDelete = new User(req.params.login_id)
        await userToDelete.deleteLogin()
            .then(data => {
                if (data.err) return res.status(404).send(req.originalUrl + " not found")
                else res.send(data.res)
            })
            .catch(error => {
                res.status(404).send(req.originalUrl + " not found with method DELETE")
            })
    })

router.put('/:login_id/application', areLoginVersionPresent, async (req, res) => {
    let applicationList = { ...req.body.applicationList }
    let newUser = new User(req.params.login_id)
    newUser.version = req.body.version
    const isAppListvalid = /""/g.test(JSON.stringify(applicationList))
    await newUser.updateApplicationList(applicationList)
        .then(data => {
            if (data.err) return res.status(404).send(`${req.method} ${req.originalUrl} "${data.err.message}"`)
            else res.send(data.res)
        })
        .catch(error => {
            res.status(404).send(req.originalUrl + " not found with method PUT")
        })
})
router.put('/:login_id/details', areLoginVersionPresent, async (req, res) => {
    let details = req.body.details
    if (details == undefined) return res.status(404).send(`${req.method} ${req.originalUrl} "YEAH"`)
    let newUser = new User(req.params.login_id)
    newUser.version = req.body.version
    await newUser.updateDetails(details)
        .then(data => {
            if (data.err) return res.status(404).send(`${req.method} ${req.originalUrl} "${data.err.message}"`)
            else res.send(data.res)
        })
        .catch(error => {
            res.status(404).send(req.originalUrl + " not found with method PUT")
        })
})
router.put('/:login_id/pwd', areLoginVersionPresent, async (req, res) => {
    let newPwd = req.body.pwd
    if (!Object.keys(req.body).includes('pwd')) return res.status(404).send(`${req.method} ${req.originalUrl} "invalid password"`)
    let newUser = new User(req.params.login_id)
    newUser.version = req.body.version
    await newUser.updatePwd(newPwd)
        .then(data => {
            if (data.err) return res.status(404).send(`${req.method} ${req.originalUrl} "${data.err.message}"`)
            else res.send(data.res)
        })
        .catch(error => {
            res.status(404).send(req.originalUrl + " not found with method PUT")
        })
})

export =router