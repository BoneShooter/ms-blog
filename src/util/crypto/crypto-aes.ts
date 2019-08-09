// AES对称加密解密
// https://www.zhihu.com/question/22312959
/*
 * 问：能否根据明文、密文、加密算法为AES，求密钥是什么?
 * 答：这种攻击场景，在密码学里，叫做 已知明文攻击 ( https://en.wikipedia.org/wiki/Known-plaintext_attack）。已知明文攻击对 aes 无效（即没有比暴力穷举更快的办法）。
*/
import * as crypto from 'crypto';

const Algorithm = 'aes-128-ecb';
const PrivateKey = 'fwahakhwfuiajkas';
const ClearEncoding = 'utf8';
const CipherEncoding = 'base64'; // 'hex';
const iv = '';

function AesEncrypt(content: string): string {
    const cipher = crypto.createCipheriv(Algorithm, PrivateKey, iv);
    const chunks = [];
    chunks.push(cipher.update(content, ClearEncoding, CipherEncoding));
    chunks.push(cipher.final(CipherEncoding));
    return chunks.join('');
}

function AesDecrypt(encryptContent: string): string {
    const decipher = crypto.createDecipheriv(Algorithm, PrivateKey, iv);
    const chunks = [];
    chunks.push(decipher.update(encryptContent, CipherEncoding, ClearEncoding));
    chunks.push(decipher.final(ClearEncoding));
    return chunks.join('');
}

export { AesEncrypt, AesDecrypt };
