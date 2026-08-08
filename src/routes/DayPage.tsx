import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CheckCircle2, CircleDashed, Edit3, GitBranch, Link2, Sparkles, Trophy, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { dayApi } from '../services/dayApi';

type DayData = {
  day: number;
  totalDays: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedMinutes: number;
  objective: string;
  requirements: string[];
  github: { status: string; url: string };
  linkedin: { status: string; url: string };
  completed: boolean;
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

type Platform = 'github' | 'linkedin';

function getReadableError(err: unknown) {
  if (err instanceof Error) {
    try {
      const parsed = JSON.parse(err.message);
      return parsed.error || parsed.message || err.message;
    } catch {
      return err.message;
    }
  }

  return 'Something went wrong. Please try again.';
}

function validateProofUrl(value: string, platform: Platform) {
  const trimmed = value.trim();

  if (!trimmed) {
    return platform === 'github' ? 'Enter your proof URL.' : 'Enter your proof URL.';
  }

  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return 'Please enter a valid URL.';
    }

    if (platform === 'github' && !parsed.hostname.includes('github.com')) {
      return 'Please enter a GitHub URL.';
    }

    if (platform === 'linkedin' && !parsed.hostname.includes('linkedin.com')) {
      return 'Please enter a LinkedIn URL.';
    }

    return null;
  } catch {
    return 'Please enter a valid URL.';
  }
}

function DayPage() {
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubState, setGithubState] = useState<SubmissionState>('idle');
  const [linkedinState, setLinkedinState] = useState<SubmissionState>('idle');
  const [completeState, setCompleteState] = useState<SubmissionState>('idle');
  const [completeMessage, setCompleteMessage] = useState('');
  const [githubEditing, setGithubEditing] = useState(false);
  const [linkedinEditing, setLinkedinEditing] = useState(false);

  const loadDay = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dayApi.getDayTwelve();
      setDayData(data as DayData);
      setGithubUrl((data as DayData).github.url || '');
      setLinkedinUrl((data as DayData).linkedin.url || '');
      setGithubEditing(false);
      setLinkedinEditing(false);
    } catch (err) {
      setError(getReadableError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDay();
  }, []);

  const canComplete = useMemo(() => {
    return Boolean(dayData?.github.status === 'submitted' && dayData?.linkedin.status === 'submitted');
  }, [dayData]);

  const githubSubmitted = Boolean(dayData?.github.status === 'submitted' && dayData?.github.url);
  const linkedinSubmitted = Boolean(dayData?.linkedin.status === 'submitted' && dayData?.linkedin.url);

  const submitGithub = async () => {
    const nextValue = githubUrl.trim();
    const validationError = validateProofUrl(nextValue, 'github');

    if (validationError) {
      setGithubState('error');
      setError(validationError);
      return;
    }

    setGithubState('submitting');
    setError(null);
    try {
      const response = await dayApi.submitGithubProof(nextValue);
      setGithubState('success');
      setGithubEditing(false);
      setDayData((prev) => prev ? { ...prev, github: { status: 'submitted', url: (response as { github: { url: string } }).github.url } } : prev);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('abtalks:refresh'));
      }
    } catch (err) {
      setGithubState('error');
      setError(getReadableError(err));
    }
  };

  const submitLinkedIn = async () => {
    const nextValue = linkedinUrl.trim();
    const validationError = validateProofUrl(nextValue, 'linkedin');

    if (validationError) {
      setLinkedinState('error');
      setError(validationError);
      return;
    }

    setLinkedinState('submitting');
    setError(null);
    try {
      const response = await dayApi.submitLinkedInProof(nextValue);
      setLinkedinState('success');
      setLinkedinEditing(false);
      setDayData((prev) => prev ? { ...prev, linkedin: { status: 'submitted', url: (response as { linkedin: { url: string } }).linkedin.url } } : prev);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('abtalks:refresh'));
      }
    } catch (err) {
      setLinkedinState('error');
      setError(getReadableError(err));
    }
  };

  const completeDay = async () => {
    if (!canComplete) {
      setCompleteState('error');
      setError('Both proof submissions are required before you can complete the day.');
      return;
    }

    setCompleteState('submitting');
    setError(null);
    try {
      const response = await dayApi.completeDay();
      setCompleteState('success');
      setCompleteMessage((response as { message?: string }).message || 'Day 12 complete. Keep the momentum.');
      setDayData((prev) => prev ? { ...prev, completed: true } : prev);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('abtalks:refresh'));
      }
    } catch (err) {
      setCompleteState('error');
      setError(getReadableError(err));
    }
  };

  if (loading) {
    return <div className="mx-auto flex min-h-screen max-w-[390px] flex-col gap-3 px-3 py-3 pb-28 text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8 lg:pb-10"><div className="h-12 animate-pulse rounded-full border border-white/10 bg-slate-900/80" /><div className="h-44 animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80" /><div className="h-32 animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80" /></div>;
  }

  if (error && !dayData) {
    return <div className="mx-auto flex min-h-screen max-w-[390px] flex-col items-center justify-center px-4 py-10 text-center text-slate-100"><div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6"><p className="text-sm text-slate-300">{error}</p><button type="button" onClick={() => void loadDay()} className="mt-4 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Try again</button></div></div>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col gap-3 px-3 py-3 pb-28 text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8 lg:pb-10">
      <header className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-2.5 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300"><Zap className="h-4 w-4" /></span>
            ABTALKS
          </Link>
          <Link to="/dashboard" className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">Dashboard</Link>
        </div>
      </header>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_36%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(3,7,18,0.98))] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">DAY</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Day {dayData?.day} of {dayData?.totalDays}</h1>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300">{dayData?.difficulty}</div>
        </div>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">TODAY'S TASK</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{dayData?.title}</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              {dayData?.estimatedMinutes} min
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{dayData?.description}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">Learning objective</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{dayData?.objective}</p>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }} className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-cyan-300" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">WHAT YOU NEED TO BUILD</p>
        </div>
        <ul className="mt-4 space-y-2">
          {dayData?.requirements.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">PROOF OF WORK</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Share the evidence</h2>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300">Simple and clear</div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-3">
            {githubSubmitted && !githubEditing ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  <p className="text-sm font-semibold text-white">GitHub proof submitted</p>
                </div>
                <p className="break-all text-sm leading-6 text-slate-300">{dayData?.github.url}</p>
                <button type="button" onClick={() => { setGithubEditing(true); setError(null); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-cyan-300" />
                  <p className="text-sm font-semibold text-white">GitHub proof</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Share a repo or commit link so your progress is visible.</p>
                <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="github-url">Repository or commit URL</label>
                <input id="github-url" value={githubUrl} onChange={(event) => setGithubUrl(event.target.value)} className="mt-2 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none ring-0 focus:border-cyan-400/40" placeholder="https://github.com/yourname/project" />
                <button type="button" onClick={() => void submitGithub()} disabled={githubState === 'submitting'} className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-70">
                  {githubState === 'submitting' ? 'Submitting…' : 'Submit GitHub proof'}
                </button>
              </>
            )}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-3">
            {linkedinSubmitted && !linkedinEditing ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  <p className="text-sm font-semibold text-white">LinkedIn proof submitted</p>
                </div>
                <p className="break-all text-sm leading-6 text-slate-300">{dayData?.linkedin.url}</p>
                <button type="button" onClick={() => { setLinkedinEditing(true); setError(null); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-cyan-300" />
                  <p className="text-sm font-semibold text-white">LinkedIn proof</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Post a shareable update and bring your work into the public conversation.</p>
                <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" htmlFor="linkedin-url">Post URL</label>
                <input id="linkedin-url" value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} className="mt-2 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none ring-0 focus:border-cyan-400/40" placeholder="https://linkedin.com/posts/your-post" />
                <button type="button" onClick={() => void submitLinkedIn()} disabled={linkedinState === 'submitting'} className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-70">
                  {linkedinState === 'submitting' ? 'Submitting…' : 'Submit LinkedIn proof'}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">COMPLETE DAY</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{dayData?.completed ? 'Day 12 complete ✓' : canComplete ? 'Ready to complete Day 12' : 'Complete today’s proof'}</h2>
          </div>
          <div className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${dayData?.completed ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : canComplete ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-slate-950/70 text-slate-400'}`}>
            {dayData?.completed ? 'Complete' : canComplete ? 'Ready' : 'Pending'}
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{dayData?.completed ? '12 days of showing up. Keep the momentum.' : canComplete ? 'Your proof is in. Mark today’s challenge complete.' : 'Submit both GitHub and LinkedIn proof to finish Day 12.'}</p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-200"><GitBranch className="h-4 w-4 text-cyan-300" /> GitHub</span>
            <span className={`font-semibold ${dayData?.github.status === 'submitted' ? 'text-emerald-300' : 'text-slate-400'}`}>{dayData?.github.status === 'submitted' ? 'Submitted' : 'Pending'}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-200"><Link2 className="h-4 w-4 text-cyan-300" /> LinkedIn</span>
            <span className={`font-semibold ${dayData?.linkedin.status === 'submitted' ? 'text-emerald-300' : 'text-slate-400'}`}>{dayData?.linkedin.status === 'submitted' ? 'Submitted' : 'Pending'}</span>
          </div>
        </div>

        <button type="button" onClick={() => void completeDay()} disabled={!canComplete || completeState === 'submitting' || dayData?.completed} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-70">
          {completeState === 'submitting' ? 'Finishing…' : dayData?.completed ? 'Day 12 complete' : 'Complete Day →'}
          {!dayData?.completed ? <ArrowRight className="h-4 w-4" /> : null}
        </button>

        {dayData?.completed ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Progress to Day 13</span>
              <span className="font-semibold text-white">12 / 13</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-400" style={{ width: '92%' }} />
            </div>
          </div>
        ) : null}

        {completeMessage ? <p aria-live="polite" className="mt-3 text-sm text-emerald-300">{completeMessage}</p> : null}
      </motion.section>

      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}

      <nav className="fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] max-w-[360px] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-slate-950/95 px-2 py-2 shadow-[0_16px_50px_rgba(2,8,23,0.35)] backdrop-blur">
        <Link to="/" className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold text-slate-400"><Sparkles className="h-4 w-4" />Home</Link>
        <Link to="/dashboard" className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold text-slate-400"><Trophy className="h-4 w-4" />Progress</Link>
        <Link to="/day/12" className="flex flex-1 flex-col items-center gap-1 rounded-full bg-cyan-400/15 px-3 py-2 text-[11px] font-semibold text-cyan-300"><CircleDashed className="h-4 w-4" />Challenge</Link>
      </nav>
    </div>
  );
}

export default DayPage;
