import React from 'react';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList';
import { graphql } from 'gatsby';
import Movie from '../../types/Movie';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: Movie
      }[]
    }
  }
}

const MoviesOverviewPage: React.FC<Props> = ({ data }) => {
  const movies: Movie[] = data.allMdx.nodes.map((node: { frontmatter : Movie}) => node.frontmatter);
  return (
    <Layout title="Movies">
      <CardList>
        {movies.map((movie) => (<Card media={movie} key={movie.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query MoviesQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "movie"}}}) {
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

export default MoviesOverviewPage;
