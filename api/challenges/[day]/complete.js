import { getState } from '../../../lib/state.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = {
    id: req.headers['x-user-id'] || '',
    email: req.headers['x-user-email'] || '',
  };
  const state = getState(user);

  if (!state) {
    res.status(401).json({ error: 'Please sign in to continue.' });
    return;
  }
  const requestedDay = Number(req.params?.day ?? req.body?.day ?? state.student.currentChallengeDay);
  state.student.totalCompletedDays = Math.min(state.student.totalCompletedDays + 1, state.student.totalChallengeDays);
  state.student.currentChallengeDay = Math.min(requestedDay + 1, state.student.totalChallengeDays);
  state.student.currentStreak = state.student.currentStreak + 1;
  state.student.lastUpdated = new Date().toISOString();

  res.status(200).json({ success: true, student: state.student });
}
