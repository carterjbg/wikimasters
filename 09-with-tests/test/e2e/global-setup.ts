import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
// ...existing code...

let devServer: ChildProcess | null = null;

async function globalSetup() {
  // ...existing code...

  // ...existing code...

  // Start the dev server
  console.log("Starting dev server...");
  devServer = spawn("npm", ["run", "dev"], {
    env: process.env,
    stdio: "inherit",
    shell: true,
  });

  // Wait for server to be ready
  await waitForServer("http://localhost:3000", 120000);
  console.log("✅ Dev server is ready");

  // Store the server process ID for teardown
  writeFileSync(
    join(process.cwd(), ".test-server-pid.json"),
    JSON.stringify({ pid: devServer.pid }, null, 2)
  );
}

async function waitForServer(url: string, timeout: number): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status === 404) {
        return;
      }
    } catch (_error) {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

export default globalSetup;
