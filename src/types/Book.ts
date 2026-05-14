import Media from './Media';

interface Book extends Media {
  author: string;
  pages?: number;
  publisher?: string;
  genres: string[];
  language?: string;
  rating?: {
    goodreads?: number;
    amazon?: number;
  };
}

export default Book;
