import { _application, _role } from "../../lib/definition"
import { Response, Request } from "express"
import sinon, { SinonSpy } from "sinon"

import * as auth from "../auth"
/* checkLevelClearance not unitary tested 
*/
describe("--authentication--", function () {
    const mockRequest = (sessionData?: any): Request => {
        const req: Partial<Request> = {}
        req.session = <Express.Session><unknown>{ passport: sessionData }
        return <Request>req
    };
    const mockResponse = (): Response => {
        const res: Partial<Response> = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res)
        return <Response>res;
    };
    describe("checkAuth", function () {
        it("should 401 if session data is not set", async () => {
            const req = mockRequest()
            const res = mockResponse()
            const next = sinon.spy()
            await auth.checkAuth(req, res, next, _application.Cave);
            sinon.assert.calledWith(res.status as sinon.SinonStub, 401)
            sinon.assert.calledWith(res.send as sinon.SinonStub, 'no active session')
        })
        it("should 401 if session data doesn't have any user", async () => {
            const req = mockRequest({})
            const res = mockResponse()
            const next = sinon.spy()
            await auth.checkAuth(req, res, next, _application.Cave);
            sinon.assert.calledWith(res.status as sinon.SinonStub, 401)
            sinon.assert.calledWith(res.send as sinon.SinonStub, 'not authorised')
        })
        it("should 401 if session data doesn't have useraplication ", async () => {
            const req = mockRequest({ user: {} })
            const res = mockResponse()
            const next = sinon.spy()
            await auth.checkAuth(req, res, next, _application.Cave);
            sinon.assert.calledWith(res.status as sinon.SinonStub, 401)
            sinon.assert.calledWith(res.send as sinon.SinonStub, 'not authorised')
        })
        it("should call next ", async () => {
            const userApp = { 'Cave': 'Viewer' }
            const req = mockRequest({ "user": { "userApplication": userApp } })
            const res = mockResponse()
            const next = sinon.spy()
            await auth.checkAuth(req, res, next, _application.Cave);
            sinon.assert.called(next as SinonSpy)
        })
    })
    describe("isAuthorized", function () {
        it("should be not Authorised", async () => {
            const userApp = { 'Cave': 'Viewer' }
            const req = mockRequest({ "user": { "userApplication": userApp } })
            const res = mockResponse()
            const next = sinon.spy()
            await auth.isAuthorized(req, res, next, _application.Cave, _role.Manager);
            sinon.assert.calledWith(res.status as sinon.SinonStub, 401)
            sinon.assert.calledWith(res.send as sinon.SinonStub, 'not authorised')
        })
        it("should call next ", async () => {
            const userApp = { 'Cave': 'Manager' }
            const req = mockRequest({ "user": { "userApplication": userApp } })
            const res = mockResponse()
            const next = sinon.spy()
            await auth.isAuthorized(req, res, next, _application.Cave, _role.Manager);
            sinon.assert.called(next as SinonSpy)
        })
    })

})

