import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';
import Tag from '../../components/Tag';
import Ratings from '../../components/Ratings';
import {
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaCode,
  FaTag,
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
        <Ratings
          personalRating={game.personalRating}
          ratings={{
            steam: game.rating.steam,
            metacritic: game.rating.metacritic,
            ign: game.rating.ign,
            gamespot: game.rating.gamespot,
          }}
        />
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-none space-y-2">
          <li className="flex items-start gap-2.5">
  <div className="w-4 h-4 mt-1 block">
    <FaCalendarAlt className="text-gray-700 dark:text-gray-200" />
  </div>
  <div>
    <strong className="pr-1">Release Date:</strong> {game.releaseDate}
  </div>
</li>
          <li className="flex items-start gap-2.5">
  <div className="w-4 h-4 mt-1 block">
    <FaCode className="text-gray-700 dark:text-gray-200" />
  </div>
  <div>
    <strong className="pr-1">Developer:</strong> {game.studio}
  </div>
</li>
          <li className="flex items-start gap-2.5">
  <div className="w-4 h-4 mt-1 block">
    <FaClock className="text-gray-700 dark:text-gray-200" />
  </div>
  <div>
    <strong className="pr-1">Average Duration:</strong> {game.averageDuration}
  </div>
</li>
          <li className="flex items-start gap-2.5">
  <div className="w-4 h-4 mt-1 block">
    <FaTag className="text-gray-700 dark:text-gray-200" />
  </div>
  <div>
    <strong className="pr-1">Tags:</strong>
    <div className="flex flex-wrap gap-1">
      {game.tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
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
                            formats: [AUTO, WEBP]
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
