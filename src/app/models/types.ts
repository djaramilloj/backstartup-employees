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

export interface Employee {
    id?: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
    profile_image: string;
}

export interface Statistic {
    name: string;
    value: number | string;
    nameEmployee?: string;
}