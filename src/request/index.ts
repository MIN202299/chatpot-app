import axios from "axios";


export const chatApi = axios.create({
  baseURL: 'http://66.42.58.122/api/chat',
  timeout: 100000
})

chatApi.interceptors.request.use(function(config) {
  return config
})

chatApi.interceptors.response.use(function(response) {
  return response.data
})
