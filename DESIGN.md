# Ikey Franco portfolio

## Purpose

A concise personal portfolio for Ikey Franco, a web developer based in New York. The page introduces him, gives a short bio, and leads to three projects and three freelance work experience entries.

## Visual direction

Keep the existing continuous ocean video descent. The three sections are the introduction, about, and work. White type sits over locally darkened video; the supplied ocean-background portrait is shown in a circular crop. The About heading and work link lead the visual hierarchy, followed by the resume link, portrait, and skills. Small translucent bubbles carry optional personal facts without filling the page with copy.

## Layout and behavior

- The introduction and work fill at least one viewport. About is a little shorter on wide screens; it grows to fit content on narrow screens. Native scrolling and proximity snapping allow mouse, touch, keyboard, and anchor navigation.
- The fixed video strip moves between its three bands as the page scrolls. Only the nearest video plays; reduced-motion preference pauses all videos.
- A small, translucent social header stays at the top right while scrolling. GitHub links to Ikey's profile; LinkedIn and email open a local placeholder page until those contact destinations are ready.
- The About section centers the portrait, icon-labeled skills, and three-sentence bio as a compact two-column group on wide screens. The copy column keeps the work and resume links together. It stacks on narrow screens. The resume link opens a one-page placeholder PDF in a new tab.
- Five muted fact bubbles appear only in About. On wide screens they are scattered through open space around the portrait and bio. On narrow screens they move into a staggered area below the main copy. Their labels stay hidden until hover, keyboard focus, or tap reveals each bubble's own fact. Reduced-motion preference stops their movement.
- The Work section has two labeled groups: three Projects and three Work Experience entries. All six cards share one size and carry a category tag over the image. Cards open an accessible detail dialog with a back button, title, technologies, description, and image gallery.
- Project card images use supplied thumbnail art. The 2048 World gallery includes actual game screenshots and opens its local `index.html` directly. Slate is a macOS Electron app; its detail view offers a source ZIP and screenshots. The TikTok clone keeps its supplied icon on the card, with feed, login, and comments screenshots in the gallery, and no external action until a runnable link is available.
- Screenshots use a contained fit in both gallery frames and screenshot-based cards. Portrait gallery images receive a taller frame, especially on phones, so their full screen remains visible.
- Napkin Shop links to the live Full Color Napkin Printing storefront. Its card and the email mind map card use the supplied screenshots. The personal admin AI assistant uses a clearly labeled concept preview until a real image is supplied. Each experience description states Ikey's freelance developer role, and each lists HTML, JavaScript, CSS, and AI integration.

## Tokens

- Deep water: `#061523`
- Main text: `#f5fbff`
- Supporting text: `#d9eff7`
- Accent: `#b8f4ec`
- Type: Avenir Next with sans-serif fallbacks
- Edges: circular portrait, 10px for project imagery, full pills for small labels and controls

## Content boundary

The personal admin AI assistant image is a concept placeholder. The resume PDF is also a placeholder. The About technology bubbles show HTML, CSS, JavaScript, Python, SQL, and AI integration as specified by Ikey.
