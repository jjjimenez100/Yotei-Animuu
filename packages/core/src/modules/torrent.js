const WebTorrent = require('webtorrent');
const client = new WebTorrent();

const downloadTorrentToFilesystem = async (magnetURI, outputFolderPath, debug = false) => {
   return new Promise((resolve, reject) => {
      client.add(
         magnetURI, 
         { path: outputFolderPath },
         torrent => {

            torrent.on('done', () => {
               resolve();
            });

            torrent.on('error', err => {
               console.error('Encountered an error while downloading torrent: ', err);
               reject();
            });

            if (debug) {
               torrent.on('download', bytes => {
                  console.log(`Current time: ${new Date().toString()}`);
                  console.log(`Total downloaded: ${torrent.downloaded}`);
                  console.log(`Download speed: ${torrent.downloadSpeed}`);
                  console.log(`Upload speed: ${torrent.uploadSpeed}`);

                  console.log(`Progress: ${torrent.progress}`);
                  console.log(`Time remaining: ${torrent.timeRemaining}`);
               });
            }
      });
   });
};

const streamTorrentFileToDOM = (magnetURI, domElement, fileNameQuery) => {
   client.add(magnetURI, torrent => {
      const file = torrent.files.find(file => file.name.includes(fileNameQuery));
      file.appendTo(domElement);
   });
};

module.exports = {
   downloadTorrentToFilesystem,
   streamTorrentFileToDOM,
};