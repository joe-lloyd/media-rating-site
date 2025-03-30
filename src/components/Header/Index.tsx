import { Link } from 'gatsby';
import React, { useState } from 'react';
import { FaHome, FaFilm, FaGamepad, FaMusic, FaTv } from 'react-icons/fa';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md relative">
      <nav className="mx-auto container px-2">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/" className="text-xl font-semibold text-gray-800 dark:text-white"
            >Opinions & Assholes</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            ><FaHome className="mr-2" /> Home</Link>
            <Link
              to="/movies"
              className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            ><FaFilm className="mr-2" /> Movies</Link>
            <Link
              to="/video-games"
              className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            ><FaGamepad className="mr-2" /> Video Games</Link>
            <Link
              to="/albums"
              className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            ><FaMusic className="mr-2" /> Albums</Link>
            <Link
              to="/tv-series"
              className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            ><FaTv className="mr-2" /> Series</Link>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out overflow-hidden z-10 ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          ><FaHome className="mr-2" /> Home</Link>
          <Link
            to="/movies"
            className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          ><FaFilm className="mr-2" /> Movies</Link>
          <Link
            to="/video-games"
            className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          ><FaGamepad className="mr-2" /> Video Games</Link>
          <Link
            to="/tv-series"
            className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          ><FaTv className="mr-2" /> Series</Link>
          <Link
            to="/albums"
            className="flex items-center text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          ><FaMusic className="mr-2" /> Albums</Link>
        </div>
      </div>
    </header>
  );
};

export default Index;
