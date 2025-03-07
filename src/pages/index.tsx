import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/Layout';


const HomePage: React.FC<PageProps> = () => {
  return (
    <Layout title={"Home"}>
      content
    </Layout>
  );
};
export default HomePage;

export const Head: HeadFC = () => <title>Home Page</title>;
