const AppointmentSlot = require('../../domain/entities/AppointmentSlot');

/** Application service for appointment slot management */
class SlotService {
  constructor(slotRepository, serviceRepository) {
    this.slotRepository = slotRepository;
    this.serviceRepository = serviceRepository;
  }

  getAll(filters) {
    return this.slotRepository.findAll(filters);
  }

  getAvailable() {
    const slots = this.slotRepository.findAvailable();
    // Filter out past slots for users
    return slots.filter((s) => !AppointmentSlot.isPastSlot(s));
  }

  getById(id) {
    const slot = this.slotRepository.findById(id);
    if (!slot) throw new Error('Slot not found');
    return slot;
  }

  create({ date, startTime, endTime, serviceId }) {
    const service = this.serviceRepository.findById(serviceId);
    if (!service) throw new Error('Service not found');

    const slot = new AppointmentSlot({ date, startTime, endTime, serviceId });
    if (slot.isPast()) {
      throw new Error('Cannot create slots in the past');
    }

    return this.slotRepository.create(slot);
  }

  delete(id) {
    const deleted = this.slotRepository.delete(id);
    if (!deleted) throw new Error('Slot not found');
    return true;
  }
}

module.exports = SlotService;
