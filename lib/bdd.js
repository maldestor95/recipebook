"use strict";
class bdd {
    constructor() {

    }
    add(item) {
        console.log(item)
    }
}

// class expensebdd extends bdd {
class expensebdd {
    constructor(foo) {
        // super(bdd)
        this.foo = foo
    }
    bar() {
        console.log(this.foo)
    }
}

let t = new expensebdd()
t.add("toto")
let u = new expensebdd("lala")
u.add("foo?")
u.bar()

expensebdd.prototype.list = function () {
    this.add('proto')
}

u.list()