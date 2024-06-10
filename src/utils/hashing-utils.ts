import { md5 } from "../lib/md5";

export const getHash = (ts: string, privateKey: string, publicKey: string) => {
  return md5(ts + privateKey + publicKey);
};
