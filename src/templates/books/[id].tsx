import React from 'react';
import { graphql } from 'gatsby';
import DetailLayout from '../../components/DetailLayout';
import DetailSidebarBox from '../../components/DetailSidebarBox';
import Ratings from '../../components/Ratings';
import {
  FaCalendarAlt,
  FaPen,
  FaBookOpen,
  FaGlobe,
  FaLanguage,
  FaBuilding,
  FaEye,
} from 'react-icons/fa';

interface Props {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        id: string;
        slug: string;
        thumbnail: any;
        title: string;
        synopsis: string;
        releaseDate: string;
        dateFinished: string;
        personalRating: number;
        isFavorite: boolean;
        author: string;
        pages: number;
        publisher: string;
        genres: string[];
        language: string;
        rating: {
          goodreads: string;
          amazon: string;
        }
      }
    }
  };
}

const BooksDetailPage: React.FC<React.PropsWithChildren<Props>> = ({
  data: { mdx },
  children,
}) => {
  const book = mdx.frontmatter;

  const mainInfo = (
    <p className="mt-2 flex items-center">
      <FaEye className="mr-2 text-gray-500" />
      <strong className="pr-1">Date Finished:</strong> {book.dateFinished}
    </p>
  );

  const sidebarContent = (
    <>
      <DetailSidebarBox title="Ratings">
        <Ratings
          personalRating={book.personalRating}
          ratings={{
            goodreads: book.rating.goodreads,
            amazon: book.rating.amazon,
          }}
        />
      </DetailSidebarBox>

      <DetailSidebarBox title="Details">
        <ul className="list-none space-y-2">
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaCalendarAlt className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Release Date:</strong> {book.releaseDate}
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaPen className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Author:</strong> {book.author}
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaBookOpen className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Pages:</strong> {book.pages}
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaGlobe className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Genres:</strong> {book.genres.join(', ')}
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaLanguage className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Language:</strong> {book.language}
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-4 h-4 mt-1 block">
              <FaBuilding className="text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <strong className="pr-1">Publisher:</strong> {book.publisher}
            </div>
          </li>
        </ul>
      </DetailSidebarBox>
    </>
  );

  return (
    <DetailLayout
      title={book.title}
      mediaType="book"
      image={book.thumbnail}
      synopsis={book.synopsis}
      personalRating={book.personalRating}
      mainInfo={mainInfo}
      sidebarContent={sidebarContent}
      backLink={{ url: '/books', text: 'Back to Books' }}
    >
      {children}
    </DetailLayout>
  );
};

export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                id
                slug
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1000
                            placeholder: BLURRED
                            formats: [AUTO, WEBP]
                        )
                    }
                }
                title
                synopsis
                releaseDate
                dateFinished
                personalRating
                isFavorite
                author
                pages
                publisher
                genres
                language
                rating {
                    goodreads
                    amazon
                }
            }
        }
    }
`;

export default BooksDetailPage;
