/** Authentication API controller */
class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const result = await this.authService.login(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      err.status = 401;
      next(err);
    }
  };

  logout = (req, res) => {
    // JWT is stateless; client removes token on logout
    res.json({ success: true, message: 'Logged out successfully' });
  };

  me = (req, res) => {
    res.json({ success: true, data: req.user });
  };
}

module.exports = AuthController;
