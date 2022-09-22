import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';
import { importKey, encryptToString, decryptFromString } from '@utils/subtleCrypto';
import { IChain, IIdentity } from '@/types/identity';
import chains from '@/config/chains';

const Store = require('@fabric/core/types/store');

const store = new Store({
    path: './stores/fabric',
    persistent: false
});

var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
var textEnc = new TextEncoder();
var textDec = new TextDecoder("utf-8");

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
    var keys = await importKey();

    for(let i = 0; i < phrase.length; i ++)
        phrase[i] = await encryptToString(textEnc.encode(phrase[i]), keys, iv);

    store.setSeedPhrase(phrase);
};

export const insertAccount = async (account: IAccount) => {
    var keys = await importKey();

    account.privateKey = await encryptToString(textEnc.encode(account.privateKey), keys, iv);
    account.privateExtendedKey = await encryptToString(textEnc.encode(account.privateExtendedKey), keys, iv);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            var data = textEnc.encode(account.identity[i][j].address);
            account.identity[i][j].address = await encryptToString(data, keys, iv);
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
        identity[i].address = await encryptToString(textEnc.encode(identity[i].address), keys, iv);
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
    var keys = await importKey();

    const account = await store.getAccount(accountId) as IAccount;

    account.privateKey = textDec.decode(await decryptFromString(account.privateKey, keys, iv));
    account.privateExtendedKey = textDec.decode(await decryptFromString(account.privateExtendedKey, keys, iv));

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            var decryptedData = await decryptFromString(account.identity[i][j].address, keys, iv);
            account.identity[i][j].address = textDec.decode(decryptedData);
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
    var keys = await importKey();
    var decryptedData = await decryptFromString(privateKey, keys, iv);
    return textDec.decode(decryptedData);
};

export const getIdentityCount = async (accountId: number = 0) => {
    return store.getIdentityCount(accountId);
}


createDB();