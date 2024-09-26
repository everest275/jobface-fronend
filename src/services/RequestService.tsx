import axios from '../libs/axios'

export const getRequest = async (route: string,id?:string) => {
    const result = await axios.get(`${route}${id?`/${id}`:""}`);
    return result.data
}

export const postRequest = async (route: string, user: object) => {
    const result = await axios.post(route, user);
    return result.data
}

export const putRequest = async (route: string, id: string, user: object) => {
    const result = await axios.put(`${route}/${id}`, user);
    return result.data
}

export const deleteRequest = async (route:string,id: string) => {
    const result = await axios.delete(`${route}/${id}`);
    return result.data
}

