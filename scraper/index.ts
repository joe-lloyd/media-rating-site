import * as cheerio from 'cheerio';
import fs from 'node:fs';
import axios from 'axios';

interface Scraper {
  listOfVideoGamesToScrape: string[];
  listOfMoviesToScrape: string[];
  listOfAlbumsToScrape: string[];
  listOfSeriesToScrape: string[];
}

const initScraper = async ({
  listOfVideoGamesToScrape,
  listOfMoviesToScrape,
  listOfAlbumsToScrape,
  listOfSeriesToScrape,
}: Scraper) => {
  let videoGames: unknown[] = [];

  if (listOfVideoGamesToScrape) {
    videoGames = await Promise.all(listOfVideoGamesToScrape.map((gamePath) => scrapeVideoGame(`https://www.metacritic.com/game/${gamePath}`)));
    console.log('Scraped video games:', videoGames);
  }

  if (videoGames.length) {
    await Promise.all(videoGames.map((game, index) => writeMdxFile(`videoGames/${listOfVideoGamesToScrape[index]}`, game)));
  }
};

const scrapeVideoGame = async (gameToScrape: string) => {
  // Fetch the HTML page using your preferred method (e.g., axios, node-fetch)
  const html = await axios.get(gameToScrape);


  // Parse the HTML
  const $ = cheerio.load(html);

  // Extract the video game data based on its class or id attributes
  const title = $('h1.title').text();
  const developer = $('span.developer').text();
  const publisher = $('span.publisher').text();
  const releaseDate = $('span.release-date').text(); // assuming the format is MM/DD/YYYY

  // Convert the release date to a Date object
  const releaseDateObject = new Date(releaseDate);

  // Extract genres and platforms (assuming they're in separate lists)
  const genres = $('li.genre').map((index, genre) => $(genre).text()).get();
  const platforms = $('li.platform').map((index, platform) => $(platform).text()).get();

  return {
    title,
    developer,
    publisher,
    releaseDate: releaseDateObject,
    genres,
    platform: platforms,
  };
};


const writeMdxFile = async (fileName: string, frontmatter: unknown) => {
  const mdxContent = `---
${Object.keys(frontmatter).map(key => `${key}: ${frontmatter[key]}`).join('\n')}
---`;

  await fs.writeFile(`/content/videogamse/${fileName}.mdx`, mdxContent, 'utf-8');

};

export default initScraper;
