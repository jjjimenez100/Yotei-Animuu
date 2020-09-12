class AnimeDownloader {
  constructor(downloadTorrentToFilesystem) {
    this.downloadTorrentToFilesystem = downloadTorrentToFilesystem;
  }

  async downloadAnime(magnetLink = '', outputPath = '') {
    try {
      await this.downloadTorrentToFilesystem(magnetLink, outputPath, true);
      return true;
    } catch (error) {
      console.error('Failed to download anime: ', error);
      return false;
    }
  }
}

module.exports = AnimeDownloader;