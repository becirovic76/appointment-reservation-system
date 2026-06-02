class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getProfile = (req, res, next) => {
    try {
      const data = this.userService.getProfile(req.user.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getAll = (req, res, next) => {
    try {
      res.json({ success: true, data: this.userService.getAll() });
    } catch (err) {
      next(err);
    }
  };

  update = (req, res, next) => {
    try {
      const data = this.userService.update(Number(req.params.id), req.body);
      res.json({
        success: true,
        data: { id: data.id, fullName: data.fullName, email: data.email, role: data.role },
      });
    } catch (err) {
      next(err);
    }
  };

  delete = (req, res, next) => {
    try {
      this.userService.delete(Number(req.params.id));
      res.json({ success: true, message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
