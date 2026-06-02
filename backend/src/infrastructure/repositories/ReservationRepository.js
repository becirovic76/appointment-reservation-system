const { getDatabase } = require('../database/connection');
const Reservation = require('../../domain/entities/Reservation');
const ReservationStatus = require('../../domain/enums/ReservationStatus');

class ReservationRepository {
  constructor() {
    this.db = getDatabase();
  }

  _mapRow(row) {
    if (!row) return null;
    return new Reservation({
      id: row.Id,
      userId: row.UserId,
      slotId: row.SlotId,
      reservationDate: row.ReservationDate,
      status: row.Status,
    });
  }

  /** Returns reservation with joined details for display */
  _mapDetailed(row) {
    const reservation = this._mapRow(row);
    if (!reservation) return null;
    return {
      ...reservation,
      userFullName: row.UserFullName,
      userEmail: row.UserEmail,
      slotDate: row.SlotDate,
      slotStartTime: row.SlotStartTime,
      slotEndTime: row.SlotEndTime,
      serviceName: row.ServiceName,
    };
  }

  findById(id) {
    const row = this.db
      .prepare(
        `SELECT r.*, u.FullName AS UserFullName, u.Email AS UserEmail,
                sl.Date AS SlotDate, sl.StartTime AS SlotStartTime, sl.EndTime AS SlotEndTime,
                sv.Name AS ServiceName
         FROM Reservations r
         JOIN Users u ON r.UserId = u.Id
         JOIN AppointmentSlots sl ON r.SlotId = sl.Id
         JOIN Services sv ON sl.ServiceId = sv.Id
         WHERE r.Id = ?`
      )
      .get(id);
    return this._mapDetailed(row);
  }

  findByUserId(userId) {
    const rows = this.db
      .prepare(
        `SELECT r.*, u.FullName AS UserFullName, u.Email AS UserEmail,
                sl.Date AS SlotDate, sl.StartTime AS SlotStartTime, sl.EndTime AS SlotEndTime,
                sv.Name AS ServiceName
         FROM Reservations r
         JOIN Users u ON r.UserId = u.Id
         JOIN AppointmentSlots sl ON r.SlotId = sl.Id
         JOIN Services sv ON sl.ServiceId = sv.Id
         WHERE r.UserId = ?
         ORDER BY r.ReservationDate DESC`
      )
      .all(userId);
    return rows.map((r) => this._mapDetailed(r));
  }

  findAll() {
    const rows = this.db
      .prepare(
        `SELECT r.*, u.FullName AS UserFullName, u.Email AS UserEmail,
                sl.Date AS SlotDate, sl.StartTime AS SlotStartTime, sl.EndTime AS SlotEndTime,
                sv.Name AS ServiceName
         FROM Reservations r
         JOIN Users u ON r.UserId = u.Id
         JOIN AppointmentSlots sl ON r.SlotId = sl.Id
         JOIN Services sv ON sl.ServiceId = sv.Id
         ORDER BY r.ReservationDate DESC`
      )
      .all();
    return rows.map((r) => this._mapDetailed(r));
  }

  findActiveBySlotId(slotId) {
    const row = this.db
      .prepare("SELECT * FROM Reservations WHERE SlotId = ? AND Status = 'Active'")
      .get(slotId);
    return this._mapRow(row);
  }

  findActiveByUserAndSlot(userId, slotId) {
    const row = this.db
      .prepare(
        "SELECT * FROM Reservations WHERE UserId = ? AND SlotId = ? AND Status = 'Active'"
      )
      .get(userId, slotId);
    return this._mapRow(row);
  }

  create(reservation) {
    const result = this.db
      .prepare(
        'INSERT INTO Reservations (UserId, SlotId, ReservationDate, Status) VALUES (?, ?, datetime(\'now\'), ?)'
      )
      .run(reservation.userId, reservation.slotId, reservation.status);
    return this.findById(result.lastInsertRowid);
  }

  updateStatus(id, status) {
    this.db.prepare('UPDATE Reservations SET Status = ? WHERE Id = ?').run(status, id);
    return this.findById(id);
  }
}

module.exports = ReservationRepository;
