const Service = require('../../domain/entities/Service');


class ServiceService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  getAll() {
    return this.serviceRepository.findAll();
  }

  getById(id) {
    const service = this.serviceRepository.findById(id);
    if (!service) throw new Error('Service not found');
    return service;
  }

  create({ name, description, duration }) {
    const service = new Service({ name, description, duration });
    return this.serviceRepository.create(service);
  }

  update(id, data) {
    this.getById(id);
    return this.serviceRepository.update(id, data);
  }

  delete(id) {
    const deleted = this.serviceRepository.delete(id);
    if (!deleted) throw new Error('Service not found');
    return true;
  }
}

module.exports = ServiceService;
