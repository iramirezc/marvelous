import { getHash } from "./hashing-utils";

describe("Hashing Utils", () => {
  describe("getHash()", () => {
    test("returns the correct md5 hash", () => {
      const ts = "1";
      const privateKey = "abcd";
      const publicKey = "1234";
      const expectedHash = "ffd275c5130566a2916217b101f26150";

      const result = getHash(ts, privateKey, publicKey);

      expect(result).toBe(expectedHash);
    });
  });
});
