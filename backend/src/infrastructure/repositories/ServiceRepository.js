const { getDatabase } = require('../database/connection');
const Service = require('../../domain/entities/Service');

class ServiceRepository {
  constructor() {
    this.db = getDatabase();
  }

  _mapRow(row) {
    if (!row) return null;
    return new Service({
      id: row.Id,
      name: row.Name,
      description: row.Description,
      duration: row.Duration,
    });
  }

  findById(id) {
    return this._mapRow(this.db.prepare('SELECT * FROM Services WHERE Id = ?').get(id));
  }

  findAll() {
    return this.db
      .prepare('SELECT * FROM Services ORDER BY Name')
      .all()
      .map((r) => this._mapRow(r));
  }

  create(service) {
    const result = this.db
      .prepare('INSERT INTO Services (Name, Description, Duration) VALUES (?, ?, ?)')
      .run(service.name, service.description, service.duration);
    return this.findById(result.lastInsertRowid);
  }

  update(id, { name, description, duration }) {
    this.db
      .prepare('UPDATE Services SET Name = ?, Description = ?, Duration = ? WHERE Id = ?')
      .run(name, description, duration, id);
    return this.findById(id);
  }

  delete(id) {
    const result = this.db.prepare('DELETE FROM Services WHERE Id = ?').run(id);
    return result.changes > 0;
  }
}

module.exports = ServiceRepository;
