# Agent instructions

This is Opinions and Assholes, Joe Lloyd's media ratings site, built with Gatsby and MDX. Each entry is an MDX file in `src/content/<media-type>/` with its cover image in `src/content/images/`.

## Writing reviews

Whenever you write, rewrite or edit the body text of a review, in any medium, read and follow `.claude/skills/review-writing/SKILL.md` first. This covers new entries, rewrites, small edits to existing reviews, and reviews added through `AI_CONTENT_GUIDE.md`. Agents that don't load skills automatically should open the file directly.

In short: Joe's notes are the only source of opinions. Turn them into one cohesive review in his voice, never invent experiences, details or a reason for a rating, ask Joe a focused question when something is missing, and run the unslop edit pass before you finish.

## Adding an entry

Follow `AI_CONTENT_GUIDE.md` for the frontmatter, the cover image and validation.

## Checks

- `npm run build` must pass, and the entry's page must render.
- Run `npx tsc --noEmit` and `npx tsx scripts/validate-content.ts`. Both have known failures on main, so compare against main and add no new ones.
