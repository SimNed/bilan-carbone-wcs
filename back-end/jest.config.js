/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/dist"], // ignore files '.js'
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
};
