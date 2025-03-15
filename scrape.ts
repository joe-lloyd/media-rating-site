// @ts-ignore
import scraper from './scraper/index.ts';


await scraper({
  listOfVideoGamesToScrape: [
    'them-and-us',
  ],
  listOfMoviesToScrape: [],
  listOfAlbumsToScrape: [],
  listOfSeriesToScrape: [],
});
