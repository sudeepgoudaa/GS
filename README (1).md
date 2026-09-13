# Your Love Proposal Website ❤

A single, cinematic scrolling page: opening → your story → gallery → reasons →
love letter → a playful question game → future dreams → an optional countdown
→ the proposal → celebration → a final note (with one small hidden surprise).

Everything personal lives in **one place** — the `loveStory` object at the very
top of `script.js`. You never need to touch the HTML or CSS to make this yours.

## 1. Change the words
Open `script.js` and edit the `loveStory` object:
- `proposerName` / `partnerName`
- `personalMessage`, `loveLetter`
- `memories` — your timeline (add/remove as many as you like)
- `reasons` — reasons you love them
- `questions` — the playful yes/no questions before the proposal
- `dreams` — things you want to do together
- `specialDate` — set to `null` to hide the countdown section, or a real date
  (`"2027-02-14T00:00:00"` format) to count down to it

## 2. Add real photos
Drop images into the `images/` folder, then in `index.html` swap the
placeholder `.gallery-item` blocks (or the `galleryGrid` rendering in
`script.js`) for `<img>` tags pointing at your files. Same idea for the
timeline if you want a photo per memory.

## 3. Add music
Put an mp3 at `audio/our-song.mp3` (or update the `<source>` path in
`index.html`). The site never forces autoplay — it only tries to start music
right when the visitor clicks "Open My Heart," which browsers allow since
it's a direct response to a click. The floating button bottom-left mutes /
unmutes any time.

## 4. Add a video (optional)
Drop a file into `video/` and add a `<video>` tag wherever you'd like one —
there's a `video/` folder ready for it.

## 5. Open it
Just double-click `index.html`, or drag the folder into any browser. No
build step, no dependencies.

## 6. Deploy so you can send a link
**GitHub Pages**
1. Create a new GitHub repo and push this folder to it.
2. Repo → Settings → Pages → set source to your main branch, root folder.
3. Your link appears at `https://<username>.github.io/<repo-name>/`.

**Vercel**
1. Go to vercel.com → Add New Project → import the folder (or connect the repo).
2. Leave the settings as-is (it's a static site) → Deploy.
3. You'll get a link like `https://your-project.vercel.app`.

## Notes on the interactive "No" button
Both the mid-page questions and the final proposal let the visitor genuinely
click "No" — it teases (moves a little, changes its message) but it's never
disabled, never traps them, and never auto-converts into a "Yes." The humor
comes from the reactions, not from removing their choice.

## Accessibility
The site respects `prefers-reduced-motion`, keeps every button keyboard
reachable, and never relies on hover alone (mobile gets tap-based versions of
every interaction).
