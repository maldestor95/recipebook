

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
    Recettes: 'Recettes',
    Fournisseur : 'fournisseur',
    Cave : 'cave',
    Dev : 'dev',
    Vin : 'vin'
}

const _errorMessage = {
    MissingRequiredParam:"Missing required parameter",
    InvalidParam:"Invalid parameter"
}

const AWSconfigS3=
{
    region: "eu-west-3",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }
}

var self = (module.exports = {
    _role,
    _application,
    _errorMessage,
    AWSconfigS3
})