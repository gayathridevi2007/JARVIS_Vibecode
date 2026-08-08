import type { LucideIcon } from 'lucide-react';

type StepCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

function StepCard({ icon: Icon, title, description, index }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Step {index}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

export default StepCard;
