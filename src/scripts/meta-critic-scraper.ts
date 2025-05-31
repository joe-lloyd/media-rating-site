const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Fetches HTML content and creates a Cheerio instance
 * @param {string} url - URL to fetch
 * @returns {Promise<CheerioAPI>} - Cheerio instance
 */
async function fetchAndLoadCheerio(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });
    return cheerio.load(response.data);
  }
  catch (error) {
    console.error(`Error fetching URL ${url}:`, error.message);
    throw error;
  }
}

/**
 * Get game title
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string} - Game title
 */
function getTitle($) {
  try {
    return $('.c-productHero_title').text().trim();
  }
  catch (error) {
    console.error('Error extracting title:', error.message);
    return '';
  }
}

/**
 * Get meta score
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string} - Meta score
 */
function getMetaScore($) {
  try {
    return $('.c-productScoreInfo_scoreNumber').first().text().trim();
  }
  catch (error) {
    console.error('Error extracting meta score:', error.message);
    return '';
  }
}

/**
 * Get release date
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string} - Release date
 */
function getReleaseDate($) {
  try {
    // Find the label first, then get the adjacent text
    const releaseDateLabel = $('span').filter(function() {
      return $(this).text().trim() === 'Released On:';
    });
    return releaseDateLabel.next().text().trim();
  }
  catch (error) {
    console.error('Error extracting release date:', error.message);
    return '';
  }
}

/**
 * Get developer
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string} - Developer
 */
function getDeveloper($) {
  try {
    return $('.c-productDetails_item.developer .c-productDetails_developersContent')
      .text()
      .trim();
  }
  catch (error) {
    console.error('Error extracting developer:', error.message);
    return '';
  }
}

/**
 * Get tags
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string[]} - Genres array
 */
function getTags($) {
  try {
    const genres = [];
    $('.c-productDetails_item.genres .c-productDetails_genresList a').each((i, el) => {
      genres.push($(el).text().trim());
    });
    return genres;
  }
  catch (error) {
    console.error('Error extracting genres:', error.message);
    return [];
  }
}

/**
 * Get summary
 * @param {CheerioAPI} $ - Cheerio instance
 * @returns {string} - Summary
 */
function getSummary($) {
  try {
    return $('.c-productSummary_description').text().trim();
  }
  catch (error) {
    console.error('Error extracting summary:', error.message);
    return '';
  }
}

/**
 * Main function to get game details by slug
 * @param {string} slug - Game slug
 * @param personalRating
 * @param timePlayed
 * @param isFavorite
 * @returns {Promise<object>} - Game details object
 */
async function getGameDetailsBySlug({ slug, personalRating, timePlayed, isFavorite }) {
  const baseUrl = 'https://www.metacritic.com/game/';
  const url = `${baseUrl}${slug}`;

  try {
    console.log(`Fetching game details from ${url}...`);
    const $ = await fetchAndLoadCheerio(url);
    const dateNow = new Date();

    return {
      id: slug,
      slug: slug,
      mediaType: "video-game",
      title: getTitle($),
      author: "Joe Lloyd",
      releaseDate: getReleaseDate($),
      dateFinished: dateNow.getDate(),
      personalRating: personalRating,
      thumbnail: `../images/${slug}.webp`,
      tags: getTags($),
      timePlayed: timePlayed,
      synopsis: getSummary($),
      isFavorite,
      studio: getDeveloper($),
      createdDate: dateNow.getDate(),
      rating: {
        steam: -1,
        metacritic: getMetaScore($),
        ign: -1,
        gamespot: -1,
      }
    }
  }
  catch (error) {
    console.error(`Error fetching game details for ${slug}:`, error.message);
    throw error;
  }
}

module.exports = {
  getGameDetailsBySlug,
};
