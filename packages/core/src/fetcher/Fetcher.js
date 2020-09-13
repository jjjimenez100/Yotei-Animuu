class Fetcher {
  constructor(handler = async () => {}) {
    this.handler = handler;
  }

  async search(searchQuery = '', limit = 3) {
    if (!searchQuery || searchQuery.length < 5) {
      throw new Error('Search query should be at least 5 characters.');
    }

    const results = await this.handler(searchQuery, limit);

    if (results.length === 0) {
      return [];
    }

    // Check if result entity has seeders and magnet property
    const [ firstResult ] = results;
    const { seeders, magnet } = firstResult;
    if (!seeders || !magnet) {
      throw new Error(`Result entity does not contain 'seeders' and 'magnet' property`);
    }

    return results.sort((a, b) => b.seeders - a.seeders);
  }
}

module.exports = Fetcher;