
class Service {
  
  constructor({ id = null, name, description, duration }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
  }
}

module.exports = Service;
