import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Search, Briefcase, Users, Flame, Trophy, Star, ExternalLink, Code } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  college: string;
  track: string;
  streak: number;
  completion: number;
  skills: string[];
  achievements: string[];
  github: string | null;
  linkedin: string | null;
  lastActive: string;
}

interface RecruiterData {
  stats: {
    totalStudents: number;
    activeStreaks: number;
    completionRate: string;
    topPerformers: number;
  };
  students: Student[];
  insights: {
    consistent: number;
    fastestSkills: string[];
    recentlyActive: number;
    finishers: number;
  };
}

export default function RecruiterPage() {
  const [data, setData] = useState<RecruiterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetch('/api/recruiter')
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
      </div>
    );
  }

  const filteredStudents = data.students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">ABTALKS</span>
            <span className="sm:hidden">REC</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-400 sm:inline">Recruiter Workspace</span>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 pl-3 pr-1 py-1">
              <div className="text-right text-[11px]">
                <p className="font-semibold text-white">TechCorp HR</p>
                <p className="text-slate-400">Premium</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Talent</p>
            <p className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              {data.stats.totalStudents}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Active Streaks</p>
            <p className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-400" />
              {data.stats.activeStreaks}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Top 10%</p>
            <p className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              {data.stats.topPerformers}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg Complete</p>
            <p className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-400" />
              {data.stats.completionRate}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Main List */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">Student Directory</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search skills or names..." 
                    className="w-full rounded-full border border-white/10 bg-slate-900 px-4 py-2 pl-9 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                >
                  <option value="All">All Tracks</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {filteredStudents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/5 bg-slate-900/20 py-16 text-center">
                  <Search className="h-10 w-10 text-slate-500 mb-4" />
                  <p className="text-slate-300 font-semibold">No students found</p>
                  <p className="text-sm text-slate-500 mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                filteredStudents.map(student => (
                  <motion.div 
                    key={student.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedStudent(student)}
                    className={`cursor-pointer rounded-[24px] border border-white/10 bg-slate-900/50 p-4 transition-colors hover:border-cyan-400/50 ${selectedStudent?.id === student.id ? 'border-cyan-400 bg-cyan-400/5' : ''}`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-slate-300">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{student.name}</h3>
                          <p className="text-xs text-slate-400">{student.track} • {student.college}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-400">
                          <Flame className="h-3 w-3" /> {student.streak} days
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">
                          <Trophy className="h-3 w-3" /> {student.completion}% done
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {student.skills.map(skill => (
                        <span key={skill} className="rounded-md border border-white/10 bg-slate-800/50 px-2 py-0.5 text-[10px] text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar / Insights / Profile */}
          <div className="w-full lg:w-80 flex-shrink-0">
            {selectedStudent ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 rounded-[24px] border border-cyan-400/20 bg-slate-900/80 p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-white">Student Profile</h3>
                  <button onClick={() => setSelectedStudent(null)} className="text-xs text-slate-400 hover:text-white">Close</button>
                </div>
                
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/20 text-xl font-bold text-cyan-300">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedStudent.name}</h4>
                    <p className="text-sm text-cyan-300">{selectedStudent.track}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Consistency</span>
                    <span className="font-semibold text-amber-400">{selectedStudent.streak} day streak</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Completion</span>
                    <span className="font-semibold text-emerald-400">{selectedStudent.completion}%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Last Active</span>
                    <span className="font-medium text-slate-200">{selectedStudent.lastActive}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Achievements</p>
                  <div className="flex flex-col gap-2">
                    {selectedStudent.achievements.map(a => (
                      <div key={a} className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 text-xs">
                        <Trophy className="h-3 w-3 text-cyan-400" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  {selectedStudent.github && (
                    <a href={selectedStudent.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800">
                      <Code className="h-4 w-4" /> View GitHub Profile
                    </a>
                  )}
                  {selectedStudent.linkedin && (
                    <a href={selectedStudent.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium transition-colors hover:bg-blue-500">
                      <Briefcase className="h-4 w-4" /> View LinkedIn Profile
                    </a>
                  )}
                  <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-950 py-2.5 text-sm font-bold transition-opacity hover:opacity-90">
                    Contact Student <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="sticky top-24 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.1),_transparent_40%)] bg-slate-900/50 p-5">
                <h3 className="font-semibold text-white">Talent Insights</h3>
                <p className="mt-1 text-xs text-slate-400">Aggregated statistics</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Consistent Learners</p>
                      <span className="text-sm font-bold text-white">{data.insights.consistent}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-full w-[45%] rounded-full bg-cyan-400" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Fastest Growing</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data.insights.fastestSkills.map(s => (
                        <span key={s} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-cyan-300">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Recently Active</p>
                      <span className="text-sm font-bold text-white">{data.insights.recentlyActive}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-300">Challenge Finishers</p>
                      <span className="text-sm font-bold text-white">{data.insights.finishers}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-cyan-400/10 p-4 text-center">
                  <Sparkles className="mx-auto h-5 w-5 text-cyan-400 mb-2" />
                  <p className="text-xs text-cyan-300">Select any student card to view their full profile, proof of work, and contact details.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
