/**
 * Authentication state management module.
 */
const Auth = {
  user: null,

  /** Loads user from localStorage */
  load() {
    const stored = localStorage.getItem('user');
    this.user = stored ? JSON.parse(stored) : null;
    return this.user;
  },

  /** Saves user and token after login */
  save(token, user) {
    API.setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  },

  /** Clears session */
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
