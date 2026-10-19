# Recipe Secrets Website Requirements
Build a complete, production-ready website for "Recipe Secrets Restaurant".

## Goal
A warm, appetizing, visually rich restaurant website that makes visitors hungry and drives them to book a table. Keep it simple: exactly 5 pages, no more.

## Pages
1. Home (index): full-width hero with a large food image, restaurant name, short tagline, and a prominent "Reserve a Table" button. Below it: a featured dishes section (3-4 dishes with images), a short "our story" teaser linking to About, a testimonials strip, and opening hours.
2. About: the restaurant's story, the philosophy behind the "secret recipes", a chef/team section with photos, and an image gallery of the dining room and dishes.
3. Specials: a grid of cards for daily/weekly/seasonal specials. Each card has an image, dish name, short description, and price. Include a short "Chef's Pick" highlight at the top.
4. Reservation: a clean booking form (name, email, phone, date, time, number of guests, special requests/notes) with client-side validation and a friendly confirmation message on submit. Since hosting is static, wire it to a free form service (Formspree or Web3Forms) and put a clearly marked placeholder for the endpoint/access key.
5. Contact: address, phone, email, opening hours, an embedded Google Map (iframe with placeholder address), social media links, and a simple contact form handled the same way as the reservation form.

## Technical constraints
- Must deploy on free static hosting (GitHub Pages, Netlify, Vercel, or Cloudflare Pages).
- Use EITHER plain vanilla HTML/CSS/JS OR Next.js with static export (`output: 'export'`). Choose vanilla HTML/CSS/JS unless there is a strong reason not to. No backend, no database, no paid services.
- If using Next.js: configure it so `next build` produces a fully static site, and use `<img>` or `next/image` with `unoptimized: true`.
- No build step or dependencies for the vanilla option; it should work by opening index.html.
- Shared header/nav and footer across all pages, with the active page highlighted.
- Use relative paths so it works from a subfolder (e.g. GitHub Pages project sites).

## Visual design
- Mood: warm, inviting, upscale-casual. Think rich earthy tones (deep burgundy or terracotta, cream, gold/amber accents), not generic blue/white.
- Typography: pair an elegant serif for headings (e.g. Playfair Display or Cormorant Garamond) with a clean sans-serif for body text (e.g. Inter or Lato), loaded from Google Fonts.
- Make images the star: full-bleed hero, large dish photos, rounded cards with soft shadows, and a gallery with hover zoom or lightbox.
- Subtle polish: smooth scroll, fade-in-on-scroll animations, hover effects on buttons and cards, sticky navbar that changes style on scroll.
- Consistent spacing, strong visual hierarchy, and high contrast so text is always readable over images (use overlays on hero images).

## Images
- Use real, high-quality, free-to-use food and restaurant photos from Unsplash (use direct Unsplash image URLs with sizing parameters, e.g. `?w=1600&q=80`), or download them into an `/images` folder if possible.
- Every image needs descriptive alt text, `loading="lazy"` (except the hero), and a sensible fixed aspect ratio so the layout doesn't jump while loading.
- Add a CSS fallback background color behind images in case they fail to load.

## Responsiveness and quality
- Mobile-first and fully responsive (phone, tablet, desktop), with a hamburger menu on mobile.
- Accessible: semantic HTML, proper heading order, labeled form fields, keyboard-friendly navigation, visible focus states, sufficient color contrast.
- SEO basics: unique title and meta description per page, Open Graph tags, favicon, and a `lang` attribute.
- Clean, commented, well-organized code with a single shared stylesheet and script file (vanilla) or a sensible component structure (Next.js).

## Placeholder content
Invent believable content: a menu of specials with prices, a restaurant story, opening hours, address, and phone. Mark everything the owner must replace (address, phone, email, form endpoint, map embed, social links) with a clearly searchable `TODO:` comment.

## Deliverables
1. The full working project with a clear folder structure.
2. A README.md explaining how to run it locally, how to replace the placeholders, and step-by-step deployment instructions for one free host (e.g. GitHub Pages or Netlify).
3. After building, review the result yourself: check every page link, the forms, the mobile layout, and image loading, and fix any issues before finishing.

Before writing code, give me a brief plan (folder structure and design choices) and then proceed to build without waiting for approval.