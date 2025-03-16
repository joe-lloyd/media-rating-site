import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';

interface Media {
  // site-specific data
  id: string;
  slug: string;
  thumbnail: ImageDataLike;
  mediaType: string;
  createdDate: string;

  // Basic Info
  title: string;
  synopsis: string;
  releaseDate: Date;

  // Personal Opinion and Review
  personalRating: number;
  isFavorite: boolean;
}

export default Media;
