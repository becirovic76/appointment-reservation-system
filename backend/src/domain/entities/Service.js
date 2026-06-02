/**
 * Service domain entity.
 * Represents a bookable service offered by the organization.
 */
class Service {
  /**
   * @param {object} props
   * @param {number|null} props.id
   * @param {string} props.name
   * @param {string} props.description
   * @param {number} props.duration - duration in minutes
   */
  constructor({ id = null, name, description, duration }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
  }
}

module.exports = Service;
