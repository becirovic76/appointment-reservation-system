/**
 * Reservation application service.
 * Enforces business validation rules for appointments.
 */
const Reservation = require('../../domain/entities/Reservation');
const AppointmentSlot = require('../../domain/entities/AppointmentSlot');
const ReservationStatus = require('../../domain/enums/ReservationStatus');

class ReservationService {
  constructor(reservationRepository, slotRepository) {
    this.reservationRepository = reservationRepository;
    this.slotRepository = slotRepository;
  }

  /** Creates a reservation with validation rules */
  createReservation(userId, slotId) {
    const slot = this.slotRepository.findById(slotId);
    if (!slot) {
      throw new Error('Appointment slot not found');
    }

    // Validation: past dates cannot be reserved
    if (AppointmentSlot.isPastSlot(slot)) {
      throw new Error('Cannot reserve slots in the past');
    }

    // Validation: users cannot reserve occupied slots
    if (!slot.isAvailable) {
      throw new Error('This slot is no longer available');
    }

    const existingOnSlot = this.reservationRepository.findActiveBySlotId(slotId);
    if (existingOnSlot) {
      throw new Error('This slot is already reserved');
    }

    // Validation: users cannot reserve the same slot twice
    const duplicate = this.reservationRepository.findActiveByUserAndSlot(userId, slotId);
    if (duplicate) {
      throw new Error('You already have a reservation for this slot');
    }

    const reservation = new Reservation({
      userId,
      slotId,
      status: ReservationStatus.ACTIVE,
    });

    const created = this.reservationRepository.create(reservation);
    this.slotRepository.setAvailability(slotId, false);
    return created;
  }

  /** Cancels an active reservation */
  cancelReservation(reservationId, userId, isAdmin) {
    const reservation = this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    if (!isAdmin && reservation.userId !== userId) {
      throw new Error('You can only cancel your own reservations');
    }

    if (reservation.status === ReservationStatus.CANCELLED) {
      throw new Error('Reservation is already cancelled');
    }

    const updated = this.reservationRepository.updateStatus(
      reservationId,
      ReservationStatus.CANCELLED
    );
    this.slotRepository.setAvailability(reservation.slotId, true);
    return updated;
  }

  getUserHistory(userId) {
    return this.reservationRepository.findByUserId(userId);
  }

  getAllReservations() {
    return this.reservationRepository.findAll();
  }
}

module.exports = ReservationService;
