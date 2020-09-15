import * as enumDef from '../definition'

var expect = require("chai").expect;

describe('Check definition for dynamoDB',()=>{
    it('applicationList',()=>{
        let testList:enumDef.AppList={}

        testList={Users:"Manager",Cave:"Viewer"}
        testList.Vin="Editor"
        delete testList.Cave
        expect(testList).to.deep.equal({Users:"Manager",Vin:"Editor"})


    })
})