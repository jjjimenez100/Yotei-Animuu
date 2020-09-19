const AnimeFetcher = require('./src/fetcher/AnimeFetcher');
const AnimeDownloadScheduler = require('./src/scheduler/AnimeDownloadScheduler');
const AnimeDownloadSchedule = require('./src/scheduler/AnimeDownloadSchedule');
const { TorrentManager, emittedEvents } = require('./src/torrent/TorrentManager');
const Torrent = require('./src/torrent/Torrent');

module.exports = {
  AnimeFetcher,
  AnimeDownloadScheduler,
  AnimeDownloadSchedule,
  TorrentManager,
  Torrent,

  emittedEvents,
};