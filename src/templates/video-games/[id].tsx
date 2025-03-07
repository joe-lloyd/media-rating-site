import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../../components/Layout';

const VideoGamesDetailPage = () => {
  return (
    <Layout title="video game title">
        <h1>video games detail</h1>
    </Layout>
  );
};


export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                slug
                title
                author
                dateFinished
                ratingOutOf10
                thumbnail
                tags
                timePlayed
            }
        }
    }
`;

export default VideoGamesDetailPage;
