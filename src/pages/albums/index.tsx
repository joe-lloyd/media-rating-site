import React from 'react';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import { graphql } from 'gatsby';
import Album from '../../types/Album';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: Album
      }[]
    }
  }
}

const AlbumsOverviewPage: React.FC<Props> = ({ data }) => {
  const albums: Album[] = data.allMdx.nodes.map((node: { frontmatter : Album}) => node.frontmatter);
  return (
    <Layout title="Albums">
      <CardList>
        {albums.map((album) => (<Card media={album} key={album.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query AlbumQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "album"}}}) {
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

export default AlbumsOverviewPage;
