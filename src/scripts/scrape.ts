// Example of how to use the MetaCriticScraper
const MetaCriticScraper = require('./meta-critic-scraper');

async function example() {
  const scraper = new MetaCriticScraper();

  try {
    // Get details for a specific game using its slug
    const gameDetails = await scraper.getGameDetailsBySlug('resident-evil-4-2005');
    console.log(gameDetails);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
