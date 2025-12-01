# AI Content Guide

This guide documents the process for adding new media entries to the site, specifically focusing on Video Games.

## Process for Adding New Entries

1.  **Gather Metadata**: Collect all necessary information about the media (Developer, Publisher, Release Date, Genres, Platforms, etc.).
2.  **Obtain Assets**:
    *   Find a high-quality box art/poster image.
    *   Convert it to `.webp` format.
    *   Place it in `src/images/`.
    *   Naming convention: `kebab-case-title.webp` (e.g., `stellar-blade.webp`).
3.  **Create MDX File**:
    *   Create a new `.mdx` file in `src/content/<media-type>/`.
    *   Naming convention: `kebab-case-title.mdx`.
    *   Populate the frontmatter according to the TypeScript interfaces below.
4.  **Validate**: Ensure all required fields are present and types are correct.

## File Structure

- **Content**: `src/content/video-games/`, `src/content/movies/`, etc.
- **Images**: `src/images/`
- **Types**: `src/types/`

## TypeScript Interfaces

The frontmatter MUST adhere to these interfaces.

### Media (Base Interface)
From \`src/types/Media.ts\`:
```typescript
import { ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks';

type MediaType = 'movie' | 'tv-series' | 'album' | 'video-game';

interface Media {
  // site-specific data
  id: string; // Unique ID (can be numeric string or UUID)
  slug: string; // URL slug
  thumbnail: ImageDataLike; // Path to image, e.g., ../images/game-name.webp
  mediaType: MediaType;
  createdDate: string; // YYYY-MM-DD

  // Basic Info
  title: string;
  synopsis: string;
  releaseDate: Date; // YYYY-MM-DD

  // Personal Opinion and Review
  personalRating: number; // 0-10
  isFavorite: boolean;
}
```

### VideoGame
From \`src/types/VideoGame.ts\`:
```typescript
import Media from './Media';

interface VideoGame extends Media {
  // Basic Info
  developer: string;
  publisher: string;
  releaseDate: Date;
  genres: string[];
  platform: string[]; // e.g., PS5, PC, Xbox

  // Game Details
  gameModes: string[]; // e.g., Single-player, Multiplayer
  engine: string;
  esrbRating: string; // e.g., E for Everyone, M for Mature

  // Objective Data
  rating: {
    metacritic: number;
    ign: number;
  };

  // Personal Experience and Opinion
  personalRating: number; // your own rating out of 10
  timePlayed: number; // in hours (can be string like "700+ hours" based on existing files, but type says number - CHECK EXISTING FILES)
  completionStatus: 'Not Started' | 'In Progress' | 'Completed';

  // Additional Details
  lastPlayedDate: Date;
  isFavorite: boolean;
}
```

> [!NOTE]
> Existing MDX files sometimes use string values for `timePlayed` (e.g., "700+ hours") even if the type definition says `number`. When adding new files, try to stick to the type definition if possible, or follow the pattern of existing files if strict typing is not enforced by the build process.
> Also, `rating` fields like `metacritic` often use `-1` to indicate "not rated" or "unknown".

## Example Frontmatter

```yaml
---
id: stellar-blade
mediaType: video-game
title: Stellar Blade
author: Joe Lloyd
releaseDate: "2024-04-26"
dateFinished: "2024-05-15"
slug: stellar-blade
personalRating: 9
thumbnail: ../images/stellar-blade.webp
tags: ["Action", "RPG", "Hack and Slash"]
timePlayed: 35 hours
synopsis: "Stellar Blade is an action-adventure game developed by Shift Up..."
isFavorite: true
studio: Shift Up
averageDuration: 25 hours
createdDate: "2025-11-30"
rating:
  steam: -1
  metacritic: 81
  ign: 8
  gamespot: 8
---
```
