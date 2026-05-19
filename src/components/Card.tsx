import React from "react";
import { Link } from "gatsby";
import Media from "../types/Media";
import RatingStars from "./atoms/RatingStars";
import RatingTag from "./atoms/RatingTag";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import type { IGatsbyImageData } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser";

const Card = ({ media }: { media: Media }) => {
  const thumb = getImage(media.thumbnail) as IGatsbyImageData;
  const mediaPath = {
    album: "albums",
    "video-game": "video-games",
    movie: "movies",
    "tv-series": "tv-series",
    book: "books",
  }[media.mediaType];

  return (
    <Link
      to={`/${mediaPath}/${media.slug}`}
      className="flex flex-col w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-sm mx-auto hover:border-amber-400/50 transition-colors"
    >
      <GatsbyImage
        image={thumb}
        alt={`${media.thumbnail} image`}
        className="object-contain h-72"
      />
      <div className="flex flex-1 content-between flex-col justify-between">
        <div className="p-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-50">
            {media.title}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <RatingStars rating={media.personalRating} />
            <RatingTag rating={media.personalRating} />
          </div>
          <div>
            <p>{media.synopsis}</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-2.5 bg-gray-900 border-t border-gray-700 rounded-b-lg">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <p className="text-sm text-gray-400">
              {media.createdDate}
            </p>
          </div>
          <div className="flex items-center">
            <FaTag className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-400 capitalize">
              {media.mediaType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
