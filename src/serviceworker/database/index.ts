import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';
import { IChain, IIdentity } from '../../types/identity';
import chains from '../../config/chains';

const localforage = require('localforage');
var accountTB: any, settingTB: any;
const { encryptToString, decryptFromString } = require('../../../utils/encryption');

/**
 * Create localforage for extension in the store
 * @param {string} dbName Database Name
 */
export const createDB = async (dbName: string = config.name) => {
    //store.createDB(dbName);
    accountTB = localforage.createInstance({
        name: 'extension',
        storeName: 'account'
    });
    settingTB = localforage.createInstance({
        name: 'extension',
        storeName: 'setting'
    });
}

/**
 * Clear database in the store
 */
export const clearDatabase = () => {
    accountTB.clear();
};

/**
 * Initialize leveldb with chain flags set to true
 */
export const initDB = async () => {
    //Initialize Chains Toggle
    settingTB.setItem('chains', [true, true, true, true, true])
}
/**
 * Set seed phrase to setting
 * @param {Array<string>} phrase 12 seed phrases
 */
export const setSeedPhrase = async (phrase: Array<string>) => {
    let newPhrase = [];
    const pwd = await getPassword();
    for(let i = 0; i < phrase.length; i ++)
        newPhrase[i] = await encryptToString(pwd, phrase[i]);
    settingTB.setItem('phrase', newPhrase);
};
/**
 * Get seed phrase from setting
 */
 export const getSeedPhrase = async () => {
    const pwd = await getPassword();
    const phrase = await settingTB.getItem('phrase');
    for(let i = 0; i < phrase.length; i ++)
        phrase[i] = await decryptFromString(pwd, phrase[i]);

    return phrase;
};

/**
 * Insert a new account
 * @param {object} account Account Info
 */
export const insertAccount = async (account: IAccount) => {
    account.privateKey = await encryptToString(account.password, account.privateKey);
    account.privateExtendedKey = await encryptToString(account.password, account.privateExtendedKey);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            account.identity[i][j].address = await encryptToString(account.password, account.identity[i][j].address);
        }
    }
    let accountCount = await accountTB.length();
    accountTB.setItem(accountCount, account);
}
/**
 * Insert identity into an account.
 * @param  {IIdentity}  identity array of identities generated from account.
 * @param  {number}  accountId index of account generated from seed.
 */
export const insertIdentity = async (identity: IIdentity, accountId: number = 0) => {
    const account = await getAccount(accountId) as IAccount;
    // @ts-ignore

    var keys = await importKey();

    var length = account.identity.length;

    account.identity[length] = [];

    for (let i = 0; i < chains.length; i++) {
        identity[i].address = await encryptToString(account.password, identity[i].address);
    }

    const account1 = await accountTB.getItem(accountId);
    var length = account1.identity.length as number;
    account1.identity[length] = identity;
    accountTB.setItem(accountId, account1);
}
/**
 * Enable/disable chain operability for specified idenity
 * @param {number} accountId Account index
 * @param {number} identity identity index
 * @param {number} chain chain's id listed in browser extension
 * @param {boolean} state boolean to enable or disable chain
 */
export const setDBIdentityCheckState = async (accountId: number, identity: number, chain: number, state: boolean) => {
    const account = await accountTB.getItem(accountId);

    account.identity[identity][chain].allowed = state;

    accountTB.setItem(accountId, account);
}
/**
 * Enable/disable chain operability for wallet
 * @param {Array} settings Chain Settings
 */
export const setGlobalChainState = async (settings: Array<boolean>) => {
    settingTB.setItem('chains', settings);
};
/**
 * Check if there is an account in the store
 */
export const getAccountValid = async () => {
    let accountCount = await accountTB.length();

    return accountCount !== 0;
}
/**
 * Get global chain state
 */
export const getGlobalChainState = async () => {
    const settings = await settingTB.getItem('chains');
    return settings;
}

/**
 * Get specific account from the store
 * @param {number} accountId Account Index
 */
export const getAccount = async (accountId: number = 0) => {
    const account = await accountTB.getItem(accountId) as IAccount;
    const pwd = await getPassword(accountId);

    account.privateKey = await decryptFromString(pwd, account.privateKey);
    account.privateExtendedKey = await decryptFromString(pwd, account.privateExtendedKey);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            var decryptedData = await decryptFromString(pwd, account.identity[i][j].address);
            account.identity[i][j].address = decryptedData;
        }
    }

    return account;
}
/**
 * Get hashed password from the store
 * @param {number} accountId Account Index
 */
export const getPassword = async (accountId: number = 0) => {
    const res = await accountTB.getItem(accountId);
    return res.password;
}
/**
 * Check if the password inputed is same as saved in the store
 * @param {number} accountId Account Index
 * @param {string} passHash Hashed Password
 */
export const checkPassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    const res = await accountTB.getItem(accountId);
    // @ts-ignore
    return (res.password === password);
}
/**
 * Change the password in the store
 * @param {number} accountId Account Index
 * @param {string} password Hashed Password
 */
export const changePassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    const account = await accountTB.getItem(accountId);
    account.password = password;
    accountTB.setItem(accountId, account);
}

/**
 * Retrieves private key of account in the store
 * @param {number} accountId Account Index
 */
export const retrievePrivateKey = async (accountId: number = 0) => {
    const res = await accountTB.getItem(accountId);
    const pwd = getPassword(accountId);
    const privateKey = res.privateKey as string;
    // @ts-ignore
    var decryptedData = await decryptFromString(pwd, privateKey);
    return decryptedData;
};

/**
 * Get Count of identities of an account
 * @param {number} accountId Account Index
 */
export const getIdentityCount = async (accountId: number = 0) => {
    const res = await accountTB.getItem(accountId);
    // @ts-ignore
    return res.identity.length;
}


createDB();
