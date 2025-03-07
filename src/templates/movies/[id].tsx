import React from 'react';
import Layout from '../../components/Layout';
import { graphql } from 'gatsby';
import RatingStars from '../../components/atoms/RatingStars';

interface Props {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        id: string;
        slug: string;
        thumbnail: string;
        title: string;
        synopsis: string;
        releaseDate: string;
        watchDate: string;
        personalRating: number;
        isFavorite: boolean;
        posterUrl: string;
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
  }
}

const MoviesDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const movie = mdx.frontmatter;

  return (
    <Layout title={movie.title}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main content */}
          <div className="md:col-span-2">
            <img src={movie.posterUrl} alt={movie.title} className="w-full rounded-lg shadow-md" />
            <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
            <p className="text-gray-600 mt-2">{movie.synopsis}</p>
            <div className="flex items-center mt-4">
              <RatingStars rating={movie.personalRating} />
              <span className="ml-2 text-gray-600">({movie.personalRating})</span>
            </div>
            <p className="mt-2"><strong>Watch Date:</strong> {movie.watchDate}</p>
            {children}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Ratings</h2>
              <ul className="list-disc list-inside">
                <li><strong>IMDB:</strong> {movie.rating.imdb}</li>
                <li><strong>Metacritic:</strong> {movie.rating.metacritic}</li>
                <li><strong>Rotten Tomatoes:</strong> {movie.rating.rottenTomatoes}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-semibold">Favorite</h2>
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Details</h2>
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
              </div>
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
                id,
                slug,
                thumbnail,
                title,
                synopsis,
                releaseDate,
                watchDate,
                personalRating,
                isFavorite,
                posterUrl,
                director,
                releaseYear,
                genres,
                duration,
                language,
                country,
                cast,
                rating {
                    imdb,
                    metacritic,
                    rottenTomatoes,
                },
            }
        }
    }
`;

export default MoviesDetailPage;
