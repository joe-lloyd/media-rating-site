import Media from './Media';

interface VideoGame extends Media {
  // Basic Info
  developer: string;
  publisher: string;
  releaseDate: Date;
  genres: string[];
  platform: string[]; // eg. PS5, PC, Xbox

  // Game Details
  gameModes: string[]; // eg. Single-player, Multiplayer
  engine: string;
  esrbRating: string; // eg. E for Everyone, M for Mature

  // Objective Data
  rating: {
    metacritic: number;
    ign: number;
  };

  // Personal Experience and Opinion
  personalRating: number; // your own rating out of 10
  timePlayed: number; // in hours
  completionStatus: 'Not Started' | 'In Progress' | 'Completed';

  // Additional Details
  lastPlayedDate: Date;
  isFavorite: boolean;
}

export default VideoGame;
