import React from 'react';

interface DetailSidebarBoxProps {
  title: string;
  children: React.ReactNode;
}

const DetailSidebarBox: React.FC<DetailSidebarBoxProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-zinc-700">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default DetailSidebarBox;
