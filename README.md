# Cyber Scam Simulator static website

This folder is a deployable static website for the Android app.

It uses:

- HTML
- CSS
- vanilla JavaScript

No Node, TypeScript, bundler, package manager, backend, database, analytics or third-party cookie scripts are required.

## Files

- `index.html` — landing page
- `about.html` — app purpose and safety boundaries
- `how-to-play.html` — gameplay guide and victim-help guidance
- `privacy.html` — privacy policy and GDPR/cookie information
- `404.html` — fallback page
- `robots.txt` — crawler rules
- `assets/css/styles.css` — shared styling
- `assets/js/main.js` — mobile navigation, tabs, FAQ and cookie preferences
- `assets/img/app-icon.png` — app icon copied from the Android project
- Every main page includes a sticky Google Play download banner. The site states that the app is Android-only and that no iOS app is currently available.

## App privacy notes reflected in the policy

The current Android project manifest does not declare internet, microphone, camera, location, contacts, phone or SMS permissions. Progress is stored locally in Android app storage.
