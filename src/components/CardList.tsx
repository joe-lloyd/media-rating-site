import React, { ReactNode } from 'react';

/**
 * CardList component - makes a responsive grid of cards (children)
 * @param children
 * @constructor
 */
const CardList: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {children}
    </div>
  );

};

export default CardList;
