export const A_MINUTE = 60 * 1000;

export const getNow = () => Date.now();

export const getTimestamp = () => String(getNow());

export const isExpired = (timestamp: number, expirationTime: number) =>
  getNow() - timestamp > expirationTime;
