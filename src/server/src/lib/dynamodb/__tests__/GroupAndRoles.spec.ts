// const GroupAndRole = require('../GroupAndRoles');
const { RoleClass, GroupClass, Manager } = require('../GroupAndRoles');
const constants = require('../../definition')
var expect = require("chai").expect;
describe("Manager", function () {
    it("shall test constructor", done => {
        const testList = null
        let mger = new Manager(testList)
        expect(mger.OptionList).to.eq(null)
        expect(mger.Option).to.deep.eq([])

        const testList2 = [1, 2, 3]
        mger = new Manager(testList2)
        expect(mger.OptionList).to.eq(testList2)
        expect(mger.Option).to.deep.eq([])
        done()
    })
    it("shall add role", done => {
        let testList = [1, 2, 3]
        let res
        let mger = new Manager(testList)
        res = mger.add(1)
        expect(mger.Option).to.deep.eq([1])
        expect(res).to.deep.eq(null)

        res = mger.add(4)
        expect(mger.Option).to.deep.eq([1])
        expect(res).to.deep.eq("unknown")

        testList = []
        mger = new Manager(testList)
        res = mger.add(1)
        expect(mger.Option).to.deep.eq([])
        done()
    })
    let testData=[null,undefined]
    testData.forEach(data => {
        it(`shall check if role is valid for the dataset ${data}`, done => {
            const mger = new Manager(data)
            expect(mger.isvalid(1)).to.eq(false)
            done()
        })
        it(`shall return unknown for deletion for the dataset ${data}`, done => {
            const mger = new Manager(data)
            expect(mger.delete(1)).to.eq("unknown")
            expect(mger.delete(null)).to.eq("unknown")
            expect(mger.delete(undefined)).to.eq("unknown")
            done()
        })
    });
    const data=[1,2,3]
    it(`shall check if role is valid for the dataset ${data}`, done => {
        const mger = new Manager(data)
        expect(mger.isvalid(1)).to.eq(true)
        expect(mger.isvalid(4)).to.eq(false)
        expect(mger.isvalid(undefined)).to.eq(false)
        expect(mger.isvalid(null)).to.eq(false)
        done()
    })
    it(`shall delete and check list for the dataset ${data}`, done => {
        const mger = new Manager(data)
        mger.add(1)
        mger.add(2)
        mger.add(3)
        expect(mger.delete(1)).to.eq(null)
        expect(mger.list()).to.deep.eq([2,3])
        expect(mger.delete(null)).to.eq("unknown")
        expect(mger.delete(undefined)).to.eq("unknown")
        done()
    })
})

describe("GroupClass and RoleClass", function () {
    it("shall construct RoleClass", done => {
        let rc= new RoleClass()
        rc.add(constants._role.Root)
        rc.add(constants._role.Editor)
        expect(rc.list()).deep.eq([constants._role.Root,constants._role.Editor])
        expect(rc.roleList).deep.eq([constants._role.Root,constants._role.Editor])
        done()
    })
    it("shall construct GroupClass", done => {
        let rc= new GroupClass()
        rc.add(constants._application.User)
        rc.add(constants._application.Todo)
        expect(rc.list()).deep.eq([constants._application.User,constants._application.Todo])
        expect(rc.groupList).deep.eq([constants._application.User,constants._application.Todo])
        done()
    })
})