import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../../components/Layout';

interface Props {
  data: {
    mdx: {
      frontmatter: {
        id: string;
        mediaType: string;
        title: string;
        author: string;
        releaseDate: string;
        dateFinished: string;
        slug: string;
        personalRating: string;
        thumbnail: string;
        tags: string;
        timePlayed: string;
        synopsis: string;
        isFavorite: string;
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

const VideoGamesDetailPage: React.FC<Props> = () => {
    return (
      <Layout title="video game title">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main content */}
            <div className="md:col-span-2">
              <img src="thumbnail" alt="title" className="w-full rounded-lg shadow-md" />
              <h1 className="text-3xl font-bold mt-4">title</h1>
              <p className="text-gray-600 mt-2">synopsis</p>
              <div className="flex items-center mt-4">
                <span className="ml-2 text-gray-600">personalRating</span>
              </div>
              <p className="mt-2"><strong>Release Date:</strong> releaseDate</p>
              <p className="mt-2"><strong>Author:</strong> author</p>
              <p className="mt-2"><strong>Studio:</strong> studio</p>
              <p className="mt-2"><strong>Time Played:</strong> timePlayed</p>
              <p className="mt-2"><strong>Average Duration:</strong> averageDuration</p>
              <p className="mt-2"><strong>Rating:</strong> steam</p>
              <p className="mt-2"><strong>Rating:</strong> metacritic</p>
              <p className="mt-2"><strong>Rating:</strong> ign</p>
              <p className="mt-2"><strong>Rating:</strong> gamespot</p>
              <Link to="/video-games">Back to Video Games</Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
;


export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                id
                mediaType
                title
                author
                releaseDate
                dateFinished
                slug
                personalRating
                thumbnail
                tags
                timePlayed
                synopsis
                isFavorite
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
