# Passport Browser Extension
Browser Extension for managing identities and logging in to Fabric applications.

## Features
Additional extension features and configurations can be accessed in the settings page on the top-right corner of the first home-page
- Wallet password, also used to encrypt data before being stored
- Import/Export seed phrases
- Enable/Disable Chains for each identity
- Create additional identites


## Quick Start
0. `rm -rf node_modules package-lock.json` and `npm i`
1a. `npm run dev` to compile a developer build, or alternatively 
1b. `npm run watch` to watch for file changes and automatically compile new developer builds
1c. For production builds run `npm run build`
2. Open chrome://extensions/ (or any other chromium-based browser)
3. Click "Load unpacked" button and load `assets` folder of compiled build generated in step 1
4. If an icon has been added to your taskbar, the exension has been loaded, extension is now ready.

## New Wallet Creation User Flow
1. Upon clicking the extension icon for the first time, a new tab opens with onboarding modals showcasing extension features and options to import or create a new seed.
2. Users will be asked to set an encryption password (which could later be changed in the settings)
3. When choosing to create a new seed, a 12 word seed phrase will be given and seed verification page will display afterwards.
4. After completing these steps, user would be navigated to localhost:3000 a demo fabric application (portal-web) to be hosted with a separate terminal window.
5. When wallet has been imported / initiated, users could toggle and view addresses of different chains.
6. While on fabric applications, users could test the signing feature by clicking the login button when on portal-web or by entering `window.portal.request()` in the console

## Encryption
All data stored in chrome.storage is encrypted with subtleCrypto AES-GCM algorithm. Encryption methods found in utils/subtleCrypto

## Storage
Data is stored with leveldb and chrome.storage on the client side. Storage operations can be found in src/serviceworker/database.
There are two sublevels of data stored: account and setting.
- The Accounts Sublevel stores passwords, chain addresses, private keys, identities, and private extended keys.
- The Settings Sublevel stores chains and enabled/disabled states.

### New Chain Integration
Chain address derivation is set in src/config/chains.ts and generated in utils/seedPhrase.ts

### Storage function descriptions

#### const initDB = async ()
- Description : Initialize leveldb with chain flags set to true

#### const setSeedPhrase = async (phrase)
- Description : Set seed phrase to setting
- Params
  - {Array<string>} phrase : 12 seed phrases
 
#### const insertAccount = async (account)
- Description : Insert a new account
- Params 
  - {object}    account : Account Info

#### const insertIdentity = async (identity, accountId = 0)
- Description : Insert identity into an account
- Params
  - {IIdentity} identity : array of identities generated from account
  - {number}    accountId : index of account generated from seed.
 
#### const setDBIdentityCheckState = async (accountId, identity, chain, state)
- Description :  Enable/disable chain operability for specified idenity
- Params
  - {number} accountId : Account index
  - {number} identity : identity index
  - {number} chain : chain's id listed in browser extension
  - {boolean} state : boolean to enable or disable chain
  
#### const setGlobalChainState = async (settings)
- Description : Enable/disable chain operability for wallet
- Params
  - {Array} settings : Chain Settings

#### const getAccountValid = async ()
- Description : Check if there is an account in the store

#### const getGlobalChainState = async ()
- Description : Get global chain state

#### const getAccount = async (accountId = 0)
- Description : Get specific account from the store
- Params
  - {number} accountId : Account Index

#### const checkPassword = async (accountId 0, password)
- Description : Check if the password inputed is same as saved in the store
- Params
  - {number} accountId : Account Index
  - {string} passHash : Hashed Password

#### const changePassword = async (accountId = 0, password)
- Description : Change the password in the store
- Params 
  - {number} accountId : Account Index
  - {string} password : Hashed Password
 
#### const retrievePrivateKey = async (accountId = 0)
- Description : Retrieves private key of account in the store
- Params
  - {number} accountId : Account Index

#### const getIdentityCount = async (accountId = 0)
- Description : Get Count of identities of an account
- Params 
  - {number} accountId : Account Index

  