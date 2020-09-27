const inquirer = require('inquirer');
const moment = require('moment');

const cleanup = callback => {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || function () {};
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    process.exit(99);
  });
};

const askWhichAnimeToDownload = animeList => {
  const animeChoices = animeList.map(({ name, magnet, date, filesize,  seeders, leechers, completed }) => {
    const parsedDate = moment(date).format('MM/DD/YYYY hh:mm A');
    const displayText = `${name} | ${parsedDate} | ${filesize} | Leechers: ${leechers} | Seeders: ${seeders} | Completed: ${completed}`;

    const anime = {
      name, magnet, date, filesize,  seeders, leechers, completed,
    };

    return {
      name: displayText, value: anime,
    };
  });

  const question = {
    name: 'chosenAnime',
    type: 'checkbox',
    message: 'Choose which torrent to download:',
    choices: animeChoices,
    validate: value => {
      return !!value;
    },
  };

  return inquirer.prompt([question]);
};

const askAnimeToFetch = () => {
  const question = {
    name: 'anime',
    type: 'input',
    message: 'Enter name of anime to search:',
    validate: value => {
      if (value && value.length >= 3) {
        return true;
      }
      return 'Please enter a search query of at least 3 characters.';
    }
  };

  return inquirer.prompt([question]);
}

const askToContinueChoosingAnotherDownload = () => {
  const question = {
    name: 'shouldContinue',
    type: 'confirm',
    message: 'Search another anime?',
    default: true,
    validate: value => !!value,
  };

  return inquirer.prompt([question]);
}

module.exports = {
  askToContinueChoosingAnotherDownload,
  askWhichAnimeToDownload,
  askAnimeToFetch,
  cleanup,
};