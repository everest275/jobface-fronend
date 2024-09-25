import axios from '../libs/axios'

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

export const registerRequest = async (user: object) => {
   const result =  await  axios.post(`/register`, user);
   return result.data
}

export const loginRequest = async (user: object) => {
   const result =  await  axios.post(`/login`, user);
   return result.data
}


export const verifyTokenRequest = async () => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/verify`);
    return result.data;
}

export const verifyEmailRequest = async (email:string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.post(`/verify-email`,{email:email});
    return result.data;
}