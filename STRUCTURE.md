# Fumadocs Repository Structure

## Overview

This repository contains the Fumadocs documentation framework, a comprehensive solution for building documentation websites with Next.js. The repository is organized as a monorepo using pnpm workspaces.

## Directory Structure

### `/apps`

Contains the main applications of the project.

- `/apps/docs`: The main Fumadocs documentation website.
  - `/app`: Next.js app directory containing routes and layouts.
  - `/components`: React components used in the documentation site.
  - `/content`: Documentation content in MDX format.
  - `/lib`: Utility functions and helpers.
  - `/public`: Static assets.
  - `/scripts`: Build and maintenance scripts.

### `/packages`

Contains the core packages that make up the Fumadocs framework.

- `/packages/cli`: Command-line interface for Fumadocs.
- `/packages/content-collections`: Package for managing content collections.
- `/packages/core`: Core functionality of the Fumadocs framework.
- `/packages/create-app`: Package for creating new Fumadocs applications.
- `/packages/doc-gen`: Documentation generation utilities.
- `/packages/mdx`: MDX processing and integration.
- `/packages/mdx-remote`: Remote MDX content handling.
- `/packages/openapi`: OpenAPI integration for API documentation.
- `/packages/python`: Python documentation integration.
- `/packages/twoslash`: TypeScript Twoslash integration for code examples.
- `/packages/typescript`: TypeScript documentation generation.
- `/packages/ui`: UI components for Fumadocs.

### Configuration Files

- `package.json`: Root package configuration and scripts.
- `pnpm-workspace.yaml`: Workspace configuration for the monorepo.
- `turbo.json`: Turborepo configuration for build pipeline.
- `tsconfig.json`: TypeScript configuration.

## Development Workflow

The repository uses pnpm for package management and Turborepo for build orchestration. The main development commands are:

- `pnpm dev`: Run the development server for all packages.
- `pnpm build`: Build all packages.
- `pnpm lint`: Run linting on all packages.
- `pnpm test`: Run tests.

## Documentation Website

The main documentation website is located in `/apps/docs` and is built with Next.js. It uses the Fumadocs packages to render documentation content from MDX files located in the `/apps/docs/content` directory.