import { cleanup } from "@testing-library/react";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";

afterEach(cleanup);

describe("useChannelUtil Test", () => {
  it("should return true for master channel backpackerdeals", function () {
    const { isMasterChannel } = useChannelUtil("backpackerdeals");
    expect(isMasterChannel()).toBeTruthy();
  });

  it("should return true for master channel travello", function () {
    const { isMasterChannel } = useChannelUtil("travello");
    expect(isMasterChannel()).toBeTruthy();
  });

  it("should return false for white label channel", function () {
    const { isMasterChannel } = useChannelUtil("jucy");
    expect(isMasterChannel()).toBeFalsy();
  });

  it("should return true for backpackerdeals channel only", function () {
    const { isBackpackerDealsChannel } = useChannelUtil("backpackerdeals");
    expect(isBackpackerDealsChannel()).toBeTruthy();
  });

  it("should return false for none backpackerdeals channel", function () {
    const { isBackpackerDealsChannel } = useChannelUtil("travello");
    expect(isBackpackerDealsChannel()).toBeFalsy();
  });
});
