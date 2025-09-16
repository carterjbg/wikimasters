export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// Hardcoded users - in production this would come from a database
const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Editor User',
    email: 'editor@test.com',
    role: 'editor',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: 'Viewer User',
    email: 'viewer@test.com',
    role: 'viewer',
    createdAt: '2024-01-03T00:00:00Z',
  },
];

// TODO: Replace with real database queries
export async function getAllUsers(): Promise<User[]> {
  // Simulate async database call
  return Promise.resolve([...users]);
}

export async function getUserById(id: number): Promise<User | null> {
  const user = users.find((u) => u.id === id);
  return Promise.resolve(user || null);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find((u) => u.email === email);
  return Promise.resolve(user || null);
}

export async function createUser(
  userData: Omit<User, 'id' | 'createdAt'>,
): Promise<User> {
  // In production, this would insert into database
  const newUser: User = {
    ...userData,
    id: users.length + 1,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return Promise.resolve(newUser);
}
