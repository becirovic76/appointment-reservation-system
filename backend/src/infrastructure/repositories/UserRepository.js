
const { getDatabase } = require('../database/connection');
const User = require('../../domain/entities/User');

class UserRepository {
  constructor() {
    this.db = getDatabase();
  }

  
  _mapRow(row) {
    if (!row) return null;
    return new User({
      id: row.Id,
      fullName: row.FullName,
      email: row.Email,
      password: row.Password,
      role: row.Role,
    });
  }

  findById(id) {
    const row = this.db.prepare('SELECT * FROM Users WHERE Id = ?').get(id);
    return this._mapRow(row);
  }

  findByEmail(email) {
    const row = this.db.prepare('SELECT * FROM Users WHERE Email = ?').get(email.toLowerCase());
    return this._mapRow(row);
  }

  findAll() {
    const rows = this.db.prepare('SELECT * FROM Users ORDER BY Id').all();
    return rows.map((r) => this._mapRow(r));
  }

  create(user) {
    const stmt = this.db.prepare(
      'INSERT INTO Users (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(user.fullName, user.email.toLowerCase(), user.password, user.role);
    return this.findById(result.lastInsertRowid);
  }

  update(id, { fullName, email, role }) {
    this.db
      .prepare('UPDATE Users SET FullName = ?, Email = ?, Role = ? WHERE Id = ?')
      .run(fullName, email.toLowerCase(), role, id);
    return this.findById(id);
  }

  delete(id) {
    const result = this.db.prepare('DELETE FROM Users WHERE Id = ?').run(id);
    return result.changes > 0;
  }
}

module.exports = UserRepository;
