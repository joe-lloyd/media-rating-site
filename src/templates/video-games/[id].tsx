import React from 'react';
import Layout from '../../components/Layout';
import { graphql, Link } from 'gatsby';
import RatingStars from '../../components/atoms/RatingStars';
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface Props {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        id: string;
        slug: string;
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          }
        };
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
  }
}

const VideoGamesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const game = mdx.frontmatter;
  const image = getImage(game.thumbnail);

  return (
    <Layout title={game.title}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main content */}
          <div className="md:col-span-2">
            {image && (
              <GatsbyImage
                image={image}
                alt={game.title}
                className="w-full rounded-lg shadow-md"
              />
            )}
            <h1 className="text-3xl font-bold mt-4">{game.title}</h1>
            <p className="text-gray-600 mt-2">{game.synopsis}</p>
            <div className="flex items-center mt-4">
              <RatingStars rating={game.personalRating} />
              <span className="ml-2 text-gray-600">({game.personalRating})</span>
            </div>
            <p className="mt-2"><strong>Time Played:</strong> {game.timePlayed}</p>
            <p className="mt-2"><strong>Completed on:</strong> {game.dateFinished}</p>
            {children}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Ratings</h2>
              <ul className="list-disc list-inside">
                <li><strong>Steam:</strong> {game.rating.steam}</li>
                <li><strong>Metacritic:</strong> {game.rating.metacritic}</li>
                <li><strong>IGN:</strong> {game.rating.ign}</li>
                <li><strong>GameSpot:</strong> {game.rating.gamespot}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-semibold">Details</h2>
              <ul className="list-disc list-inside">
                <li><strong>Release Date:</strong> {game.releaseDate}</li>
                <li><strong>Developer:</strong> {game.studio}</li>
                <li><strong>Average Duration:</strong> {game.averageDuration}</li>
                <li><strong>Tags:</strong> {game.tags.join(', ')}</li>
              </ul>
            </div>
            <div className="mt-4">
              <Link to="/video-games" className="text-blue-500 hover:underline">Back to Video Games</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
                            width: 800
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
