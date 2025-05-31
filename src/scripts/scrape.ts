import data from './data-to-scrape';
import getGameDetailsBySlug from './meta-critic-scraper';

async function example() {
  try {
    const allGameData = await Promise.all(data.games.map((game) => getGameDetailsBySlug(game)));
    console.log(allGameData);
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

example();
