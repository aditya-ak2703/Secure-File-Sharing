import { KEY } from "./constants/key"

export async function encrypt(base64Content: string) {
    const encodedContent = Buffer.from(base64Content, 'base64');
    const bufferKey = Buffer.from(KEY, 'base64');
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const secretKey =  await crypto.subtle.importKey('raw', bufferKey, {
        name: 'AES-GCM',
        length: 256
    }, true, ['encrypt', 'decrypt']);
    const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv}, secretKey, encodedContent);
    return {
        cipher: Buffer.from(cipher).toString('base64'),
        iv: Buffer.from(iv).toString('base64')
    };
}

export async function decrypt(cipher: string, iv: string) {
    const bufferKey = Buffer.from(KEY, 'base64');
    const secretKey =  await crypto.subtle.importKey('raw', bufferKey, {
        name: 'AES-GCM',
        length: 256
    }, true, ['encrypt', 'decrypt']);

    const plainText = await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv: Buffer.from(iv, 'base64')
    }, secretKey, Buffer.from(cipher, 'base64'))

    return Buffer.from(plainText).toString('base64');
}