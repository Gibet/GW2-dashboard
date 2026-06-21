import { STORAGE_KEY } from './variables';
import axios from "axios";

const API = axios.create({
  baseURL: "https://api.guildwars2.com/v2/",
})

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem(STORAGE_KEY)
    if (token) {
      config.params = config.params || {}
      config.params.access_token = token      
    } else {
      delete config.headers.Authorization
    } return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default API