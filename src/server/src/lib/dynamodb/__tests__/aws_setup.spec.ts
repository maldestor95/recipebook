import {serviceConfigOptions} from '../aws_setup'

var expect = require("chai").expect;

describe('Check aws setup config',()=>{
    it('serviceConfigOptions shall be configured local',()=>{
        process.env.NODE_ENV='development'        
        const testService=serviceConfigOptions()
        // console.log(testService)
        expect(Object.keys(testService)).to.include('endpoint')
        expect(testService.endpoint).to.eq('http://localhost:8000')
    })
    it('serviceConfigOptions shall no be configured local',()=>{
        process.env.NODE_ENV='test'        
        const testService=serviceConfigOptions()
        // console.log(testService)
        expect(Object.keys(testService)).to.not.include('endpoint')
    })
})