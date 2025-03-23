import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';

type MediaType = 'movie' | 'tv-series' | 'album' | 'video-game';

interface Media {
  // site-specific data
  id: string;
  slug: string;
  thumbnail: ImageDataLike;
  mediaType: MediaType;
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
export { MediaType}
