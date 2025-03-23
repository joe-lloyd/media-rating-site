import React, { ReactNode } from 'react';
import Header from './Header';
import Hero from './Hero';
import { MdxComponentsWrapper } from './atoms/MdxWrapper';
import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';

const Layout: React.FC<{ children: ReactNode, title: string, image: ImageDataLike }> = ({ children, title, image }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 w-full min-h-screen text-slate-950 dark:text-slate-50">
      <Header />
      <Hero title={title} image={image} />
      <MdxComponentsWrapper>
        <div className="mx-auto container  px-2">
          <main className="py-10">{children}</main>
        </div>
      </MdxComponentsWrapper>
    </div>
  );
};

export default Layout;
