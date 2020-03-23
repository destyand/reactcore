import {key} from './secrets/secret';
const CryptoJS = require("crypto-js");

export const encrypt = (dataEncrypt) => CryptoJS.AES.encrypt(dataEncrypt, key).toString();
export const decrypt = (dataDecrypt) => CryptoJS.AES.decrypt(dataDecrypt, key).toString(CryptoJS.enc.Utf8);