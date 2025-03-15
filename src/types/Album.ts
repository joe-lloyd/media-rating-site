import Media from './Media';

interface Album extends Media {
  // site-specific data
  coverUrl: string;

  // Basic Info
  artist: string;
  releaseYear: number;
  genres: string[];
  tracks: number;
  label: string;
  duration: number; // in minutes

  // Objective Data
  rating: {
    pitchfork: number;
    metacritic: number;
    albumOfTheYear: number;
  };

  // Personal Experience
  favoriteTrack: string;
  lastListenedDate: Date;
}

export default Album;
