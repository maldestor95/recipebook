

export const _role = {
    Root: 'Root',
    Manager: 'Manager',
    Editor: 'Editor',
    Viewer: 'Viewer'
}
export const _application ={
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

export const AWSconfigS3=
{
    region: "eu-west-3",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }
}
