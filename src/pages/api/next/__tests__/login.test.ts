/**
 * @jest-environment node
 */

import path from "node:path";

import handler from "../login.page";

import { createMocks } from "node-mocks-http";

const TEST_NAME = "login";

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
      headers: {
        host: "localhost:3000",
      },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(302);
    expect(
      res
        ._getRedirectUrl()
        .startsWith(
          "https://stage.travelloapp.com/auth/realms/travello/protocol/openid-connect/auth?client_id=backpackerdeals-next&scope=email%20openid%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fnext%2Flogin-callback&code_challenge="
        )
    );

    nockDone();
  });

  it("fail at POST", async () => {
    const { nockDone } = await nockBack("fail_case.json");

    const { req, res } = createMocks({
      method: "POST",
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toMatchSnapshot();

    nockDone();
  });
});
