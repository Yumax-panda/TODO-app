export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // hashed password
    createdAt: Date;
}

export interface UserPayload {
    name: string;
    email: string;
    password: string; // plain text password
}

export interface UserCredentials {
    id: number;
    password: string; // plain text password
}
