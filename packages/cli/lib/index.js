#!/usr/bin/env node

const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const getDownloadsFolder = require('downloads-folder');
const {AnimeFetcher, TorrentManager, emittedEvents} = require(
    '@yotei-animuu/core');
const {
  TORRENT_DETAILS_ACQUIRED,
  DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS,
  DOWNLOAD_TO_FILESYSTEM_DONE,
  ERROR_DOWNLOADING_TO_FILESYSTEM,
} = emittedEvents;

const cli = require('./cli');
const MAIN_THEME = chalk.rgb(0, 132, 255);

cli.cleanup(() => console.log(chalk.red('\nRyoukai!')));

const initializeTorrentManager = () => {
  const torrentManager = new TorrentManager();
  torrentManager.on(TORRENT_DETAILS_ACQUIRED, torrentEntity => {
    console.log(
        chalk.green('Got torrent metadata')
    );
    console.log(
        chalk.grey(`Name: ${torrentEntity._name} | Number of files: ${torrentEntity._files} | Size: ${torrentEntity._totalSize}`)
    );
  });

  torrentManager.on(DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS, torrentEntity => {
    console.log(
        chalk.grey(`Download Speed: ${torrentEntity._downloadSpeed} | Downloaded: ${torrentEntity._downloaded} | Progress: ${torrentEntity._progress} | Remaining time: ${torrentEntity._timeRemaining}`)
    );
  });

  torrentManager.on(DOWNLOAD_TO_FILESYSTEM_DONE, torrentEntity => {
    console.log(
        chalk.green(`\nDownload Complete. Total downloaded: ${torrentEntity._downloaded}`)
    );
    console.log(
        MAIN_THEME(`Check your file at ${torrentEntity._outputFolderPath}`)
    )
    process.exit(0);
  });

  torrentManager.on(ERROR_DOWNLOADING_TO_FILESYSTEM, torrentEntity => {
    console.log(
        chalk.red('Failed to complete download. ' + torrentEntity._error)
    );
    process.exit(0);
  });

  return torrentManager;
};

const main = async () => {
  clear();

  console.log(
      MAIN_THEME(figlet.textSync('yoteii-animuu', {width: 80})),
  );
  console.log(
      MAIN_THEME('\nCLI app for downloading anime torrents at nyaa.si'),
  );

  const DOWNLOADS_FOLDER_PATH = getDownloadsFolder();
  console.log(
      MAIN_THEME(`\nDownloads will be saved at ${DOWNLOADS_FOLDER_PATH}`),
  );

  const {anime} = await cli.askAnimeToFetch();
  const spinner = ora('Fetching results from nyaa.si');

  spinner.start();
  const animeResults = await AnimeFetcher.search(anime, 20);
  spinner.stop();
  const {chosenAnime} = await cli.askWhichAnimeToDownload(animeResults);
  const torrentManager = initializeTorrentManager();
  const {magnet} = chosenAnime;
  torrentManager.downloadToFileSystem(magnet, DOWNLOADS_FOLDER_PATH);
};

main();