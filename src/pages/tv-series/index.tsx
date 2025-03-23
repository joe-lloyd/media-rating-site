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
    <Layout title="TV Series" image={tvSeries[0].thumbnail} mediaType="tv-series">
      <CardList>
        {tvSeries.map((series) => (<Card media={series} key={series.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query TvSeriesQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "tv-series"}}}, sort: {frontmatter: {createdDate: DESC}}) {
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

export default TvSeriesOverviewPage;
