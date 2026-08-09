import { getState } from '../state.js';

function getUserFromRequest(req) {
  return {
    id: req.headers['x-user-id'] || '',
    email: req.headers['x-user-email'] || '',
  };
}

function normalizeUrl(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isLikelyUrl(value) {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export default function handler(req, res) {
  const user = getUserFromRequest(req);
  const state = getState(user);

  if (!state) {
    res.status(401).json({ error: 'Please sign in to continue.' });
    return;
  }

  if (req.method === 'GET') {
    const dayState = {
      day: 12,
      totalDays: 60,
      title: state.challenge.title,
      description: state.challenge.description,
      difficulty: state.challenge.difficulty,
      estimatedMinutes: 90,
      objective: state.challenge.learningObjective,
      requirements: state.challenge.requirements,
      github: {
        status: state.proof.github.submitted ? 'submitted' : 'pending',
        url: state.proof.github.url,
      },
      linkedin: {
        status: state.proof.linkedin.submitted ? 'submitted' : 'pending',
        url: state.proof.linkedin.url,
      },
      completed: false,
    };

    res.status(200).json(dayState);
    return;
  }

  if (req.method === 'POST') {
    const body = req.body || {};

    if ((req.url || '').includes('/github')) {
      const url = normalizeUrl(body.url || '');

      if (!isLikelyUrl(url)) {
        res.status(400).json({ error: 'Please enter a valid GitHub repository or commit URL.' });
        return;
      }

      state.proof.github = {
        submitted: true,
        url,
        commit: body.commit || 'submitted',
      };

      res.status(200).json({ success: true, github: { status: 'submitted', url } });
      return;
    }

    if ((req.url || '').includes('/linkedin')) {
      const url = normalizeUrl(body.url || '');

      if (!isLikelyUrl(url)) {
        res.status(400).json({ error: 'Please enter a valid LinkedIn post URL.' });
        return;
      }

      state.proof.linkedin = {
        submitted: true,
        url,
        post: body.post || 'submitted',
      };

      res.status(200).json({ success: true, linkedin: { status: 'submitted', url } });
      return;
    }

    if ((req.url || '').includes('/complete')) {
      const bothSubmitted = state.proof.github.submitted && state.proof.linkedin.submitted;
      if (!bothSubmitted) {
        res.status(400).json({ error: 'Both GitHub and LinkedIn proof must be submitted before completing the day.' });
        return;
      }

      state.student.totalCompletedDays = Math.min(state.student.totalCompletedDays + 1, state.student.totalChallengeDays);
      state.student.currentChallengeDay = Math.min(state.student.currentChallengeDay + 1, state.student.totalChallengeDays);
      state.student.currentStreak = state.student.currentStreak + 1;
      state.student.lastUpdated = new Date().toISOString();
      state.student.momentumState = 'active';

      res.status(200).json({
        success: true,
        completed: true,
        student: state.student,
        message: 'Day 12 complete. 12 days of showing up. Keep the momentum.',
      });
      return;
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
