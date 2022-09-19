
/**
* Function that imports a example key using SubtleCrypto
* using AES-GCN algortithm with encrypt and decrypt abilities enabled
* @return   {CryptoKey|Promise}         Promise object that fulfills with CryptoKey
*/
export function importKey() {
    return window.crypto.subtle.importKey(
        "jwk", //can be "jwk" or "raw"
        {   //this is an example jwk key, "raw" would be an ArrayBuffer
            kty: "oct",
            k: "Y0zt37HgOx-BY7SQjYVmrqhPkO44Ii2Jcb9yydUDPfE",
            alg: "A256GCM",
            ext: true,
        },
        {   //this is the algorithm options
            name: "AES-GCM",
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
}

/**
* Function uses SubtleCryptoto encrypt data with an encryption key
* using AES-GCN algortithm with encrypt and decrypt abilities enabled.
* @return   {CryptoKey|Promise}         Promise object that fulfills with CryptoKey
*/
export function generateKey() {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
}

/**
* Function that generates a new extractable key using SubtleCrypto
* using AES-GCN algortithm with encrypt and decrypt abilities enabled.
* @param    {data}  ArrayBuffer,  TypedArray, or DataView (plaintext) of data you want to encrypt
* @param    {key}   CryptoKey with key used for encryption
* @param    {iv}    Initialization vector to be used with given encryption key
* @return   {ciphertext|Promise}         Promise object that fulfills with CryptoKey
*/
export function encrypt(data: ArrayBuffer, key: CryptoKey, iv: Uint8Array) {
    return window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            //Recommended to use 12 bytes length
            iv: iv,

            //Additional authentication data (optional)
            // additionalData: ArrayBuffer,

            //Tag length (optional)
            tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    );
}

/**
* Function that uses SubtleCrypto to decrypt encrypted data
* using AES-GCN algortithm with encrypt and decrypt abilities enabled.
* @param    {data}  ArrayBuffer,  TypedArray, or DataView (plaintext) of data you want to encrypt
* @param    {key}   CryptoKey with key used for encryption
* @param    {iv}    Initialization vector that is used with encryption key
* @return   {plaintext|Promise}         Promise object that fulfills with CryptoKey
*/
export function decrypt(data: ArrayBuffer, key: CryptoKey, iv: Uint8Array) {
    return window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv, //The initialization vector you used to encrypt
            //additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
            tagLength: 128, //The tagLength you used to encrypt (if any)
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of the data
    )
}

export async function encryptToString(data: ArrayBuffer, key: CryptoKey, iv: Uint8Array) {
    let result = new Uint8Array(await encrypt(data, key, iv));
    let res = '';
    for (let i = 0; i < result.length; i++)
        res += String.fromCharCode(result[i]);

    return res;
}

export async function decryptFromString(data: string, key: CryptoKey, iv: Uint8Array) {
    let buffer = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        buffer[i] = data.charCodeAt(i);
    }

    return decrypt(buffer, key, iv);
}