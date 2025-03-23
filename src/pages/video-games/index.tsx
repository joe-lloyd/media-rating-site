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
    <Layout title="Video Games" image={videoGames[0].thumbnail}>
      <CardList>
        {videoGames.map((videoGame) => (<Card media={videoGame} key={videoGame.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query VideoGamesQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "video-game"}}}, sort: {frontmatter: {createdDate: DESC}}) {
            nodes {
                frontmatter {
                    id
                    slug
                    mediaType
                    thumbnail {
                        childImageSharp {
                            gatsbyImageData(
                                width: 400
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                    synopsis
                    title
                    personalRating
                    createdDate
                }
            }
        }
    }
`;


export default VideoGamesOverviewPage;
