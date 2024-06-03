/**
 * @jest-environment jest-environment-jsdom
 */

import React from "react";
import { delay, fromValue, pipe } from "wonka";
import { render } from "@testing-library/react";
import { FormProvider } from "react-hook-form";
import mockRouter from "next-router-mock";

import { RenderResult, act, waitFor, cleanup, fireEvent, AllTheProviders } from "test-utils";

import MoreActivities from "../../../pages/Destination/MoreActivities";
import serverContext from "@@/testUtils/mocks/serverContext.json";
import productSearchMock from "@@/testUtils/mocks/productSearch.json";
import { useFilterForm } from "@@/features/filterForm/hooks";
import moreActivitiesMock from "./mocks/moreActivitiesMock.json";
import productStatisticsMock from "./mocks/productStatisticsMock.json";

const mockClient = {
  executeQuery: ({ query }) => {
    const queryName = query.definitions[0]?.name.value;

    switch (queryName) {
      case "ProductSearch":
        return pipe(fromValue(productSearchMock), delay(100));
      case "ProductStatistics":
        return pipe(fromValue(productStatisticsMock), delay(100));
      default:
        return pipe(fromValue({}), delay(100));
    }
  },
  executeMutation: jest.fn(),
  executeSubscription: jest.fn(),
};

describe("when more activities section is displayed", () => {
  let methods: RenderResult;

  beforeEach(async () => {
    window.matchMedia("(min-width: 2000px)");

    const TestComponent = () => {
      const formData = useFilterForm();

      return (
        <AllTheProviders contextMock={serverContext}>
          <FormProvider {...formData}>
            <MoreActivities {...(moreActivitiesMock as any)} />
          </FormProvider>
        </AllTheProviders>
      );
    };

    act(() => {
      methods = render(<TestComponent />);
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it.skip("correct content is rendered", async () => {
    const { getByTestId, asFragment } = methods;

    await waitFor(() => expect(getByTestId("more-activities-pagination")).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });

  it.skip("pagination disappears after clicking on Show All button", async () => {
    const { getByText, getByTestId, queryByTestId } = methods;

    await waitFor(() => expect(getByText("Show all")).toBeInTheDocument());
    await waitFor(() => expect(getByTestId("more-activities-pagination")).toBeInTheDocument());
    act(() => {
      fireEvent.click(getByText("Show all"));
    });
    await waitFor(() => expect(queryByTestId("more-activities-pagination")).toBeNull());
  });

  it.skip("spinner is displayed and removed after Show All is clicked", async () => {
    const { getByText } = methods;

    await waitFor(() => expect(getByText("Show all")).toBeInTheDocument());
    act(() => {
      fireEvent.click(getByText("Show all"));
    });
    expect(document.querySelector(".spinner-border")).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector(".spinner-border")).toBeNull());
  });

  it.skip("pagination is set to the first page", async () => {
    const { getByTestId } = methods;

    await waitFor(() => expect(getByTestId("more-activities-pagination")).toBeInTheDocument());
    const pagination = getByTestId("more-activities-pagination");
    await waitFor(() => expect(pagination.querySelectorAll(".page-item")[0].className.includes("active")).toBeTruthy());
  });

  it.skip("pagination must change page correctly", async () => {
    const { getByTestId } = methods;

    await waitFor(() => expect(getByTestId("more-activities-pagination")).toBeInTheDocument());
    const pagination = getByTestId("more-activities-pagination");
    act(() => {
      fireEvent.click(pagination.querySelectorAll(".page-link")[1]);
    });
    await waitFor(() => expect(pagination.querySelectorAll(".page-item")[1].className.includes("active")).toBeFalsy());
    expect(pagination.querySelectorAll(".page-item")[2].className.includes("active")).toBeTruthy();
  });
});

describe("when more activities section is displayed and query has page number in it", () => {
  let methods: RenderResult;

  beforeEach(async () => {
    window.matchMedia("(min-width: 2000px)");
    mockRouter.setCurrentUrl("/australia?page=2");

    const TestComponent = () => {
      const formData = useFilterForm();

      return (
        <AllTheProviders contextMock={serverContext}>
          <FormProvider {...formData}>
            <MoreActivities {...(moreActivitiesMock as any)} />
          </FormProvider>
        </AllTheProviders>
      );
    };

    act(() => {
      methods = render(<TestComponent />);
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it.skip("correct data is rendered", async () => {
    const { getByTestId, asFragment } = methods;

    await waitFor(() => expect(getByTestId("more-activities-pagination")).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });
});
