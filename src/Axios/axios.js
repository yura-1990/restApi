import axios from "axios";

export const newAxios = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
    headers: {'X-Custom-Header': 'foobar'}
})