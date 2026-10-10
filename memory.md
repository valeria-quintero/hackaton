# Memory — Better Auth NestJS integration

Last updated: 2026-10-10 00:45

## What was built

Integrated Better Auth 1.7.7 using `@thallesp/nestjs-better-auth` 2.8.0. Added `src/lib/auth/` with a PostgreSQL pool, global Nest module/service lifecycle, and Better Auth configuration. Mounted `AuthModule.forRoot({ auth })`, disabled Nest body parsing per the integration guide, made `/` explicitly anonymous, and added protected `GET /users/me`. Documented configuration in `.env.example` and README.

## Decisions made

Kept Prisma 8 RC for the app data layer. Better Auth’s Prisma adapter does not support Prisma 8 RC, so Better Auth uses the PostgreSQL adapter documented by Better Auth and owns its auth tables. User `role` is validated to `PARTICIPANT | ADMIN`, defaults to `PARTICIPANT`, and has `input: false` so sign-up cannot set it.

## Problems solved

The Prisma CLI initially could not find the required `temporal-polyfill` peer dependency; added it so contract emission and Prisma CLI commands can run.

## Current state

Better Auth tables were migrated in the configured PostgreSQL database. `npm exec auth -- check schema --config src/lib/auth/auth.ts` passes, and calling the Better Auth `/api/auth/ok` handler directly returns `200 {"ok":true}`. Prisma contract regeneration, Nest build, and lint pass (lint only reports the existing empty `src/prisma/prisma.service.ts` warning).

Standard `npm run start:dev` does not currently launch under Node 24: compiled ESM output uses extensionless relative imports and Node reports `ERR_MODULE_NOT_FOUND` for `dist/app.module`. Running source through `tsx` starts Nest but does not emit the decorator metadata needed for the existing Arcjet guard, causing request-time errors. Resolve the project’s Node/TypeScript module configuration before treating the server smoke test as passed.

## Next session starts with

Investigate and fix the Node 24/Nest module output so `npm run start:dev` can serve requests, then verify the public route, `/api/auth/ok`, protected `/users/me`, and sign-up role handling end-to-end.

## Open questions

The auth tables are managed by Better Auth’s PostgreSQL CLI rather than Prisma migrations, due to the installed Prisma 8 RC incompatibility with Better Auth’s Prisma adapter. The lockfile has npm-generated transitive metadata changes in addition to the new dependencies.
