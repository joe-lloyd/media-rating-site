// Wikipedia Video Game Scraper
// Run this in your browser console when on a Wikipedia page for a video game

(function() {
  function generateSlug(title) {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function extractInfoboxData() {
    const infobox = document.querySelector('.infobox');
    if (!infobox) return {};

    const rows = infobox.querySelectorAll('tr');
    const data = {};

    rows.forEach(row => {
      const header = row.querySelector('th');
      const value = row.querySelector('td');
      if (header && value) {
        const key = header.textContent.trim();
        data[key] = value.textContent.trim();
      }
    });

    return data;
  }

  function extractMetacriticScore() {
    // Look for Metacritic mentions in the page
    const metacriticText = Array.from(document.querySelectorAll('a[href*="metacritic.com"]'))
      .map(el => {
        const parent = el.closest('p, li, td');
        return parent ? parent.textContent : '';
      })
      .join(' ');

    const metacriticMatch = metacriticText.match(/(\d{1,2}|100)(\s*\/\s*100)?/);
    return metacriticMatch ? parseInt(metacriticMatch[1]) : -1;
  }

  function extractSynopsis() {
    // Get the first paragraph after the first heading as synopsis
    const firstParagraph = document.querySelector('#mw-content-text > div > p:not(.mw-empty-elt)');
    return firstParagraph ?
      firstParagraph.textContent
        .trim()
        .replace(/\[\d+\]/g, '') // Remove citation numbers
        .replace(/"/g, '\\"') :
      'No synopsis available';
  }

  function extractTags() {
    // Extract tags from categories
    const categories = Array.from(document.querySelectorAll('.catlinks li a'))
      .map(a => a.textContent.trim())
      .filter(text =>
        text.includes('video games') ||
        text.includes('horror') ||
        text.includes('action') ||
        text.includes('adventure') ||
        text.includes('RPG') ||
        text.includes('shooter'),
      )
      .map(tag => tag.replace(/^Category:|video games$|games$/g, '').trim());

    // Add some generic tags based on text content
    const content = document.body.textContent.toLowerCase();
    const possibleTags = [
      { term: 'horror', tag: 'horror' },
      { term: 'rpg', tag: 'rpg' },
      { term: 'shooter', tag: 'shooter' },
      { term: 'adventure', tag: 'adventure' },
      { term: 'action', tag: 'action' },
      { term: 'puzzle', tag: 'puzzle' },
      { term: 'platformer', tag: 'platformer' },
      { term: 'strategy', tag: 'strategy' },
    ];

    possibleTags.forEach(({ term, tag }) => {
      if (content.includes(term) && !categories.includes(tag)) {
        categories.push(tag);
      }
    });

    return [...new Set(categories)]; // Remove duplicates
  }

  // Extract data from the page
  const infoboxData = extractInfoboxData();

  const title = document.querySelector('#firstHeading')?.textContent.trim() || 'Unknown Title';
  const slug = generateSlug(title);

  const releaseDate = infoboxData['Release'] || infoboxData['Released'] || infoboxData['First release'] || 'Unknown';
  // Try to parse and format the date correctly if possible
  let formattedReleaseDate = 'Unknown';
  if (releaseDate !== 'Unknown') {
    // Try to extract year
    const yearMatch = releaseDate.match(/\b\d{4}\b/);
    if (yearMatch) {
      formattedReleaseDate = yearMatch[0];
    }
  }

  const studio = infoboxData['Developer(s)'] || infoboxData['Developer'] || 'Unknown';
  const metacriticScore = extractMetacriticScore();
  const synopsis = extractSynopsis();
  const tags = extractTags();

  // Generate a random ID
  const id = Math.floor(Math.random() * 10000);

  // Current date for createdDate
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,
    '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Create the MDX content
  const mdxContent = `---
    id: ${id}
    mediaType: video-game
    title: "${title}"
    author: Joe Lloyd
    releaseDate: "${formattedReleaseDate}"
    dateFinished: "YYYY-MM-DD"
    slug: ${slug}
    personalRating: "Unknown"
    thumbnail: ../images/${slug}.webp
    tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
    timePlayed: Unknown hours
    synopsis: "${synopsis}"
    isFavorite: false
    studio: "${studio}"
    averageDuration: "Unknown"
    createdDate: "${formattedDate}"
    rating:
      steam: -1
      metacritic: ${metacriticScore}
      ign: -1
      gamespot: -1
    ---`;

  // Output the result
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

  console.log('Content copied to clipboard!');
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

  return content;
})();
