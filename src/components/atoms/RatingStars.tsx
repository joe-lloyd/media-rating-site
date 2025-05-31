import React from 'react';

const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  // Ensure rating is a valid number between 0 and 10
  const safeRating = typeof rating === 'number' && !isNaN(rating) && rating >= 0 ? rating : 0;
  let filledStars = Math.floor(safeRating / 2);
  let halfStar = safeRating % 2 >= 1 ? 1 : 0;
  let emptyStars = totalStars - filledStars - halfStar;
  // Clamp to valid values
  filledStars = Math.max(0, filledStars);
  halfStar = Math.max(0, halfStar);
  emptyStars = Math.max(0, emptyStars);

  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-300" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      ))}
      {halfStar === 1 && (
        <div className="relative w-4 h-4 " >
          <svg
            className="w-full h-full text-gray-200 dark:text-gray-600 absolute" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>

          <svg
            className="w-full h-full text-yellow-300 -scale-x-100 absolute" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
          >
            <path
              d="M11 0l2.259 4.577 5.051.734a1.523 1.523 0 0 1 .849 2.6l-3.656 3.563.863 5.031a1.532 1.532 0 0 1-2.226 1.616L11 17.033V0Z"
            />
          </svg>
        </div>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index + filledStars + halfStar}
          className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;
