
class AppointmentSlot {
  
  constructor({ id = null, date, startTime, endTime, serviceId, isAvailable = true }) {
    this.id = id;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.serviceId = serviceId;
    this.isAvailable = isAvailable;
  }

  
  isPast() {
    return AppointmentSlot.isPastSlot(this);
  }

  
  static isPastSlot({ date, startTime }) {
    const slotDateTime = new Date(`${date}T${startTime}:00`);
    return slotDateTime < new Date();
  }
}

module.exports = AppointmentSlot;
