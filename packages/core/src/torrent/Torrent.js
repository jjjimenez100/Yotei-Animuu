const moment = require('moment');
const { prettifyBytes } = require('../util');

class Torrent {
  constructor(magnetURI, outputFolderPath) {
    this._magnetURI = magnetURI;
    this._outputFolderPath = outputFolderPath;
  }

  name(name) {
    this._name = name;
    return this;
  }

  timeRemaining(timeRemaining) {
    this._timeRemaining = moment.duration(timeRemaining / 1000, 'seconds').humanize();
    return this;
  }

  files(files) {
    this._files = files;
    return this;
  }

  totalSize(totalSize) {
    this._totalSize = prettifyBytes(totalSize);
    return this;
  }

  downloaded(downloaded) {
    this._downloaded = prettifyBytes(downloaded);
    return this;
  }

  uploaded(uploaded) {
    this._uploaded = prettifyBytes(uploaded);
    return this;
  }

  downloadSpeed(downloadSpeed) {
    this._downloadSpeed = prettifyBytes(downloadSpeed);
    return this;
  }

  uploadSpeed(uploadSpeed) {
    this._uploadSpeed = prettifyBytes(uploadSpeed);
    return this;
  }

  progress(progress) {
    this._progress = Math.round(progress * 100 * 100) / 100;
    return this;
  }

  error(error) {
    this._error = error;
    return this;
  }

  isDone(isDone) {
    this._isDone = isDone;
    return this;
  }
}

module.exports = Torrent;