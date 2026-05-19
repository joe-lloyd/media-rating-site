import React from 'react';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <span className="bg-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded border border-gray-600">
      {name}
    </span>
  );
};

export default Tag;
