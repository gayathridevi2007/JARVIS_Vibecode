import { AlertTriangle, RotateCcw } from 'lucide-react';

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col items-center justify-center px-4 py-10 text-center text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-red-400/20 bg-red-400/10 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400/20 text-red-300">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">We could not load your dashboard</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
