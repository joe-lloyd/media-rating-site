import React from 'react';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import { graphql } from 'gatsby';
import Media from '../../types/Media';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: Media
      }[]
    }
  }
}

const VideoGamesOverviewPage: React.FC<Props> = ({ data }) => {
  const videoGames: Media[] = data.allMdx.nodes.map((node: { frontmatter : Media}) => node.frontmatter);
  return (
    <Layout title="Video Games">
      <CardList>
        {videoGames.map((videoGame) => (<Card media={videoGame} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query MyQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "video-game"}}}) {
            nodes {
                frontmatter {
                    id
                    slug
                    thumbnail
                    synopsis
                    title
                    personalRating
                }
            }
        }
    }
`;


export default VideoGamesOverviewPage;
