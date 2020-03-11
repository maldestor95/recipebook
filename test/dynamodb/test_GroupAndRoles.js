var assert = require("chai").assert;
let CRole = require('../../lib/dynamodb/GroupAndRoles')
describe("GroupAndRoles", function () {
    describe("Roles", function () {
        it("shall add", done => {
            let r = new CRole.RoleClass()
            res = r.add('Root')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Root'], "[message]");
            res = r.add('KO')
            assert.equal(res, "unknown", "[unknown role]");
            assert.deepEqual(r.list(), ['Root'], "[message]");
            res = r.add('Manager')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Root', 'Manager'], "[message]");
            done()
        })
        it.skip("shall delete", done => {
            let r = new CRole.RoleClass()
            res = r.add('Root')
            res = r.add('Manager')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Root', 'Manager'], "[message]");
            res = r.delete('Manager')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Root'], "[message]");
            res = r.delete('KO')
            assert.equal(res, "unknown role", "[message]");
            assert.deepEqual(r.list(), ['Root'], "[message]");
            done()
        })
    })
    describe("Group", function () {
        it("shall add", done => {
            let r = new CRole.GroupClass()
            res = r.add('Users')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Users'], "[message]");
            res = r.add('KO')
            assert.equal(res, "unknown", "[unknown]");
            assert.deepEqual(r.list(), ['Users'], "[message]");
            res = r.add('Todo')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Users', 'Todo'], "[message]");
            done()
        })
        it("shall delete", done => {
            let r = new CRole.GroupClass()
            res = r.add('Users')
            res = r.add('Todo')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Users', 'Todo'], "[message]");
            res = r.delete('Todo')
            assert.isNull(res, "[message]");
            assert.deepEqual(r.list(), ['Users'], "[message]");
            res = r.delete('KO')
            assert.equal(res, "unknown", "[message]");
            assert.deepEqual(r.list(), ['Users'], "[message]");
            done()
        })
    })
})