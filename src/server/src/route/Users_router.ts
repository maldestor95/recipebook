"use strict"
import express from 'express';
import { scanUsers, User } from "../lib/dynamodb/user"
import { body, oneOf, validationResult } from "express-validator"
import { _role, _application } from "../lib/definition"
import { isAuthorized } from "./auth"
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
    .post(
        (req, res, next) => { isAuthorized(req, res, next, _application.Users, _role.Editor) },
        async (req, res) => {
            let newUser = new User(req.path.replace(/\//g, ''))
            await newUser.createLogin()
            .then(() => res.send("success"))
            .catch((err) => res.send(JSON.stringify(err)))

        })
    .delete(
        (req, res, next) => { isAuthorized(req, res, next, _application.Users, _role.Manager) },
        async (req, res) => {
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

router.put('/:login_id/application',
    (req: express.Request, res: express.Response, next: express.NextFunction) => { isAuthorized(req, res, next, _application.Users, _role.Editor) },
    //validation
    [body("version").isNumeric(),
    body("applicationList").custom(v => Object.keys(v).length > 0).bail()
        .custom(appList => {
            const isAppIn_application = Object.keys(appList).filter(appName => {
                return Object.values(_application).includes(<_application>appName)
            })
            return isAppIn_application.length != 0
        }).bail()
        .custom(appList => {
            const isRoleIn_role = Object.values(appList).filter(appRole => {
                return Object.values(_role).includes(<_role>appRole)
            })
            return isRoleIn_role.length != 0
        }),
    ]
    , async (req: express.Request, res: express.Response) => {
        console.log('ciic');
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send("error in params, body or cookie")
        }

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
router.put('/:login_id/details',
    (req: express.Request, res: express.Response, next: express.NextFunction) => { isAuthorized(req, res, next, _application.Users, _role.Editor) },
    //validation
    [body("version").isNumeric(),
    oneOf([
        body("details.address").isString().isLength({ min: 1 }),
        body("details.email").isString().isLength({ min: 1 }),
        body("details.phone").isString().isLength({ min: 1 })
    ])
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(JSON.stringify(errors.array(),null,2));
            return res.status(400).send("error in params, body or cookie")
        }

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
router.put('/:login_id/pwd',
    (req: express.Request, res: express.Response, next: express.NextFunction) => { isAuthorized(req, res, next, _application.Users, _role.Editor) },
    //validation
    [
        body("pwd").isString().isLength({ min: 1 }),
        body("version").isNumeric()
    ]
    , async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send("error in params, body or cookie")

        let newUser = new User(req.params.login_id)
        newUser.version = req.body.version
        await newUser.updatePwd(req.body.pwd)
            .then(data => {
                if (data.err) return res.status(404).send(`${req.method} ${req.originalUrl} "${data.err.message}"`)
                else res.send(data.res)
            })
            .catch(error => {
                // console.log(error.err ? error.err.message : 'noError')
                if (error.err.message == "The conditional request failed") res.status(400).send("invalid params")
                else res.status(404).send(req.originalUrl + " not found with method PUT")
            })
    })

export =router