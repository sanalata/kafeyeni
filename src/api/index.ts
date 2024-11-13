import axios from 'axios';

const API_URL = 'https://if0_37485236.infinityfree.com/db.php';

export const api = {
  // Auth
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth`, { username, password });
    return response.data;
  },

  // Users
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  addUser: async (userData: any) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  },

  updateUserCredits: async (userId: string, amount: number) => {
    const response = await axios.put(`${API_URL}/users`, { userId, amount });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axios.delete(`${API_URL}/users?id=${id}`);
    return response.data;
  },

  // Products
  getProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  addProduct: async (productData: any) => {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  },

  updateProduct: async (productData: any) => {
    const response = await axios.put(`${API_URL}/products`, productData);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await axios.delete(`${API_URL}/products?id=${id}`);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },

  addCategory: async (categoryData: any) => {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data;
  },

  updateCategory: async (categoryData: any) => {
    const response = await axios.put(`${API_URL}/categories`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await axios.delete(`${API_URL}/categories?id=${id}`);
    return response.data;
  },

  // Orders
  getOrders: async () => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  },

  placeOrder: async (orderData: any) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await axios.put(`${API_URL}/orders`, { orderId, status });
    return response.data;
  }
};