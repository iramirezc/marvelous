import { getMd5Hash } from "./hashing-utils";
import { getTimestamp } from "./time-utils";

const getApiUrl = (version = "v1") =>
  `${process.env.REACT_APP_API_URL}/${version}`;

const getPrivateKey = () => process.env.REACT_APP_API_PRIVATE_KEY ?? "";

const getPublicKey = () => process.env.REACT_APP_API_PUBLIC_KEY ?? "";

export const getPublicApiEndpoint = (endpoint: string) => {
  return `${getApiUrl()}/public/${endpoint}`;
};

export const getApiParams = (extraParams = {}) => {
  const ts = getTimestamp();
  const publicKey = getPublicKey();
  const hash = getMd5Hash(ts, getPrivateKey(), publicKey);

  return {
    ts,
    apikey: publicKey,
    hash,
    ...extraParams
  };
};
