
const Auth = {
  user: null,

  
  load() {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    return this.user;
  },

  
  save(token, user) {
    API.setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  },

  
  clear() {
    API.clearToken();
    this.user = null;
  },

  isLoggedIn() {
    return !!API.getToken() && !!this.user;
  },

  isAdmin() {
    return this.user?.role === 'Administrator';
  },
};
