# SPHERE Digital Agency

Landing page with a cursor image trail, plus a Work page with a minimal card grid.
Built with Angular (standalone components, router, no extra libraries).

## Run it

You need Node.js 22.12 or newer (or 24) and npm.

```
npm install
npm start
```

Then open http://localhost:4200. The page reloads when you save a file.

Other commands:

```
npm run build   # production build into dist/
```

## Where things are

- `src/app/home/home.ts`: hero and the cursor image trail. Spacing, size, tilt and timing are in `SETTINGS` at the top.
- `src/app/work/work.ts`: the project cards. Edit the `PROJECTS` list (name, tags, image).
- `src/app/cursor/cursor.ts`: the dot that turns into a ring with an arrow over anything marked `data-cursor="view"`.
- `src/app/nav/nav.ts`: the top navigation.
- `src/styles.css`: all styling. Colour and type tokens are at the top. The typeface is Montserrat,
  loaded from Google Fonts at weights 100 to 900.
- `public/images/`: the logo and the placeholder photos. Replace the `.svg` placeholders with real
  photos and update the file names in `home.ts` and `work.ts`.
