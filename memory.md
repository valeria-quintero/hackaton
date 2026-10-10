# Memory — Validation dependencies

Last updated: 2026-10-10 12:02

## What was built

Added `class-validator` and `class-transformer` dependencies to `package.json` and `package-lock.json`.

## Decisions made

Used `npm install --legacy-peer-deps` because the existing Prisma 8 RC conflicts with Better Auth's optional Prisma peer dependency range, despite the project using Better Auth's PostgreSQL adapter.

## Problems solved

Installed both packages after standard npm dependency resolution failed on the pre-existing Prisma/Better Auth peer conflict.

## Current state

`class-validator@0.15.1` and `class-transformer@0.5.1` are installed and verified with `npm ls`. The working tree also contains pre-existing changes to `package.json`, `src/app.module.ts`, `src/main.ts`, and untracked `src/module/hackaton/`; those were not modified as part of this task. npm reported 37 audit vulnerabilities.

## Next session starts with

Resolve the existing Node 24/Nest ESM startup issue documented before this session, then verify the application routes.

## Open questions

The underlying peer dependency conflict and npm audit findings remain unresolved.
