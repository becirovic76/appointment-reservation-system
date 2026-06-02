/**
 * Dependency Injection container.
 * Wires repositories, services, controllers (Clean Architecture composition root).
 */
const UserRepository = require('../infrastructure/repositories/UserRepository');
const ServiceRepository = require('../infrastructure/repositories/ServiceRepository');
const SlotRepository = require('../infrastructure/repositories/SlotRepository');
const ReservationRepository = require('../infrastructure/repositories/ReservationRepository');

const AuthService = require('../application/services/AuthService');
const ServiceService = require('../application/services/ServiceService');
const SlotService = require('../application/services/SlotService');
const ReservationService = require('../application/services/ReservationService');
const UserService = require('../application/services/UserService');

const AuthController = require('./controllers/AuthController');
const ServiceController = require('./controllers/ServiceController');
const SlotController = require('./controllers/SlotController');
const ReservationController = require('./controllers/ReservationController');
const UserController = require('./controllers/UserController');
const createAuthMiddleware = require('./middleware/authMiddleware');

function buildContainer() {
  const userRepo = new UserRepository();
  const serviceRepo = new ServiceRepository();
  const slotRepo = new SlotRepository();
  const reservationRepo = new ReservationRepository();

  const authService = new AuthService(userRepo);
  const serviceService = new ServiceService(serviceRepo);
  const slotService = new SlotService(slotRepo, serviceRepo);
  const reservationService = new ReservationService(reservationRepo, slotRepo);
  const userService = new UserService(userRepo);

  const auth = createAuthMiddleware(authService);

  return {
    auth,
    controllers: {
      auth: new AuthController(authService),
      service: new ServiceController(serviceService),
      slot: new SlotController(slotService),
      reservation: new ReservationController(reservationService),
      user: new UserController(userService),
    },
  };
}

module.exports = buildContainer;
