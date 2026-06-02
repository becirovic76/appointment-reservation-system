class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  create = (req, res, next) => {
    try {
      const reservation = this.reservationService.createReservation(
        req.user.id,
        Number(req.body.slotId)
      );
      res.status(201).json({ success: true, data: reservation });
    } catch (err) {
      next(err);
    }
  };

  cancel = (req, res, next) => {
    try {
      const isAdmin = req.user.role === 'Administrator';
      const reservation = this.reservationService.cancelReservation(
        Number(req.params.id),
        req.user.id,
        isAdmin
      );
      res.json({ success: true, data: reservation });
    } catch (err) {
      next(err);
    }
  };

  getMyHistory = (req, res, next) => {
    try {
      const data = this.reservationService.getUserHistory(req.user.id);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getAll = (req, res, next) => {
    try {
      const data = this.reservationService.getAllReservations();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ReservationController;
