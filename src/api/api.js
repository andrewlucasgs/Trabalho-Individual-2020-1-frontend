import axios from 'axios'

const base = 'http://localhost:3000/api/v1'

const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || base
})

export default API
