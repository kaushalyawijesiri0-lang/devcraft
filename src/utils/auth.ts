export interface DevCraftUser {
  firstName: string;
  fullName: string;
  initials: string;
  email: string;
  username: string;
}

export const DEFAULT_USER: DevCraftUser = {
  firstName: 'Inusha',
  fullName: 'Inusha Gunasekara',
  initials: 'IG',
  email: 'inusha@devcraft.io',
  username: 'inusha',
};

const STORAGE_KEY = 'devcraft_user';

export function getStoredUser(): DevCraftUser {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.firstName) {
        return {
          ...DEFAULT_USER,
          ...parsed,
        };
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_USER;
}

export function saveStoredUser(user: Partial<DevCraftUser>): DevCraftUser {
  const current = getStoredUser();
  const updated = { ...current, ...user };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('devcraft_user_changed', { detail: updated }));
  } catch {
    // fallback
  }
  return updated;
}

export function clearStoredUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('devcraft_user_changed', { detail: DEFAULT_USER }));
  } catch {
    // fallback
  }
}

export function parseUserFromInput(input: string, explicitFullName?: string): DevCraftUser {
  const clean = input.trim();
  const lower = clean.toLowerCase();

  // If user entered "inusha" or email with inusha
  if (lower.includes('inusha')) {
    return {
      firstName: 'Inusha',
      fullName: 'Inusha Gunasekara',
      initials: 'IG',
      email: clean.includes('@') ? clean : 'inusha@devcraft.io',
      username: 'inusha',
    };
  }

  // If explicitFullName was provided (e.g. from signup form)
  if (explicitFullName && explicitFullName.trim().length > 1) {
    const trimmed = explicitFullName.trim();
    const parts = trimmed.split(/\s+/);
    const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const lastName = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1) : '';
    const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();
    return {
      firstName,
      fullName: trimmed,
      initials,
      email: clean.includes('@') ? clean : `${firstName.toLowerCase()}@devcraft.io`,
      username: firstName.toLowerCase(),
    };
  }

  // If input is an email address: e.g. sarah.connor@example.com
  if (clean.includes('@')) {
    const local = clean.split('@')[0];
    const parts = local.split(/[._-]/).filter(Boolean);
    const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Builder';
    const lastName = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1) : '';
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;
    const initials = lastName ? (firstName[0] + lastName[0]).toUpperCase() : firstName.slice(0, 2).toUpperCase();
    return {
      firstName,
      fullName,
      initials,
      email: clean,
      username: local.toLowerCase(),
    };
  }

  // If input is a bare username, e.g. "john"
  const firstName = clean.charAt(0).toUpperCase() + clean.slice(1);
  return {
    firstName,
    fullName: firstName,
    initials: firstName.slice(0, 2).toUpperCase(),
    email: `${clean.toLowerCase()}@devcraft.io`,
    username: clean.toLowerCase(),
  };
}
