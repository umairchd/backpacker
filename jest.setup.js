/* eslint-disable @typescript-eslint/no-var-requires */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
require("dotenv").config({
  path: ".env.ci",
});

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import { TextEncoder, TextDecoder } from "node:util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
