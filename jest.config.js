/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  rootDir: "./src",
  transform: {
    "^.+.tsx?$": ["ts-jest"],
  },
};