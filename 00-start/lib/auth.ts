import { User, getUserByEmail, getUserById } from './models/users';
import { cookies } from 'next/headers';

// TODO: Replace with Stack Auth or similar authentication service

export async function getCurrentUser(): Promise<User | null> {
  // Get user from cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user-session');

  if (!userCookie) {
    return null;
  }

  try {
    const userId = parseInt(userCookie.value);
    const user = await getUserById(userId);
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function login(email: string): Promise<User | null> {
  // Fake login - just switch between hardcoded users
  const user = await getUserByEmail(email);

  if (user) {
    // Set cookie with user ID
    const cookieStore = await cookies();
    cookieStore.set('user-session', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    console.log(`Logged in as: ${user.name} (${user.role})`);
  }

  return user;
}

export async function logout(): Promise<void> {
  const currentUser = await getCurrentUser();
  console.log(`Logged out: ${currentUser?.name || 'Guest'}`);

  // Clear cookie
  const cookieStore = await cookies();
  cookieStore.delete('user-session');

  return Promise.resolve();
}

export function hasRole(
  user: User | null,
  requiredRole: 'admin' | 'editor' | 'viewer',
): boolean {
  if (!user) return false;

  // Role hierarchy: admin > editor > viewer
  const roleHierarchy = {
    admin: 3,
    editor: 2,
    viewer: 1,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

export function canEditPages(user: User | null): boolean {
  return hasRole(user, 'editor');
}

export function canDeletePages(user: User | null): boolean {
  return hasRole(user, 'admin');
}

export function canViewPages(user: User | null): boolean {
  // Everyone can view pages, even guests
  return true;
}

export function isAuthenticated(user: User | null): boolean {
  return user !== null;
}
