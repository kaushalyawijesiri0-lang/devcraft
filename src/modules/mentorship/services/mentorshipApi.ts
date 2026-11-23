const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type Mentor = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  fee: number;
  durationMin: number;
  description: string;
};

export type SessionStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export type Session = {
  id: string;
  mentorId: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  fee: number;
  discountApplied: number;
};

export type WalletSummary = {
  available: number;
  dailyFree: number;
  purchased: number;
  usedToday: number;
  usedThisWeek: number;
};

export type CoinPackage = {
  id: string;
  coins: number;
  price: number;
  note?: string;
};

export type CoinActivity = {
  id: string;
  date: string;
  type: 'allocation' | 'ai' | 'purchase';
  label: string;
  coins: number;
  description: string;
};

export type Reward = {
  id: string;
  title: string;
  meta: string[];
  description: string;
  originalPrice: number;
  discountPct: number;
};

export type UsedReward = {
  id: string;
  title: string;
  usedOn: string;
  mentor: string;
  topic: string;
  saved: number;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data as T;
}

export function getMentors(search = '') {
  const query = search.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : '';
  return request<{ mentors: Mentor[] }>(`/mentors${query}`);
}

export function getSessions(status = 'All') {
  const query =
    status && status !== 'All'
      ? `?status=${encodeURIComponent(status)}`
      : '';
  return request<{ sessions: Session[] }>(`/sessions${query}`);
}

export function bookMentor(payload: {
  mentorId: string;
  date: string;
  time: string;
  topic: string;
  applyDiscount?: boolean;
}) {
  return request<{ message: string; session: Session }>('/book-mentor', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getWallet() {
  return request<{
    wallet: WalletSummary;
    packages: CoinPackage[];
    activity: CoinActivity[];
  }>('/wallet');
}

export function topUpWallet(packageId: string) {
  return request<{
    message: string;
    wallet: WalletSummary;
    activity: CoinActivity[];
  }>('/wallet/topup', {
    method: 'POST',
    body: JSON.stringify({ packageId }),
  });
}

export function sendAiQuery(message: string) {
  return request<{
    reply: string;
    coinsDeducted: number;
    wallet: WalletSummary;
  }>('/ai-query', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

export function getRewards() {
  return request<{
    xp: number;
    rank: number;
    availableRewards: Reward[];
    usedRewards: UsedReward[];
  }>('/rewards');
}
