import React from 'react';
          import { graphql } from 'gatsby';
          import DetailLayout from '../../components/DetailLayout';
          import DetailSidebarBox from '../../components/DetailSidebarBox';
          import Ratings from '../../components/Ratings';
          import {
            FaCalendarAlt,
            FaFilm,
            FaClock,
            FaGlobe,
            FaLanguage,
            FaTheaterMasks,
            FaMapMarker,
            FaEye
          } from 'react-icons/fa';

          interface Props {
            data: {
              mdx: {
                body: string;
                frontmatter: {
                  id: string;
                  slug: string;
                  thumbnail: any;
                  title: string;
                  synopsis: string;
                  releaseDate: string;
                  watchDate: string;
                  personalRating: number;
                  isFavorite: boolean;
                  posterUrl: any;
                  director: string;
                  releaseYear: string;
                  genres: string[];
                  duration: string;
                  language: string;
                  country: string;
                  cast: string[];
                  rating: {
                    imdb: string;
                    metacritic: string;
                    rottenTomatoes: string;
                  }
                }
              }
            };
          }

          const MoviesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
            data: { mdx },
            children,
          }) => {
            const movie = mdx.frontmatter;

            // Main info component for the main section
            const mainInfo = (
              <p className="mt-2 flex items-center">
                <FaEye className="mr-2 text-gray-500" />
                <strong className="pr-1">Watch Date:</strong> {movie.watchDate}
              </p>
            );

            // Sidebar content
            const sidebarContent = (
              <>
                <DetailSidebarBox title="Ratings">
                  <Ratings
                    personalRating={movie.personalRating}
                    ratings={{
                      imdb: movie.rating.imdb,
                      metacritic: movie.rating.metacritic,
                      rottenTomatoes: movie.rating.rottenTomatoes
                    }}
                  />
                </DetailSidebarBox>

                <DetailSidebarBox title="Details">
                  <ul className="list-none space-y-2">
                    <li className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Release Date:</strong> {movie.releaseDate}
                    </li>
                    <li className="flex items-center">
                      <FaFilm className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Director:</strong> {movie.director}
                    </li>
                    <li className="flex items-center">
                      <FaClock className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Duration:</strong> {movie.duration}
                    </li>
                    <li className="flex items-center">
                      <FaGlobe className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Genres:</strong> {movie.genres.join(', ')}
                    </li>
                    <li className="flex items-center">
                      <FaLanguage className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Language:</strong> {movie.language}
                    </li>
                    <li className="flex items-center">
                      <FaMapMarker className="mr-2 text-gray-700 dark:text-gray-200" />
                      <strong className="pr-1">Country:</strong> {movie.country}
                    </li>
                    <li className="flex items-start">
                      <FaTheaterMasks className="mr-2 mt-1 text-gray-700 dark:text-gray-200" />
                      <div>
                        <strong className="pr-1">Cast:</strong> {movie.cast.join(', ')}
                      </div>
                    </li>
                  </ul>
                </DetailSidebarBox>
              </>
            );

            return (
              <DetailLayout
                title={movie.title}
                mediaType="movie"
                image={movie.posterUrl}
                synopsis={movie.synopsis}
                personalRating={movie.personalRating}
                mainInfo={mainInfo}
                sidebarContent={sidebarContent}
                backLink={{ url: '/movies', text: 'Back to Movies' }}
              >
                {children}
              </DetailLayout>
            );
          };

          export const query = graphql`
              query($id: String!) {
                  mdx(id: { eq: $id }) {
                      frontmatter {
                          id
                          slug
                          thumbnail {
                              childImageSharp {
                                  gatsbyImageData(
                                      width: 1000
                                      placeholder: BLURRED
                                      formats: [AUTO, WEBP, AVIF]
                                  )
                              }
                          }
                          title
                          synopsis
                          releaseDate
                          watchDate
                          personalRating
                          isFavorite
                          posterUrl {
                              childImageSharp {
                                  gatsbyImageData(
                                      width: 1000
                                      placeholder: BLURRED
                                      formats: [AUTO, WEBP, AVIF]
                                  )
                              }
                          }
                          director
                          releaseYear
                          genres
                          duration
                          language
                          country
                          cast
                          rating {
                              imdb
                              metacritic
                              rottenTomatoes
                          }
                      }
                  }
              }
          `;

          export default MoviesDetailPage;
