import React, { ReactNode } from 'react';
import Header from './Header';
import Hero from './Hero';
import { MdxComponentsWrapper } from './atoms/MdxWrapper';

const Layout: React.FC<{ children: ReactNode, title: string }> = ({ children, title }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 w-full min-h-screen text-slate-950 dark:text-slate-50">
      <Header />
      <Hero title={title} />
      <MdxComponentsWrapper>
        <div className="mx-auto container  px-2">
          <main className="py-10">{children}</main>
        </div>
      </MdxComponentsWrapper>
    </div>
  );
};

export default Layout;
