import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';

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
    <p className="mt-2"><strong>Watch Date:</strong> {movie.watchDate}</p>
  );

  // Sidebar content
  const sidebarContent = (
    <>
      <DetailSidebarBox title="Ratings">
        <ul className="list-disc list-inside">
          <li><strong>IMDB:</strong> {movie.rating.imdb}</li>
          <li><strong>Metacritic:</strong> {movie.rating.metacritic}</li>
          <li><strong>Rotten Tomatoes:</strong> {movie.rating.rottenTomatoes}</li>
        </ul>
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-disc list-inside">
          <li><strong>Release Date:</strong> {movie.releaseDate}</li>
          <li><strong>Director:</strong> {movie.director}</li>
          <li><strong>Release Year:</strong> {movie.releaseYear}</li>
          <li><strong>Genres:</strong> {movie.genres.join(', ')}</li>
          <li><strong>Duration:</strong> {movie.duration}</li>
          <li><strong>Language:</strong> {movie.language}</li>
          <li><strong>Country:</strong> {movie.country}</li>
          <li><strong>Cast:</strong> {movie.cast.join(', ')}</li>
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
