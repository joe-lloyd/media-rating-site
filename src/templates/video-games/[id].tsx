import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';
import Tag from '../../components/Tag';
import {
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaCode,
  FaTag,
  FaSteam,
  FaNewspaper,
  FaStar,
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
        releaseDate: string;
        dateFinished: string;
        tags: string[];
        timePlayed: string;
        studio: string;
        averageDuration: string;
        rating: {
          steam: string;
          metacritic: string;
          ign: string;
          gamespot: string;
        }
      }
    }
  };
}

const VideoGamesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const game = mdx.frontmatter;

  // Main info component for the main section
  const mainInfo = (
    <>
      <p className="mt-2 flex items-center">
        <FaClock className="mr-2 text-gray-500" />
        <strong className="pr-1">Time Played: </strong> {game.timePlayed}
      </p>
      <p className="mt-2 flex items-center">
        <FaTrophy className="mr-2 text-gray-500" />
        <strong className="pr-1">Completed on: </strong> {game.dateFinished}
      </p>
    </>
  );

  // Sidebar content
  const sidebarContent = (
    <>
      <DetailSidebarBox title="Ratings">
        <ul className="list-disc list-inside">
          <li className="flex items-center">
            <FaStar className="mr-2 text-yellow-300" />
            <strong className="pr-1">Personal Rating:</strong> {game.personalRating}
          </li>
          {game.rating.steam !== '-1' && (
            <li className="flex items-center">
              <FaSteam className="mr-2 text-gray-700 dark:text-gray-200" />
              <strong className="pr-1">Steam:</strong> {game.rating.steam}
            </li>
          )}
          {game.rating.metacritic !== '-1' && (
            <li className="flex items-center">
              <FaNewspaper className="mr-2 text-gray-700 dark:text-gray-200" />
              <strong className="pr-1">Metacritic:</strong> {game.rating.metacritic}
            </li>
          )}
          {game.rating.ign !== '-1' && (
            <li className="flex items-center">
              <FaNewspaper className="mr-2 text-gray-700 dark:text-gray-200" />
              <strong className="pr-1">IGN:</strong> {game.rating.ign}
            </li>
          )}
          {game.rating.gamespot !== '-1' && (
            <li className="flex items-center">
              <FaNewspaper className="mr-2 text-gray-700 dark:text-gray-200" />
              <strong className="pr-1">GameSpot:</strong> {game.rating.gamespot}
            </li>
          )}
        </ul>
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Release Date:</strong> {game.releaseDate}
          </li>
          <li className="flex items-center">
            <FaCode className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Developer:</strong> {game.studio}
          </li>
          <li className="flex items-center">
            <FaClock className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Average Duration:</strong> {game.averageDuration}
          </li>
          <li className="flex items-center">
            <FaTag className="mr-2 text-gray-700 dark:text-gray-200" />
            <strong className="pr-1">Tags:</strong>
            <div className="flex flex-wrap gap-1">
              {game.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          </li>
        </ul>
      </DetailSidebarBox>
    </>
  );

  return (
    <DetailLayout
      title={game.title}
      mediaType="video-game"
      image={game.thumbnail}
      synopsis={game.synopsis}
      personalRating={game.personalRating}
      mainInfo={mainInfo}
      sidebarContent={sidebarContent}
      backLink={{ url: '/video-games', text: 'Back to Video Games' }}
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
                releaseDate
                dateFinished
                tags
                timePlayed
                studio
                averageDuration
                rating {
                    steam
                    metacritic
                    ign
                    gamespot
                }
            }
        }
    }
`;

export default VideoGamesDetailPage;
