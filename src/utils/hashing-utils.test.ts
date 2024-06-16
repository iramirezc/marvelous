import { getMd5Hash } from "./hashing-utils";

describe("Hashing Utils", () => {
  describe("getMd5Hash()", () => {
    test("returns the correct md5 hash", () => {
      const ts = "1";
      const privateKey = "abcd";
      const publicKey = "1234";
      const expectedHash = "ffd275c5130566a2916217b101f26150";

      const result = getMd5Hash(ts, privateKey, publicKey);

      expect(result).toBe(expectedHash);
    });
  });
});
