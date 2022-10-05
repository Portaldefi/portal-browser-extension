import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';
import { IChain, IIdentity } from '@/types/identity';
import chains from '@/config/chains';

const Store = require('@fabric/core/types/store');

const store = new Store({
    path: './stores/fabric',
    persistent: false
});

const { encryptToString, decryptFromString } = require('@fabric/core/types/encryption');

export const createDB = async (dbName: string = config.name) => {
    store.createDB(dbName);
}

export const clearDatabase = () => {
    store.clearDatabase();
};

export const initDB = async () => {
    //Initialize Chains Toggle
    store.initDB();
}

export const setSeedPhrase = async (phrase: Array<string>) => {
    let newPhrase = [];
    for(let i = 0; i < phrase.length; i ++)
        newPhrase[i] = await encryptToString(phrase[i]);

    store.setSeedPhrase(newPhrase);
};

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

export const setDBIdentityCheckState = async (accountId: number, identity: number, chain: number, state: boolean) => {
    store.setDBIdentityCheckState(accountId, identity, chain, state);
}

export const setGlobalChainState = async (settings: Array<boolean>) => {
    store.setGlobalChainState(settings);
};

export const getAccountValid = async () => {
    return store.getAccountValid();
}

export const getGlobalChainState = async () => {
    return store.getGlobalChainState();
}


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

export const checkPassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    return store.checkPassword(accountId, password);
}

export const changePassword = async (accountId: number = 0, password: string) => {
    password = createHash('sha256').update(password).digest('base64');
    store.changePassword(accountId, password);
}

export const retrievePrivateKey = async (accountId: number = 0) => {
    const privateKey = await store.retrievePrivateKey(accountId) as string;
    // @ts-ignore
    console.log(privateKey);
    var decryptedData = await decryptFromString(privateKey);
    return decryptedData;
};

export const getIdentityCount = async (accountId: number = 0) => {
    return store.getIdentityCount(accountId);
}


createDB();