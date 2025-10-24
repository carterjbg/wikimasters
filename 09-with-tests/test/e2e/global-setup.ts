import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { NeonBranchManager } from "../utils/neon-branch";

let devServer: ChildProcess | null = null;

async function globalSetup() {
  const projectId = process.env.NEON_PROJECT_ID;
  const apiKey = process.env.NEON_API_KEY;

  if (!projectId || !apiKey) {
    console.error(
      "NEON_PROJECT_ID and NEON_API_KEY are required for E2E tests"
    );
    throw new Error("Missing Neon credentials");
  }

  console.log("Creating Neon branch for E2E tests...");
  const neonBranch = new NeonBranchManager(projectId, apiKey);
  const connectionString = await neonBranch.createBranch();

  console.log("Running migrations...");
  await neonBranch.runMigrations();

  // No need to seed - branching from production gives us production data

  // Store the branch info for teardown
  const branchInfo = {
    branchId: (neonBranch as any).branchId,
    branchName: (neonBranch as any).branchName,
    connectionString,
  };

  writeFileSync(
    join(process.cwd(), ".test-branch-info.json"),
    JSON.stringify(branchInfo, null, 2)
  );

  // Write DATABASE_URL to .env.test.local so the dev server can pick it up
  const envLocalPath = join(process.cwd(), ".env.test.local");
  writeFileSync(envLocalPath, `DATABASE_URL="${connectionString}"\n`);

  // Set DATABASE_URL for the current process
  process.env.DATABASE_URL = connectionString;

  console.log("✅ Neon branch created and ready for testing");

  // Start the dev server with the DATABASE_URL
  console.log("Starting dev server...");
  devServer = spawn("npm", ["run", "dev"], {
    env: { ...process.env, DATABASE_URL: connectionString },
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
