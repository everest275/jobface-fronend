import axios from '../libs/axios'

export interface Proyect {
    id: string
    portfolio: string;
    title: string;
    position: string;
    description: string;
    proyect_state: string
}

export interface PullProyect {
    portfolio: string;
    title: string;
    position: string;
    description: string;
    proyect_state: string
}
export const portfolioProyectsRequest = async () => {
    const result = await axios.get(`/portfolio-proyects`);
    return result.data
}
export const getByIdRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-proyects/${id}`);
    return result.data
}
export const createRequest = async (user: object) => {
    const result = await axios.post(`/portfolio-proyects`, user);
    return result.data
}

export const updateRequest = async (id: string, user: object) => {
    const result = await axios.put(`/portfolio-proyects/${id}`, user);
    return result.data
}

export const deleteRequest = async (id: string) => {
    const result = await axios.delete(`/portfolio-proyects/${id}`);
    return result.data
}

export const publlicGetProyectsByPortfolioRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-proyects-public/${id}`);
    return result.data
}
export const getPortfolioProyectsCounterRequest = async (id: string) => {
    const result = await axios.get(`/portfolio-proyects-counter/${id}`);
    return result.data
}



