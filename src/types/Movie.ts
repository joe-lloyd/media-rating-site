import Media from './Media';

interface Movie extends Media {
  // site-specific data
  posterUrl: string;

  // Basic Info
  director: string;
  releaseYear: number;
  genres: string[];
  duration: number;
  language: string;
  country: string;

  // Cast
  cast: string[];

  // Objective Data
  rating: {
    imdb: number;
    rottenTomatoes: number;
    metacritic: number;
  };
}

export default Movie;
