import React from "react";
import { Link } from 'gatsby';
import Media from '../types/Media';
import RatingStars from './atoms/RatingStars';
import RatingTag from './atoms/RatingTag';

const MovieCard = ({ media }: { media: Media }) => {
  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <Link to={`./${media.slug}`}>
        <img
          className="rounded-t-lg" src={media.thumbnail}
          alt="product image"
        />
      </Link>
      <div className="p-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {media.title}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <RatingStars rating={media.personalRating} />
          <RatingTag rating={media.personalRating} />
        </div>
        <div>
          <p>{media.synopsis}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
