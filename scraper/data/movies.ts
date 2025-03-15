import Movie from '../../src/types/Movie';

const movies: Movie[] = [
  {
    id: '1',
    title: "Alien: Romulus",
    director: "Fede Álvarez",
    releaseYear: 2024,
    genres: ["Horror", "Science Fiction"],
    duration: 119,
    posterUrl: "https://www.imdb.com/title/tt2316204/mediaviewer/rm4289826816/",
    thumbnail: "https://www.imdb.com/title/tt2316204/mediaviewer/rm4289826816/",
    slug: "alien-romulus",
    synopsis: "A new chapter in the Alien franchise, set in the near future on a distant planet.",
    releaseDate: new Date("2024-08-16"),
    language: "English",
    country: "United States",
    cast: [],
    rating: {
      imdb: 7.1,
      rottenTomatoes: 88,
      metacritic: 64,
    },
    personalRating: 8,
    isFavorite: true,
  }
]
