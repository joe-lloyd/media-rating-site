import React from 'react';

interface HeroProps {
  title: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  backgroundImage = '/images/video-game-banner.png',
}) => {

  return (
    <div className="relative h-96">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white p-6 bg-zinc-800 rounded-xl ">{title}</h1>
      </div>
    </div>
  );
};

export default Hero;
