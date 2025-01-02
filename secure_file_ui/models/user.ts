export interface UserSaveRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface User extends UserSaveRequest {
    id: number;
}