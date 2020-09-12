const jikanjs = require('jikanjs');
const { si } = require('nyaapi');

/**
 * Wrappers
 */

const getAllSchedules = () => {
   return jikanjs.loadSchedule();
};

const getSchedulesByDay = day => {
   return jikanjs.loadSchedule(day);
};

const findAnimeDetails = async searchQuery => {
   if (!searchQuery || searchQuery.length < 3) {
      return [];
   }

   const { results } = await jikanjs.search('anime', searchQuery, 1, {}, 5);
   return results;
};

const findTorrentsForAnime = async (searchQuery, limit = 3) => {
   if(!searchQuery || searchQuery.length < 3) {
      return [];
   }

   const results = await si.search(searchQuery, limit);
   return results
      .sort((a, b) => b.seeders - a.seeders);
};

module.exports = {
   getAllSchedules,
   getSchedulesByDay,
   findAnimeDetails,
   findTorrentsForAnime,
};