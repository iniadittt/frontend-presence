export interface LoginRequest {
    email: string;
    password: string;
};

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
};

export interface User {
    id: number;
    email: string;
    name: string;
    phone: string;
    token: string;
    otp: string;
    active: boolean
    role: string;
}