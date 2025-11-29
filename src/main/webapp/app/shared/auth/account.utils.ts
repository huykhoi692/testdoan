import type { IUser } from './auth.reducer';

export const SESSION_ACCOUNT_KEY = 'account';

const hasWindow = () => typeof window !== 'undefined';

export const readAccountFromSession = (): IUser | null => {
  if (!hasWindow() || !window.sessionStorage) {
    return null;
  }
  const stored = window.sessionStorage.getItem(SESSION_ACCOUNT_KEY);
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored) as IUser;
  } catch (error) {
    window.sessionStorage.removeItem(SESSION_ACCOUNT_KEY);
    return null;
  }
};

export const persistAccountToSession = (account: IUser) => {
  if (!hasWindow() || !window.sessionStorage || !account) {
    return;
  }
  try {
    window.sessionStorage.setItem(SESSION_ACCOUNT_KEY, JSON.stringify(account));
  } catch (error) {
    // ignore quota errors
  }
};

export const clearSessionAccount = () => {
  if (!hasWindow() || !window.sessionStorage) {
    return;
  }
  window.sessionStorage.removeItem(SESSION_ACCOUNT_KEY);
};

export const hasAccountData = (acct?: IUser | null): acct is IUser => !!acct && Object.keys(acct).length > 0;

export const resolveDisplayName = (account?: IUser | null) => {
  if (!account) {
    return '';
  }
  const preferred = account.displayName?.trim();
  if (preferred) {
    return preferred;
  }
  const combined = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
  if (combined.length > 0) {
    return combined;
  }
  return account.login ?? '';
};

export const resolveRoleLabel = (account?: IUser | null) => {
  const roles = account?.authorities || [];
  if (!roles.length) return 'Learner';
  const normalize = (r: string) =>
    r
      .replace('ROLE_', '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/^./, c => c.toUpperCase());
  // prefer ADMIN when present
  if (roles.includes('ROLE_ADMIN')) return 'Admin';
  if (roles.includes('ROLE_USER')) return 'User';
  return normalize(roles[0]);
};

export const resolveAvatarUrl = (account?: IUser | null) => account?.avatarUrl || account?.imageUrl || undefined;
