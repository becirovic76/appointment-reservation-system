/**
 * Authentication application service.
 * Handles registration, login, password hashing, and JWT token generation.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../domain/entities/User');
const Role = require('../../domain/enums/Role');

const SALT_ROUNDS = 10;

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  /** Registers a new user with hashed password */
  async register({ fullName, email, password, role }) {
    const existing = this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role === Role.ADMINISTRATOR ? Role.ADMINISTRATOR : Role.USER,
    });

    const created = this.userRepository.create(user);
    return this._toPublicUser(created);
  }

  /** Authenticates user and returns JWT token */
  async login({ email, password }) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email or password');
    }

    const token = this._generateToken(user);
    return { token, user: this._toPublicUser(user) };
  }

  /** Verifies JWT and returns payload */
  verifyToken(token) {
    return jwt.verify(token, this.jwtSecret);
  }

  _generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role, fullName: user.fullName },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn }
    );
  }

  _toPublicUser(user) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }
}

module.exports = AuthService;
