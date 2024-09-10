import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_AUTHFACE_SERVICE,
    withCredentials:true
})

export default instance