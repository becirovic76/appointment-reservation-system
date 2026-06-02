/**
 * Request validation rules using express-validator.
 * Covers required fields and email validation.
 */
const { body, param, query, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const registerRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const serviceRules = [
  body('name').trim().notEmpty().withMessage('Service name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('duration').isInt({ min: 15 }).withMessage('Duration must be at least 15 minutes'),
];

const slotRules = [
  body('date').isISO8601().withMessage('Valid date is required (YYYY-MM-DD)'),
  body('startTime').matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('Start time must be HH:mm'),
  body('endTime').matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('End time must be HH:mm'),
  body('serviceId').isInt().withMessage('Service ID is required'),
];

const reservationRules = [body('slotId').isInt().withMessage('Slot ID is required')];

const userUpdateRules = [
  body('fullName').optional().trim().notEmpty(),
  body('email').optional().trim().isEmail(),
  body('role').optional().isIn(['User', 'Administrator']),
];

const idParam = [param('id').isInt().withMessage('Valid ID is required')];

module.exports = {
  handleValidation,
  registerRules,
  loginRules,
  serviceRules,
  slotRules,
  reservationRules,
  userUpdateRules,
  idParam,
};
