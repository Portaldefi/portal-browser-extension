import config from '../../config/db'
import { AccountSchema, IAccount } from './schema';
import createHash from 'create-hash';
import { importKey, encryptToString, decryptFromString } from '@utils/subtleCrypto';
import { IChain, IIdentity } from '@/types/identity';
import chains from '@/config/chains';

const { Level } = require('level');
let db: any;
let accountTB: any;
let settingTB: any;

var iv = new Uint8Array([188, 185, 57, 146, 246, 194, 116, 34, 12, 80, 198, 76]);
var textEnc = new TextEncoder();
var textDec = new TextDecoder("utf-8");

export const createDB = async (dbName: string = config.name) => {
    db = new Level('db');
    accountTB = db.sublevel('account', { valueEncoding: 'json' });
    settingTB = db.sublevel('setting', { valueEncoding: 'json' });
}

export const initDB = async () => {
    //Initialize Chains Toggle
    settingTB.put('chains', [true, true, true, true, true]);
}

export const insertAccount = async (account: IAccount) => {
    let accountCount = 0;

    for await (const [key, value] of accountTB.iterator()) {
        accountCount++;
    }

    var keys = await importKey();

    account.privateKey = await encryptToString(textEnc.encode(account.privateKey), keys, iv);
    account.privateExtendedKey = await encryptToString(textEnc.encode(account.privateExtendedKey), keys, iv);

    for (let i = 0; i < account.identity.length; i++) {
        for (let j = 0; j < account.identity[i].length; j++) {
            var data = textEnc.encode(account.identity[i][j].address);
            account.identity[i][j].address = await encryptToString(data, keys, iv);
        }
    }

    accountTB.put(accountCount, account);
}

export const insertIdentity = async (identity: IIdentity, accountId: number = 0) => {
    const account = await accountTB.get(accountId) as IAccount;
    // @ts-ignore

    var keys = await importKey();

    var length = account.identity.length;

    account.identity[length] = [];

    for (let i = 0; i < chains.length; i++) {
        account.identity[length][i] = {
            address: await encryptToString(textEnc.encode(identity[i].address), keys, iv)
        } as IChain;
    }

    // @ts-ignore
    accountTB.put(accountId, account);
}

export const setDBIdentityCheckState = async (accountId: number, identity: number, chain: number, state: boolean) => {
    const account = await accountTB.get(accountId) as IAccount;

    account.identity[identity][chain].allowed = state;

    accountTB.put(accountId, account);
}

export const setGlobalChainState = async (settings: Array<boolean>) => {
    settingTB.put('chains', settings);
};

export const getAccountValid = async () => {
    let accountCount = 0;

    for await (const [key, value] of accountTB.iterator()) {
        accountCount++;
    }

    return accountCount !== 0;
}

export const getGlobalChainState = async () => {
    const settings = settingTB.get('chains', { valueEncoding: db.valueEncoding('json') });
    return settings;
}


export const getAccount = async (accountId: number = 0) => {
    var keys = await importKey();

    const account = await accountTB.get(accountId, { valueEncoding: db.valueEncoding('json') }) as IAccount;

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
    const res = await accountTB.get(accountId);
    const passHash = createHash('sha256').update(password).digest('base64');
    // @ts-ignore
    return (res.password === passHash);
}

export const retrievePrivateKey = async (accountId: number = 0) => {
    const res = await accountTB.get(accountId) as IAccount;
    // @ts-ignore

    var keys = await importKey();

    var decryptedData = await decryptFromString(res.privateKey, keys, iv);
    return textDec.decode(decryptedData);
};

export const getIdentityCount = async (accountId: number = 0) => {
    const res = await accountTB.get(accountId);
    // @ts-ignore
    return res.identity.length;
}


createDB();