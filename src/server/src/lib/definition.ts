/**
 * Applist is an object {'Users':'Manager','Recettes':'Editor' ....}
 */
export type AppList=Partial<Record<keyof typeof _application,keyof typeof _role>>

export enum  _role  {
    Root= 'Root',
    Manager= 'Manager',
    Editor= 'Editor',
    Viewer= 'Viewer'
}
export enum _application {
    Users='Users',
    Todo= 'Todo',
    Expenses= 'Expenses',
    Recettes= 'Recettes',
    Fournisseur = 'Fournisseur',
    Cave = 'Cave',
    Dev = 'Dev',
    Vin = 'Vin'
}

export enum _errorMessage  {
    MissingRequiredParam="Missing required parameter" ,
    InvalidParam="Invalid parameter"
}

export const AWSconfigS3=
{
    region: "eu-west-3",
    maxRetries: 1,
    httpOptions: {
        timeout: 1000
    }
}
export default {
    _errorMessage,
    _application,
    _role,
    AWSconfigS3
}