# Recipe Secrets Restaurant Website

A five-page, static restaurant website in plain HTML, CSS and JavaScript. There is no build step, no dependencies and no backend.

```
recipe_website/
├── index.html         Home
├── about.html         About (story, team, gallery with lightbox)
├── specials.html      Specials (chef's pick + filterable cards)
├── reservation.html   Booking form
├── contact.html       Contact details, map, message form
├── css/style.css      Single shared stylesheet
├── js/main.js         Single shared script (nav, animations, lightbox, forms)
└── images/favicon.svg
```

Photos are loaded directly from Unsplash (free to use). Every image has a fallback background colour.

## Run locally

Double-click `index.html`. Nothing else is needed. To test over HTTP instead, run `python -m http.server 8000` in this folder and open http://localhost:8000.

## Replace the placeholders

Search the project for `TODO:` (Ctrl+Shift+F in VS Code). Items to replace:

| What | Where |
|---|---|
| Address, phone, email | Footer (every page) and `contact.html` |
| Opening hours | `index.html` and `contact.html` |
| Social links | Footer (every page) and `contact.html` |
| Google Map | `contact.html`. Change the `q=` address, or paste the embed URL from Google Maps → Share → Embed a map |
| Form endpoint | `reservation.html` and `contact.html` (see below) |
| Team names, specials and prices | `about.html`, `specials.html` |
| Photos | Swap the Unsplash URLs, or put files in `images/` and use `images/yourfile.jpg` |

The footer is repeated in each HTML file, so edit it in all five.

### Form setup (Web3Forms, free)

1. Go to https://web3forms.com, enter the email that should receive bookings and messages, and copy the access key they email you.
2. In `reservation.html` and `contact.html`, replace `YOUR_ACCESS_KEY_HERE` with that key.

Until the key is replaced, the forms run in **demo mode**. They validate and show the confirmation message but send nothing.

To use Formspree instead, change each form's `action` to `https://formspree.io/f/YOUR_FORM_ID` and remove the three hidden `access_key`, `subject` and `from_name` inputs. In `js/main.js`, remove the demo-mode check that looks for `YOUR_ACCESS_KEY`, or the forms will keep running in demo mode.

## Deploy free on GitHub Pages

1. Create a free account at https://github.com and click **New repository** (e.g. `recipe-secrets`). Make it public.
2. Upload the contents of this folder so `index.html` is in the repository root. Use **Add file → Upload files**, or git:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/recipe-secrets.git
   git push -u origin main
   ```
3. In the repository go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at `https://YOUR-USER.github.io/recipe-secrets/`. All links are relative, so it works from that subfolder.

Netlify alternative: drag the folder onto https://app.netlify.com/drop.

## Notes

- Fonts come from Google Fonts and photos from Unsplash, so the site needs an internet connection to look its best.
- The site is accessible by design: a skip link, labelled form fields, visible focus states, keyboard-operable menu and lightbox, and reduced-motion support.
