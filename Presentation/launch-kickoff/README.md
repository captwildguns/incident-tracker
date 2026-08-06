# Weekly launch session deck

Standing meeting: **Fridays, 10:00 AM EST, 30 minutes.** Audience is managers, trainers, and decision makers. Purpose is to work the Incidents Launch Plan to GA on November 25, 2026.

Board: `traversa-student-transportation.monday.com/boards/18416191331`

## Files

- `index.html` is the current session deck. Self-contained: open it from disk, arrow keys or click to advance, F11 for full screen. A thumbnail strip runs along the bottom for jumping to any slide by clicking it; press **T** to hide the strip when presenting.
- `_template.html` is the skeleton for next week. Copy it, fill in the slides, never touch the CSS.
- `session-01.html` is the August 7, 2026 deck as delivered.
- `assets/` holds the screenshots the slides reference.
- `raw/` is local working files (full-size screen captures, per-slide PNG exports). Not committed.
- `tools/` holds the scripts that build all of this:
  - `gen_slides.py` writes `index.html` slide markup, preserving the CSS block already in the file. Edit the content lists here, not the HTML, then re-run it.
  - `gen_template.py` regenerates `_template.html` from whatever CSS is currently in `index.html`.
  - `shoot-app-screens.cjs` captures fresh prototype screenshots into `raw/`.
  - `shoot-slides.cjs` exports each slide to a PNG in `raw/slides/`.
  - `build_pptx.py` assembles those PNGs into the PowerPoint, one image per slide, with the presenter notes. Keep `NOTES` in that file in sync when slides move.

Full rebuild:

```bash
python -m http.server 8899 --bind 127.0.0.1   # from this directory, leave running
python tools/gen_slides.py
python tools/gen_template.py
node tools/shoot-slides.cjs
python tools/build_pptx.py
```

The node scripts resolve playwright out of the app's `node_modules` under `Figma files`, so they run from any working directory.

One gotcha when touching this tooling: the thumbnail strip is built from cloned `.slide` elements, so any selector that counts or iterates slides must be scoped to `#deck .slide`. A bare `.slide` selector sees every slide twice.

## Status as of August 6, 2026

Session 1 deck is finished and ready to present: 15 slides, PPTX exported with presenter notes, mirrored in Claude Design.

Slide 3 exists because BK opens the meeting by establishing that the plan belongs to the attendees: every item has a person on it, that person owns status, and anyone can add an item their area needs or flag one that does not help the launch. From session 2 onward the meeting works the board filtered by person, with each owner giving status on their own items, which is what slide 15 sets up.

Student names on the vNext screenshot (slide 13) are blurred. The unblurred original is kept at `raw/forge-prod.png`; the blurred version is `raw/forge-prod-blurred.png`.

### Open item

**PowerPoint is a picture per slide.** Visually identical to the HTML, but the text is not editable in PowerPoint. A natively editable version could be authored with python-pptx if that ever matters. The HTML deck is the editable source.

## Making next week's deck in under 30 minutes

1. Copy `_template.html` over `index.html` (keep the old one as `session-NN.html` if you want the history).
2. Fill the title slide: session number, date, and the chips.
3. Fill `Today's plan` with 3 to 5 subjects. Subjects only.
4. Write the topic slides. One idea per slide, one headline that states the point.
5. If a screenshot has gone stale, recapture it. See below.
6. Delete the slide types you are not using this week.
7. Check nothing collides with the footer, then export.

## Design rules, already decided

These are settled. Reuse them rather than re-deciding each week.

**One content pattern, every slide.** Numbered rows: olive number, blue bold title, grey description underneath, a hairline rule between rows. No bullet lists, no cards, no chip grids in the body.

- `.agenda mid` is the workhorse for full-width rows.
- `.agenda compact` goes in the narrow column beside a screenshot.
- `.ag appr` makes one row amber, for an approval or an exception.

**Six rows is the ceiling, and the type size is fixed.** Row type and padding are tuned so that exactly six rows fill the slide down to the bottom strip. Fewer rows simply end higher up and leave white space: never inflate padding or type to fill, and never invent filler rows to reach six. If a slide genuinely needs seven, add `dense` alongside `mid` for tighter padding at the same type size.

- **Format** is 1600x900 fixed, scaled to fit whatever screen it lands on.
- **Type** is Roboto 300/400/500. Headlines 48px light deep blue, row titles 27px, row descriptions 20px, prose 27px, titles 104px.
- **Colour** is Tyler Forge: `#4A6FA5` blue, `#35507A` deep blue for headlines, `#7B8458` olive for numbers and kickers, `#F4F6F9` panels, `#9A6B12` amber for approvals.
- **Kicker plus headline, and nothing else above the content.** No separator line, no subtitle block, no vertical accent bar, and never two intro lines stacked. The kicker names the category and the headline states the point rather than the topic. The title slide gets exactly one subtitle line: session number and date.
- **A line worth saying out loud goes in the presenter notes**, not on the slide. The deck carries structure; the presenter carries the narrative.
- **The grey callout strip is one line at the bottom**, only when there is a real ask, decision, or a statement worth isolating. No summaries. No filler to balance a layout.
- **Never more than three items in a bottom row** of chips or cards. Beyond three it reads as clutter, so use numbered rows instead.
- **Every screenshot slide uses one layout:** `.shot-row`, with compact rows in the 388px column on the left and the screenshot at 1040px, which is 65% of the slide, on the right. Captions are 16px in body grey. Do not put a screenshot full width under the rows.
- **No faint grey micro-copy.** It does not get read. If a detail matters, promote it to a row, a caption, or a visible link.
- **No em dashes or en dashes** anywhere in the content.
- **Subjects, not times,** on the agenda. Times read as a countdown and distract the room.
- **These sessions inform.** The design is settled, so state what is true rather than soliciting design feedback. The only standing ask is the weekly plan review.
- **Keep content above y=841px** so it clears the footer rule.

## Slide types available in the template

Title, today's plan, background prose, topic slide with rows, topic slide with a screenshot at 65%, live demo divider (dark), the plan with one row per workstream, and next steps with the links block.

## Recapturing screenshots

The prototype screens go stale. Rebuild and recapture rather than reusing old ones.

```bash
cd "Figma files"
npm run build
npx vite preview --port 3001 --strictPort
# then drive the app with playwright and write PNGs into raw/,
# resize to ~1300px wide JPEG q82 into assets/
```

No credentials are involved: the capture script sets `sessionStorage['site-auth'] = 'true'`.

## Exporting to PowerPoint

Serve the deck, screenshot each slide at 2x, and place one image per slide in a 13.333 x 7.5in deck with presenter notes. Output is `../Incident-Tracker-Launch-Session-N.pptx`. The text is not editable in PowerPoint, which is fine for sharing and archiving.

## Claude Design

The deck is mirrored in the Claude Design project **Incidents Launch: Weekly Session Deck** as a card in the "Decks" group.
