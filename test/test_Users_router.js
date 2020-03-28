var assert = require("chai").assert;
var axios = require("axios")

const baseURL = "http://localhost:3000"
describe("test loop array", function () {
    let looptest = [

        {
            description: 'Scan USers',
            url: baseURL + "/API/Users/new",
            method: 'get',
            valid: "ongoing"
        },
        {
            description: 'new user',
            url: baseURL + "/API/Users/new",
            method: 'post',
            valid: {
                a: 1,
                b: 2
            }
        },
        {
            description: 'get user',
            url: baseURL + "/API/Users/l123",
            method: 'get',
            valid: "ongoing"
        },
        {
            description: 'update user',
            url: baseURL + "/API/Users/l123",
            method: 'put',
            valid: "ongoing"
        },
        {
            description: 'delete user',
            url: baseURL + "/API/Users/l123",
            method: 'delete',
            valid: "ongoing"
        }
    ]

    looptest.forEach(test=>AxiosQuery(test))
})

function AxiosQuery(test) {
    it(`${test.description} - ${test.method} - ${test.url} - `, done => {
        axios({
                method: test.method,
                url: test.url,
            })
            .then((response) => {
                assert.equal(response.status, 200, "Query received");
                if (typeof (test.valid) == 'string') {
                    assert.equal(response.data, test.valid, "Query received");
                    done();
                } else {
                    for (let [key, value] of Object.entries(test.valid)) {
                        assert.isTrue(Object.keys(response.data).includes(key), `[${test.method} Failed]  ---- missing key ${key} in response`);
                        assert.equal(response.data[key], value, `[${test.method} Failed]  ---- expected equality on ${key} to be ${value}`);
                    }
                    console.log(response.data);
                    done();
                }
            })
            .catch((response) => {
                assert.notEqual(response.response.status, 503, "Not implemented yet");
                assert.notEqual(response.message, "Request failed with status code 503", "Not implemented yet");
                console.log(JSON.stringify(response.message));
                done();
            });
    });
}