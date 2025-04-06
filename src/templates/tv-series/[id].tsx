import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';
import Ratings from '../../components/Ratings';
import {
  FaCalendarAlt,
  FaFilm,
  FaNetworkWired,
  FaGlobe,
  FaTheaterMasks,
  FaTv,
  FaEye,
  FaRegListAlt,
  FaRegPlayCircle,
  FaRegClock,
  FaCheckCircle,
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
        posterUrl: any;
        creator: string;
        firstAirDate: string;
        lastAirDate: string;
        genres: string[];
        network: string;
        seasons: number;
        episodes: number;
        status: string;
        cast: string[];
        currentSeason: number;
        currentEpisode: number;
        completionStatus: string;
        lastWatchedDate: string;
        rating: {
          imdb: string;
          metacritic: string;
          rottenTomatoes: string;
        }
      }
    }
  };
}

const TvSeriesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const series = mdx.frontmatter;

  // Main info component for the main section
  const mainInfo = (
    <>
      <p className="mt-2 flex items-center">
        <FaEye className="mr-2 text-gray-500" />
        <strong className="pr-1">Last Watched:</strong> {series.lastWatchedDate}
      </p>
      <p className="mt-2 flex items-center">
        <FaRegPlayCircle className="mr-2 text-gray-500" />
        <strong className="pr-1">Progress:</strong> Season {series.currentSeason},
        Episode {series.currentEpisode}
      </p>
      <p className="mt-2 flex items-center">
        <FaCheckCircle className="mr-2 text-gray-500" />
        <strong className="pr-1">Status:</strong> {series.completionStatus}
      </p>
    </>
  );

  // Sidebar content
  const sidebarContent = (
    <>
      <DetailSidebarBox title="Ratings">
        <Ratings
          personalRating={series.personalRating}
          ratings={{
            imdb: series.rating.imdb,
            metacritic: series.rating.metacritic,
            rottenTomatoes: series.rating.rottenTomatoes,
          }}
        />
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <FaFilm className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Creator:</strong> {series.creator}
          </li>
          <li className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">First Air Date:</strong> {series.firstAirDate}
          </li>
          <li className="flex items-center">
            <FaRegClock className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Last Air Date:</strong> {series.lastAirDate || 'Still Running'}
          </li>
          <li className="flex items-center">
            <FaGlobe className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Genres:</strong> {series.genres.join(', ')}
          </li>
          <li className="flex items-center">
            <FaNetworkWired className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Network:</strong> {series.network}
          </li>
          <li className="flex items-center">
            <FaRegListAlt className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Seasons:</strong> {series.seasons}
          </li>
          <li className="flex items-center">
            <FaTv className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Episodes:</strong> {series.episodes}
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Status:</strong> {series.status}
          </li>
          <li className="flex items-start">
            <FaTheaterMasks className="mr-2 mt-1 text-gray-700 dark:text-gray-200" />
            <div>
              <strong className="pr-1">Cast:</strong> {series.cast.join(', ')}
            </div>
          </li>
        </ul>
      </DetailSidebarBox>
    </>
  );

  return (
    <DetailLayout
      title={series.title}
      mediaType="tv-series"
      image={series.posterUrl}
      synopsis={series.synopsis}
      personalRating={series.personalRating}
      mainInfo={mainInfo}
      sidebarContent={sidebarContent}
      backLink={{ url: '/tv-series', text: 'Back to TV Series' }}
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
                            formats: [AUTO, WEBP]
                        )
                    }
                }
                title
                synopsis
                personalRating
                isFavorite
                posterUrl {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1000
                            placeholder: BLURRED
                            formats: [AUTO, WEBP]
                        )
                    }
                }
                creator
                firstAirDate
                lastAirDate
                genres
                network
                seasons
                episodes
                status
                cast
                currentSeason
                currentEpisode
                completionStatus
                lastWatchedDate
                rating {
                    imdb
                    metacritic
                    rottenTomatoes
                }
            }
        }
    }
`;

export default TvSeriesDetailPage;
