import { buildAuthHeaders, readStoredUser } from './auth';

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const user = readStoredUser();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeaders(user),
    },
    ...init,
  });

  if (!response.ok) {
    let message = 'Request failed';

    try {
      const payload = await response.json();
      message = payload.error || payload.message || message;
    } catch {
      try {
        const fallback = await response.text();
        if (fallback) {
          message = fallback;
        }
      } catch {
        // Ignore and fall back to the default message.
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getStudent: () => request('/student'),
  getDashboard: () => request('/dashboard'),
  getChallenge: (day: number) => request(`/challenges/${day}`),
  getProgress: () => request('/progress'),
  getAchievements: () => request('/achievements'),
  submitGithubProof: (payload: { url: string; commit: string }) => request('/proof/github', { method: 'POST', body: JSON.stringify(payload) }),
  submitLinkedInProof: (payload: { url: string; post: string }) => request('/proof/linkedin', { method: 'POST', body: JSON.stringify(payload) }),
  completeChallenge: (day: number) => request(`/challenges/${day}/complete`, { method: 'POST', body: JSON.stringify({ day }) }),
};
