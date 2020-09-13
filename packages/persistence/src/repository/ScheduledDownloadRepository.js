const ScheduledDownloadEntity = require('../entity/ScheduledDownloadEntity');
const Repository = require('./Repository');

class ScheduledDownloadRepository extends Repository {
  constructor(database) {
    super(database, 'scheduled_download');
  }

  /**
   *
   * @param {ScheduledDownloadEntity} scheduledDownloadEntity
   * @returns {*}
   */
  update(scheduledDownloadEntity) {
    const { id, properties } = scheduledDownloadEntity.properties();
    return super.update(id, properties);
  }

  /**
   *
   * @param {ScheduledDownloadEntity} scheduledDownloadEntity
   * @returns {*}
   */
  save(scheduledDownloadEntity) {
    const { id, properties } = scheduledDownloadEntity.properties();
    return super.save(id, properties);
  }
}

module.exports = ScheduledDownloadRepository;