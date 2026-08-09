import { getState } from '../lib/state.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const state = getState();
  res.status(200).json(state.achievements);
}
