import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';
import { IChain, IIdentity } from '../../types/identity';
import chains from '../../config/chains';
// @ts-ignore
import { Store, encryptToString, decryptFromString } from "@fabric/core";

// const Store = require('@fabric/core');

const store = new Store({
    path: __dirname + '/stores/fabric',
    persistent: false
});

// const { encryptToString, decryptFromString } = require('@fabric/core');


/**
 * Create leveldb for extension in the store
 * @param {string} dbName Database Name
 */
export const createDB = async (dbName: string = config.name) => {
    store.createDB(dbName);
}

/**
 * Clear database in the store
 */
export const clearDatabase = () => {
    store.clearDatabase();
};

/**
 * Initialize leveldb with chain flags set to true
 */
export const initDB = async () => {
    //Initialize Chains Toggle
    store.initDB();
}
/**
 * Set seed phrase to setting
 * @param {Array<string>} phrase 12 seed phrases
 */
export const setSeedPhrase = async (phrase: Array<string>) => {
    let newPhrase = [];
    for(let i = 0; i < phrase.length; i ++)
        newPhrase[i] = await encryptToString(phrase[i]);

    store.setSeedPhrase(newPhrase);
};
/**
 * Insert a new account
 * @param {object} account Account Info
 */
export const insertAccount = async (account: IAccount) => {
    account.privateKey = await encryptToString(account.privateKey);
    account.privateExtendedKey = await encryptToString(account.privateExtendedKey);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            account.identity[i][j].address = await encryptToString(account.identity[i][j].address);
        }
    }

    store.insertAccount(account);
}
/**
 * Insert identity into an account.
 * @param  {IIdentity}  identity array of identities generated from account.
 * @param  {number}  accountId index of account generated from seed.
 */
export const insertIdentity = async (identity: IIdentity, accountId: number = 0) => {
    const account = await store.getAccount(accountId) as IAccount;
    // @ts-ignore

    var keys = await importKey();

    var length = account.identity.length;

    account.identity[length] = [];

    for (let i = 0; i < chains.length; i++) {
        identity[i].address = await encryptToString(identity[i].address);
    }

    // @ts-ignore
    store.insertIdentity(identity, accountId);
}
/**
 * Enable/disable chain operability for specified idenity
 * @param {number} accountId Account index
 * @param {number} identity identity index
 * @param {number} chain chain's id listed in browser extension
 * @param {boolean} state boolean to enable or disable chain
 */
export const setDBIdentityCheckState = async (accountId: number, identity: number, chain: number, state: boolean) => {
    store.setDBIdentityCheckState(accountId, identity, chain, state);
}
/**
 * Enable/disable chain operability for wallet
 * @param {Array} settings Chain Settings
 */
export const setGlobalChainState = async (settings: Array<boolean>) => {
    store.setGlobalChainState(settings);
};
/**
 * Check if there is an account in the store
 */
export const getAccountValid = async () => {
    return store.getAccountValid();
}
/**
 * Get global chain state
 */
export const getGlobalChainState = async () => {
    return store.getGlobalChainState();
}

/**
 * Get specific account from the store
 * @param {number} accountId Account Index
 */
export const getAccount = async (accountId: number = 0) => {
    const account = await store.getAccount(accountId) as IAccount;

    account.privateKey = await decryptFromString(account.privateKey);
    account.privateExtendedKey = await decryptFromString(account.privateExtendedKey);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            var decryptedData = await decryptFromString(account.identity[i][j].address);
            account.identity[i][j].address = decryptedData;
        }
    }

    return account;
}
/**
 * Check if the password inputed is same as saved in the store
 * @param {number} accountId Account Index
 * @param {string} passHash Hashed Password
 */
export const checkPassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    return store.checkPassword(accountId, password);
}
/**
 * Change the password in the store
 * @param {number} accountId Account Index
 * @param {string} password Hashed Password
 */
export const changePassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    store.changePassword(accountId, password);
}

/**
 * Retrieves private key of account in the store
 * @param {number} accountId Account Index
 */
export const retrievePrivateKey = async (accountId: number = 0) => {
    const privateKey = await store.retrievePrivateKey(accountId) as string;
    // @ts-ignore
    console.log(privateKey);
    var decryptedData = await decryptFromString(privateKey);
    return decryptedData;
};

/**
 * Get Count of identities of an account
 * @param {number} accountId Account Index
 */
export const getIdentityCount = async (accountId: number = 0) => {
    return store.getIdentityCount(accountId);
}


createDB();