import axios from '../../../libs/axios'

export interface PortfolioAbilitie {
    id: string
    abilitie_type: string;
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface AllPortfolioAbilitie {
    id: string
    abilitie_type: {
        type: string,
        type_value: string,
        state: string
    };
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface PullPortfolioAbilitie {
    abilitie_type: string;
    portfolio: string;
    comment: string;
    abilitie_state: string;
}

export interface PortfolioAbilitieType {
    id: string;
    type: string;
    type_value: string;
}

export const portfolioAbilitiesRequest = async () => {
    const result = await axios.get(`/portfolio-abilities`);
    return result.data
}

export const portfolioAbilitieTypesRequest = async () => {
    const result = await axios.get(`/portfolio-abilitie-types`);
    return result.data
}

export const getByIdRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-abilitie/${id}`);
    console.log(result)
    return result.data
}
export const createRequest = async (user: object) => {
    const result = await axios.post(`/portfolio-abilities`, user);
    return result.data
}

export const updateRequest = async (id: string, user: object) => {
    const result = await axios.put(`/portfolio-abilities/${id}`, user);
    return result.data
}

export const deleteRequest = async (id: string) => {
    const result = await axios.delete(`/portfolio-abilities/${id}`);
    return result.data
}

export const publlicGetAbilitiesByPortfolioRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-abilities-public/${id}`);
    return result.data
}



