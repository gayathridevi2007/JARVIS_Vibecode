const baseChallenge = {
  dayNumber: 12,
  title: 'Design a polished onboarding flow',
  description:
    'Create a thoughtful onboarding experience for a student joining the 60-day challenge, focusing on clarity, motivation, and first impressions.',
  difficulty: 'Intermediate',
  estimatedTime: '90 min',
  learningObjective: 'Learn how product thinking improves user confidence and activation.',
  requirements: [
    'Outline the first-time experience from a student perspective',
    'Create a mobile-first layout with clear progress cues',
    'Document your reasoning in a short reflection',
  ],
  resources: [
    'Design systems for onboarding',
    'Mobile-first UX patterns',
    'Progressive disclosure examples',
  ],
};

const baseAchievements = [
  {
    id: 'a1',
    name: 'Consistency Spark',
    description: 'Completed 5 days in a row with visible progress updates.',
    unlocked: true,
    unlockedAt: '2026-08-04T18:20:00.000Z',
  },
  {
    id: 'a2',
    name: 'Proof Builder',
    description: 'Posted your first public proof of work on GitHub.',
    unlocked: true,
    unlockedAt: '2026-08-05T22:10:00.000Z',
  },
  {
    id: 'a3',
    name: 'Momentum Keeper',
    description: 'Recovered after a missed day and continued the challenge.',
    unlocked: false,
    unlockedAt: null,
  },
];

const initialState = {
  users: {},
};

let state = structuredClone(initialState);

function createDisplayName(email) {
  const localPart = (email || '').split('@')[0] || 'User';
  return localPart
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ') || 'User';
}

function buildDefaultUser(email, name) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  return {
    id: `user-${Math.random().toString(36).slice(2, 10)}`,
    email: normalizedEmail,
    name: name || createDisplayName(normalizedEmail),
    profileCompletion: 78,
    currentStreak: 4,
    bestStreak: 18,
    currentChallengeDay: 12,
    totalCompletedDays: 4,
    totalChallengeDays: 60,
    standing: 'Top 20%',
    momentumState: 'active',
    lastUpdated: new Date().toISOString(),
  };
}

function buildUserState(user) {
  const baseStudent = buildDefaultUser(user.email, user.name);
  const normalizedId = user.id || baseStudent.id;

  return {
    user: {
      id: normalizedId,
      email: user.email,
      name: user.name || createDisplayName(user.email),
    },
    student: {
      ...baseStudent,
      id: normalizedId,
      name: user.name || createDisplayName(user.email),
      profileCompletion: 78,
      currentStreak: 4,
      bestStreak: 18,
      currentChallengeDay: 12,
      totalCompletedDays: 4,
      totalChallengeDays: 60,
      standing: 'Top 20%',
      momentumState: 'active',
      lastUpdated: new Date().toISOString(),
    },
    challenge: structuredClone(baseChallenge),
    proof: {
      github: {
        submitted: false,
        url: '',
        commit: '',
      },
      linkedin: {
        submitted: false,
        url: '',
        post: '',
      },
    },
    achievements: structuredClone(baseAchievements),
  };
}

export function createUserState(user) {
  const normalizedEmail = (user.email || '').trim().toLowerCase();
  const normalizedUser = {
    id: user.id || `user-${Math.random().toString(36).slice(2, 10)}`,
    email: normalizedEmail,
    name: user.name || createDisplayName(normalizedEmail),
  };
  const userState = buildUserState(normalizedUser);
  state.users[normalizedEmail] = userState;
  state.users[normalizedUser.id] = userState;
  return userState;
}

export function getUserState(userLike) {
  const email = typeof userLike === 'string' ? userLike : userLike?.email;
  const id = typeof userLike === 'string' ? undefined : userLike?.id;
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (normalizedEmail && state.users[normalizedEmail]) {
    return state.users[normalizedEmail];
  }
  if (id && state.users[id]) {
    return state.users[id];
  }
  if (email) {
    return createUserState({ id, email, name: typeof userLike === 'string' ? createDisplayName(email) : userLike?.name });
  }
  return null;
}

export function getState(userLike) {
  return getUserState(userLike) || state.users[Object.keys(state.users)[0]];
}

export function resetState() {
  state = structuredClone(initialState);
  return state;
}

export function updateState(updater, userLike) {
  const currentState = getUserState(userLike);
  return updater(currentState || createUserState({ id: userLike?.id, email: userLike?.email, name: userLike?.name }));
}
