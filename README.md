# Passport Browser Extension
Log in to websites using Fabric.

## Storage
Data is stored with leveldb and chrome.storage on the client side. Storage operations can be found in src/serviceworker/database.
Chain address derivation is set in config/chains.ts and generated in utils/seedPhrase

## Encryption
All data stored in chrome.storage is encrypted with subtleCrypto AES-GCM algorithm. Encryption methods found in utils/subtleCrypto


## Quick Start
0. `rm -rf node_modules package-lock.json` and `npm i`
1a. `npm run dev` to compile a developer build, or alternatively 
1b. `npm run watch` to watch for file changes and automatically compile new developer builds
1c. For production builds run `npm run build`
2. Open chrome://extensions/ (or any other chromium-based browser)
3. Click "Load unpacked" button and load `assets` folder of compiled build generated in step 1
4. If an icon has been added to your taskbar, the exension has been loaded, extension is now ready.

## New User Flow
1. Upon clicking the extension icon for the first time, a new tab opens with onboarding modals showcasing extension features and options to import or create a new seed.
2. Users will be asked to set an encryption password (which could later be changed in the settings)
3. When choosing to create a new seed, a 12 word seed phrase will be given and seed verification page will display afterwards.
4. After completing these steps, user would be navigated to localhost:3000 a demo fabric application (portal-web) to be hosted with a separate terminal window.
5. When wallet has been imported/initiated, users could toggle and view addresses of different chains.
6. While on fabric applications, users could test the signing feature by clicking the login button when on portal-web or by entering `window.portal.request()` in the console

