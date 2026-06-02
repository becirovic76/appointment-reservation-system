/**
 * User domain entity.
 * Represents a registered system user with authentication credentials and role.
 */
class User {
  /**
   * @param {object} props
   * @param {number|null} props.id
   * @param {string} props.fullName
   * @param {string} props.email
   * @param {string} props.password - hashed password
   * @param {'User'|'Administrator'} props.role
   */
  constructor({ id = null, fullName, email, password, role = 'User' }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  /** Returns true if user has administrator privileges */
  isAdministrator() {
    return this.role === 'Administrator';
  }
}

module.exports = User;
