const { v4: generateUniqueId } = require('uuid');
const Entity = require('./Entity');

class ScheduledDownloadEntity extends Entity {
  constructor() {
    super();
    this._id = generateUniqueId();
    this._name = null;
    this._scheduled_time = null;
    this._is_done = null;
    this._is_paused = null;
    this._output_path = null;
    this._magnet_uri = null;

    this._created_time = null;
    this._last_modified = null;
  }

  id(id) {
    this._id = id;
    return this;
  }

  name(name) {
    this._name = name;
    return this;
  }

  schedule_time(scheduled_time) {
    this._scheduled_time = scheduled_time;
    return this;
  }

  is_done(is_done) {
    this._is_done = is_done;
    return this;
  }

  is_paused(is_paused) {
    this._is_paused = is_paused;
    return this;
  }

  output_path(output_path) {
    this._output_path = output_path;
    return this;
  }

  magnet_uri(magnet_uri) {
    this._magnet_uri = magnet_uri;
    return this;
  }

  created_time(created_time) {
    this._created_time = created_time;
    return this;
  }

  last_modified(last_modified) {
    this._last_modified = last_modified;
    return this;
  }
}

module.exports = ScheduledDownloadEntity;