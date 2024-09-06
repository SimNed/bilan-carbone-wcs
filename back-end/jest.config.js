/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/dist"],
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: 1,
  clearMocks: true,
};