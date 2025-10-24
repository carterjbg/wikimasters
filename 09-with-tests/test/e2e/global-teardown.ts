import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { NeonBranchManager } from "../utils/neon-branch";

async function globalTeardown() {
  // Kill the dev server first
  const serverPidPath = join(process.cwd(), ".test-server-pid.json");
  if (existsSync(serverPidPath)) {
    try {
      const { pid } = JSON.parse(readFileSync(serverPidPath, "utf-8"));
      console.log(`Stopping dev server (PID: ${pid})...`);
      process.kill(pid, "SIGTERM");
      unlinkSync(serverPidPath);
    } catch (error) {
      console.error("Failed to stop dev server:", error);
    }
  }

  const branchInfoPath = join(process.cwd(), ".test-branch-info.json");

  if (!existsSync(branchInfoPath)) {
    console.log("No branch info found, skipping cleanup");
    return;
  }

  try {
    const branchInfo = JSON.parse(readFileSync(branchInfoPath, "utf-8"));
    const projectId = process.env.NEON_PROJECT_ID;
    const apiKey = process.env.NEON_API_KEY;

    if (!projectId || !apiKey) {
      console.error(
        "NEON_PROJECT_ID and NEON_API_KEY are required for cleanup"
      );
      return;
    }

    console.log("Cleaning up Neon branch...");
    const neonBranch = new NeonBranchManager(projectId, apiKey);
    // Set the branch ID from the stored info
    (neonBranch as any).branchId = branchInfo.branchId;
    (neonBranch as any).branchName = branchInfo.branchName;

    await neonBranch.deleteBranch();

    // Clean up the branch info file
    unlinkSync(branchInfoPath);

    // Clean up the .env.test.local file
    const envLocalPath = join(process.cwd(), ".env.test.local");
    if (existsSync(envLocalPath)) {
      unlinkSync(envLocalPath);
    }

    console.log("✅ Neon branch cleaned up");
  } catch (error) {
    console.error("Failed to clean up Neon branch:", error);
  }
}

export default globalTeardown;
