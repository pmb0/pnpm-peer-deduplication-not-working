# pnpm peer dependency issue reproduction repo

This repository contains two libs and a "service". The common dependency `@nestjs/core` is installed multiple times, which leads to problems when using the framework.

Run test:

```sh
git clone https://github.com/pmb0/pnpm-peer-deduplication-not-working
pnpm i
pnpm test
```

Expected result: from the point of view of each package, `@nestjs/core` leads to the same path. But the imports are resolved differently:

```diff
-node_modules/.pnpm/@nestjs+core@10.2.5_@nestjs+common@10.2.5_@nestjs+microservices@10.2.5_reflect-metadata@0.1.13_rxjs@7.8.1/node_modules/@nestjs/core/index.js
+node_modules/.pnpm/@nestjs+core@10.2.5_@nestjs+common@10.2.5_@nestjs+platform-express@10.2.5_reflect-metadata@0.1.13_rxjs@7.8.1/node_modules/@nestjs/core/index.js
```

---

`packages/lib-a/package.json`:

```json
{
  "name": "@org/lib-a",
  "version": "1.0.0",
  "devDependencies": {
    "@nestjs/core": "^10.2.5",
    "@nestjs/platform-express": "^10.2.5"
  },
  "peerDependencies": {
    "@nestjs/core": "^10.2.5",
    "@nestjs/platform-express": "^10.2.5"
  }
}
```

`packages/lib-b/package.json`:

```json
{
  "name": "@org/lib-b",
  "version": "1.0.0",
  "devDependencies": {
    "@nestjs/core": "^10.2.5",
    "@nestjs/microservices": "^10.2.5"
  },
  "peerDependencies": {
    "@nestjs/core": "^10.2.5",
    "@nestjs/microservices": "^10.2.5"
  }
}
```

`packages/service/package.json`:

```json
{
  "name": "@org/service",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "node ."
  },
  "dependencies": {
    "@nestjs/core": "^10.2.5",
    "@nestjs/platform-express": "^10.2.5",
    "@org/lib-a": "workspace:^",
    "@org/lib-b": "workspace:^"
  }
}
```