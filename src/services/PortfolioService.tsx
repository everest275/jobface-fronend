import axios from '../libs/axios'

export interface Portfolio {
    id:string
    portfolio_user: string;
    portfolio_type: string;
    portfolio_style: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}

export interface PullPortfolio {
   
    portfolio_type: string;
    portfolio_style: string;
    name:string;
    title: string;
    description: string;
    about: string;
    country: string;
    city: string,
    portfolio_state: string
}
export const portfoliosRequest = async () => {
    const result =  await axios.get(`/portfolios`);
    return result.data
 }

 export const publicGetByIdRequest = async (id:string) => {
   const result =  await axios.get(`/portfolios-public/${id}`);
   return result.data
}
 export const getByIdRequest = async (id:string) => {
    const result =  await axios.get(`/portfolios/${id}`);
    return result.data
 }
export const createRequest = async (user: object) => {
   const result =  await  axios.post(`/portfolios`, user);
   return result.data
}

export const updateRequest = async (id:string,user: object) => {
    const result =  await  axios.put(`/portfolios/${id}`, user);
    return result.data
 }

 export const deleteRequest = async (id: string) => {
    const result =  await  axios.delete(`/portfolios/${id}`);
    return result.data
 }
 


