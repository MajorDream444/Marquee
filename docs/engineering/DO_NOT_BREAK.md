# MARQEE – Do Not Break

## Workspace rules
- pnpm-workspace.yaml must only include:
  - apps/*
  - packages/*

## Turbo rules
- Root package.json may run turbo.
- No workspace package may have scripts that call turbo (dev/build/lint/typecheck).

## Running
- Always run `pnpm dev` from repo root.
- If turbo fails, run apps directly for sanity:
  - apps/web: pnpm dev
  - apps/api: pnpm dev
  - apps/agents: pnpm dev
