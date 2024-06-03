/**
 * @jest-environment node
 */

import path from "node:path";

import handler from "../graphql.page";

import { createMocks } from "node-mocks-http";

const TEST_NAME = "graphql";

import nock from "nock";
import { find } from "lodash";

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
    Date.now = jest.fn(() => 1678967889713); // this timestamp is captured to pair with the fixtures, it will need to be updated if the fixture needs to be updated

    const { nockDone } = await nockBack("happy_case.json");

    const { req, res } = createMocks({
      method: "POST",
      body: {
        query: `{
          __typename
        }`,
      },
      headers: {
        "x-forwarded-for": "159.196.13.170",
      },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toMatchSnapshot();

    nockDone();
  });

  it("fail at GET", async () => {
    const { nockDone } = await nockBack("fail_case.json");

    const { req, res } = createMocks({
      method: "GET",
      query: {
        deviceId: "random random id",
      },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toMatchSnapshot();

    nockDone();
  });
});
