const jikanjs = require('jikanjs');
const { pantsu } = require('nyaapi');

/**
 * Wrappers
 */

const getAllSchedules = async () => {
   const schedules = await jikanjs.loadSchedule();
   return schedules;
};

const getSchedulesByDay = async day => {
   const schedulesByDay = await jikanjs.loadSchedule(day);
   return schedulesByDay;
};

const findAnimeDetails = async searchQuery => {
   if (!searchQuery || searchQuery.length < 3) {
      return [];
   }

   const { results } = await jikanjs.search('anime', searchQuery, 1, {}, 5);
   return results;
};

const findTorrentsForAnime = async searchQuery => {
   if(!searchQuery || searchQuery.length < 3) {
      return [];
   }

   const results = await pantsu.search(searchQuery, 5);
   return results;
};

module.exports = {
   getAllSchedules,
   getSchedulesByDay,
   findAnimeDetails,
   findTorrentsForAnime,
};