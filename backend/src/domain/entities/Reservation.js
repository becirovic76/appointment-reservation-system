
class Reservation {
  
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
