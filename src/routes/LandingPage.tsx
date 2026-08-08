import { motion } from 'framer-motion';
import { ArrowRight, CirclePlay, Flame, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/landing/FeatureCard';
import SectionHeading from '../components/landing/SectionHeading';
import StepCard from '../components/landing/StepCard';
import { challengePreview, heroStats, howItWorks, momentumBullets, socialProof, whyParticipate } from '../data/landingContent';

function LandingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col px-4 pb-10 pt-3 text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8">
      <header className="sticky top-0 z-20 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 backdrop-blur">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              <Zap className="h-4 w-4" />
            </span>
            ABTALKS
          </Link>
          <Link to="/dashboard" className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-400/40 hover:text-white">
            View demo
          </Link>
        </nav>
      </header>

      <main className="mt-4 flex-1 space-y-4 sm:space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_42%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(2,6,23,0.96))] p-5 shadow-[0_18px_70px_rgba(2,8,23,0.35)]"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            60-day challenge for builders
          </div>

          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl">
            Build your future in public, one day at a time.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            ABTalks turns college coding practice into a visible 60-day journey with public proof, recruiter-ready momentum, and a calm recovery system for real life.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/day/12"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start your 60-day journey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white">
              <CirclePlay className="h-4 w-4" />
              See the experience
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-left">
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-6 rounded-[28px] border border-cyan-400/20 bg-slate-950/80 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">Today’s momentum</p>
                <p className="mt-2 text-lg font-semibold text-white">8-day streak, strong and steady</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                <Flame className="h-3.5 w-3.5" />
                Hot streak
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20"
                style={{ background: `conic-gradient(#22d3ee 0 ${challengePreview.progress * 3.6}deg, rgba(255,255,255,0.08) 0 360deg)` }}
              >
                <div className="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-slate-950 text-center">
                  <span className="text-2xl font-semibold text-white">{challengePreview.day}</span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">day</span>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{challengePreview.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Progress is visible, updateable, and designed to feel rewarding after every small win.</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5">
          <SectionHeading
            eyebrow="How it works"
            title="Build → Commit → Share → Grow"
            description="The journey is simple, but the experience feels premium because every step is intentional and visible."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {howItWorks.map((step, index) => (
              <StepCard key={step.title} icon={step.icon} title={step.title} description={step.description} index={index + 1} />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5">
          <SectionHeading
            eyebrow="Why participate"
            title="Turn consistency into career momentum"
            description="This is not a generic streak app. It is a launchpad for students who want real proof of work and stronger visibility."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {whyParticipate.map((item) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
            <TrendingUp className="h-3.5 w-3.5" />
            Social proof
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {socialProof.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="preview" className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5">
          <SectionHeading
            eyebrow="Student preview"
            title="A challenge experience that feels alive"
            description="The mobile experience is designed around the student’s day: task, streak, progress, and next step in one glance."
          />

          <div className="mt-5 rounded-[28px] border border-cyan-400/20 bg-slate-950/85 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">Current day</p>
                <p className="mt-2 text-3xl font-semibold text-white">Day {challengePreview.day}</p>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                {challengePreview.streak} day streak
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">Today’s task</p>
              <p className="mt-2 text-lg font-semibold text-white">{challengePreview.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Ship a polished experience, document what changed, and post a proof point that helps your profile feel stronger.</p>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Challenge progress</span>
                <span>{challengePreview.progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${challengePreview.progress}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-cyan-400/20 bg-cyan-400/10 p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Our signature idea: Momentum
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Miss a day? Recover, don’t spiral.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            ABTalks does not shame quiet setbacks. It guides students back into the rhythm with a calm next step, so one missed day becomes a reset instead of a failure.
          </p>
          <ul className="mt-4 space-y-2">
            {momentumBullets.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-5 text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Ready to begin?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Make your 60-day challenge visible, consistent, and worth sharing.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:mx-0">
            Join ABTalks and turn your daily coding practice into a portfolio that tells a stronger story than a résumé alone.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
            <Link to="/day/12" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Begin today’s challenge
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white">
              Explore the dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
