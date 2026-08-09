import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  persistUser,
  readStoredUser,
  type UserRole,
} from '../../services/auth';

const roles: {
  id: UserRole;
  title: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: 'student',
    title: 'Student',
    description: 'Build, submit and grow your 60-day streak.',
    icon: UserRound,
  },
  {
    id: 'recruiter',
    title: 'Recruiter',
    description: 'Discover consistent emerging talent.',
    icon: BriefcaseBusiness,
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Manage the ABTalks challenge platform.',
    icon: ShieldCheck,
  },
];

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedUser = readStoredUser();

    if (!storedUser) {
      return;
    }

    if (storedUser.role === 'student') {
      navigate('/dashboard', { replace: true });
    } else if (storedUser.role === 'recruiter') {
      navigate('/recruiter', { replace: true });
    } else if (storedUser.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      setEmail(storedUser.email);
      setShowRoles(true);
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent) => {
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
        throw new Error(
          payload.error || 'We could not sign you in right now.',
        );
      }

      if (payload?.user) {
        persistUser({
          id: payload.user.id,
          email: payload.user.email,
          name: payload.user.name,
        });

        setShowRoles(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'We could not sign you in right now.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleContinue = () => {
    if (!selectedRole) {
      setError('Please choose a workspace to continue.');
      return;
    }

    const storedUser = readStoredUser();

    if (!storedUser) {
      setError('Your session could not be found. Please sign in again.');
      setShowRoles(false);
      return;
    }

    persistUser({
      ...storedUser,
      role: selectedRole,
    });

    if (selectedRole === 'student') {
      navigate('/dashboard', { replace: true });
    } else if (selectedRole === 'recruiter') {
      navigate('/recruiter', { replace: true });
    } else {
      navigate('/admin', { replace: true });
    }
  };

  if (showRoles) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto flex min-h-[90vh] w-full max-w-md items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur"
          >
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wide">
                ABTALKS
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
              Choose your workspace.
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Signed in as{' '}
              <span className="font-medium text-slate-200">{email}</span>.
              Select how you want to use ABTalks.
            </p>

            <div className="mt-7 space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.id);
                      setError('');
                    }}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-900 text-cyan-400'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-white">
                        {role.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {role.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-4 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
              >
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleRoleContinue}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowRoles(false);
                setSelectedRole(null);
                setError('');
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Use another email
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-md items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur"
        >
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wide">
              ABTALKS
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Build. Ship. Prove your progress.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="login-email"
                className="text-sm font-medium text-slate-200"
              >
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
              <p
                role="alert"
                className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
              >
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
            <p className="font-semibold text-slate-200">
              Secure, lightweight, and ready for your next build.
            </p>
            <p className="mt-1">
              This prototype stores your session in the browser so your
              workspace stays with you after refresh.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;