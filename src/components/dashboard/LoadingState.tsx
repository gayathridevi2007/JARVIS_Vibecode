function LoadingState() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col gap-4 px-4 py-4 text-slate-100 sm:max-w-6xl sm:px-6 lg:px-8">
      <div className="h-12 animate-pulse rounded-full border border-white/10 bg-slate-900/80" />
      <div className="h-48 animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80" />
      <div className="h-36 animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80" />
      <div className="h-28 animate-pulse rounded-[32px] border border-white/10 bg-slate-900/80" />
    </div>
  );
}

export default LoadingState;
