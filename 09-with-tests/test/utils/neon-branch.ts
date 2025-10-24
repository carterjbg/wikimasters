import { execSync } from "node:child_process";

interface NeonBranchResponse {
  branch: {
    id: string;
    name: string;
    project_id: string;
  };
  endpoints: Array<{
    id: string;
    host: string;
    branch_id: string;
  }>;
}

export class NeonBranchManager {
  private projectId: string;
  private apiKey: string;
  private branchName: string;
  private branchId: string | null = null;
  private connectionString: string | null = null;
  private apiBaseUrl = "https://console.neon.tech/api/v2";

  constructor(projectId: string, apiKey: string) {
    this.projectId = projectId;
    this.apiKey = apiKey;
    this.branchName = `test-${Date.now()}`;
  }

  async createBranch(): Promise<string> {
    try {
      // Create a new Neon branch via API
      // Set expiration timestamp 4 hours from now. The Neon API expects
      // `expires_at` as an RFC3339 timestamp (e.g. 2025-06-09T18:02:16Z).
      // Note: branch expiration is currently gated behind Neon's Early Access
      // Program for some accounts; the request may be rejected if your API key
      // / project doesn't have access.
      const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();

      const response = await fetch(
        `${this.apiBaseUrl}/projects/${this.projectId}/branches`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            branch: {
              name: this.branchName,
              // Expires at (RFC3339). Use `ttl_interval_seconds` is read-only.
              expires_at: expiresAt,
            },
            endpoints: [
              {
                type: "read_write",
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create Neon branch: ${response.status} ${errorText}`,
        );
      }

      const data: NeonBranchResponse = await response.json();
      this.branchId = data.branch.id;

      // Get the list of roles for this branch
      const rolesResponse = await fetch(
        `${this.apiBaseUrl}/projects/${this.projectId}/branches/${this.branchId}/roles`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (!rolesResponse.ok) {
        const errorText = await rolesResponse.text();
        throw new Error(
          `Failed to get roles: ${rolesResponse.status} ${errorText}`,
        );
      }

      const rolesData: { roles: Array<{ name: string }> } =
        await rolesResponse.json();
      const roleName = rolesData.roles[0]?.name || "neondb_owner";

      // Get the connection URI from Neon API
      // This endpoint provides the full connection string with credentials
      const connectionUriResponse = await fetch(
        `${this.apiBaseUrl}/projects/${this.projectId}/connection_uri?branch_id=${this.branchId}&database_name=neondb&role_name=${roleName}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (!connectionUriResponse.ok) {
        const errorText = await connectionUriResponse.text();
        throw new Error(
          `Failed to get connection URI: ${connectionUriResponse.status} ${errorText}`,
        );
      }

      const uriData: { uri: string } = await connectionUriResponse.json();
      this.connectionString = uriData.uri;
      return this.connectionString;
    } catch (error) {
      console.error("Failed to create Neon branch:", error);
      throw error;
    }
  }

  async deleteBranch(): Promise<void> {
    if (!this.branchId) return;

    try {
      const response = await fetch(
        `${this.apiBaseUrl}/projects/${this.projectId}/branches/${this.branchId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete Neon branch: ${response.status} ${errorText}`,
        );
      }

      console.log(`Deleted Neon branch: ${this.branchName} (${this.branchId})`);
    } catch (error) {
      console.error("Failed to delete Neon branch:", error);
    }
  }

  async runMigrations(): Promise<void> {
    if (!this.connectionString) {
      throw new Error("No connection string available. Create a branch first.");
    }

    try {
      // Run Drizzle migrations on the test branch
      execSync(`DATABASE_URL="${this.connectionString}" npm run db:migrate`, {
        encoding: "utf-8",
        stdio: "inherit",
      });
      console.log("Migrations completed successfully");
    } catch (error) {
      console.error("Failed to run migrations:", error);
      throw error;
    }
  }

  async seedDatabase(): Promise<void> {
    if (!this.connectionString) {
      throw new Error("No connection string available. Create a branch first.");
    }

    try {
      // Run seed script on the test branch
      execSync(`DATABASE_URL="${this.connectionString}" npm run db:seed`, {
        encoding: "utf-8",
        stdio: "inherit",
      });
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Failed to seed database:", error);
      throw error;
    }
  }

  getConnectionString(): string | null {
    return this.connectionString;
  }
}
