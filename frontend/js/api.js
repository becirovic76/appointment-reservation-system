/**
 * API client module.
 * Handles HTTP requests to the backend REST API.
 */
const API = {
  baseUrl: '/api',

  /** Returns stored JWT token */
  getToken() {
    return localStorage.getItem('token');
  },

  /** Stores JWT token */
  setToken(token) {
    localStorage.setItem('token', token);
  },

  /** Removes token on logout */
  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /** Generic fetch wrapper with auth header */
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

  // Auth
  register: (body) => API.request('/auth/register', { method: 'POST', body }),
  login: (body) => API.request('/auth/login', { method: 'POST', body }),
  logout: () => API.request('/auth/logout', { method: 'POST' }),
  me: () => API.request('/auth/me'),

  // Services
  getServices: () => API.request('/services'),
  createService: (body) => API.request('/services', { method: 'POST', body }),
  updateService: (id, body) => API.request(`/services/${id}`, { method: 'PUT', body }),
  deleteService: (id) => API.request(`/services/${id}`, { method: 'DELETE' }),

  // Slots
  getSlots: (query = '') => API.request(`/slots${query}`),
  createSlot: (body) => API.request('/slots', { method: 'POST', body }),
  deleteSlot: (id) => API.request(`/slots/${id}`, { method: 'DELETE' }),

  // Reservations
  getMyReservations: () => API.request('/reservations/my'),
  getAllReservations: () => API.request('/reservations'),
  createReservation: (slotId) => API.request('/reservations', { method: 'POST', body: { slotId } }),
  cancelReservation: (id) => API.request(`/reservations/${id}/cancel`, { method: 'PUT' }),

  // Users
  getProfile: () => API.request('/users/profile'),
  getUsers: () => API.request('/users'),
  updateUser: (id, body) => API.request(`/users/${id}`, { method: 'PUT', body }),
  deleteUser: (id) => API.request(`/users/${id}`, { method: 'DELETE' }),
};
