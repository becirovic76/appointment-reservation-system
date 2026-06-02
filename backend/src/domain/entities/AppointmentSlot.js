/**
 * AppointmentSlot domain entity.
 * Represents a time window during which a service can be reserved.
 */
class AppointmentSlot {
  /**
   * @param {object} props
   * @param {number|null} props.id
   * @param {string} props.date - YYYY-MM-DD
   * @param {string} props.startTime - HH:mm
   * @param {string} props.endTime - HH:mm
   * @param {number} props.serviceId
   * @param {boolean} props.isAvailable
   */
  constructor({ id = null, date, startTime, endTime, serviceId, isAvailable = true }) {
    this.id = id;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.serviceId = serviceId;
    this.isAvailable = isAvailable;
  }

  /** Checks whether slot datetime is in the past */
  isPast() {
    return AppointmentSlot.isPastSlot(this);
  }

  /** Works on entity instances and plain objects from JSON/DB */
  static isPastSlot({ date, startTime }) {
    const slotDateTime = new Date(`${date}T${startTime}:00`);
    return slotDateTime < new Date();
  }
}

module.exports = AppointmentSlot;
