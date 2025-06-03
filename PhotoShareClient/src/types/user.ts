export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createAt: Date,
    lastLogin: Date,
    status: boolean,
    id?: number,
    countUpload?: number,
    role?: Role,
}

export interface Role {
    id: number,
    name: string,
    description: string
}

export interface UserLogin {
    email: string,
    password: string
}
