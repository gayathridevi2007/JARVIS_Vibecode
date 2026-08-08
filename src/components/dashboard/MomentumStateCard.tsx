import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Sunrise, Trophy } from 'lucide-react';
import type { Student } from '../../types';

type MomentumStateCardProps = {
  student: Student;
};

function MomentumStateCard({ student }: MomentumStateCardProps) {
  const getState = () => {
    if (student.currentStreak === 0) {
      return {
        title: 'Your journey starts today.',
        description: 'Day 1 is a fresh start. We will help you build momentum from the very first step.',
        icon: Sunrise,
      };
    }

    if (student.momentumState === 'missed') {
      return {
        title: 'You missed yesterday. Your progress is not lost.',
        description: 'Pick up where you left off and let the next small win carry you forward.',
        icon: Compass,
      };
    }

    if (student.profileCompletion < 50) {
      return {
        title: 'Complete your profile to make your journey visible.',
        description: 'A fuller profile helps your progress feel more meaningful to future recruiters.',
        icon: Sparkles,
      };
    }

    return {
      title: 'You\'re on a roll.',
      description: 'Complete today\'s challenge to keep your momentum building in a healthy way.',
      icon: Trophy,
    };
  };

  const state = getState();
  const Icon = state.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300">Momentum</p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">{state.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{state.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-2 text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-slate-200">
        <span>Keep going for the next win</span>
        <ArrowRight className="h-4 w-4 text-cyan-300" />
      </div>
    </motion.div>
  );
}

export default MomentumStateCard;
