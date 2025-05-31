§export type media = {
  title: string;
  slug: string;
  personalRating: number;
  description: string;
}

export type dataToScrape = {
  movies: media[];
  series: media[];
  albums: media[];
  games: media[];
}

const dataToScrape: dataToScrape = {
  movies: [],
  series: [],
  albums: [],
  games: [
    {
      title: 'Resident Evil 4',
      slug: 'resident-evil-4-2005',
      personalRating: 8,
      description: `
      I must have played RE4 through about 5 times when I was a kid.
      
      The game is fantastic, but never had the same atmosphere as the old games that I loved.
      `
    }
  ],
}

export default dataToScrape;
