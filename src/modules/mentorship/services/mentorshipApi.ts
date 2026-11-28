const API_BASE =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_URL ||
  'http://localhost:5000/api';

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

async function request<T>(
  path: string,
  options: RequestInit | undefined,
  fallback: () => T,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    return fallback();
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data as T;
}

const QUERY_COIN_COST = 5;

const fallbackMentors: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Nethmi',
    role: 'Frontend Developer',
    skills: ['React', 'JavaScript', 'CSS'],
    fee: 2000,
    durationMin: 30,
    description:
      'Get help with React components, responsive layouts, and frontend projects.',
  },
  {
    id: 'mentor-2',
    name: 'Kavindu',
    role: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB'],
    fee: 2500,
    durationMin: 45,
    description:
      'Learn how to build APIs, structure backend applications, and work with databases.',
  },
  {
    id: 'mentor-3',
    name: 'Amaya',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB'],
    fee: 3000,
    durationMin: 60,
    description:
      'Get guidance on connecting your frontend and backend into a complete application.',
  },
];

const fallbackSessions: Session[] = [
  {
    id: 'session-1',
    mentorId: 'mentor-1',
    topic: 'Building reusable React components',
    date: '2026-12-10',
    time: '09:00',
    duration: 30,
    status: 'Upcoming',
    fee: 2000,
    discountApplied: 0,
  },
  {
    id: 'session-2',
    mentorId: 'mentor-2',
    topic: 'Creating my first Express API',
    date: '2026-12-12',
    time: '14:00',
    duration: 45,
    status: 'Upcoming',
    fee: 2500,
    discountApplied: 0,
  },
  {
    id: 'session-3',
    mentorId: 'mentor-3',
    topic: 'Connecting frontend and backend',
    date: '2026-11-10',
    time: '11:00',
    duration: 60,
    status: 'Completed',
    fee: 2500,
    discountApplied: 375,
  },
];

const fallbackWallet: WalletSummary = {
  available: 65,
  dailyFree: 15,
  purchased: 50,
  usedToday: 5,
  usedThisWeek: 20,
};

const fallbackPackages: CoinPackage[] = [
  { id: 'pack-1', coins: 25, price: 500, note: 'Starter pack' },
  { id: 'pack-2', coins: 60, price: 1000, note: 'Most popular' },
  { id: 'pack-3', coins: 150, price: 2200, note: 'Best value' },
];

const fallbackActivity: CoinActivity[] = [
  {
    id: 'act-1',
    date: '2026-11-18',
    type: 'allocation',
    label: 'Daily free coins',
    coins: 15,
    description: 'Automatic daily coin allocation',
  },
  {
    id: 'act-2',
    date: '2026-11-18',
    type: 'ai',
    label: 'AI Mentor query',
    coins: -5,
    description: 'Debugging React useEffect dependency loop',
  },
  {
    id: 'act-3',
    date: '2026-11-16',
    type: 'purchase',
    label: 'Coin package top-up',
    coins: 60,
    description: 'Purchased 60 coins via PayHere',
  },
  {
    id: 'act-4',
    date: '2026-11-15',
    type: 'ai',
    label: 'AI Mentor query',
    coins: -5,
    description: 'Explaining Express middleware error handling',
  },
];

const fallbackRewards = {
  xp: 2450,
  rank: 12,
  availableRewards: [
    {
      id: 'rew-1',
      title: '20% Off 1:1 Mentor Session',
      meta: ['Top 15 Leaderboard Tier', 'Valid for 30-min or 60-min sessions'],
      description:
        'Earned by maintaining a Top 15 position on the global DevCraft XP leaderboard.',
      originalPrice: 2500,
      discountPct: 20,
    },
  ] as Reward[],
  usedRewards: [
    {
      id: 'used-1',
      title: '15% Off 1:1 Mentor Session',
      usedOn: '2026-11-10',
      mentor: 'Amaya',
      topic: 'Connecting frontend and backend',
      saved: 375,
    },
  ] as UsedReward[],
};

export function getMentors(search = '') {
  const trimmed = search.trim();
  const query = trimmed ? `?search=${encodeURIComponent(trimmed)}` : '';
  return request<{ mentors: Mentor[] }>(`/mentors${query}`, undefined, () => {
    const term = trimmed.toLowerCase();
    const mentors = term
      ? fallbackMentors.filter((m) =>
          [m.name, m.role, ...m.skills].join(' ').toLowerCase().includes(term),
        )
      : fallbackMentors;
    return { mentors };
  });
}

export function getSessions(status = 'All') {
  const query =
    status && status !== 'All'
      ? `?status=${encodeURIComponent(status)}`
      : '';
  return request<{ sessions: Session[] }>(`/sessions${query}`, undefined, () => {
    const sessions =
      !status || status === 'All'
        ? fallbackSessions
        : fallbackSessions.filter((s) => s.status === status);
    return { sessions: [...sessions] };
  });
}

export function bookMentor(payload: {
  mentorId: string;
  date: string;
  time: string;
  topic: string;
  applyDiscount?: boolean;
}) {
  return request<{ message: string; session: Session }>(
    '/book-mentor',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    () => {
      const mentor = fallbackMentors.find((m) => m.id === payload.mentorId);
      if (!mentor) {
        throw new Error('Mentor not found.');
      }
      const discountApplied = payload.applyDiscount
        ? Math.round(mentor.fee * 0.2)
        : 0;
      const newSession: Session = {
        id: `session-${Date.now()}`,
        mentorId: mentor.id,
        topic: payload.topic.trim(),
        date: payload.date,
        time: payload.time,
        duration: mentor.durationMin,
        status: 'Upcoming',
        fee: mentor.fee - discountApplied,
        discountApplied,
      };
      fallbackSessions.unshift(newSession);
      return {
        message: 'Session booked successfully (frontend demo mode).',
        session: newSession,
      };
    },
  );
}

export function getWallet() {
  return request<{
    wallet: WalletSummary;
    packages: CoinPackage[];
    activity: CoinActivity[];
  }>('/wallet', undefined, () => ({
    wallet: { ...fallbackWallet },
    packages: fallbackPackages,
    activity: [...fallbackActivity],
  }));
}

export function topUpWallet(packageId: string) {
  return request<{
    message: string;
    wallet: WalletSummary;
    activity: CoinActivity[];
  }>(
    '/wallet/topup',
    {
      method: 'POST',
      body: JSON.stringify({ packageId }),
    },
    () => {
      const selected = fallbackPackages.find((p) => p.id === packageId);
      if (!selected) {
        throw new Error('Coin package not found.');
      }
      fallbackWallet.purchased += selected.coins;
      fallbackWallet.available =
        fallbackWallet.dailyFree + fallbackWallet.purchased;
      fallbackActivity.unshift({
        id: `act-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        type: 'purchase',
        label: 'Coin package top-up',
        coins: selected.coins,
        description: `Purchased ${selected.coins} coins via PayHere (demo)`,
      });
      return {
        message: `Added ${selected.coins} coins to your wallet.`,
        wallet: { ...fallbackWallet },
        activity: [...fallbackActivity],
      };
    },
  );
}

export function sendAiQuery(message: string) {
  return request<{
    reply: string;
    coinsDeducted: number;
    wallet: WalletSummary;
  }>(
    '/ai-query',
    {
      method: 'POST',
      body: JSON.stringify({ message }),
    },
    () => {
      const prompt = message.trim();
      if (!prompt) {
        throw new Error('Message is required.');
      }
      if (fallbackWallet.available < QUERY_COIN_COST) {
        throw new Error(
          'Insufficient coins. Top up your Coin Wallet or book a human mentor.',
        );
      }
      if (fallbackWallet.dailyFree >= QUERY_COIN_COST) {
        fallbackWallet.dailyFree -= QUERY_COIN_COST;
      } else {
        const remainder = QUERY_COIN_COST - fallbackWallet.dailyFree;
        fallbackWallet.dailyFree = 0;
        fallbackWallet.purchased -= remainder;
      }
      fallbackWallet.available =
        fallbackWallet.dailyFree + fallbackWallet.purchased;
      fallbackWallet.usedToday += QUERY_COIN_COST;
      fallbackWallet.usedThisWeek += QUERY_COIN_COST;
      fallbackActivity.unshift({
        id: `act-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        type: 'ai',
        label: 'AI Mentor query',
        coins: -QUERY_COIN_COST,
        description: prompt.slice(0, 60),
      });
      return {
        reply: `Here is a quick breakdown for "${prompt}":\n\n1. Check your component props/state or Express route handler parameters.\n2. Verify your API request URL and JSON payload in the Network tab.\n3. If you're still stuck, click "Find Mentors" for a 1:1 session.`,
        coinsDeducted: QUERY_COIN_COST,
        wallet: { ...fallbackWallet },
      };
    },
  );
}

export function getRewards() {
  return request<{
    xp: number;
    rank: number;
    tierDiscountPct?: number;
    availableRewards: Reward[];
    usedRewards: UsedReward[];
  }>('/rewards', undefined, () => ({ ...fallbackRewards, tierDiscountPct: 20 }));
}

export function getMentorAvailability(mentorId: string, date: string) {
  return request<{
    mentorId: string;
    date: string;
    allSlots: string[];
    bookedTimes: string[];
    availableSlots: string[];
  }>(
    `/mentors/${encodeURIComponent(mentorId)}/availability?date=${encodeURIComponent(date)}`,
    undefined,
    () => {
      const allSlots = ['09:00', '11:00', '14:00', '16:00', '19:00'];
      const bookedTimes = fallbackSessions
        .filter(
          (s) =>
            s.mentorId === mentorId &&
            s.date === date &&
            s.status !== 'Cancelled',
        )
        .map((s) => s.time);
      return {
        mentorId,
        date,
        allSlots,
        bookedTimes,
        availableSlots: allSlots.filter((slot) => !bookedTimes.includes(slot)),
      };
    },
  );
}

export function cancelSession(sessionId: string) {
  return request<{ message: string; session: Session }>(
    `/sessions/${encodeURIComponent(sessionId)}/cancel`,
    { method: 'PATCH' },
    () => {
      const found = fallbackSessions.find((s) => s.id === sessionId);
      if (!found) {
        throw new Error('Session not found.');
      }
      found.status = 'Cancelled';
      return { message: 'Session cancelled.', session: found };
    },
  );
}

export type PayHereInitiateResponse =
  | {
      mode: 'payhere';
      checkoutUrl: string;
      payload: Record<string, string>;
    }
  | {
      mode: 'demo';
      orderId: string;
      amount: number;
      message: string;
    };

export function initiatePayment(payload: {
  type: 'coin_topup' | 'mentor_booking';
  packageId?: string;
  sessionId?: string;
  amount: number;
  itemTitle: string;
}) {
  return request<PayHereInitiateResponse>(
    '/payment/initiate',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    () => ({
      mode: 'demo',
      orderId: `DEMO-${Date.now()}`,
      amount: payload.amount,
      message: 'Frontend demo mode — completing instant checkout.',
    }),
  );
}

export function submitPayHereForm(
  checkoutUrl: string,
  payload: Record<string, string>,
) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = checkoutUrl;

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
