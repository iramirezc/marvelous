import { clear, get, remove, save } from "./cache-service";

describe("Cache Service", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("save()", () => {
    test("saves data", () => {
      save("foo", "bar");

      expect(localStorage.getItem("foo")).toBe('"bar"');
    });
  });

  describe("get()", () => {
    test("returns null if key does not exist", () => {
      expect(get("foo")).toBeNull();
    });

    test("returns data if key exists", () => {
      localStorage.setItem("foo", '"bar"');

      const data = get("foo");

      expect(data).toBe("bar");
    });
  });

  describe("remove()", () => {
    test("removes data", () => {
      localStorage.setItem("foo", '"bar"');

      expect(get("foo")).toBe("bar");

      remove("foo");

      expect(get("foo")).toBeNull();
    });
  });

  describe("clear()", () => {
    test("clears all data", () => {
      localStorage.setItem("foo", '"bar"');
      localStorage.setItem("baz", '"qux"');

      expect(get("foo")).toBe("bar");
      expect(get("baz")).toBe("qux");

      clear();

      expect(get("foo")).toBeNull();
      expect(get("baz")).toBeNull();
    });
  });
});
