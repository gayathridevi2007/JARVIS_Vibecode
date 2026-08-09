import { getState } from '../../lib/state.js';

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

  const { url, post } = req.body || {};

  state.proof.linkedin = {
    submitted: Boolean(url || post),
    url: url || state.proof.linkedin.url,
    post: post || state.proof.linkedin.post,
  };

  res.status(200).json({ success: true, proof: state.proof.linkedin });
}
