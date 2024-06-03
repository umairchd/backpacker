/**
 * @jest-environment node
 */

import path from "node:path";

import handler from "../healthcheck.page";

import { createMocks } from "node-mocks-http";

const TEST_NAME = "healthcheck";

import nock from "nock";

describe(TEST_NAME, () => {
  let nockBack: nock.Back;

  beforeAll(async () => {
    nockBack = nock.back;
    nockBack.setMode(nockBack.currentMode);
    nockBack.fixtures = path.resolve(
      __dirname,
      `./__nock-fixtures__/${TEST_NAME}`
    );
  });

  beforeEach(() => {
    nock.enableNetConnect(/(localhost|127\.0\.0\.1)/);
  });

  afterEach(() => {
    nock.restore();
    nock.cleanAll();
    jest.resetAllMocks();
  });

  it("happy case", async () => {
    const { nockDone } = await nockBack("happy_case.json");

    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toMatchSnapshot();

    nockDone();
  });

  it("happy case post", async () => {
    const { nockDone } = await nockBack("happy_case.json");

    const { req, res } = createMocks({
      method: "POST",
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toMatchSnapshot();

    nockDone();
  });
});
