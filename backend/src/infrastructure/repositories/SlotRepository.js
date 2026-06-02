const { getDatabase } = require('../database/connection');
const AppointmentSlot = require('../../domain/entities/AppointmentSlot');

class SlotRepository {
  constructor() {
    this.db = getDatabase();
  }

  _mapRow(row) {
    if (!row) return null;
    return new AppointmentSlot({
      id: row.Id,
      date: row.Date,
      startTime: row.StartTime,
      endTime: row.EndTime,
      serviceId: row.ServiceId,
      isAvailable: row.IsAvailable === 1,
    });
  }

  findById(id) {
    return this._mapRow(this.db.prepare('SELECT * FROM AppointmentSlots WHERE Id = ?').get(id));
  }

  findAll(filters = {}) {
    let sql = `
      SELECT s.*, sv.Name AS ServiceName
      FROM AppointmentSlots s
      JOIN Services sv ON s.ServiceId = sv.Id
      WHERE 1=1
    `;
    const params = [];

    if (filters.serviceId) {
      sql += ' AND s.ServiceId = ?';
      params.push(filters.serviceId);
    }
    if (filters.date) {
      sql += ' AND s.Date = ?';
      params.push(filters.date);
    }
    if (filters.availableOnly) {
      sql += ' AND s.IsAvailable = 1';
    }

    sql += ' ORDER BY s.Date, s.StartTime';
    const rows = this.db.prepare(sql).all(...params);
    // Keep AppointmentSlot instances (spread would strip isPast() and other methods)
    return rows.map((r) => {
      const slot = this._mapRow(r);
      slot.serviceName = r.ServiceName;
      return slot;
    });
  }

  findAvailable() {
    return this.findAll({ availableOnly: true });
  }

  create(slot) {
    const result = this.db
      .prepare(
        'INSERT INTO AppointmentSlots (Date, StartTime, EndTime, ServiceId, IsAvailable) VALUES (?, ?, ?, ?, ?)'
      )
      .run(slot.date, slot.startTime, slot.endTime, slot.serviceId, slot.isAvailable ? 1 : 0);
    return this.findById(result.lastInsertRowid);
  }

  delete(id) {
    const result = this.db.prepare('DELETE FROM AppointmentSlots WHERE Id = ?').run(id);
    return result.changes > 0;
  }

  setAvailability(id, isAvailable) {
    this.db
      .prepare('UPDATE AppointmentSlots SET IsAvailable = ? WHERE Id = ?')
      .run(isAvailable ? 1 : 0, id);
    return this.findById(id);
  }
}

module.exports = SlotRepository;
