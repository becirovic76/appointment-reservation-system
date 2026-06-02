/**
 * User repository contract (Application layer).
 * Infrastructure implements this interface.
 */
class IUserRepository {
  findById() { throw new Error('Not implemented'); }
  findByEmail() { throw new Error('Not implemented'); }
  findAll() { throw new Error('Not implemented'); }
  create() { throw new Error('Not implemented'); }
  update() { throw new Error('Not implemented'); }
  delete() { throw new Error('Not implemented'); }
}

module.exports = IUserRepository;
