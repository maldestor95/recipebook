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
class Manager {
    /**
     * Create a manager
     * @param {Array} list - list of possible options
     */
    constructor(list) {
        this.OptionList = list
        this.Option = []
    }
    /**
     * add one role if possible
     * @param {role} role 
     * @returns {string} - null if no error; "unknown" if fail
     */
    add(role) {
        if (this.OptionList.includes(role)) {
            this.Option.push(role)
            return null
        } else {
            return ("unknown")
        }
    }
    
    /**
     * delete one role if possible
     * @param {role} role 
     * @returns {string} - null if no error; "unknown" if fail
     */
    delete(role) {
        if (this.OptionList.includes(role)) {
            this.Option = this.Option.filter((rr) => {
                return rr != role
            })
            return null
        } else {
            return ("unknown")
        }
        
    }
    /**
     * return the current possible roles
     */
    list() {
        return this.Option
    }
}
/**
 * class managing Roles corresponding to autrhorisation user
 * @extends Manager
 */
class RoleClass extends Manager {
    constructor() {
        super(['Root', 'Manager', 'Editor', 'Viewer'])
        this.role = this.option
    }
}
/**
 * class managing groups corresponding to functionality of the application
 * @extends Manager
 */
class GroupClass extends Manager {
    constructor() {
        super(['Users', 'Todo', 'Expenses'])
        this.group = this.option
    }
}

var self = (module.exports = {
    RoleClass,
    GroupClass
})