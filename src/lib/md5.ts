import { Md5 } from "ts-md5";

export const md5 = (data: string) => Md5.hashStr(data);
