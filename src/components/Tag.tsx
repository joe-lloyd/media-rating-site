import React from 'react';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
      {name}
    </span>
  );
};

export default Tag;
