import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingTag = ({ rating }: { rating: number }) => {
  return (
    <span
      className="bg-amber-900/40 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3 flex items-center border border-amber-700/50"
    >
      <FaStar className="mr-1 text-yellow-500" />
      {rating}
    </span>
  );
};

export default RatingTag;
