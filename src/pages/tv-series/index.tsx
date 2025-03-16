import React from 'react';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import { graphql } from 'gatsby';
import TvSeries from '../../types/TvSeries';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: TvSeries
      }[]
    }
  }
}

const TvSeriesOverviewPage: React.FC<Props> = ({ data }) => {
  const tvSeries: TvSeries[] = data.allMdx.nodes.map((node: { frontmatter : TvSeries}) => node.frontmatter);
  return (
    <Layout title="TV Series">
      <CardList>
        {tvSeries.map((series) => (<Card media={series} key={series.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query TvSeriesQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "tv-series"}}}) {
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

export default TvSeriesOverviewPage;
