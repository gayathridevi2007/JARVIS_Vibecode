import { getState } from './state.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
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

  const dashboard = {
    student: state.student,
    challenge: state.challenge,
    proof: state.proof,
    achievements: state.achievements,
    progress: Math.round((state.student.totalCompletedDays / state.student.totalChallengeDays) * 100),
  };

  res.status(200).json(dashboard);
}
