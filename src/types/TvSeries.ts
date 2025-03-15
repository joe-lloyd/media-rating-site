import Media from './Media';

interface TvSeries extends Media {
  // site-specific data
  posterUrl: string;

  // Basic Info
  creator: string;
  firstAirDate: number;
  lastAirDate: number | null; // null if still running
  genres: string[];
  network: string;
  seasons: number;
  episodes: number;
  status: 'Running' | 'Ended' | 'Canceled';

  // Cast
  cast: string[];

  // Objective Data
  rating: {
    imdb: number;
    rottenTomatoes: number;
    metacritic: number;
  };

  // Personal Experience
  currentSeason: number;
  currentEpisode: number;
  completionStatus: 'Not Started' | 'In Progress' | 'Completed';
  lastWatchedDate: Date;
}

export default TvSeries;
