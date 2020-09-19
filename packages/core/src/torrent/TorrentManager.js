const {EventEmitter} = require('events');
const WebTorrent = require('webtorrent');
const Torrent = require('./Torrent');

const client = new WebTorrent();

const DOWNLOAD_TO_FILESYSTEM_DONE = 'downloadToFileSystem.done';
const ERROR_DOWNLOADING_TO_FILESYSTEM = 'downloadToFileSystem.error';
const TORRENT_DETAILS_ACQUIRED = 'downloadToFileSystem.metadata';
const DOWNLOAD_TO_FILESYSTEM_WARNING = 'downloadToFileSystem.warning';
const DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS = 'downloadToFileSystem.downloadProgress';
const DOWNLOAD_TO_FILESYSTEM_UPLOAD_PROGRESS = 'downloadToFileSystem.uploadProgress';

class TorrentManager extends EventEmitter {
  constructor(logger = null) {
    super();
    this.log = logger || function () {};
  }

  streamTorrentFileToDOM (magnetURI, domElement, fileNameQuery) {
    client.add(magnetURI, torrent => {
      const file = torrent.files.find(file => file.name.includes(fileNameQuery));
      file.appendTo(domElement);
    });
  };

  downloadToFileSystem(magnetURI, outputFolderPath) {
    const torrentEntity = new Torrent(magnetURI, outputFolderPath);
    client.add(magnetURI, {path: outputFolderPath}, torrent => {
      torrent.on('metadata', () => {
        torrentEntity
          .name(torrent.name)
          .files(torrent.files)
          .totalSize(torrent.length);
        this.log('Got torrent metadata');

        this.emit(TORRENT_DETAILS_ACQUIRED, torrentEntity);
      });

      torrent.on('warning', err => {
        this.log('Warning: ', err);

        this.emit(DOWNLOAD_TO_FILESYSTEM_WARNING, torrentEntity);
      });

      torrent.on('download', bytes => {
        torrentEntity
            .timeRemaining(torrent.timeRemaining)
            .progress(torrent.progress)
            .downloadSpeed(torrent.downloadSpeed)
            .downloaded(torrent.downloaded);

        this.emit(DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS, torrentEntity);
      });

      torrent.on('upload', bytes => {
        torrentEntity
          .timeRemaining(torrent.timeRemaining)
          .progress(torrent.progress)
          .uploadSpeed(torrent.uploadSpeed)
          .uploaded(torrent.uploaded);

        this.emit(DOWNLOAD_TO_FILESYSTEM_UPLOAD_PROGRESS, torrentEntity);
      });

      torrent.on('done', () => {
        torrentEntity.downloaded(torrent.downloaded).
            downloadSpeed(0).
            isDone(true).
            progress(1).
            timeRemaining(0).
            uploaded(torrent.uploaded).
            uploadSpeed(0);
        this.log('Done with torrent download');

        this.log('Closing connections...');
        torrent.destroy((err, results) => {
          this.log('Connections closed');
          this.emit(DOWNLOAD_TO_FILESYSTEM_DONE, torrentEntity);
        });
      });

      torrent.on('error', err => {
        torrentEntity.error(err);
        this.emit(ERROR_DOWNLOADING_TO_FILESYSTEM, torrentEntity);
      });
    });
  };
}

module.exports = {
  TorrentManager,
  emittedEvents: {
    DOWNLOAD_TO_FILESYSTEM_DONE,
    ERROR_DOWNLOADING_TO_FILESYSTEM,
    TORRENT_DETAILS_ACQUIRED,
    DOWNLOAD_TO_FILESYSTEM_WARNING,
    DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS,
    DOWNLOAD_TO_FILESYSTEM_UPLOAD_PROGRESS,
  },
};