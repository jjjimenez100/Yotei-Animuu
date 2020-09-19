const { si } = require('nyaapi');
const Fetcher = require('./Fetcher');

const findTorrentsForAnime = async (searchQuery, limit = 3) => {
   if(!searchQuery || searchQuery.length < 3) {
      return [];
   }

   const results = await si.search(searchQuery, limit);
   return results
      .sort((a, b) => b.seeders - a.seeders);
};

module.exports = new Fetcher(findTorrentsForAnime);