var textEnc = new TextEncoder();
var textDec = new TextDecoder("utf-8");

/**
 * Encryption functionality using SubtleCrypto algorithm
 */

export const getIVFromPwd = (password: string) => {
    let arr = [], len, i;
    for(i = 0; i < password.length; i ++)
        arr.push(password.charCodeAt(i));
    len = arr.length;
    if(len < 12) {
        for(i = len; i < 12; i ++)
            arr.push((arr[i - len] + i * 7) % 256);
    } else {
        let cnt = Math.ceil(len / 12);
        for(i = 0; i < 12; i ++) {
            let itv = (len - i * cnt) > cnt ? cnt : (len - i * cnt), sum = 0;
            for(let j = i * cnt; j < i * cnt + itv; j ++) {
                sum += arr[j];
            }
            arr[i] = Math.floor(sum / itv);
        }
    }
    return new Uint8Array(arr);
};

export const importKey = () => {
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

export const generateKey = () => {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
}

export const encrypt = (data: BufferSource, key: CryptoKey, iv: Uint8Array) => {
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

export const decrypt = (data: BufferSource, key: CryptoKey, iv: Uint8Array) => {
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

export const encryptToString = async (pwd: string, data: any) => {
    data = textEnc.encode(data);
    let key = await importKey();
    let iv = getIVFromPwd(pwd);
    let result = new Uint8Array(await encrypt(data, key, iv));
    let res = '';
    for (let i = 0; i < result.length; i++)
        res += String.fromCharCode(result[i]);

    return res;
}

export const decryptFromString = async (pwd: string, data: string) => {
    let key = await importKey();
    let iv = getIVFromPwd(pwd);
    let buffer = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        buffer[i] = data.charCodeAt(i);
    }

    return textDec.decode(await decrypt(buffer, key, iv));
}