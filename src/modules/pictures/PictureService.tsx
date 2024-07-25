import axios from '../../libs/axios'

export interface PortfolioPicture {
    id: string;
    portfolio: string;
    picture_data: string;
    picture_state: string,
}
export interface PullPortfolioPicture {
    portfolio: string;
    picture_data: string;
    picture_state: string,
}

export interface ProyectPicture {
    id: string;
    proyect: string;
    picture_data: string;
    picture_state: string,
}
export interface PullProyectPicture {
    proyect: string;
    picture_data: string;
    picture_state: string,
}

//PORTFOLIO REQUESTS
export const uploadRequest = async (picture: object) => {
    const result = await axios.post(`/portfolio-pictures`, picture);
    return result
}


export const changeRequest = async (id: string, picture: object) => {
    const result = await axios.put(`/portfolio-pictures/${id}`, picture);
    return result
}


export const deleteRequest = async (id: string) => {
    const result = await axios.delete(`/portfolio-pictures/${id}`);
    return result.data;
}

export const getByIdRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-pictures/${id}`);
    return result.data;
}

export const getByPortfolioIdRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-picture/${id}`);
    return result.data;
}
export const getByPortfolioIdPublicRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-picture-public/${id}`);
    return result.data;
}

export const portfolioPicturesRequest = async () => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-pictures`);
    return result.data;
}








//PROYECTS REQUESTS
export const uploadProyectPictureRequest = async (picture: object) => {
    const result = await axios.post(`/portfolio-pictures`, picture);
    return result
}

export const getProyectPictureByIdRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-pictures/${id}`);
    return result.data;
}

export const changeProyectPictureRequest = async (id: string, picture: object) => {
    const result = await axios.put(`/portfolio-pictures/${id}`, picture);
    return result
}

export const deleteProyectPictureRequest = async (id: string) => {
    const result = await axios.delete(`/portfolio-pictures/${id}`);
    return result.data;
}

export const getByIdProyectPictureRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-pictures/${id}`);
    return result.data;
}

export const getByProyectIdRequest = async (id: string) => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-picture/${id}`);
    return result.data;
}


export const proyectPicturesRequest = async () => { // Ajustar tipo de retorno según sea necesario
    const result = await axios.get(`/portfolio-pictures`);
    return result.data;
}