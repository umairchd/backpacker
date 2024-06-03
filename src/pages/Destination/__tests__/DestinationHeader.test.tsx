/**
 * @jest-environment jest-environment-jsdom
 */

import React from "react";
import { render, cleanup } from "@testing-library/react";

import DestinationHeader from "../DestinationHeader";
import destinationHeaderMock from "./mocks/destinationHeaderMock.json";
import { AllTheProviders } from "@@/testUtils/test-utils";

describe.skip("when destination header is displayed", () => {
  let methods;

  beforeAll(() => {
    methods = render(
      <AllTheProviders>
        <DestinationHeader {...destinationHeaderMock} />
      </AllTheProviders>
    );
  });

  afterAll(cleanup);

  it("correct data must be rendered", () => {
    const { asFragment } = methods;

    expect(asFragment()).toMatchSnapshot();
  });
});
