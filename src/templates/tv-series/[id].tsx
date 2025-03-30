import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';
import Ratings from '../../components/Ratings';

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
      <p className="mt-2"><strong>Last Watched Date:</strong> {series.lastWatchedDate}</p>
      <p className="mt-2"><strong>Progress:</strong> Season {series.currentSeason},
        Episode {series.currentEpisode}</p>
      <p className="mt-2"><strong>Status:</strong> {series.completionStatus}</p>
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
            rottenTomatoes: series.rating.rottenTomatoes
          }}
        />
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-disc list-inside">
          <li><strong>Creator:</strong> {series.creator}</li>
          <li><strong>First Air Date:</strong> {series.firstAirDate}</li>
          <li><strong>Last Air Date:</strong> {series.lastAirDate || 'Still Running'}</li>
          <li><strong>Genres:</strong> {series.genres.join(', ')}</li>
          <li><strong>Network:</strong> {series.network}</li>
          <li><strong>Seasons:</strong> {series.seasons}</li>
          <li><strong>Episodes:</strong> {series.episodes}</li>
          <li><strong>Status:</strong> {series.status}</li>
          <li><strong>Cast:</strong> {series.cast.join(', ')}</li>
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

