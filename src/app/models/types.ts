export interface LoginForm {
    email: string;
    password: string;
}

export interface User extends LoginForm {
    name: string;
    admin: boolean;
}

export interface SuccessLoginResponse {
    error: boolean;
    message: string;
    data: User;
}