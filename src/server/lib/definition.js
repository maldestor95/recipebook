const _role = {
    Root: 'Root',
    Manager: 'Manager',
    Editor: 'Editor',
    Viewer: 'Viewer'
}
const _application ={
    User:'Users',
    Todo: 'Todo',
    Expenses: 'Expenses',
    Recettes: 'Recettes'
}

const _errorMessage = {
    MissingRequiredParam:"Missing required parameter",
    InvalidParam:"Invalid parameter"
}

var self = (module.exports = {
    _role,
    _application,
    _errorMessage
})