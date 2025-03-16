import React from 'react';
import Layout from '../components/Layout';
import CardList from '../components/CardList';
import Card from '../components/Card';
import { graphql } from 'gatsby';
import Media from '../types/Media';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: Media
      }[]
    }
  }
}

const HomePage: React.FC<Props> = ({ data }) => {
  const allMedia: Media[] = data.allMdx.nodes.map((node: { frontmatter : Media}) => node.frontmatter);

  return (
    <Layout title="Home">
      <CardList>
        {allMedia.map((media) => (<Card media={media} key={media.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query AllMediaQuery {
        allMdx {
            nodes {
                frontmatter {
                    id
                    slug
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
                }
            }
        }
    }
`;


export default HomePage;
