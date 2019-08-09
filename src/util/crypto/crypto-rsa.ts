// RSA非对称加密解密
import * as crypto from 'crypto';
import * as fs from 'fs';

const PrivatePerm = fs.readFileSync('./privatekey.pem');
const PublicPerm = fs.readFileSync('./publickey.pem');
const PrivateKey = PrivatePerm.toString();
const PublicKey = PublicPerm.toString();
const ClearEncoding = 'utf8';
const CipherEncoding = 'base64'; // const CipherEncoding = 'hex';

function RsaEncrypt(content: string): string {
    const cryptedBuffer = crypto.publicEncrypt(PublicKey, Buffer.from(content));
    return cryptedBuffer.toString(CipherEncoding);
}

function RsaDecrypt(encryptContent: string): string {
    const decrypted = crypto.privateDecrypt(PrivateKey, Buffer.from(encryptContent, CipherEncoding));
    return decrypted.toString(ClearEncoding);
}

export { RsaEncrypt, RsaDecrypt };
