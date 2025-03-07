interface Media {
  // site-specific data
  id: string;
  slug: string;
  thumbnail: string;

  // Basic Info
  title: string;
  synopsis: string;
  releaseDate: Date;

  // Personal Opinion and Review
  watchDate: Date;
  personalRating: number;
  isFavorite: boolean;
}

export default Media;
