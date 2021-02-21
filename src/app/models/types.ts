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
    value?: number | string;
    employee?: Employee;
    icon: string;
    onlyAdmin?: boolean;
}

export enum StatisticType {
    OLDER_EMPLOYEE = 'Older employee',
    YOUNGER_EMPLOYEE= 'Younger employee',
    AVERAGE_WAGE= 'Average salary among employees',
    HIGHER_WAGE= 'Employee with higher salary',
    LOWER_WAGE= 'Employee with lower salary',
    MOST_COMMON_WAGE= 'Most common salary among employees'
}