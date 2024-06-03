import { isEqualStrings } from "../stringUtils";

describe("isEqualStrings function", () => {
  // Test cases
  it("should return true when both strings are equal", () => {
    expect(isEqualStrings("hello", "hello")).toBe(true);
  });

  it("should return true when both strings are empty", () => {
    expect(isEqualStrings("", "")).toBe(true);
  });

  it("should return false when first string is empty and second string is not", () => {
    expect(isEqualStrings("", "hello")).toBe(false);
  });

  it("should return false when first string is null and second string is not", () => {
    expect(isEqualStrings(null, "hello")).toBe(false);
  });

  it("should return false when first string is undefined and second string is not", () => {
    expect(isEqualStrings(undefined, "hello")).toBe(false);
  });

  it("should return false when both strings are undefined", () => {
    expect(isEqualStrings(undefined, undefined)).toBe(false);
  });

  it("should return false when first string is null and second string is empty", () => {
    expect(isEqualStrings(null, "")).toBe(false);
  });

  it("should return false when first string is undefined and second string is empty", () => {
    expect(isEqualStrings(undefined, "")).toBe(false);
  });

  it("should return false when both strings have different case", () => {
    expect(isEqualStrings("hello", "HELLO")).toBe(false);
  });

  it("should return false for strings with diacritics", () => {
    expect(isEqualStrings("café", "cafe")).toBe(false);
  });
});
