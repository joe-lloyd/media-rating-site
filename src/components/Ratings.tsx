import React from 'react';
import {
  FaStar,
  FaSteam,
  FaImdb, FaGamepad,
} from 'react-icons/fa';
import { MdAlbum } from 'react-icons/md';
import { SiIgn, SiMetacritic, SiRottentomatoes } from 'react-icons/si';
import { GiPitchfork } from 'react-icons/gi';

interface RatingProps {
  personalRating: number;
  ratings: {
    // Video game ratings
    steam?: string;
    metacritic?: string;
    ign?: string;
    gamespot?: string;

    // Movie/TV ratings
    imdb?: string;
    rottenTomatoes?: string;

    // Album ratings
    pitchfork?: string;
    albumOfTheYear?: string;
  };
}

const Ratings: React.FC<RatingProps> = ({ personalRating, ratings }) => {
  return (
    <ul className="list-none space-y-2">
      <li className="flex items-center">
        <FaStar className="mr-2 text-yellow-300" />
        <strong className="pr-1">Personal Rating:</strong> {personalRating}
      </li>

      {/* Video Game Ratings */}
      {ratings.steam && ratings.steam !== '-1' && (
        <li className="flex items-center">
          <FaSteam className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">Steam:</strong> {ratings.steam}
        </li>
      )}

      {/* General Metacritic Rating */}
      {ratings.metacritic && ratings.metacritic !== '-1' && (
        <li className="flex items-center">
          <SiMetacritic className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">Metacritic:</strong> {ratings.metacritic}
        </li>
      )}

      {/* Video Game Specific */}
      {ratings.ign && ratings.ign !== '-1' && (
        <li className="flex items-center">
          <SiIgn className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">IGN:</strong> {ratings.ign}
        </li>
      )}

      {ratings.gamespot && ratings.gamespot !== '-1' && (
        <li className="flex items-center">
          <FaGamepad className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">GameSpot:</strong> {ratings.gamespot}
        </li>
      )}

      {/* Movie/TV Specific */}
      {ratings.imdb && ratings.imdb !== '-1' && (
        <li className="flex items-center">
          <FaImdb className="mr-2 text-yellow-400" />
          <strong className="pr-1">IMDB:</strong> {ratings.imdb}
        </li>
      )}

      {ratings.rottenTomatoes && ratings.rottenTomatoes !== '-1' && (
        <li className="flex items-center">
          <SiRottentomatoes className="mr-2 text-red-600" />
          <strong className="pr-1">Rotten Tomatoes:</strong> {ratings.rottenTomatoes}
        </li>
      )}

      {/* Album Specific */}
      {ratings.pitchfork && ratings.pitchfork !== '-1' && (
        <li className="flex items-center">
          <GiPitchfork className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">Pitchfork:</strong> {ratings.pitchfork}
        </li>
      )}

      {ratings.albumOfTheYear && ratings.albumOfTheYear !== '-1' && (
        <li className="flex items-center">
          <MdAlbum className="mr-2 text-gray-700 dark:text-gray-200" />
          <strong className="pr-1">Album of the Year:</strong> {ratings.albumOfTheYear}
        </li>
      )}
    </ul>
  );
};

export default Ratings;
