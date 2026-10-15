# SPHERE Digital Agency

Landing page with a cursor image trail, plus a Work page with a minimal card grid. Plain HTML, CSS and JavaScript, no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Customise

- **Photos:** replace the files in `images/` and update the `IMAGES` list at the top of `script.js`.
  Portrait crops around 400x500 work best. The `.svg` files are placeholders.
- **Trail feel:** spacing, size, tilt and timing are in the `SETTINGS` object in `script.js`.
- **Colour and type:** tokens are at the top of `styles.css`. The typeface is Montserrat,
  loaded from Google Fonts at weights 100 to 900.

## Pages

- `index.html`: hero with the cursor image trail.
- `work.html`: project cards. Edit the dummy projects (name, tags, image) directly in the HTML.
  Anything marked `data-cursor="view"` turns the cursor into a ring with an arrow.
- `cursor.js` is shared by both pages. `script.js` is the home page trail only.
