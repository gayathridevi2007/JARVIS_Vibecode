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
        // Ignore and keep the default message.
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const dayApi = {
  getDayTwelve: () => request('/day/12'),
  submitGithubProof: (url: string) => request('/day/12/github', { method: 'POST', body: JSON.stringify({ url }) }),
  submitLinkedInProof: (url: string) => request('/day/12/linkedin', { method: 'POST', body: JSON.stringify({ url }) }),
  completeDay: () => request('/day/12/complete', { method: 'POST', body: JSON.stringify({}) }),
};
