/**
 * API route definitions.
 * Maps HTTP endpoints to controllers with auth and validation.
 */
const express = require('express');
const {
  handleValidation,
  registerRules,
  loginRules,
  serviceRules,
  slotRules,
  reservationRules,
  userUpdateRules,
  idParam,
} = require('../validators/validators');

function createRouter(container) {
  const router = express.Router();
  const { auth, controllers } = container;

  // --- Authentication ---
  router.post('/auth/register', registerRules, handleValidation, controllers.auth.register);
  router.post('/auth/login', loginRules, handleValidation, controllers.auth.login);
  router.post('/auth/logout', auth.authenticate, controllers.auth.logout);
  router.get('/auth/me', auth.authenticate, controllers.auth.me);

  // --- Services (public read, admin write) ---
  router.get('/services', controllers.service.getAll);
  router.get('/services/:id', idParam, handleValidation, controllers.service.getById);
  router.post('/services', auth.authenticate, auth.requireAdmin, serviceRules, handleValidation, controllers.service.create);
  router.put('/services/:id', auth.authenticate, auth.requireAdmin, idParam, serviceRules, handleValidation, controllers.service.update);
  router.delete('/services/:id', auth.authenticate, auth.requireAdmin, idParam, handleValidation, controllers.service.delete);

  // --- Appointment Slots ---
  router.get('/slots', controllers.slot.getAll);
  router.post('/slots', auth.authenticate, auth.requireAdmin, slotRules, handleValidation, controllers.slot.create);
  router.delete('/slots/:id', auth.authenticate, auth.requireAdmin, idParam, handleValidation, controllers.slot.delete);

  // --- Reservations ---
  router.get('/reservations', auth.authenticate, auth.requireAdmin, controllers.reservation.getAll);
  router.get('/reservations/my', auth.authenticate, controllers.reservation.getMyHistory);
  router.post('/reservations', auth.authenticate, reservationRules, handleValidation, controllers.reservation.create);
  router.put('/reservations/:id/cancel', auth.authenticate, idParam, handleValidation, controllers.reservation.cancel);

  // --- Users ---
  router.get('/users/profile', auth.authenticate, controllers.user.getProfile);
  router.get('/users', auth.authenticate, auth.requireAdmin, controllers.user.getAll);
  router.put('/users/:id', auth.authenticate, auth.requireAdmin, idParam, userUpdateRules, handleValidation, controllers.user.update);
  router.delete('/users/:id', auth.authenticate, auth.requireAdmin, idParam, handleValidation, controllers.user.delete);

  return router;
}

module.exports = createRouter;
