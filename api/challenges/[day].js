import { getState } from '../state.js';

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
  const requestedDay = req.params?.day ?? req.query?.day ?? req.body?.day;
  const dayNumber = Number(requestedDay ?? state.challenge.dayNumber);

  if (Number.isNaN(dayNumber) || dayNumber < 1) {
    res.status(400).json({ error: 'Invalid challenge day' });
    return;
  }

  const challenge = {
    ...state.challenge,
    dayNumber,
  };

  res.status(200).json(challenge);
}
