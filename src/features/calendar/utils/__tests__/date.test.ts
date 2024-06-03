import { deriveTimezoneNumberOffset } from "@@/features/calendar/utils/date";

describe("test offset string to offset number converter", () => {
  it("verify undefined doesnt break anything", async () => {
    const result = deriveTimezoneNumberOffset(undefined);
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("number");
  });

  it("verify timezone offset needs to be in correct format", async () => {
    const result = deriveTimezoneNumberOffset("1000");
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("number");
  });

  it("verify simple timezone", async () => {
    const result = deriveTimezoneNumberOffset("10:00");
    expect(result).toEqual(10.0);
  });

  it("verify timezone with unusual timezone minutes", async () => {
    const result = deriveTimezoneNumberOffset("12:45");
    expect(result).toEqual(12.75);
  });

  it("verify timezone for Adelaides odd timezone minutes", async () => {
    const result = deriveTimezoneNumberOffset("9:30");
    expect(result).toEqual(9.5);
  });

  it("verify negative timezone", async () => {
    const result = deriveTimezoneNumberOffset("-10:00");
    expect(result).toEqual(-10);
  });

  it("verify negative timezone with minutes", async () => {
    const result = deriveTimezoneNumberOffset("-11:45");
    expect(result).toEqual(-11.75);
  });

  it("verify UTC offset return 0 ", async () => {
    const result = deriveTimezoneNumberOffset("Z");
    expect(result).toEqual(0);
  });
});
