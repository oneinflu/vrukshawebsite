import axios from 'axios';

const API_BASE_URL = 'https://clownfish-app-d64w7.ondigitalocean.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (userData: { name: string; email: string; password: string; phone: string }) => 
    api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getAddresses: () => api.get('/auth/address'),
  addAddress: (addressData: { address: string; city: string; state: string; pincode: string }) => 
    api.post('/auth/address', addressData),
  updateAddress: (addressId: string, addressData: { address: string; city: string; state: string; pincode: string }) => 
    api.put(`/auth/address/${addressId}`, addressData),
  deleteAddress: (addressId: string) => api.delete(`/auth/address/${addressId}`),
};

// Categories APIs
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
};

// Products APIs
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (categoryId: string) => api.get(`/products/category/${categoryId}`),
};

// Cart APIs
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId: string, quantity: number, variationIndex: number = 0) => 
    api.post('/cart/add', { productId, variationIndex, quantity }),
  updateCartItem: (itemId: string, quantity: number) => 
    api.put('/cart/update', { itemId, quantity }),
  removeCartItem: (itemId: string) => api.delete(`/cart/item/${itemId}`),
};

// Orders APIs
export const ordersAPI = {
  createOrder: (orderData: { addressId: string; isRecurring: boolean; startDate?: string }) => 
    api.post('/orders/create', orderData),
  getUserOrders: () => api.get('/orders/my-orders'),
  getOrderById: (orderId: string) => api.get(`/orders/${orderId}`),
};

// Sliders APIs
export const slidersAPI = {
  getAll: () => api.get('/sliders'),
  getById: (id: string) => api.get(`/sliders/${id}`),
};

export default api;