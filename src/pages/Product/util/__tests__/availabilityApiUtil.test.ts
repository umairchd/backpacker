import { cleanup } from "@testing-library/react";
import { availabilityApiUtil } from "@@/pages/Product/util/availabilityApiUtil";
import {
  priceDataWithoutVariation,
  priceDataWithVariation,
} from "@@/pages/Product/util/__tests__/fixtures/priceDataMocks";
import {
  productDataWithoutVariation,
  productDataWithVariation,
} from "@@/pages/Product/util/__tests__/fixtures/productDataMocks";

afterEach(cleanup);

describe("Availability API Util Test", () => {
  it("should return FALSE when the product doesn't have variation", async () => {
    const productId = priceDataWithoutVariation.product.productId;
    const defaultProductId = productId;

    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      priceDataWithoutVariation,
      productDataWithoutVariation
    );

    expect(isSkipAvailabilityCall()).toBeFalsy();
  });

  it("should return TRUE when the product does have variation", async () => {
    const productId =
      priceDataWithVariation.product.variantProducts[0].productId;
    const defaultProductId =
      priceDataWithVariation.product.variantProducts[0].productId;

    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      priceDataWithVariation,
      productDataWithVariation
    );

    expect(isSkipAvailabilityCall()).toBeTruthy();
  });

  it("should return FALSE to not skip the availability call when the product does have variation, product ID is a parent product ID and default product ID has been changed to Variation Product ID", async () => {
    const productId = priceDataWithVariation.product.productId;
    const defaultProductId =
      priceDataWithVariation.product.variantProducts[0].productId;

    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      priceDataWithVariation,
      productDataWithVariation
    );

    expect(isSkipAvailabilityCall()).toBeFalsy();
  });

  it("should return TRUE to skip the availability call when the product does have variation, product ID and default product ID are still parent product ID", async () => {
    const productId = priceDataWithVariation.product.productId;
    const defaultProductId = priceDataWithVariation.product.productId;

    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      priceDataWithVariation,
      productDataWithVariation
    );

    expect(isSkipAvailabilityCall()).toBeTruthy();
  });

  it("should return TRUE to skip the availability call when using the price data without variations but product data with variation", async () => {
    const productId = priceDataWithoutVariation.product.productId;
    const defaultProductId = priceDataWithVariation.product.productId;

    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      priceDataWithoutVariation,
      productDataWithVariation
    );

    expect(isSkipAvailabilityCall()).toBeTruthy();
  });
});
