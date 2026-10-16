export interface Chapter {
  kicker: string;
  /** Heading in two parts: plain, then italic. */
  heading: [string, string];
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Two short lines shown in the serif italic. */
  tagline: [string, string];
  industry: string;
  services: string[];
  images: string[];
  /** One-line summary above the intro paragraph. */
  kicker: string;
  intro: string;
  chapters: [Chapter, Chapter];
}

const img = (...n: number[]) => n.map((i) => `images/photo-${String(i).padStart(2, '0')}.jpg`);

/**
 * Projects grouped from the shoots in public/images.
 * Placeholder copy: names other than Numo, The Village and Class (visible in the photos),
 * and every tagline, intro and chapter, should be replaced with the real story.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'numo',
    title: 'Numo',
    tagline: ['Raising', 'the bar'],
    industry: 'Hospitality',
    services: ['Branding', 'Production'],
    images: img(1, 2, 3, 4),
    kicker: 'Cocktails worth crossing town for.',
    intro:
      'Numo is a cocktail bar built on detail: the pour, the glass, the light. We shaped a visual world that feels as considered as the drinks, and produced the photography to carry it across menus, social and signage.',
    chapters: [
      { kicker: 'Craft', heading: ['Behind', 'the bar'], body: 'We shot the team at work, close and low-lit, so every image smells of citrus peel and smoke. The result is a library the brand can use for years, not weeks.' },
      { kicker: 'Mood', heading: ['Set', 'the table'], body: 'Still lifes built from props, texture and shadow give the menu its own personality, from the first page to the last.' },
    ],
  },
  {
    slug: 'gold-edit',
    title: 'Gold Edit',
    tagline: ['Worn like', 'a secret'],
    industry: 'Jewellery',
    services: ['Creative direction', 'Production'],
    images: img(7, 9, 5, 6, 10, 8),
    kicker: 'Jewellery that does the talking.',
    intro:
      'A seasonal campaign for a fine jewellery edit, built around warmth, texture and touch. We art-directed and produced a shoot where every frame lets the gold catch the light first and the styling follow.',
    chapters: [
      { kicker: 'Detail', heading: ['Close', 'to the skin'], body: 'Tight crops, deep burgundy and soft focus keep attention on the pieces while still feeling human and alive.' },
      { kicker: 'Story', heading: ['A season', 'of gold'], body: 'From velvet to feathers, each texture was chosen to make the metal glow, giving the brand a campaign that feels rich without shouting.' },
    ],
  },
  {
    slug: 'street-drive',
    title: 'Street Drive',
    tagline: ['Fast lane', 'energy'],
    industry: 'Fashion',
    services: ['Social media', 'Production'],
    images: img(19, 18, 20, 21),
    kicker: 'Streetwear with the engine running.',
    intro:
      'A drop campaign for a streetwear label that wanted to feel fast, loud and a little rebellious. We paired the collection with a cobalt sports car and shot content made to move on social first.',
    chapters: [
      { kicker: 'Energy', heading: ['Fast lane', 'attitude'], body: 'Wide angles, bold colour and a confident cast turned simple pieces into statements.' },
      { kicker: 'Social', heading: ['Made', 'for the feed'], body: 'Every setup was planned for vertical crops and short edits, so the campaign could roll out across platforms in days.' },
    ],
  },
  {
    slug: 'class',
    title: 'Class',
    tagline: ['A stage for', 'every moment'],
    industry: 'Events',
    services: ['Branding', 'Web development'],
    images: img(38, 39, 40),
    kicker: 'A venue that sets the stage.',
    intro:
      'Class is an events venue built for big moments. We created a brand presence and website that capture its scale and drama, with photography that lets planners picture their day before they visit.',
    chapters: [
      { kicker: 'Space', heading: ['Built for', 'big days'], body: 'Symmetry, colour and the signature blue carpet guide the eye straight to the centre of every celebration.' },
      { kicker: 'Digital', heading: ['Book', 'the moment'], body: 'A clear, image-led website turns curious browsers into enquiries, with every space shown at its best.' },
    ],
  },
  {
    slug: 'couture',
    title: 'Couture',
    tagline: ['Made for', 'the spotlight'],
    industry: 'Fashion',
    services: ['Creative direction', 'Production'],
    images: img(16, 13, 11, 15, 12, 14, 17),
    kicker: 'Gowns made for the spotlight.',
    intro:
      'A lookbook for an evening-wear collection full of sparkle, structure and drama. We directed a studio shoot that keeps the background quiet so every bead, fold and silhouette can speak.',
    chapters: [
      { kicker: 'Silhouette', heading: ['Every', 'shape counts'], body: 'Clean light and confident posing show the line of each dress from every angle.' },
      { kicker: 'Colour', heading: ['Sparkle', 'and silk'], body: 'From silver to violet to pink, the palette carries the lookbook from page to page.' },
    ],
  },
  {
    slug: 'trattoria',
    title: 'Trattoria',
    tagline: ['Pasta,', 'made personal'],
    industry: 'Food & drink',
    services: ['Social media', 'Production'],
    images: img(46, 42, 41, 43, 44, 45),
    kicker: 'Food that tastes like home.',
    intro:
      'A content series for an Italian restaurant that wanted its dishes to feel as warm as its dining room. We styled and shot the menu in natural light, ready for menus, delivery apps and social.',
    chapters: [
      { kicker: 'Table', heading: ['Served', 'fresh'], body: 'Hands, steam and real portions make each plate feel freshly served rather than staged.' },
      { kicker: 'Warmth', heading: ['Wood, wine', 'and candlelight'], body: 'Rustic props and warm tones give the whole series the feeling of a long, slow dinner.' },
    ],
  },
  {
    slug: 'the-village',
    title: 'The Village',
    tagline: ['Slow mornings,', 'good coffee'],
    industry: 'Food & drink',
    services: ['Branding', 'Social media'],
    images: img(22, 23),
    kicker: 'A neighbourhood café with character.',
    intro:
      'The Village is a café for slow mornings and long catch-ups. We built a friendly brand presence and social content that shows the food and drinks just as guests enjoy them.',
    chapters: [
      { kicker: 'Morning', heading: ['Something', 'to share'], body: 'Bright, natural light and generous plates make the menu look as inviting online as it does in person.' },
      { kicker: 'Afternoon', heading: ['Something', 'to sip'], body: 'Fresh, colourful drinks round out a content library built for daily posting.' },
    ],
  },
  {
    slug: 'linen',
    title: 'Linen',
    tagline: ['Light as', 'a breeze'],
    industry: 'Fashion',
    services: ['Creative direction', 'Production'],
    images: img(25, 24, 26, 27, 28),
    kicker: 'Light as a summer breeze.',
    intro:
      'A summer collection shot outdoors to feel easy, airy and unhurried. We took the clothes into the countryside and let the wind, the light and the open fields do the styling.',
    chapters: [
      { kicker: 'Outdoors', heading: ['Into', 'the fields'], body: 'Natural landscapes give the white pieces room to breathe and the campaign a sense of freedom.' },
      { kicker: 'Texture', heading: ['Made', 'to move'], body: 'Movement-led shots show how the fabric falls, flows and catches the light.' },
    ],
  },
  {
    slug: 'golden-hour',
    title: 'Golden Hour',
    tagline: ['Sun-soaked', 'stories'],
    industry: 'Fashion',
    services: ['Production', 'Social media'],
    images: img(30, 29, 31, 32),
    kicker: 'Stories soaked in sunlight.',
    intro:
      'A swimwear and resort campaign shot on a farm at the end of the day. Hay bales, cowboy hats and low sun give the collection a playful, sun-soaked mood.',
    chapters: [
      { kicker: 'Light', heading: ['Chasing', 'the sun'], body: 'We timed every setup to golden hour, so skin, straw and fabric share the same warm glow.' },
      { kicker: 'Play', heading: ['Country', 'meets coast'], body: 'Unexpected props turned a simple shoot into a story people stop to look at.' },
    ],
  },
  {
    slug: 'ranch-days',
    title: 'Ranch Days',
    tagline: ['Wild', 'at heart'],
    industry: 'Fashion',
    services: ['Creative direction', 'Web development'],
    images: img(33, 35, 34, 36, 37),
    kicker: 'Wild at heart.',
    intro:
      'A campaign that took a soft, cream-toned collection to a working ranch. Horses, timber barns and open sky give the pieces an adventurous edge, and a website brings the story online.',
    chapters: [
      { kicker: 'Setting', heading: ['Timber', 'and sky'], body: 'Weathered wood and warm light frame the collection without competing with it.' },
      { kicker: 'Spirit', heading: ['Ride', 'your own way'], body: 'Movement and genuine moments with the horses make the campaign feel lived-in rather than posed.' },
    ],
  },
];
