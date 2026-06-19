
const API = {
  baseUrl: '/api',

  
  getToken() {
    return localStorage.getItem('token');
  },

  
  setToken(token) {
    localStorage.setItem('token', token);
  },

  
  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  
  async request(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data.message || data.errors?.[0]?.msg || 'Request failed';
      throw new Error(message);
    }

    return data;
  },


  register: (body) => API.request('/auth/register', { method: 'POST', body }),
  login: (body) => API.request('/auth/login', { method: 'POST', body }),
  logout: () => API.request('/auth/logout', { method: 'POST' }),
  me: () => API.request('/auth/me'),


  getServices: () => API.request('/services'),
  createService: (body) => API.request('/services', { method: 'POST', body }),
  updateService: (id, body) => API.request(`/services/${id}`, { method: 'PUT', body }),
  deleteService: (id) => API.request(`/services/${id}`, { method: 'DELETE' }),


  getSlots: (query = '') => API.request(`/slots${query}`),
  createSlot: (body) => API.request('/slots', { method: 'POST', body }),
  deleteSlot: (id) => API.request(`/slots/${id}`, { method: 'DELETE' }),


  getMyReservations: () => API.request('/reservations/my'),
  getAllReservations: () => API.request('/reservations'),
  createReservation: (slotId) => API.request('/reservations', { method: 'POST', body: { slotId } }),
  cancelReservation: (id) => API.request(`/reservations/${id}/cancel`, { method: 'PUT' }),


  getProfile: () => API.request('/users/profile'),
  getUsers: () => API.request('/users'),
  updateUser: (id, body) => API.request(`/users/${id}`, { method: 'PUT', body }),
  deleteUser: (id) => API.request(`/users/${id}`, { method: 'DELETE' }),
};
