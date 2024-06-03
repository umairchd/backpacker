import { getNextAvailableDateFromAvailableSlotsV1 } from "@@/features/calendar/utils/nextAvailableDateV1";
import {
  productWithMultipleVariationsMock,
  productWithVariationsMock,
} from "@@/features/calendar/utils/fixtures/productWithVariationsMock";
import { productDataMock } from "@@/features/calendar/utils/fixtures/productDataMock";
import {
  availableDatesFromV1DataMock,
  availableDatesWithoutAvailableStatusFromV1DataMock,
} from "@@/features/calendar/utils/fixtures/availableDatesFromV1DataMock";

describe("Test GET Next Available Date from Available Slots V1", () => {
  it("should return 2023-10-27 from the first variation", () => {
    const nextAvailableDate = getNextAvailableDateFromAvailableSlotsV1(
      productDataMock,
      availableDatesFromV1DataMock
    );

    expect(nextAvailableDate).toBe("2023-10-27");
  });

  it("should return 2023-10-26 from the second variation", () => {
    const nextAvailableDate = getNextAvailableDateFromAvailableSlotsV1(
      productWithMultipleVariationsMock,
      availableDatesFromV1DataMock
    );

    expect(nextAvailableDate).toBe("2023-10-26");
  });

  it("should return NULL as it doesn't have available date with status = AVAILABLE for product without variation", () => {
    const nextAvailableDate = getNextAvailableDateFromAvailableSlotsV1(
      productDataMock,
      availableDatesWithoutAvailableStatusFromV1DataMock
    );

    expect(nextAvailableDate).toBeNull();
  });

  it("should return NULL as it doesn't have any available date for product with variation", () => {
    const nextAvailableDate = getNextAvailableDateFromAvailableSlotsV1(
      productWithVariationsMock,
      null
    );

    expect(nextAvailableDate).toBeNull();
  });
});
