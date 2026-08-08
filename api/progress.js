import { getState } from './state.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const state = getState();
  const progress = {
    completedDays: state.student.totalCompletedDays,
    totalDays: state.student.totalChallengeDays,
    percentage: Math.round((state.student.totalCompletedDays / state.student.totalChallengeDays) * 100),
    streak: state.student.currentStreak,
    currentDay: state.student.currentChallengeDay,
  };

  res.status(200).json(progress);
}
