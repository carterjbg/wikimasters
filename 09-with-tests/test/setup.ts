import dotenv from "dotenv";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

dotenv.config({ path: ".env.test" });

// Mock Next.js redirect function
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(),
}));

// Setup and cleanup hooks can be added here
beforeAll(async () => {
  // Setup code before all tests
});

afterAll(async () => {
  // Cleanup code after all tests
});

beforeEach(async () => {
  // Setup code before each test
});

afterEach(async () => {
  // Cleanup code after each test
});
