
class User {
  
  constructor({ id = null, fullName, email, password, role = 'User' }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  
  isAdministrator() {
    return this.role === 'Administrator';
  }
}

module.exports = User;
