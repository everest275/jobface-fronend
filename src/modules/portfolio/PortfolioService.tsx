import axios from '../../libs/axios'

export interface Portfolio {
    id:string
    portfolio: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}

export interface PullPortfolio {
   
    portfolio: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}
export const portfoliosRequest = async () => {
    const result =  await axios.get(`/profile-portfolios`);
    return result.data
 }

 export const publicGetByIdRequest = async (id:string) => {
   const result =  await axios.get(`/portfolios-public/${id}`);
   return result.data
}
 export const getByIdRequest = async (id:string) => {
    const result =  await axios.get(`/profile-portfolios/${id}`);
    return result.data
 }
export const createRequest = async (user: object) => {
   const result =  await  axios.post(`/profile-portfolios`, user);
   return result.data
}

export const updateRequest = async (id:string,user: object) => {
    const result =  await  axios.put(`/profile-portfolios/${id}`, user);
    return result.data
 }

 export const deleteRequest = async (id: string) => {
    const result =  await  axios.delete(`/profile-portfolios/${id}`);
    return result.data
 }
 


