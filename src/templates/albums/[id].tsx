import React from 'react';
    import { graphql } from 'gatsby';
    import DetailLayout from '../../components/DetailLayout';
    import DetailSidebarBox from '../../components/DetailSidebarBox';
    import Ratings from '../../components/Ratings';
    import {
      FaCalendarAlt,
      FaMusic,
      FaRecordVinyl,
      FaTag,
      FaClock,
      FaCompactDisc,
      FaHeadphones,
      FaStar
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
            personalRating: number;
            isFavorite: boolean;
            coverUrl: any;
            artist: string;
            releaseYear: number;
            genres: string[];
            tracks: number;
            label: string;
            duration: number;
            favoriteTrack: string;
            lastListenedDate: string;
            rating: {
              pitchfork: string;
              metacritic: string;
              albumOfTheYear: string;
            }
          }
        }
      };
    }

    const AlbumDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
      data: { mdx },
      children,
    }) => {
      const album = mdx.frontmatter;

      // Main info component for the main section
      const mainInfo = (
        <>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mt-1 flex items-center">
            <FaMusic className="mr-2 text-gray-500" />
            {album.artist}
          </h2>
          <p className="mt-2 flex items-center">
            <FaHeadphones className="mr-2 text-gray-500" />
            <strong className="pr-1">Last Listened:</strong> {album.lastListenedDate}
          </p>
          <p className="mt-2 flex items-center">
            <FaStar className="mr-2 text-gray-500" />
            <strong className="pr-1">Favorite Track:</strong> {album.favoriteTrack}
          </p>
        </>
      );

      // Sidebar content
      const sidebarContent = (
        <>
          <DetailSidebarBox title="Ratings">
            <Ratings
              personalRating={album.personalRating}
              ratings={{
                pitchfork: album.rating.pitchfork,
                metacritic: album.rating.metacritic,
                albumOfTheYear: album.rating.albumOfTheYear
              }}
            />
          </DetailSidebarBox>

          <DetailSidebarBox title="Details">
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-700 dark:text-gray-200" />
                <strong className="pr-1">Release Year:</strong> {album.releaseYear}
              </li>
              <li className="flex items-center">
                <FaTag className="mr-2 text-gray-700 dark:text-gray-200" />
                <strong className="pr-1">Genres:</strong> {album.genres.join(', ')}
              </li>
              <li className="flex items-center">
                <FaCompactDisc className="mr-2 text-gray-700 dark:text-gray-200" />
                <strong className="pr-1">Number of Tracks:</strong> {album.tracks}
              </li>
              <li className="flex items-center">
                <FaRecordVinyl className="mr-2 text-gray-700 dark:text-gray-200" />
                <strong className="pr-1">Label:</strong> {album.label}
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-gray-700 dark:text-gray-200" />
                <strong className="pr-1">Duration:</strong> {album.duration} minutes
              </li>
            </ul>
          </DetailSidebarBox>
        </>
      );

      return (
        <DetailLayout
          title={album.title}
          mediaType="album"
          image={album.coverUrl}
          synopsis={album.synopsis}
          personalRating={album.personalRating}
          mainInfo={mainInfo}
          sidebarContent={sidebarContent}
          backLink={{ url: '/albums', text: 'Back to Albums' }}
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
                    personalRating
                    isFavorite
                    coverUrl {
                        childImageSharp {
                            gatsbyImageData(
                                width: 1000
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                    artist
                    releaseYear
                    genres
                    tracks
                    label
                    duration
                    favoriteTrack
                    lastListenedDate
                    rating {
                        pitchfork
                        metacritic
                        albumOfTheYear
                    }
                }
            }
        }
    `;

    export default AlbumDetailPage;
