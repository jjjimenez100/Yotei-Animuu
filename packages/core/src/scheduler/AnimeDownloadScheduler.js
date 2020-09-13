const {
  TorrentManager,
} = require('../torrent/TorrentManager');
const Scheduler = require('./Scheduler');
const AnimeDownloadSchedule = require('./AnimeDownloadSchedule');

class AnimeDownloadScheduler {
  constructor() {
    this.scheduledDownloads = {};
  }

  /**
   *
   * @param {AnimeDownloadSchedule} animeDownloadSchedule
   * @param outputFolderPath
   * @param verbose
   */
  scheduleAnimeForDownload(animeDownloadSchedule, outputFolderPath, verbose = false) {
    const {
      magnetURI, animeName, time,
    } = animeDownloadSchedule;

    const schedulerHandler = () => TorrentManager.downloadToFileSystem(magnetURI, outputFolderPath, verbose);
    const scheduledDownload = new Scheduler()
      .setTime(time)
      .setHandler(schedulerHandler)
      .trigger();

    this.scheduledDownloads = {
      ...this.scheduledDownloads,
      [`${animeName}`]: scheduledDownload,
    };
  }

  /**
   *
   * @param {AnimeDownloadSchedule} animeDownloadSchedule
   * @returns {null|*}
   */
  removeScheduledDownload(animeDownloadSchedule) {
    const { animeName } = animeDownloadSchedule;
    const foundScheduledDownload = this.scheduledDownloads[`${animeName}`];

    if (!foundScheduledDownload) {
      return false;
    }

    Scheduler.stopJob(foundScheduledDownload);
    return foundScheduledDownload;
  }
}

module.exports = AnimeDownloadScheduler;