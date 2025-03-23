import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingTag = ({ rating }: { rating: number }) => {
  return (
    <span
      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3 flex items-center"
    >
      <FaStar className="mr-1 text-yellow-500" />
      {rating}
    </span>
  );
};

export default RatingTag;
