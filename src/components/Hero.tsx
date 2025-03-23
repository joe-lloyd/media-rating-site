import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';

interface HeroProps {
  title: string;
  mediaType?: 'movie' | 'tv-series' | 'album' | 'video-game';
  image: ImageDataLike;
}

const Hero: React.FC<HeroProps> = ({
  title,
  mediaType = 'video-game',
  image,
}) => {
  const gatsbyImage = getImage(image) as IGatsbyImageData;

  return (
    <div className="relative h-[500px] overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
