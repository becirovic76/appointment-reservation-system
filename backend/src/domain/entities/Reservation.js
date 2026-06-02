/**
 * Reservation domain entity.
 * Links a user to a specific appointment slot.
 */
class Reservation {
  /**
   * @param {object} props
   * @param {number|null} props.id
   * @param {number} props.userId
   * @param {number} props.slotId
   * @param {string} props.reservationDate - ISO datetime
   * @param {'Active'|'Cancelled'} props.status
   */
  constructor({ id = null, userId, slotId, reservationDate, status = 'Active' }) {
    this.id = id;
    this.userId = userId;
    this.slotId = slotId;
    this.reservationDate = reservationDate;
    this.status = status;
  }

  isActive() {
    return this.status === 'Active';
  }
}

module.exports = Reservation;
