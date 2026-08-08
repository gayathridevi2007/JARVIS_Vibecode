import { ArrowRight, BookOpenCheck, Code2, Compass, Sparkles, Trophy, Users2, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type StepItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type BenefitItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const heroStats = [
  { label: 'Active students', value: '2.4k' },
  { label: 'Avg. streak', value: '8 days' },
  { label: 'Recruiter views', value: '+38%' },
];

export const howItWorks: StepItem[] = [
  { icon: Code2, title: 'Build', description: 'Complete one focused task each day, designed for real coding growth rather than busywork.' },
  { icon: BookOpenCheck, title: 'Commit', description: 'Ship a clean result and keep a visible record of your progress in the challenge feed.' },
  { icon: ArrowRight, title: 'Share', description: 'Post your proof on GitHub or LinkedIn so your journey becomes part of your public profile.' },
  { icon: Trophy, title: 'Grow', description: 'Turn consistency into momentum, recognition, and a stronger portfolio with every week.' },
];

export const whyParticipate: BenefitItem[] = [
  {
    icon: Workflow,
    title: 'Build consistently',
    description: 'Daily prompts keep you moving even when college deadlines get intense.',
  },
  {
    icon: Sparkles,
    title: 'Create public proof',
    description: 'Every completed day adds a visible artifact that shows real progress to peers and recruiters.',
  },
  {
    icon: Compass,
    title: 'Shape a visible portfolio',
    description: 'Your challenge history becomes a story of shipped work, not just ideas and intentions.',
  },
  {
    icon: Users2,
    title: 'Become discoverable',
    description: 'Students who share progress consistently stand out in a crowded internship market.',
  },
];

export const socialProof = [
  { value: '3.2k+', label: 'students started this month' },
  { value: '89%', label: 'stay active after week two' },
  { value: '1.4k', label: 'public builds shared this quarter' },
];

export const challengePreview = {
  day: 12,
  streak: 8,
  title: 'Design a polished onboarding flow',
  progress: 72,
};

export const momentumBullets = [
  'One missed day does not erase your streak or your momentum.',
  'ABTalks highlights the next best step so recovery feels encouraging, not punishing.',
  'A calm reset is built into the experience, helping students return faster and stronger.',
];
