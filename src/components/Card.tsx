import React from 'react';
import { Link } from 'gatsby';
import Media from '../types/Media';
import RatingStars from './atoms/RatingStars';
import RatingTag from './atoms/RatingTag';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import type {
  IGatsbyImageData
} from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';

const Card = ({ media }: { media: Media }) => {
  console.log(media);
  const thumb = getImage(media.thumbnail) as IGatsbyImageData;
  console.log(thumb);

  return (
    <Link to={`./${media.slug}`} className="grid">
      <div
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto"
      >
        <GatsbyImage image={thumb} alt={`${media.thumbnail} image`} />
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
    </Link>
  );
};

export default Card;
