export interface RegisterUser{
    UserName:string;
    Email:string;
    Password:string;
}

export interface LoginUser{
    Email?:string;
    Password?:string;
}

export interface LoginResponse{
    email:string,
    token:string
}