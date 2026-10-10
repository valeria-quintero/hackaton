# Memory — Arcjet NestJS integration

Last updated: 2026-10-09 17:32

## What was built

Created Arcjet site `vm-hackaton` (`site_01m4h5t4j6ew6rwhw2dsc7nqee`) and added `@arcjet/node` plus `dotenv`. Added a global Arcjet module/service and global Nest guard that applies Shield and a 100-request/60-second fixed-window rate limit. Loaded `.env` at bootstrap and stored the site's key there; `.env` is ignored by Git. Later retrieved the site's key again and updated the single `ARCJET_KEY` entry in `.env`; never persist the key in memory.

## Decisions made

Used `@arcjet/node` instead of `@arcjet/nest` because the latter's current peer dependency range excludes this project's NestJS 12. Kept the app's existing CommonJS/Nest build by dynamically importing Arcjet's ESM-only SDK during provider initialization.

## Problems solved

Avoided changing the entire project to ESM to satisfy Arcjet's ESM-only SDK; the SDK is dynamically imported by the module provider.

## Current state

Arcjet is active in the app's global request pipeline. `npm run build`, `npm run lint`, editor diagnostics, and a local HTTP smoke test passed. Arcjet logs show the smoke-test request allowed and evaluated by the rate-limit rule. The latest Arcjet key is set in the ignored `.env`; it must remain only there.

## Next session starts with

If additional behavior is needed, adjust the rules in `src/lib/arcjet/arcjet.module.ts`; do not expose the key. Check the Arcjet site's request history and tune the global rate limit if production traffic needs a different threshold.

## Open questions

The chosen global limit is 100 requests per IP per 60 seconds; no workload-specific threshold was provided.
