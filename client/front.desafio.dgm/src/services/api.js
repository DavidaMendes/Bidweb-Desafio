import axios from "axios"

const API_BASE_URL = "http://localhost:8080" 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post("/auth/cadastro", userData)
    return response.data
  },
}

export const salesService = {
  getAll: async () => {
    const response = await api.get("/vendas")
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/vendas/${id}`)
    return response.data
  },

  create: async (saleData) => {
    const response = await api.post("/vendas", saleData)
    return response.data
  },

  update: async (id, saleData) => {
    const response = await api.put(`/vendas/${id}`, saleData)
    return response.data
  },

  delete: async (id) => {
    await api.delete(`/vendas/${id}`)
  },
}

export default api
