import * as cheerio from 'cheerio';
import { media } from './data-to-scrape';
import { CheerioAPI } from 'cheerio';

async function fetchAndLoadCheerio(url: string): Promise<CheerioAPI> {
  try {
    return cheerio.fromURL(url);
  } catch (error) {
    if(error instanceof Error) {
      console.error(`Error fetching URL ${url}:`, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

function getTitle($: CheerioAPI): string {
  try {
    return $('.c-productHero_title').text().trim();
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting title:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return '';
  }
}

function getMetaScore($: CheerioAPI): string {
  try {
    return $('.c-productScoreInfo_scoreNumber').first().text().trim();
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting meta score:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return '';
  }
}

function getReleaseDate($: CheerioAPI): string {
  try {
    // Find the label first, then get the adjacent text
    const releaseDateLabel = $('span').filter(function() {
      return $(this).text().trim() === 'Released On:';
    });
    return releaseDateLabel.next().text().trim();
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting release date:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return '';
  }
}

function getDeveloper($: CheerioAPI): string {
  try {
    return $('.c-productDetails_item.developer .c-productDetails_developersContent')
      .text()
      .trim();
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting developer:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return '';
  }
}

function getTags($: CheerioAPI): string[] {
  try {
    const genres: string[] = [];
    $('.c-productDetails_item.genres .c-productDetails_genresList a').each((i, el) => {
      genres.push($(el).text().trim());
    });
    return genres;
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting genres:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return [];

  }
}

function getSummary($: CheerioAPI): string {
  try {
    return $('.c-productSummary_description').text().trim();
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error extracting summary:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return '';
  }
}


async function getGameDetailsBySlug({
  slug,
  personalRating,
}: media): Promise<object> {
  const baseUrl = 'https://www.metacritic.com/game/';
  const url = `${baseUrl}${slug}`;

  try {
    console.log(`Fetching game details from ${url}...`);
    const $ = await fetchAndLoadCheerio(url);
    const dateNow = new Date();

    return {
      id: slug,
      slug: slug,
      mediaType: 'video-game',
      title: getTitle($),
      author: 'Joe Lloyd',
      releaseDate: getReleaseDate($),
      dateFinished: dateNow.getDate(),
      personalRating: personalRating,
      thumbnail: `../images/${slug}.webp`,
      tags: getTags($),
      timePlayed: "",
      synopsis: getSummary($),
      isFavorite: "",
      studio: getDeveloper($),
      createdDate: dateNow.getDate(),
      rating: {
        steam: -1,
        metacritic: getMetaScore($),
        ign: -1,
        gamespot: -1,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching game details for ${slug}:`, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export default getGameDetailsBySlug;

