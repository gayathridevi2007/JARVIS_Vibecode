import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CalendarDays, ChevronRight, Flame, Link2, Sparkles, Trophy, UserCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardData } from '../hooks/useDashboardData';
import LoadingState from '../components/dashboard/LoadingState';
import ErrorState from '../components/dashboard/ErrorState';
import MomentumStateCard from '../components/dashboard/MomentumStateCard';
import { clearStoredUser, readStoredUser } from '../services/auth';

function DashboardPage() {
  const { data, loading, error, refetch } = useDashboardData();
  const navigate = useNavigate();
  const sessionUser = readStoredUser();

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return <ErrorState message={error || 'The dashboard could not be loaded right now.'} onRetry={() => refetch()} />;
  }

  const progressPercent = Math.max(4, data.progress);
  const profileName = sessionUser?.name?.trim() || data.student.name?.trim() || 'Student';
  const profileEmail = sessionUser?.email || 'student@example.com';
  const greeting = data.student.currentStreak > 4 ? 'Good evening' : 'Welcome back';
  const streakMessage = data.student.currentStreak === 0
    ? 'Your first day starts here.'
    : data.student.momentumState === 'recovery' || (data.student.currentStreak <= 1 && data.student.totalCompletedDays > 0)
      ? 'Missed a day? Pick up where you left off.'
      : 'You are building momentum with calm consistency.';
  const proofStates = [
    { label: 'GitHub', submitted: data.proof.github.submitted, detail: data.proof.github.submitted ? 'Submitted' : 'Pending' },
    { label: 'LinkedIn', submitted: data.proof.linkedin.submitted, detail: data.proof.linkedin.submitted ? 'Submitted' : 'Pending' },
  ];
  const nextAction = data.proof.github.submitted && data.proof.linkedin.submitted
    ? 'Your proof is ready. Finish Day 12 and keep the streak alive.'
    : 'Add your GitHub and LinkedIn proof to complete today’s challenge.';

  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col gap-3 px-3 py-3 pb-28 text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8 lg:pb-10">
      <header className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-2.5 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </span>
            ABTALKS
          </Link>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1.5 text-left text-[11px] text-slate-300">
              <p className="font-semibold text-white">{profileName}</p>
              <p className="text-[10px] text-slate-400">{profileEmail}</p>
            </div>
            <button
              type="button"
              aria-label="Log out"
              onClick={() => {
                clearStoredUser();
                navigate('/login', { replace: true });
              }}
              className="rounded-full border border-white/10 bg-slate-900/80 p-2 text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
            >
              <UserCircle2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_36%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(3,7,18,0.98))] p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">{greeting}, {profileName}.</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Let’s keep your momentum going.</h1>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300">Streak</p>
            <p className="mt-1 text-xl font-semibold text-white">{data.student.currentStreak}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Momentum snapshot</p>
              <p className="mt-2 text-3xl font-semibold text-white">{data.student.currentStreak} day run</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
              <Flame className="h-3.5 w-3.5" />
              Best {data.student.bestStreak} days
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">{streakMessage}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20" style={{ background: `conic-gradient(#22d3ee 0 ${progressPercent * 3.6}deg, rgba(255,255,255,0.07) 0 360deg)` }}>
              <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-slate-950 text-center">
                <span className="text-xl font-semibold text-white">{data.student.totalCompletedDays}</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">done</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200">Day {data.student.currentChallengeDay} of {data.student.totalChallengeDays}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">You are {data.progress}% through the challenge and moving with intention.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.33, delay: 0.04 }}
        className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Today’s challenge</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">Day {data.challenge.dayNumber}</h2>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
            {data.challenge.difficulty}
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-cyan-400/20 bg-slate-950/80 p-4">
          <h3 className="text-lg font-semibold text-white">{data.challenge.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{data.challenge.description}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            <span className="rounded-full border border-white/10 px-2.5 py-1">{data.challenge.estimatedTime}</span>
            <span className="rounded-full border border-white/10 px-2.5 py-1">{data.student.currentChallengeDay} / {data.student.totalChallengeDays}</span>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">Learning objective</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{data.challenge.learningObjective}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/day/12')}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            Continue challenge
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Next action</p>
            <p className="mt-1 leading-6">{nextAction}</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.33, delay: 0.08 }}
        className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Proof of work</p>
            <h2 className="mt-1 text-lg font-semibold text-white">What you have shared</h2>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-slate-300">
            <Link2 className="mr-1 inline h-3.5 w-3.5" />
            Public trail
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {proofStates.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.submitted ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                  {item.submitted ? <BadgeCheck className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${item.submitted ? 'text-emerald-300' : 'text-slate-400'}`}>{item.submitted ? 'Ready' : 'Pending'}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.33, delay: 0.12 }}
          className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Achievements</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Recent wins</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{data.achievements.filter((item) => item.unlocked).length} unlocked</div>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {data.achievements.map((achievement) => (
              <div key={achievement.id} className={`min-w-[140px] rounded-2xl border px-3 py-3 ${achievement.unlocked ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-white/10 bg-slate-950/70'}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950/70 text-cyan-300">
                  <Trophy className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{achievement.name}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.33, delay: 0.16 }}
          className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Standing</p>
          <h2 className="mt-2 text-xl font-semibold text-white">You are ahead of {data.student.standing}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">That means your visible consistency is already stronger than many active builders in the challenge.</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-300">
            <span className="font-semibold text-white">{data.student.profileCompletion}% profile complete</span>
            <p className="mt-1">A more complete profile makes your journey easier to understand for mentors and recruiters.</p>
          </div>
        </motion.section>
      </div>

      <MomentumStateCard student={data.student} />

      <nav className="fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] max-w-[360px] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-slate-950/95 px-2 py-2 shadow-[0_16px_50px_rgba(2,8,23,0.35)] backdrop-blur">
        <Link to="/" className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold text-slate-400">
          <Sparkles className="h-4 w-4" />
          Home
        </Link>
        <Link to="/dashboard" className="flex flex-1 flex-col items-center gap-1 rounded-full bg-cyan-400/15 px-3 py-2 text-[11px] font-semibold text-cyan-300">
          <CalendarDays className="h-4 w-4" />
          Progress
        </Link>
        <Link to="/day/12" className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-semibold text-slate-400">
          <ChevronRight className="h-4 w-4" />
          Challenge
        </Link>
      </nav>
    </div>
  );
}

export default DashboardPage;
