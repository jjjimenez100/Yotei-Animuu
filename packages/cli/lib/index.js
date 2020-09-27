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

const downloadTorrent = (magnet, outputFolderPath) => {
  return new Promise((resolve, reject) => {
    const torrentManager = new TorrentManager();
    const torrentSpinner = ora('Fetching torrent metadata');

    torrentManager.on(TORRENT_DETAILS_ACQUIRED, torrentEntity => {
      console.log(
          chalk.green('Got torrent metadata')
      );
      console.log(
          chalk.grey(`Name: ${torrentEntity._name} | Number of files: ${torrentEntity._files} | Size: ${torrentEntity._totalSize}`)
      );
    });

    torrentManager.on(DOWNLOAD_TO_FILESYSTEM_DOWNLOAD_PROGRESS, torrentEntity => {
      if (!torrentSpinner.isSpinning) {
        torrentSpinner.start();
      }

      torrentSpinner.text = chalk.grey(`Download Speed: ${torrentEntity._downloadSpeed}/s | Downloaded: ${torrentEntity._downloaded} | Progress: ${torrentEntity._progress}% | Remaining time: ${torrentEntity._timeRemaining}`)
      ;
    });

    torrentManager.on(DOWNLOAD_TO_FILESYSTEM_DONE, torrentEntity => {
      if (torrentSpinner.isSpinning) {
        torrentSpinner.succeed();
      }

      console.log(
          chalk.green(`\nDownload Complete. Total downloaded: ${torrentEntity._downloaded}`)
      );
      console.log(
          MAIN_THEME(`Check your file at ${torrentEntity._outputFolderPath}`)
      );
      resolve();
    });

    torrentManager.on(ERROR_DOWNLOADING_TO_FILESYSTEM, torrentEntity => {
      console.log(
          chalk.red(`${torrentEntity._name} - Failed to complete download. ` + torrentEntity._error)
      );
      reject(torrentEntity._error);
    });

    torrentManager.downloadToFileSystem(magnet, outputFolderPath);
  });
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

  const spinner = ora('Fetching results from nyaa.si');
  try {
    let shouldContinue = true;
    const chosenAnimeDownloads = [];
    while (shouldContinue) {
      const {anime} = await cli.askAnimeToFetch();
      spinner.start();
      const animeResults = await AnimeFetcher.search(anime, 20);
      spinner.succeed();

      const {chosenAnime} = await cli.askWhichAnimeToDownload(animeResults);
      chosenAnimeDownloads.push(...chosenAnime);

      shouldContinue = (await cli.askToContinueChoosingAnotherDownload()).shouldContinue;
    }

    console.log(
        MAIN_THEME('\nChosen anime downloads are :')
    );
    console.log(
        chalk.grey(
            `${chosenAnimeDownloads.map(({ name }) => name).join('\n')}`
        )
    );

    const downloadsLength = chosenAnimeDownloads.length;
    for (const [index, chosenAnimeDownload] of chosenAnimeDownloads.entries()) {
      const {magnet, name} = chosenAnimeDownload;
      console.log(
          MAIN_THEME(`\nDownloading ${index + 1} out of ${downloadsLength} U w U`)
      )
      console.log(
          MAIN_THEME(`Current anime being downloaded: ${name}`)
      );
      await downloadTorrent(magnet, DOWNLOADS_FOLDER_PATH)
    }

    console.log(
        MAIN_THEME(`Completed ${downloadsLength} out of ${downloadsLength} downloads.`)
    )
    console.log(
        chalk.red('Ryoukai!')
    );
    process.exit(0);
  } catch (error) {
    if (spinner.isSpinning) {
      spinner.fail();
    }

    console.log(chalk.red('Encountered error: ', error));
    process.exit(0);
  }
};

main();