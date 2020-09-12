const fetcher = require('./modules/fetcher');
const torrent = require('./modules/torrent');

// Inject dependencies to constructors
const AnimeDownloader = require('./modules/AnimeDownloader');
const animeDownloader = new AnimeDownloader(torrent.downloadTorrentToFilesystem);

const Scheduler = require('./modules/Scheduler');
const { CronJob } = require('cron');
const AnimeDownloadScheduler = require('./modules/AnimeDownloadScheduler');
const animeDownloadScheduler = new AnimeDownloadScheduler(Scheduler, CronJob, animeDownloader);

module.exports = {
  fetcher,
  torrent,
  AnimeDownloader: animeDownloader,
  AnimeDownloadScheduler: animeDownloadScheduler,
};