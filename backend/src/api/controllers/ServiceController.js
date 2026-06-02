class ServiceController {
  constructor(serviceService) {
    this.serviceService = serviceService;
  }

  getAll = (req, res, next) => {
    try {
      res.json({ success: true, data: this.serviceService.getAll() });
    } catch (err) {
      next(err);
    }
  };

  getById = (req, res, next) => {
    try {
      res.json({ success: true, data: this.serviceService.getById(Number(req.params.id)) });
    } catch (err) {
      next(err);
    }
  };

  create = (req, res, next) => {
    try {
      const service = this.serviceService.create(req.body);
      res.status(201).json({ success: true, data: service });
    } catch (err) {
      next(err);
    }
  };

  update = (req, res, next) => {
    try {
      const service = this.serviceService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: service });
    } catch (err) {
      next(err);
    }
  };

  delete = (req, res, next) => {
    try {
      this.serviceService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Service deleted' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ServiceController;
