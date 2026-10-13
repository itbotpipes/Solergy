export type AdminRole = 'super_admin' | 'admin';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: number;
  lastLoginAt?: number;
}

export interface AdminSession {
  uid: string;
  email: string;
  role: AdminRole;
}
