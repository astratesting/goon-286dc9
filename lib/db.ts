import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';

export type MembershipTier =
  | 'FOUNDING'
  | 'RESIDENT'
  | 'ASSOCIATE'
  | 'CURIOUS';

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  tier: MembershipTier;
  referral: string;
  status: 'PENDING' | 'INVITED' | 'ACTIVE';
  createdAt: string;
};

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  referral: string;
  tier: MembershipTier;
  createdAt: string;
};

export type ApplicationEvent = {
  id: string;
  userId: string;
  type: 'APPLICATION_RECEIVED' | 'PROFILE_UPDATED' | 'INTERVIEW_SCHEDULED' | 'WELCOME_COMMUNIQUE';
  message: string;
  createdAt: string;
};

type Store = {
  users: User[];
  waitlist: WaitlistEntry[];
  events: ApplicationEvent[];
};

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

const DEMO_EMAIL = 'demo@demo.app';
const DEMO_PASSWORD = 'demo123';

function ensureDemoSeed(store: Store): Store {
  const hasDemo = store.users.some((u) => u.email === DEMO_EMAIL);
  if (!hasDemo) {
    const passwordHash = bcrypt.hashSync(DEMO_PASSWORD, 10);
    const demoId = 'usr_demo';
    store.users.push({
      id: demoId,
      email: DEMO_EMAIL,
      name: 'Demo Aristide',
      passwordHash,
      tier: 'FOUNDING',
      referral: 'House of Goon — Preview Invite',
      status: 'INVITED',
      createdAt: new Date('2026-06-01T10:00:00Z').toISOString(),
    });
    const now = Date.now();
    const day = 86400000;
    store.events.push(
      {
        id: 'evt_1',
        userId: demoId,
        type: 'APPLICATION_RECEIVED',
        message:
          'Your letter of interest was received by the House Committee. Reference #GOON-0001.',
        createdAt: new Date(now - 4 * day).toISOString(),
      },
      {
        id: 'evt_2',
        userId: demoId,
        type: 'WELCOME_COMMUNIQUE',
        message:
          'A private welcome communiqué was dispatched. Your Founding candidacy is under review.',
        createdAt: new Date(now - 2 * day).toISOString(),
      },
      {
        id: 'evt_3',
        userId: demoId,
        type: 'INTERVIEW_SCHEDULED',
        message:
          'A short audience with the Membership Secretary has been provisionally calendared.',
        createdAt: new Date(now - 1 * day).toISOString(),
      },
    );
  }
  return store;
}

function defaultStore(): Store {
  return ensureDemoSeed({ users: [], waitlist: [], events: [] });
}

let cache: Store | null = null;

function load(): Store {
  if (cache) return cache;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      cache = ensureDemoSeed(JSON.parse(raw));
      persist(cache);
      return cache;
    }
    cache = defaultStore();
    persist(cache);
    return cache;
  } catch {
    cache = defaultStore();
    return cache;
  }
}

function persist(store: Store) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
  } catch {
    // best-effort; in-memory still works for the running process
  }
}

function getStore(): Store {
  return load();
}

export function findUserByEmail(email: string): User | undefined {
  return getStore().users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findUserById(id: string): User | undefined {
  return getStore().users.find((u) => u.id === id);
}

export function verifyPassword(user: User, password: string): boolean {
  try {
    return bcrypt.compareSync(password, user.passwordHash);
  } catch {
    return false;
  }
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
  tier: MembershipTier;
  referral: string;
}): { user?: User; error?: string } {
  const store = getStore();
  const exists = store.users.some(
    (u) => u.email.toLowerCase() === input.email.toLowerCase(),
  );
  if (exists) {
    return { error: 'An account with this email already exists.' };
  }
  const user: User = {
    id: 'usr_' + Math.random().toString(36).slice(2, 10),
    email: input.email,
    name: input.name,
    passwordHash: bcrypt.hashSync(input.password, 10),
    tier: input.tier,
    referral: input.referral,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  store.events.push({
    id: 'evt_' + Math.random().toString(36).slice(2, 10),
    userId: user.id,
    type: 'APPLICATION_RECEIVED',
    message: 'Your letter of interest was received by the House Committee.',
    createdAt: user.createdAt,
  });
  persist(store);
  return { user };
}

export function addWaitlistEntry(input: {
  name: string;
  email: string;
  referral: string;
  tier: MembershipTier;
}): WaitlistEntry {
  const store = getStore();
  const entry: WaitlistEntry = {
    id: 'wl_' + Math.random().toString(36).slice(2, 10),
    ...input,
    createdAt: new Date().toISOString(),
  };
  store.waitlist.push(entry);
  persist(store);
  return entry;
}

export function updateUserProfile(
  id: string,
  patch: Partial<Pick<User, 'name' | 'tier' | 'referral'>>,
): User | undefined {
  const store = getStore();
  const user = store.users.find((u) => u.id === id);
  if (!user) return undefined;
  if (patch.name) user.name = patch.name;
  if (patch.tier) user.tier = patch.tier;
  if (patch.referral) user.referral = patch.referral;
  store.events.unshift({
    id: 'evt_' + Math.random().toString(36).slice(2, 10),
    userId: user.id,
    type: 'PROFILE_UPDATED',
    message: 'Membership dossier updated.',
    createdAt: new Date().toISOString(),
  });
  persist(store);
  return user;
}

export function getEventsForUser(userId: string): ApplicationEvent[] {
  return getStore()
    .events.filter((e) => e.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function countWaitlistAhead(email: string): number {
  const store = getStore();
  const idx = store.waitlist.findIndex(
    (w) => w.email.toLowerCase() === email.toLowerCase(),
  );
  return idx < 0 ? store.waitlist.length : idx;
}

export const DEMO_CREDENTIALS = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
};
