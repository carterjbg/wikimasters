import { describe, it, expect } from 'vitest';
import { getAllUsers, getUserById, getUserByEmail } from './users';

describe('Users Model', () => {
  it('should get all users', async () => {
    const users = await getAllUsers();
    expect(users).toHaveLength(3);
    expect(users[0]).toHaveProperty('email', 'admin@test.com');
  });

  // TODO: Add more tests for user CRUD operations
});
