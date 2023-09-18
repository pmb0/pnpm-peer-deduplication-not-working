const { strictEqual } = require("assert");
const path = require("path");

const rootDir = path.resolve(__dirname, "../..");

const a = require("@org/lib-a").replace(rootDir, "");
const b = require("@org/lib-b").replace(rootDir, "");
const service = require.resolve("@nestjs/core").replace(rootDir, "");

console.log({ a, b, c: service });

strictEqual(service, a, "lib-a / service");
strictEqual(service, b, "lib-b / service");
