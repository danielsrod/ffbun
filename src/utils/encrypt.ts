import sha1 from 'sha1';

export const SHA1 = (text: string) => {
    return sha1(text);
}