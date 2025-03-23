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
    <Layout title="Home" image={allMedia[0].thumbnail} mediaType={allMedia[0].mediaType}>
      <CardList>
        {allMedia.map((media) => (<Card media={media} key={media.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query AllMediaQuery {
        allMdx(sort: {frontmatter: {createdDate: DESC}}) {
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


export default HomePage;
