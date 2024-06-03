import React, { FC, ReactElement, Suspense } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { ThemeProvider } from "next-themes";

import "@@/styles/globals.scss";
import ServerContextProvider, { IServerContext } from "@@/pages/lib/ServerContextProvider";

import StoreProvider from "@@/pages/Store/StoreProvider";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import defaultContextMock from "./mocks/serverContext.json";
import { ClientInfoProvider } from "@@/app/lib/ClientInfoProvider";

jest.mock("next/router", () => require("next-router-mock"));

global.window.matchMedia = jest.fn().mockReturnValue({
  matches: true,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();

interface AllTheProvidersProps {
  children: React.ReactNode;
  contextMock?: any;
  apolloMocks?: ReadonlyArray<MockedResponse>;
}

export const AllTheProviders: FC<AllTheProvidersProps> = ({
  children,
  contextMock = defaultContextMock,
  apolloMocks,
}) => {
  const context: IServerContext = contextMock;

  return (
    <MockedProvider mocks={apolloMocks}>
      <ServerContextProvider value={context as any}>
        <StoreProvider>
          <ThemeProvider>
            <ClientInfoProvider host={context.host}>
              <Suspense>{children}</Suspense>
            </ClientInfoProvider>
          </ThemeProvider>
        </StoreProvider>
      </ServerContextProvider>
    </MockedProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
