import { getState } from '../state.js';

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

  const { url, commit } = req.body || {};

  state.proof.github = {
    submitted: Boolean(url || commit),
    url: url || state.proof.github.url,
    commit: commit || state.proof.github.commit,
  };

  res.status(200).json({ success: true, proof: state.proof.github });
}
