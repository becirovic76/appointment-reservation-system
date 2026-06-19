
class IReservationRepository {
  findById() { throw new Error('Not implemented'); }
  findByUserId() { throw new Error('Not implemented'); }
  findAll() { throw new Error('Not implemented'); }
  findActiveBySlotId() { throw new Error('Not implemented'); }
  findActiveByUserAndSlot() { throw new Error('Not implemented'); }
  create() { throw new Error('Not implemented'); }
  updateStatus() { throw new Error('Not implemented'); }
}

module.exports = IReservationRepository;
