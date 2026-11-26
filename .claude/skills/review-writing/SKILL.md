---
name: review-writing
description: Turn Joe's rough notes or spoken thoughts into a finished review for the Opinions and Assholes site. Use whenever you write, rewrite or edit the body of any review in src/content (games, films, TV, albums, books), including new entries added through AI_CONTENT_GUIDE.md.
---

# Review writing

Joe gives his opinions as rough notes, often spoken. Turn them into a review that reads as one piece of criticism with a clear point of view, in his voice. His notes are the source of every opinion. You supply structure, connection and editing. You never supply new opinions.

## 1. Collect the source

- Get Joe's notes from the ticket, chat or message that asked for the review, and keep them in front of you while you write. When you rewrite an existing review, recover the original notes (the ticket, the file's git history) and compare them with the current text.
- Collect the facts from the entry's frontmatter and its sources: title, edition or season, creators, cast, release dates, an album's concept. Facts can give context. They never stand in for an opinion.
- Tell a review apart from a catalogue entry. A title on the site, a rating field or a placeholder does not mean Joe has watched, played, read or heard it. With no notes from Joe, write no review body and ask him.

## 2. Find the central judgment

Read the notes and answer one question in a sentence: what does Joe think of this, overall? It is often a tension ("I couldn't follow the story and still really enjoyed it") or a verdict with his reason ("finally a good Resident Evil movie, and it works because it doesn't copy the games"). The opening states it. The rest of the review supports it.

## 3. Pick and connect the supporting points

- Group the notes that are about the same thing: the story, the look, a performance, the sound, how it compares with the source material.
- Connect points where Joe's notes connect them: a criticism and the caveat he gave for it, a performer and where he saw them before, a comparison and what it says about the work.
- Explain why a point matters only with reasoning Joe gave or with a fact you can check. "Austin Abrams was great as the junkie in Weapons" can carry the fact that Weapons is also a Zach Cregger film. It cannot carry a new opinion about Weapons.
- Cut repetition. Spoken notes often say the headline twice ("really fun... it's also really fun"). Say it once, where it does the most work.
- Keep his rating and say it once, usually at the end, the way he does: "A 7.5 for me."

## 4. Never invent

Do not add experiences, scenes, levels, enemies, mechanics, tracks, lyrics, performances, criticisms, praise, comparisons or a reason for the rating that are not in the notes. That includes small ones such as "the whole way through", "on a second listen", "the score lifts it" or "which is why it isn't a 9".

When a stronger review needs something Joe has not said, ask him one focused question per gap instead of guessing. A good question names the gap: "Which of the remake's changes did you love?", "What makes Now Departing your favourite?" Write the review from what you have, and put the questions where Joe will see them (the PR body, the ticket or the chat).

Edits may rephrase Joe's words heavily. His substantive opinions stay exactly as he gave them, including his doubts.

## 5. Structure and length

- Fit the length to the material. Three notes make a short review and a page of thoughts makes a long one. Longer is not better. More developed means clearer reasoning and the useful detail Joe gave.
- No template. No headings such as "Personal Rating", "My Thoughts" or "Standout Features", no pros and cons lists, and no plot summary (the synopsis field already has one). Use plain paragraphs, the way his own reviews read.
- Opening: the central judgment, in his words where they are strong ("Dead Space is really fucking scary.").
- Middle: one paragraph per group of points.
- Ending: the rating, plus his last word on the work if the notes give one. Don't restate the opening. Don't end on a generic line about the future or about who should watch it.

## 6. Voice

Model the voice on Joe's own reviews, mainly `src/content/video-games/silent-hill-2.mdx`, `src/content/movies/backrooms.mdx`, `src/content/tv-series/crystal-lake.mdx` and the personal paragraphs of `src/content/tv-series/angel-beats.mdx`. The older entries with "## Personal Rating" and "## My Thoughts" headings (`fresh.mdx`, `scream.mdx`, `doom-eternal.mdx`, `toxicity.mdx` and similar) are the generated template style to avoid.

- First person, conversational, plain words, British spelling (favourite, humour).
- Blunt. Keep his profanity where he used it ("didn't know what the fuck was going on"). Don't add swearing he didn't use, and don't soften what he said.
- Keep his enthusiasm and his hedges as he gave them ("maybe that's because it's been so long since I saw season 1"). A doubt Joe expressed is part of his opinion.
- Keep his own phrases when they are the clearest way to say it. Fix grammar and typos, not personality.
- Short sentences and contractions.

## 7. Vocabulary per medium

Hold every medium to the same standard and use the words that fit it.

- Games: playing, the remake or remaster, combat, puzzles, difficulty, bosses, controls, hours played.
- Films: watching, the director, the lead, performances, the first half, the ending.
- TV: the season (name which one), episodes, characters, the finale. Review only the season the entry covers.
- Albums: listening, tracks, songs, the sound, production, the record's concept. Name a track only if Joe did.
- Books: reading, the author, chapters, characters.

## 8. Edit with the unslop pass

Run this pass on every finished review. Then read it as if Joe were saying it out loud, and fix anything he wouldn't say.

- No AI vocabulary: additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape, pivotal, showcase, tapestry, testament, underscore, vibrant, masterclass, visceral, "a love letter to".
- No inflated or generic praise: "a must-play", "stunning", "breathtaking", "a triumph", "a feast for the eyes", "elevates", "redefines". Say what Joe said.
- No fancy ways to say "is": "serves as", "stands as", "boasts".
- No "not just X, but Y" and no "It's not X. It's Y." reveals.
- No forced groups of three. Use the number of points Joe made.
- No -ing tails such as ", showcasing...", ", highlighting...", ", making it...".
- No vague attributions ("critics agree"). "Like everyone says" is fine when it is Joe's line.
- No formulaic transitions or wrap-ups: "That said,", "Ultimately,", "At the end of the day,", "All in all,", "In conclusion". If Joe said "overall", one use is fine.
- No repeated conclusion and no generic closer ("Highly recommended.", "The future looks bright.").
- No em dashes or en dashes. Use full stops and commas, and avoid colons in the middle of a sentence.
- Straight quotes, no emoji, no bold, no headings.
- Fewer adverbs, plain words over fancy ones, active voice.
- Finally ask "what makes this obviously AI generated?" and fix whatever the answer is.

## 9. Final check

Before you hand the review over, confirm each of these:

- Every opinion traces to a line in Joe's notes, and you can point to the line.
- Rating, title, season or edition and the rest of the frontmatter are unchanged, unless a correction was verified separately.
- The opening states the central judgment and the ending doesn't repeat it.
- No unslop tells remain.
- Any follow-up questions for Joe are written down where he will see them.
- The site builds (`npm run build`) and the entry's page shows the new text and the right rating.
