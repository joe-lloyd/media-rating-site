import React from 'react';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import CardList from '../../components/CardList';
import { graphql } from 'gatsby';
import Book from '../../types/Book';

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: Book
      }[]
    }
  }
}

const BooksOverviewPage: React.FC<Props> = ({ data }) => {
  const books: Book[] = data.allMdx.nodes.map((node: { frontmatter : Book}) => node.frontmatter);
  
  // Provide a default image if no books exist yet
  const heroImage = books.length > 0 ? books[0].thumbnail : null;

  return (
    <Layout title="Books" image={heroImage as any} mediaType="book">
      <CardList>
        {books.map((book) => (<Card media={book} key={book.id} />))}
      </CardList>
    </Layout>
  );
};

export const query = graphql`
    query BooksQuery {
        allMdx(filter: {frontmatter: {mediaType: {eq: "book"}}}, sort: {frontmatter: {createdDate: DESC}}) {
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
                                formats: [AUTO, WEBP]
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

export default BooksOverviewPage;
