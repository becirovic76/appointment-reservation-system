class SlotController {
  constructor(slotService) {
    this.slotService = slotService;
  }

  getAll = (req, res, next) => {
    try {
      const filters = {
        serviceId: req.query.serviceId ? Number(req.query.serviceId) : undefined,
        date: req.query.date,
        availableOnly: req.query.available === 'true',
      };
      const data = req.query.available === 'true'
        ? this.slotService.getAvailable()
        : this.slotService.getAll(filters);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  create = (req, res, next) => {
    try {
      const slot = this.slotService.create(req.body);
      res.status(201).json({ success: true, data: slot });
    } catch (err) {
      next(err);
    }
  };

  delete = (req, res, next) => {
    try {
      this.slotService.delete(Number(req.params.id));
      res.json({ success: true, message: 'Slot deleted' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = SlotController;
