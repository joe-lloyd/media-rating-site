import React from 'react';
            import { Link } from 'gatsby';
            import Media from '../types/Media';
            import RatingStars from './atoms/RatingStars';
            import RatingTag from './atoms/RatingTag';
            import { GatsbyImage, getImage } from 'gatsby-plugin-image';
            import { FaCalendarAlt, FaTag } from 'react-icons/fa';
            import type {
              IGatsbyImageData,
            } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';

            const Card = ({ media }: { media: Media }) => {
              const thumb = getImage(media.thumbnail) as IGatsbyImageData;
              const mediaPath = {
                'album': 'albums',
                'video-game': 'video-games',
                'movie': 'movies',
                'tv-series': 'tv-series',
              }[media.mediaType];

              const mediaAddedDate = new Date(parseInt(media.createdDate)).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <Link
                  to={`/${mediaPath}/${media.slug}`}
                  className="grid w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto"
                >
                  <GatsbyImage image={thumb} alt={`${media.thumbnail} image`} className="object-contain h-72" />
                  <div className="flex flex-1 content-between flex-col justify-between">
                    <div className="p-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
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

                    <div
                      className="flex items-center justify-between px-5 py-2.5 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg"
                    >
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {mediaAddedDate}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FaTag className="text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{media.mediaType}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            };

            export default Card;
