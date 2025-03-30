function scrapeSteamGame() {
  try {
    // Helper function to safely extract text
    const extractText = (selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : '';
    };

    // Extract title from schema data
    const schemaProduct = document.querySelector('div[itemscope][itemtype="http://schema.org/Product"]');
    let title = '';
    if (schemaProduct) {
      const titleElement = schemaProduct.querySelector('div.apphub_AppName');
      if (titleElement) {
        title = titleElement.textContent.trim();
      }
    }

    // Fallback title extraction
    if (!title) {
      title = extractText('.apphub_AppName') ||
        extractText('.game_area_purchase_game_title') ||
        document.title.split('-')[0].trim();
    }

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Generate ID from slug
    const id = slug;

    // Extract release date
    const releaseDateText = extractText('.release_date .date');
    let releaseDate = '';

    if (releaseDateText) {
      const dateMatch = releaseDateText.match(/(\d+)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s+(\d{4})/i);
      if (dateMatch) {
        const months = {
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
          'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        const day = dateMatch[1].padStart(2, '0');
        const month = months[dateMatch[2].toLowerCase()];
        const year = dateMatch[3];
        releaseDate = `${year}-${month}-${day}`;
      } else {
        // Extract just the year if full date not available
        const yearMatch = releaseDateText.match(/\d{4}/);
        if (yearMatch) {
          releaseDate = `${yearMatch[0]}-01-01`;
        }
      }
    }

    // If no release date found, use current year
    if (!releaseDate) {
      const currentYear = new Date().getFullYear();
      releaseDate = `${currentYear}-01-01`;
    }

    // Extract synopsis/description
    let synopsis = extractText('.game_description_snippet') ||
      extractText('.game_area_description');

    // Clean synopsis - remove newlines and escape quotes
    synopsis = synopsis.replace(/\n/g, ' ').replace(/"/g, '\\"').trim();

    // Extract developer/studio
    const studio = extractText('.dev_row .summary a') ||
      extractText('.dev_row:first-child .summary') ||
      'Unknown Studio';

    // Extract tags/genres
    const tagElements = document.querySelectorAll('.app_tag');
    const tags = Array.from(tagElements)
      .slice(0, 5) // Only take first few tags
      .map(tag => tag.textContent.trim())
      .filter(tag => tag !== '+');

    // Extract ratings
    const steamRating = extractText('.game_review_summary') || '7.0';
    let steamScore = '7.0';

    // Try to convert text rating to number
    if (steamRating.includes('Overwhelmingly Positive')) {
      steamScore = '9.5';
    } else if (steamRating.includes('Very Positive')) {
      steamScore = '8.5';
    } else if (steamRating.includes('Positive')) {
      steamScore = '7.5';
    } else if (steamRating.includes('Mostly Positive')) {
      steamScore = '7.0';
    } else if (steamRating.includes('Mixed')) {
      steamScore = '6.0';
    } else if (steamRating.includes('Negative')) {
      steamScore = '4.0';
    } else if (steamRating.includes('Very Negative')) {
      steamScore = '3.0';
    } else if (steamRating.includes('Overwhelmingly Negative')) {
      steamScore = '2.0';
    }

    // Extract average duration
    const averageDuration = "Unknown";

    // Current date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Build the MDX content with placeholder values for personal fields
    const mdxContent = `---
id: ${id}
mediaType: video-game
title: ${title}
author: Joe Lloyd
releaseDate: "${releaseDate}"
dateFinished: "YYYY-MM-DD"
slug: ${slug}
personalRating: "Unknown"
thumbnail: ../images/${slug}.webp
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
timePlayed: Unknown hours
synopsis: "${synopsis}"
isFavorite: false
studio: ${studio}
averageDuration: "Unknown"
createdDate: ${formattedDate}
rating:
  steam: ${steamScore}
  metacritic: -1
  ign: -1
  gamespot: -1
---`;

    console.log('Game data extracted:');
    console.log(mdxContent);

    // Format the output as preformatted text in the console
    console.log('%c' + mdxContent, 'white-space: pre; font-family: monospace;');

    // Create a textarea for easy copying
    const textarea = document.createElement('textarea');
    textarea.value = mdxContent;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.width = '400px';
    textarea.style.height = '400px';
    textarea.style.zIndex = '9999';
    textarea.style.background = '#222';
    textarea.style.color = '#fff';
    textarea.style.fontSize = '14px';
    textarea.style.padding = '10px';
    textarea.style.border = '2px solid #555';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');

    console.log('MDX content copied to clipboard!');
    console.log('A text area has been added to the page for easy copying. You can close it after copying.');

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.position = 'fixed';
    closeBtn.style.left = '0';
    closeBtn.style.top = '400px';
    closeBtn.style.zIndex = '9999';
    closeBtn.style.padding = '5px';
    closeBtn.onclick = function() {
      document.body.removeChild(textarea);
      document.body.removeChild(closeBtn);
    };
    document.body.appendChild(closeBtn);

    return mdxContent;

  } catch (error) {
    console.error('Error scraping game data:', error);
    return null;
  }
}

// Run the function
scrapeSteamGame();
