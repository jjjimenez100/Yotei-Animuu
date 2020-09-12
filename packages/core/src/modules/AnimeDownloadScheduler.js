class AnimeDownloadScheduler {
  constructor(Scheduler, CronJob, animeDownloaderInstance) {
    this.animeDownloader = animeDownloaderInstance;
    this.Scheduler = Scheduler;
    this.CronJob = CronJob;
    this.scheduledDownloads = {};
  }

  scheduleAnimeForDownload(animeName, magnetLink, outputPath, time) {
    const schedulerHandler = () => this.animeDownloader.downloadAnime(magnetLink, `${outputPath}/${animeName}`);
    const scheduledDownload = new this.Scheduler(this.CronJob)
      .setTime(time)
      .setHandler(schedulerHandler)
      .trigger();
    this.scheduledDownloads = {
      ...this.scheduledDownloads,
      [`${animeName}`]: scheduledDownload,
    };
  }

  removeScheduledDownload(animeName) {
    const foundScheduledDownload = this.scheduledDownloads[`${animeName}`];
    if (!foundScheduledDownload) {
      return null;
    }
    this.Scheduler.stopJob(foundScheduledDownload);
    return foundScheduledDownload;
  }
}

module.exports = AnimeDownloadScheduler;