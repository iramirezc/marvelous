import { md5 } from "../lib/md5";

export const getMd5Hash = (
  ts: string,
  privateKey: string,
  publicKey: string
) => {
  return md5(ts + privateKey + publicKey);
};
