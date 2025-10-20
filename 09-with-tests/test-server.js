#!/usr/bin/env node
import { config } from 'dotenv';
import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env.test') });
config({ path: join(__dirname, '.env.test.local') });

// Start the dev server with loaded environment
const server = spawn('npm', ['run', 'dev'], {
  env: { ...process.env },
  stdio: 'inherit',
  shell: true,
});

server.on('exit', (code) => {
  process.exit(code);
});

// Handle termination signals
process.on('SIGINT', () => server.kill('SIGINT'));
process.on('SIGTERM', () => server.kill('SIGTERM'));
