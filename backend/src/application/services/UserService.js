
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAll() {
    return this.userRepository.findAll().map((u) => ({
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      role: u.role,
    }));
  }

  getProfile(userId) {
    const user = this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return { id: user.id, fullName: user.fullName, email: user.email, role: user.role };
  }

  update(userId, data) {
    const user = this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return this.userRepository.update(userId, data);
  }

  delete(userId) {
    const deleted = this.userRepository.delete(userId);
    if (!deleted) throw new Error('User not found');
    return true;
  }
}

module.exports = UserService;
