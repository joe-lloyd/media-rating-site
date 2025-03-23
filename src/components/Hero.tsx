import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';
import { FaFilm, FaTv, FaMusic, FaGamepad } from 'react-icons/fa';
import { MediaType } from '../types/Media';

interface HeroProps {
  title: string;
  mediaType: MediaType;
  image: ImageDataLike;
}

const Hero: React.FC<HeroProps> = ({
  title,
  mediaType,
  image,
}) => {
  const gatsbyImage = getImage(image) as IGatsbyImageData;

  const iconMap = {
    'movie': <FaFilm className="mr-3 ml-3 text-white" />,
    'tv-series': <FaTv className="mr-3 ml-3 text-white" />,
    'album': <FaMusic className="mr-3 ml-3 text-white" />,
    'video-game': <FaGamepad className="mr-3 ml-3 text-white" />
  };

  return (
    <div className="relative h-[300px] overflow-hidden">
      {/* Main visible image with effect */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 blur-xl">
                <GatsbyImage
                  image={gatsbyImage}
                  alt={title}
                  className="w-full h-full"
                  objectFit="cover"
                />
            </div>
        </div>

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-8 max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg flex items-center justify-center">
            {iconMap[mediaType]}
            {title}
            {iconMap[mediaType]}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
