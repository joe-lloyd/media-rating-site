import React from 'react';
import Layout from '../../components/Layout';
import { graphql, Link } from 'gatsby';
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
        personalRating: number;
        isFavorite: boolean;
        coverUrl: string;
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
  }
}

const AlbumDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const album = mdx.frontmatter;

  return (
    <Layout title={album.title}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main content */}
          <div className="md:col-span-2">
            <img src={album.coverUrl} alt={album.title} className="w-full rounded-lg shadow-md" />
            <h1 className="text-3xl font-bold mt-4">{album.title}</h1>
            <h2 className="text-xl text-gray-700 mt-1">{album.artist}</h2>
            <p className="text-gray-600 mt-2">{album.synopsis}</p>
            <div className="flex items-center mt-4">
              <RatingStars rating={album.personalRating} />
              <span className="ml-2 text-gray-600">({album.personalRating})</span>
            </div>
            <p className="mt-2"><strong>Last Listened:</strong> {album.lastListenedDate}</p>
            <p className="mt-2"><strong>Favorite Track:</strong> {album.favoriteTrack}</p>
            {children}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Ratings</h2>
              <ul className="list-disc list-inside">
                <li><strong>Pitchfork:</strong> {album.rating.pitchfork}</li>
                <li><strong>Metacritic:</strong> {album.rating.metacritic}</li>
                <li><strong>Album of the Year:</strong> {album.rating.albumOfTheYear}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-zinc-600 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-semibold">Details</h2>
              <ul className="list-disc list-inside">
                <li><strong>Release Year:</strong> {album.releaseYear}</li>
                <li><strong>Genres:</strong> {album.genres.join(', ')}</li>
                <li><strong>Number of Tracks:</strong> {album.tracks}</li>
                <li><strong>Label:</strong> {album.label}</li>
                <li><strong>Duration:</strong> {album.duration} minutes</li>
              </ul>
            </div>
            <div className="mt-4">
              <Link to="/albums" className="text-blue-500 hover:underline">Back to Albums</Link>
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
                thumbnail
                title
                synopsis
                personalRating
                isFavorite
                coverUrl
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
