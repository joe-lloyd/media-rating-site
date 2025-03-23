import React from 'react';
import Layout from './Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { IGatsbyImageData } from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';
import RatingStars from './atoms/RatingStars';
import { FaArrowLeft } from 'react-icons/fa';
import { MediaType } from '../types/Media';

interface DetailLayoutProps {
  title: string;
  mediaType: MediaType;
  image: IGatsbyImageData;
  synopsis: string;
  personalRating: number;
  mainInfo?: React.ReactNode; // Additional info for the main content
  sidebarContent: React.ReactNode; // Content for the sidebar
  backLink?: {
    url: string;
    text: string;
  };
  children: React.ReactNode;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  image,
  synopsis,
  personalRating,
  mainInfo,
  mediaType,
  sidebarContent,
  backLink,
  children,
}) => {
  const gatsbyImage = getImage(image);

  return (
    <Layout title={title} image={image} mediaType={mediaType}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2">
            {gatsbyImage && (
              <GatsbyImage
                image={gatsbyImage}
                alt={title}
                className="w-full rounded-lg shadow-md"
              />
            )}
            <h1 className="text-3xl font-bold mt-6">{title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3">{synopsis}</p>
            <div className="flex items-center mt-4">
              <RatingStars rating={personalRating} />
              <span className="ml-2 text-gray-600 dark:text-gray-300">({personalRating})</span>
            </div>

            {mainInfo && <div className="mt-4">{mainInfo}</div>}

            <div className="mt-8 prose dark:prose-invert max-w-none">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-6 space-y-6">
              {sidebarContent}

              {backLink && (
                <div className="mt-6">
                  <a
                    href={backLink.url}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <FaArrowLeft className="mr-2" />
                    {backLink.text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailLayout;
