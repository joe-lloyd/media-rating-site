function scrapeIMDbMovie() {
  try {
    // Helper function to safely extract text
    const extractText = (selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : '';
    };

    // Helper function to extract data from script tags
    const extractJSONLD = () => {
      const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scriptTags) {
        try {
          const data = JSON.parse(script.textContent);
          if (data && data["@type"] === "Movie") {
            return data;
          }
        } catch (e) {
          // Continue to next script tag
        }
      }
      return null;
    };

    // Extract data from JSON-LD if available
    const jsonData = extractJSONLD();

    // Extract title - try multiple selectors
    let title = '';
    if (jsonData && jsonData.name) {
      title = jsonData.name;
    } else {
      title = extractText('h1[data-testid="hero__pageTitle"]') ||
        extractText('h1.ipc-title__text') ||
        extractText('.title_wrapper h1');
    }

    // Clean title (remove year if included)
    title = title.replace(/\(\d{4}\)$/, '').trim();

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Generate ID from slug
    const id = slug;

    // Extract release year
    let releaseYear = '';
    if (jsonData && jsonData.datePublished) {
      releaseYear = jsonData.datePublished.substring(0, 4);
    } else {
      const yearText = extractText('span.sc-5931bdee-1') ||
        document.querySelector('span.TitleBlockMetaData__StyledTextLink-sc-12ein40-1')?.textContent;
      if (yearText) {
        const yearMatch = yearText.match(/\d{4}/);
        releaseYear = yearMatch ? yearMatch[0] : '';
      }
    }

    // Extract synopsis
    let synopsis = '';
    if (jsonData && jsonData.description) {
      synopsis = jsonData.description;
    } else {
      synopsis = extractText('[data-testid="plot-xl"]') ||
        extractText('.summary_text') ||
        extractText('.plot_summary .summary_text');
    }

    // Clean synopsis - remove newlines and escape quotes
    synopsis = synopsis.replace(/\n/g, ' ').replace(/"/g, '\\"').trim();

    // Extract director
    let director = '';
    if (jsonData && jsonData.director) {
      if (Array.isArray(jsonData.director)) {
        director = jsonData.director.map(d => d.name).join(', ');
      } else {
        director = jsonData.director.name;
      }
    } else {
      // Try to find director in the DOM
      const directorElements = document.querySelectorAll('li[data-testid="title-pc-principal-credit"]:first-child span.ipc-metadata-list-item__list-content-item');
      if (directorElements.length > 0) {
        director = Array.from(directorElements).map(el => el.textContent.trim()).join(', ');
      }
    }

    // Extract cast
    let cast = [];
    if (jsonData && jsonData.actor) {
      cast = Array.isArray(jsonData.actor) ? jsonData.actor.map(a => a.name) : [jsonData.actor.name];
    } else {
      const castElements = document.querySelectorAll('a[data-testid="title-cast-item__actor"]');
      cast = Array.from(castElements).map(el => el.textContent.trim());
    }

    // Extract genres
    let genres = [];
    if (jsonData && jsonData.genre) {
      genres = Array.isArray(jsonData.genre) ? jsonData.genre : [jsonData.genre];
    } else {
      const genreElements = document.querySelectorAll('a.sc-16ede01-3, span.ipc-chip__text');
      genres = Array.from(genreElements).map(el => el.textContent.trim());
      // Filter out non-genres
      genres = genres.filter(g => !g.includes('min') && !g.includes('h '));
    }

    // Extract duration
    let duration = '';
    if (jsonData && jsonData.duration) {
      duration = jsonData.duration.replace('PT', '').replace('H', 'h ').replace('M', 'min');
    } else {
      duration = extractText('span[data-testid="runtime"]');
    }

    // Extract country
    const country = "United States"; // Default, this is harder to reliably extract

    // Extract language
    const language = "English"; // Default, this is harder to reliably extract

    // Extract ratings
    let imdbRating = '';
    if (jsonData && jsonData.aggregateRating && jsonData.aggregateRating.ratingValue) {
      imdbRating = jsonData.aggregateRating.ratingValue;
    } else {
      const ratingText = extractText('span[data-testid="hero-rating-bar__aggregate-rating__score"]');
      if (ratingText) {
        const ratingMatch = ratingText.match(/[\d.]+/);
        imdbRating = ratingMatch ? ratingMatch[0] : '';
      }
    }

    // Current year for releaseDate if year is missing
    if (!releaseYear) releaseYear = new Date().getFullYear();

    // Build the MDX content with placeholder values for certain fields
    const mdxContent = `---
id: ${id}
slug: ${slug}
author: Joe Lloyd
mediaType: movie
thumbnail: ../images/${slug}.webp
title: "${title}"
synopsis: "${synopsis}"
releaseDate: "${releaseYear}-01-01"
watchDate: "YYYY-MM-DD"
personalRating: 0
isFavorite: false
posterUrl: ../images/${slug}.webp
director: "${director}"
releaseYear: "${releaseYear}"
genres: [${genres.map(g => `"${g}"`).join(', ')}]
duration: "${duration}"
language: "${language}"
country: "${country}"
cast: [${cast.map(c => `"${c}"`).join(', ')}]
createdDate: ${new Date().toISOString().split('T')[0]}
rating:
  imdb: ${imdbRating}
  metacritic: -1
  rottenTomatoes: -1
---`;

    console.log('Movie data extracted:');
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
    textarea.style.height = '300px';
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
    closeBtn.style.top = '300px';
    closeBtn.style.zIndex = '9999';
    closeBtn.style.padding = '5px';
    closeBtn.onclick = function() {
      document.body.removeChild(textarea);
      document.body.removeChild(closeBtn);
    };
    document.body.appendChild(closeBtn);

    return mdxContent;

  } catch (error) {
    console.error('Error scraping movie data:', error);
    return null;
  }
}

// Run the function and return the result
scrapeIMDbMovie();
