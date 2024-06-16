import { getNow, getTimestamp, isExpired } from "./time-utils";

describe("Time Utils", () => {
  describe("getNow()", () => {
    test("returns a number", () => {
      const now = getNow();

      expect(typeof now).toBe("number");
    });

    test("returns the current time in milliseconds", () => {
      const now = getNow();

      expect(now).toBeCloseTo(Date.now(), -1);
    });
  });

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

  describe("isExpired()", () => {
    test("returns true if the timestamp is expired", () => {
      const timestamp = Date.now() - 1000;

      const expired = isExpired(timestamp, 500);

      expect(expired).toBe(true);
    });

    test("returns false if the timestamp is not expired", () => {
      const timestamp = Date.now();

      const expired = isExpired(timestamp, 500);

      expect(expired).toBe(false);
    });
  });
});
