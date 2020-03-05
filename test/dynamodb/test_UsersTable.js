/**
 * Copyright © 2020, Maldestor
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
 * The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties
 *  of merchantability, fitness for a particular purpose and noninfringement. 
 * In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, 
 * whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or 
 * other dealings in the Software. 
 * Except as contained in this notice, the name of Maldestor shall not be used in advertising or otherwise to promote the sale,
 * use or other dealings in this Software without prior written authorization from Maldestor.
 */
"use strict"
var assert = require("chai").assert;
var Users = require('../../lib/dynamodb/UsersTable')
let U = new Users.User()
let initTable = async function () {
    U.create_userTable((err, data) => {
        if (err) {
            console.log(err)
        }
    })
}
describe("Users", function () {
    // before(function (done) {
    describe("Init ", function () {
        it("create a User table", (done) => {
            U.create_userTable(
                (err, data) => {
                    assert.isNull(err);
                    done()
                })
        })
    })
    // })

    describe("Add", function () {
        it("Scan 0 Users", (done) => {

            U.scanUser((err, data) => {
                assert.isNumber(data.Count, "shall find a number of items");
                assert.equal(data.Count, 0, "shall be an empty table");
                console.log(`there is ${data.Count} users`)
                done()
            })
        })
        it("shall add 3 users", (done) => {

            let items = [{
                    "login": "alpha1",
                    "pwd": "pwd1a"
                },
                {
                    "login": "alpha2",
                    "pwd": "pwd2"
                }, {
                    "login": "alpha3",
                    "pwd": "pwd3"
                }
            ]
            let AddItstatus = function (item) {
                return new Promise(function (resolve, reject) {
                    U.addUser(item, (e, d) => {
                        if (!e) {
                            resolve({
                                "err": e,
                                "data": d
                            })
                        } else {
                            reject(e)
                        }
                    });
                });
            }
            Promise.all([AddItstatus(items[0]), AddItstatus(items[1]), AddItstatus(items[2])])
                .then(([v1, v2, v3]) => {
                    assert.isNull(v1.err, "[message]");
                    assert.isNull(v2.err, "[message]");
                    assert.isNull(v3.err, "[message]");
                    done()
                })
                .catch((msg) => {
                    console.log(msg)
                    done()

                })

        });

        it("shall find 3 Users", (done) => {
            U.scanUser((err, data) => {
                assert.equal(data.Count, 3);
                console.log(`there is ${data.Count} users`)
                console.log(JSON.stringify(data.Items))
                done()
            })
        })
        // });
        it("shall reject adding existing user", (done) => {

            let items = [{
                "login": "alpha1",
                "pwd": "pwd1bis"
            }]
            let AddItstatus = function (item) {
                return new Promise(function (resolve, reject) {
                    U.addUser(item, (e, d) => {
                        if (!e) {
                            resolve({
                                "err": e,
                                "data": d
                            })
                        } else {
                            reject(e)
                        }
                    });
                });
            }
            Promise.all([AddItstatus(items[0])])
                .then(([v1]) => {
                    assert.isNull(v1.err, "[message]");
                    U.scanUser((err, data) => {
                        assert.equal(data.Count, 3);
                        console.log(`there is ${data.Count} users`)
                        console.log(JSON.stringify(data.Items))
                        console.log(`there is ${data.Count} users*********`)
                        done()
                        // done()
                    })
                })
                .catch((msg) => {
                    console.log(msg)
                    done()

                })

        });

        describe("get by login", function () {
            it("shall pass get User alpha1 by login", () => {

                U.getUserByLogin("alpha1", (err, data) => {
                    assert.isNull(err, "Not able to find alpha1");
                    assert.equal(data.login, "alpha1", "succesfull finding alpha1");

                })
            })
            it("shall fail find unknown User alpha8", () => {

                U.getUserByLogin("alpha8", (err, data) => {
                    assert.equal(Object.keys(data).length, 0, "Not able to find alpha8");

                })
            })
        });
    })
    describe("Update", function () {
        it("shall pass updating existing user", (done) => {

            U.addUser({
                login: "adduser1",
                pwd: "addpwduser1"
            }, (err, data) => {
                assert.isNull(err, "successful addition of user1");
                U.getUserByLogin("adduser1", (err, data) => {
                    console.log(err, data)
                    assert.equal(data.pwd, "addpwduser1", "manage to load user1")
                    U.updateUser({
                        login: "adduser1",
                        pwd: "123"
                    }, (err2, data2) => {
                        U.getUserByLogin("adduser1", (err3, data3) => {
                            console.log(err3, data3)

                            assert.equal(data3.pwd, "123", "manage to load user1")
                            done()

                        })
                    })
                })
            })
        })
        it.skip("shall fail updating unknown user", () => {

        })
    });
    describe("Delete", function () {
        it("shall pass deleting existing user", (done) => {
            let item = {
                login: "alpha10",
                pwd: "pwd10"
            }
            U.addUser(item, (err, data) => {
                U.scanUser((err, data) => {
                    U.deleteUser(item, (err, data) => {
                        U.scanUser((err, data) => {
                            assert.equal(data.Count, 3);
                            done()
                        })
                    })
                })
            })
        });
        it("shall fail deleting unknown user", () => {
            let item = {
                login: "noone",
            }
            U.deleteUser(item, (err, data) => {
                assert.notEqual(err, null, "Shall get an error message when deleting a non-existent log");
                done()
            })
        })
    });
    describe("End", function () {
        // after(function (done) {
        it("shall delete a table", (done) => {

            U.delete_userTable((err, data) => {
                assert.isNull(err, "[message]");
                done()
            })
            // })
        })
    })
})