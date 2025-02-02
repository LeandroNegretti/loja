import axios from "axios";

const API_URL = "http://localhost:3002/api/produtos";

const api = {
  getProdutos: () => axios.get(API_URL),
  getProdutoById: (id) => axios.get(`${API_URL}/${id}`),
  createProduto: (data) => axios.post(API_URL, data),
  updateProduto: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteProduto: (id) => axios.delete(`${API_URL}/${id}`),
};

export default api;
