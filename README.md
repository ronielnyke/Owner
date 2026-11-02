# Roniel Nyke Gonzales | Portfolio

A multi-page, animated, 3D portfolio website for **Roniel Nyke Gonzales**, a BS Information Technology student and web developer. It presents his live web systems, his skills, and how to contact him.

> Copyright (c) 2026 Roniel Nyke Gonzales. All rights reserved. See [LICENSE.txt](LICENSE.txt).

---

## About the owner

| | |
|---|---|
| **Name** | Roniel Nyke Gonzales |
| **Course** | BS Information Technology, Year 2 - Section B (BS INFO TECH 2-B) |
| **School** | West Visayas State University - Lambunao Campus |
| **Location** | Brgy. Sibaguan, Lambunao, Iloilo |
| **Email** | ronielnyke@gmail.com |
| **GitHub** | [github.com/ronielnyke](https://github.com/ronielnyke) |

**Focus areas:** programming and web development, full-stack development (HTML, CSS, JavaScript and other web technologies), system development (prototypes and applications for school projects and personal ideas), and entrepreneurship and innovation.

**Goal:** to keep improving his skills in programming, web development and system development.

---

## Live systems

| System | Description | Link |
|---|---|---|
| **CodeLens AI Pro** | Paste code and learn why it breaks. Finds the error line in JavaScript, HTML, CSS and Python, explains every line and function, reads the explanation aloud with a Gemini voice, and lets users sell code or whole systems with a verifiable license key for every buyer. | [codelens-ai-pro.vercel.app](https://codelens-ai-pro.vercel.app) |
| **Capstone IQ** | Intelligent Capstone Proposal Evaluation System. Shows a readiness percentage, the number of problems found and the missing sections. Accepts DOCX and TXT files, uses 27 criteria, and records results in Google Sheets. Includes sign-in with Google. | [capstone-iq.vercel.app](https://capstone-iq.vercel.app) |
| **CODEMIND** | Developer Thinking Lab. 9 programming tracks (HTML, CSS, JavaScript, PHP, SQL, React, Python, Java, Flutter) and 4 systems, with XP, levels, streaks, achievements and a certificate. | [codemindquest.vercel.app](https://codemindquest.vercel.app) |

**In development:** CODEVERSE, an interactive programming game world with five game modes (Episode 01, "The Lost System", is the first prototype).

**Other projects:** ZERO TRACE (a programming-inspired puzzle game), Login Validation System (a web-based login system) and this Personal Portfolio Website.

---

## Features of this portfolio

- 5 connected pages: Home, About, Services, Systems and Contact
- 3D animated background built with Three.js (adaptive quality, pauses when the tab is hidden)
- 3D owner portrait with smooth, eased pointer movement
- 3D flip cards that show what each system can do
- Smooth page transitions, scroll reveal animations, animated counters and skill bars
- Version badge and replaceable logo for every system
- Working contact form that opens the visitor's email app
- Responsive layout built with Bootstrap 5
- Respects "reduced motion" settings

---

## Project structure

```
portfolio/
|-- index.html        Home
|-- about.html        About, focus areas, how I work
|-- services.html     Capabilities and skills
|-- projects.html     Systems (flip cards) and other projects
|-- contact.html      Contact details and form
|-- LICENSE.txt       Proprietary license
|-- README.md         This file
|-- css/
|   |-- base.css          Variables, loader, buttons, forms
|   |-- layout.css        Navbar, hero, sections, footer
|   |-- components.css    Cards, flip cards, portrait, logos
|   `-- animations.css    Keyframes, reveal, page transition
|-- js/
|   |-- data.js           All content: owner info, systems, versions, skills
|   |-- layout.js         Shared navbar, footer, page transitions
|   |-- effects.js        Reveal, counters, 3D tilt, flip cards, parallax
|   |-- background.js     Three.js 3D background
|   |-- pages.js          Renders each page from data.js
|   `-- main.js           Starts everything and hides the loader
`-- assets/
    |-- logos/            Logos of the systems (replaceable)
    `-- README.txt        How to change images
```

---

## Run it locally

No build step is needed.

1. Download or clone the project.
2. Open `index.html` in a browser, or serve the folder with any static server, for example:
   ```
   npx serve .
   ```
3. An internet connection is required, because Bootstrap, Three.js and the fonts load from a CDN.

## Deploy to Vercel

1. Upload the folder to a GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Keep the default settings (no framework, no build command) and deploy.

---

## Customize

| What to change | Where |
|---|---|
| Owner photo | Put `owner.jpg` (or `.jpeg`, `.png`, `.webp`) in `assets/`. A portrait photo works best. |
| System logos | Replace the files in `assets/logos/` and keep the same names, or change the `logo` path in `js/data.js`. |
| Versions, descriptions, links, skills | Edit `js/data.js`. Every page reads from this one file. |
| Colors | Change the variables at the top of `css/base.css`. |

> **Note:** the version numbers shown on the system cards (for example v2.3.0) are display values stored in `js/data.js`. Update them to match the real release of each system.

---

## Built with

- HTML5, CSS3 and JavaScript
- [Bootstrap 5.3.3](https://getbootstrap.com/) (MIT License)
- [Three.js r128](https://threejs.org/) (MIT License)
- [Google Fonts](https://fonts.google.com/): Poppins and Space Grotesk (SIL Open Font License)

The live systems are hosted on Vercel, and several of them use Firebase.

---

## Contact

**Roniel Nyke Gonzales** - ronielnyke@gmail.com - [github.com/ronielnyke](https://github.com/ronielnyke)

For permission to use any part of this project, please email the owner first. See [LICENSE.txt](LICENSE.txt).
