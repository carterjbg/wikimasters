#!/usr/bin/env node
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, ".env.test") });
config({ path: join(__dirname, ".env.test.local") });

// Start the dev server with loaded environment
const server = spawn("npm", ["run", "dev"], {
  env: { ...process.env },
  stdio: "inherit",
  shell: true,
});

server.on("exit", (code) => {
  process.exit(code);
});

// Handle termination signals
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));
