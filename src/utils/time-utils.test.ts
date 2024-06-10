import { getTimestamp } from "./time-utils";

describe("Time Utils", () => {
  describe("getTimestamp()", () => {
    test("returns a string", () => {
      const timestamp = getTimestamp();

      expect(typeof timestamp).toBe("string");
    });

    test("returns a timestamp in milliseconds", () => {
      const timestamp = getTimestamp();

      expect(/^\d+$/.test(timestamp)).toBe(true);
    });

    test("returns a different timestamp on each call", async () => {
      const timestamp1 = getTimestamp();

      await new Promise((resolve) => setTimeout(resolve, 50));

      const timestamp2 = getTimestamp();

      expect(timestamp1).not.toBe(timestamp2);
    });
  });
});
