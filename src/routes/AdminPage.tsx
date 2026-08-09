import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Shield, Activity, Users, CheckCircle, Clock, AlertTriangle, LayoutDashboard, Code, Briefcase } from 'lucide-react';

interface AdminData {
  stats: {
    registered: number;
    active: number;
    completed: number;
    proofSubmissions: number;
    averageStreak: number;
  };
  students: Array<{
    id: string;
    name: string;
    college: string;
    track: string;
    currentDay: number;
    streak: number;
    status: string;
    completion: number;
  }>;
  challengeOverview: {
    currentDay: number;
    todayTask: string;
    submissions: number;
    githubSubmissions: number;
    linkedinSubmissions: number;
    completionPercentage: number;
  };
  activity: Array<{
    id: number;
    type: string;
    text: string;
    time: string;
  }>;
  alerts: string[];
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent"></div>
      </div>
    );
  }

  const filteredStudents = data.students.filter(s => filter === 'All' || s.status === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Shield className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">ABTALKS</span>
            <span className="sm:hidden">ADMIN</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-400 sm:inline">Admin Console</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 border border-white/10">
              <span className="text-xs font-bold">AD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        
        {/* Alerts Section */}
        {data.alerts.length > 0 && (
          <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <h3 className="font-semibold text-rose-400">System Alerts</h3>
            </div>
            <ul className="list-disc pl-5 text-sm text-rose-200/80">
              {data.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
            </ul>
          </div>
        )}

        <h1 className="text-2xl font-bold text-white mb-6">Platform Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Registered</p>
            <p className="mt-2 text-2xl font-bold text-white">{data.stats.registered}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Active</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">{data.stats.active}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Completed</p>
            <p className="mt-2 text-2xl font-bold text-cyan-400">{data.stats.completed}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Proofs</p>
            <p className="mt-2 text-2xl font-bold text-white">{data.stats.proofSubmissions}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg Streak</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">{data.stats.averageStreak}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Student Table */}
            <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-6 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">Student Management</h2>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Active', 'At Risk', 'Completed', 'Inactive'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${filter === f ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400">
                      <th className="pb-3 font-medium">Student</th>
                      <th className="pb-3 font-medium">Track</th>
                      <th className="pb-3 font-medium text-center">Streak</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">No students match this filter.</td>
                      </tr>
                    ) : (
                      filteredStudents.map(student => (
                        <tr key={student.id} className="group transition-colors hover:bg-slate-800/30">
                          <td className="py-3">
                            <div className="font-medium text-slate-200">{student.name}</div>
                            <div className="text-[10px] text-slate-500">{student.college}</div>
                          </td>
                          <td className="py-3 text-slate-300">{student.track}</td>
                          <td className="py-3 text-center font-medium text-white">{student.streak}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              student.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400' :
                              student.status === 'At Risk' ? 'bg-amber-400/10 text-amber-400' :
                              student.status === 'Completed' ? 'bg-cyan-400/10 text-cyan-400' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-slate-300">{student.completion}%</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Challenge Management */}
            <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold mb-1">Challenge Management</h2>
              <p className="text-sm text-slate-400 mb-6">Current active day metrics</p>

              <div className="rounded-xl bg-slate-950/50 border border-white/5 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Current Day</span>
                  <span className="font-bold text-white text-lg">Day {data.challengeOverview.currentDay}</span>
                </div>
                <p className="mt-1 text-sm text-slate-300">{data.challengeOverview.todayTask}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Users className="h-3 w-3"/> Total Submissions</span>
                  <span className="font-semibold text-white">{data.challengeOverview.submissions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Code className="h-3 w-3"/> GitHub Links</span>
                  <span className="font-semibold text-white">{data.challengeOverview.githubSubmissions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Briefcase className="h-3 w-3"/> LinkedIn Links</span>
                  <span className="font-semibold text-white">{data.challengeOverview.linkedinSubmissions}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Overall Completion</span>
                    <span className="text-emerald-400 font-semibold">{data.challengeOverview.completionPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${data.challengeOverview.completionPercentage}%` }} />
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full py-2.5 rounded-xl border border-white/10 bg-slate-800 text-sm font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                View Challenge Content
              </button>
            </div>

            {/* Activity Feed */}
            <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold mb-4">Live Activity</h2>
              <div className="space-y-4">
                {data.activity.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
                ) : (
                  data.activity.map(act => (
                    <div key={act.id} className="flex gap-3">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        act.type === 'github' ? 'bg-slate-800 text-slate-300' :
                        act.type === 'linkedin' ? 'bg-blue-500/20 text-blue-400' :
                        act.type === 'completion' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {act.type === 'github' && <Code className="h-3 w-3" />}
                        {act.type === 'linkedin' && <Briefcase className="h-3 w-3" />}
                        {act.type === 'completion' && <CheckCircle className="h-3 w-3" />}
                        {act.type === 'milestone' && <Activity className="h-3 w-3" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-slate-200">{act.text}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" /> {act.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
