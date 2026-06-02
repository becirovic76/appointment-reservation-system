/**
 * JWT authentication middleware.
 * Attaches decoded user to req.user.
 */
const Role = require('../../domain/enums/Role');

function createAuthMiddleware(authService) {
  function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const token = header.split(' ')[1];
    try {
      req.user = authService.verifyToken(token);
      next();
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  }

  function requireAdmin(req, res, next) {
    if (req.user?.role !== Role.ADMINISTRATOR) {
      return res.status(403).json({ success: false, message: 'Administrator access required' });
    }
    next();
  }

  return { authenticate, requireAdmin };
}

module.exports = createAuthMiddleware;
