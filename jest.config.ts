import nextJest from "next/jest";

import { pathsToModuleNameMapper } from "ts-jest";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  modulePaths: ["<rootDir>"],
  testResultsProcessor: "jest-sonar-reporter",
  reporters: ["default"],
  testMatch: ["**/*.test.(ts|tsx)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/*.generated.ts",
    "!**/__generated__/*",
    "!**/*.d.ts",
  ],
  testEnvironment: "jsdom",
};

async function getJestConfig() {
  const config = await createJestConfig(customJestConfig)();

  return config;
}

export default getJestConfig;
