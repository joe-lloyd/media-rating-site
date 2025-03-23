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
        posterUrl: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          }
        }
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
  }
}

const TvSeriesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const series = mdx.frontmatter;
  const image = getImage(series.posterUrl);

  return (
    <Layout title={series.title} image={series.posterUrl}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main content */}
          <div className="md:col-span-2">
            {image && (
              <GatsbyImage image={image} alt={series.title} className="w-full rounded-lg shadow-md" />
            )}
            <h1 className="text-3xl font-bold mt-4">{series.title}</h1>
            <p className="text-gray-600 mt-2">{series.synopsis}</p>
            <div className="flex items-center mt-4">
              <RatingStars rating={series.personalRating} />
              <span className="ml-2 text-gray-600">({series.personalRating})</span>
            </div>
            <p className="mt-2"><strong>Last Watched Date:</strong> {series.lastWatchedDate}</p>
            <p className="mt-2"><strong>Progress:</strong> Season {series.currentSeason}, Episode {series.currentEpisode}</p>
            <p className="mt-2"><strong>Status:</strong> {series.completionStatus}</p>
            {children}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Ratings</h2>
              <ul className="list-disc list-inside">
                <li><strong>IMDB:</strong> {series.rating.imdb}</li>
                <li><strong>Metacritic:</strong> {series.rating.metacritic}</li>
                <li><strong>Rotten Tomatoes:</strong> {series.rating.rottenTomatoes}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-semibold">Details</h2>
              <ul className="list-disc list-inside">
                <li><strong>Creator:</strong> {series.creator}</li>
                <li><strong>First Air Date:</strong> {series.firstAirDate}</li>
                <li><strong>Last Air Date:</strong> {series.lastAirDate || "Still Running"}</li>
                <li><strong>Genres:</strong> {series.genres.join(', ')}</li>
                <li><strong>Network:</strong> {series.network}</li>
                <li><strong>Seasons:</strong> {series.seasons}</li>
                <li><strong>Episodes:</strong> {series.episodes}</li>
                <li><strong>Status:</strong> {series.status}</li>
                <li><strong>Cast:</strong> {series.cast.join(', ')}</li>
              </ul>
            </div>
            <div className="mt-4">
              <Link to="/tv-series" className="text-blue-500 hover:underline">Back to TV Series</Link>
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
                posterUrl {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1000
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
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
