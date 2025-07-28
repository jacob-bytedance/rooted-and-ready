import { buildRegistry } from '@/scripts/build-registry.mjs';
import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// File to store last modification time
const LAST_MODIFIED_FILE = path.join(process.cwd(), '.openapi-last-modified');

async function getFileLastModified(filePath: string): Promise<number> {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtimeMs;
  } catch (error) {
    return 0; // If file doesn't exist, return 0
  }
}

async function saveLastModified(filePath: string, timestamp: number): Promise<void> {
  await fs.writeFile(LAST_MODIFIED_FILE, JSON.stringify({
    filePath,
    timestamp
  }));
}

async function getLastModified(filePath: string): Promise<number> {
  try {
    const data = await fs.readFile(LAST_MODIFIED_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.filePath === filePath ? parsed.timestamp : 0;
  } catch (error) {
    return 0; // If file doesn't exist or can't be parsed, return 0
  }
}

export async function generateDocs() {
  const inputFile = './scalar.yaml';
  const currentModified = await getFileLastModified(inputFile);
  const lastModified = await getLastModified(inputFile);
  
  // Skip generation if file hasn't changed
  if (currentModified > 0 && lastModified > 0 && currentModified <= lastModified) {
    console.log('OpenAPI spec has not changed, skipping generation');
    return;
  }
  
  console.log('OpenAPI spec has changed, generating documentation');
  await rimraf('./content/docs/openapi/(generated)');

  await Promise.all([
    OpenAPI.generateFiles({
      input: [inputFile],
      output: './content/docs/openapi/(generated)',
      per: 'operation',
      includeDescription: true,
    }),
  ]);
  
  // Save the current modification time
  await saveLastModified(inputFile, currentModified);
}

async function main() {
  await Promise.all([generateDocs(), buildRegistry()]);
}

await main().catch((e) => {
  console.error('Failed to run pre build script', e);
});
