import { createUserState, getState } from './state.js';

function isValidEmail(value) {
  return typeof value === 'string' && /.+@.+\..+/.test(value.trim());
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';

  if (!email) {
    res.status(400).json({ error: 'Please enter your email to continue.' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const existing = getState({ email });
  const userState = existing && existing.user?.email === email
    ? existing
    : createUserState({ email, name: existing?.user?.name || undefined });

  res.status(200).json({
    success: true,
    user: {
      id: userState.user.id,
      email: userState.user.email,
      name: userState.user.name,
    },
  });
}
