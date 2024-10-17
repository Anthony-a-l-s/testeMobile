import axios from "axios";


const api = axios.create({
    baseURL: 'http://192.168.100.14:3307'
})

export default api;