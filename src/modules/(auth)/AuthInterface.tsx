export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    user_name: string;
    name: string;
    email: string;
    gender: string;
    birth: Date;
    password: string;
    user_membership: "459f7abe-8f3b-49e4-9afd-748fcb962351",
    user_state: "6b17756c-c1da-4636-821e-4b98ed59c02f",
    pass:string
}

export interface User {
    id: string;
    user_name: string;
    name: string;
    email: string;
    gender: string;
    birth: Date;
    user_membership: string,
    user_state: string,
}

export interface AuthRoutes{
    SIGNIN:string,
    SIGNUP:string,
    VERIFY:string,
    VERIFY_EMAIL:string
}