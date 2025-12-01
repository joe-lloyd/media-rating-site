import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const contentDir = path.join(process.cwd(), 'src/content');

// Define Zod schemas based on TypeScript interfaces
const MediaSchema = z.object({
  id: z.string().or(z.number()),
  slug: z.string(),
  thumbnail: z.string(), // simplified for validation
  mediaType: z.enum(['movie', 'tv-series', 'album', 'video-game']),
  createdDate: z.string(),
  title: z.string(),
  synopsis: z.string(),
  releaseDate: z.date().or(z.string()), // allow string for parsing
  personalRating: z.number().min(0).max(10),
  isFavorite: z.boolean(),
});

const VideoGameSchema = MediaSchema.extend({
  developer: z.string().optional(),
  publisher: z.string().optional(),
  genres: z.array(z.string()).optional(),
  platform: z.array(z.string()).optional(),
  gameModes: z.array(z.string()).optional(),
  engine: z.string().optional(),
  esrbRating: z.string().optional(),
  rating: z.object({
    metacritic: z.number(),
    ign: z.number(),
    steam: z.number().optional(),
    gamespot: z.number().optional(),
  }).optional(),
  timePlayed: z.union([z.number(), z.string()]), // Allow string as per existing files
  completionStatus: z.enum(['Not Started', 'In Progress', 'Completed']).optional(),
  lastPlayedDate: z.date().or(z.string()).optional(),
});

const validateFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  try {
    if (data.mediaType === 'video-game') {
      VideoGameSchema.parse(data);
    } else {
      MediaSchema.parse(data);
    }
    // console.log(`✅ ${path.basename(filePath)} is valid.`);
    return true;
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)} is INVALID:`);
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error(error);
    }
    return false;
  }
};

const validateAll = () => {
  const walkSync = (dir: string, filelist: string[] = []) => {
    fs.readdirSync(dir).forEach(file => {
      const dirFile = path.join(dir, file);
      try {
        filelist = fs.statSync(dirFile).isDirectory()
          ? walkSync(dirFile, filelist)
          : filelist.concat(dirFile);
      } catch (err) {
        // Ignore errors for non-existent directories/files
      }
    });
    return filelist;
  };

  const files = walkSync(contentDir).filter(f => f.endsWith('.mdx'));
  let validCount = 0;
  let invalidCount = 0;

  console.log(`Found ${files.length} MDX files. Validating...`);

  files.forEach(file => {
    if (validateFile(file)) {
      validCount++;
    } else {
      invalidCount++;
    }
  });

  console.log(`\nSummary: ${validCount} valid, ${invalidCount} invalid.`);
  if (invalidCount > 0) {
    process.exit(1);
  }
};

validateAll();
