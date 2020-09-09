/**
 * TList is a object where the keys are listed in the enum _application and the value are listed in the enum _role
 * 
 * definition
 * const myVar:Tlist={}
 * 
 * Access to the variable
 * myVar.User=_role.Root
 * 
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