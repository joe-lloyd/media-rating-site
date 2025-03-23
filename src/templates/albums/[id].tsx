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
      <h2 className="text-xl text-gray-700 dark:text-gray-300 mt-1">{album.artist}</h2>
      <p className="mt-2"><strong>Last Listened:</strong> {album.lastListenedDate}</p>
      <p className="mt-2"><strong>Favorite Track:</strong> {album.favoriteTrack}</p>
    </>
  );

  // Sidebar content
  const sidebarContent = (
    <>
      <DetailSidebarBox title="Ratings">
        <ul className="list-disc list-inside">
          <li><strong>Pitchfork:</strong> {album.rating.pitchfork}</li>
          <li><strong>Metacritic:</strong> {album.rating.metacritic}</li>
          <li><strong>Album of the Year:</strong> {album.rating.albumOfTheYear}</li>
        </ul>
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-disc list-inside">
          <li><strong>Release Year:</strong> {album.releaseYear}</li>
          <li><strong>Genres:</strong> {album.genres.join(', ')}</li>
          <li><strong>Number of Tracks:</strong> {album.tracks}</li>
          <li><strong>Label:</strong> {album.label}</li>
          <li><strong>Duration:</strong> {album.duration} minutes</li>
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
