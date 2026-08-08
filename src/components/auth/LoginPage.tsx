import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { persistUser, readStoredUser } from '../../services/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError('Please enter your email to continue.');
      return;
    }

    if (!/.+@.+\..+/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'We could not sign you in right now.');
      }

      if (payload?.user) {
        persistUser({
          id: payload.user.id,
          email: payload.user.email,
          name: payload.user.name,
        });
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not sign you in right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_36%),linear-gradient(135deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.98))] px-4 py-10 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur"
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
            <Sparkles className="h-4 w-4" />
          </span>
          ABTALKS
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">Welcome back.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">Build. Ship. Prove your progress.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="login-email" className="text-sm font-medium text-slate-200">
              Email address
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 focus-within:border-cyan-400/40">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Signing in…' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-slate-400">
          <p className="font-semibold text-slate-200">Secure, lightweight, and ready for your next build.</p>
          <p className="mt-1">This prototype stores your session in the browser so your dashboard stays with you after refresh.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
