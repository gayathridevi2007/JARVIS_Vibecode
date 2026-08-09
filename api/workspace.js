const recruiterMockData = {
  stats: {
    totalStudents: 1254,
    activeStreaks: 842,
    completionRate: "67%",
    topPerformers: 156
  },
  students: [
    {
      id: "s1",
      name: "Alex Chen",
      college: "State University",
      track: "Full Stack",
      streak: 12,
      completion: 20,
      skills: ["React", "Node.js", "TypeScript"],
      achievements: ["Early Bird", "7-Day Streak"],
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      lastActive: "2 hours ago"
    },
    {
      id: "s2",
      name: "Sarah Jenkins",
      college: "Tech Institute",
      track: "Frontend",
      streak: 45,
      completion: 75,
      skills: ["React", "CSS", "Figma"],
      achievements: ["30-Day Streak", "UI Master"],
      github: "https://github.com/sarahj",
      linkedin: "https://linkedin.com/in/sarahj",
      lastActive: "1 hour ago"
    },
    {
      id: "s3",
      name: "Michael Rodriguez",
      college: "City College",
      track: "Backend",
      streak: 3,
      completion: 15,
      skills: ["Python", "Django", "SQL"],
      achievements: ["First Submit"],
      github: "https://github.com/mrodriguez",
      linkedin: null,
      lastActive: "1 day ago"
    },
    {
      id: "s4",
      name: "Emily Wong",
      college: "Global University",
      track: "Full Stack",
      streak: 60,
      completion: 100,
      skills: ["React", "Go", "Docker", "AWS"],
      achievements: ["60-Day Challenge Finisher", "Perfect Streak", "Deployment Pro"],
      github: "https://github.com/emilyw",
      linkedin: "https://linkedin.com/in/emilyw",
      lastActive: "10 mins ago"
    }
  ],
  insights: {
    consistent: 345,
    fastestSkills: ["TypeScript", "Next.js"],
    recentlyActive: 120,
    finishers: 45
  }
};

const adminMockData = {
  stats: {
    registered: 1500,
    active: 950,
    completed: 45,
    proofSubmissions: 12450,
    averageStreak: 14
  },
  students: [
    { id: "s1", name: "Alex Chen", college: "State University", track: "Full Stack", currentDay: 12, streak: 12, status: "Active", completion: 20 },
    { id: "s2", name: "Sarah Jenkins", college: "Tech Institute", track: "Frontend", currentDay: 45, streak: 45, status: "Active", completion: 75 },
    { id: "s3", name: "Michael Rodriguez", college: "City College", track: "Backend", currentDay: 9, streak: 0, status: "At Risk", completion: 15 },
    { id: "s4", name: "Emily Wong", college: "Global University", track: "Full Stack", currentDay: 60, streak: 60, status: "Completed", completion: 100 },
    { id: "s5", name: "David Kim", college: "West University", track: "Frontend", currentDay: 2, streak: 0, status: "Inactive", completion: 3 }
  ],
  challengeOverview: {
    currentDay: 12,
    todayTask: "Build a REST API",
    submissions: 842,
    githubSubmissions: 810,
    linkedinSubmissions: 790,
    completionPercentage: 88
  },
  activity: [
    { id: 1, type: "github", text: "Alex Chen submitted GitHub proof for Day 12", time: "2 mins ago" },
    { id: 2, type: "milestone", text: "Sarah Jenkins reached 45-Day Streak", time: "15 mins ago" },
    { id: 3, type: "linkedin", text: "Emily Wong submitted LinkedIn proof for Day 60", time: "1 hour ago" },
    { id: 4, type: "completion", text: "Emily Wong completed the 60-Day Challenge!", time: "1 hour ago" }
  ],
  alerts: [
    "120 students at risk of losing streak today",
    "Day 11 has a lower than average submission rate (65%)",
    "45 students missing LinkedIn proofs for Day 12"
  ]
};

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = req.url || '';
  const role = req.query?.role || (url.includes('admin') ? 'admin' : url.includes('recruiter') ? 'recruiter' : '');

  if (role === 'admin' || url.includes('/admin')) {
    res.status(200).json(adminMockData);
    return;
  }

  if (role === 'recruiter' || url.includes('/recruiter')) {
    res.status(200).json(recruiterMockData);
    return;
  }

  res.status(200).json(recruiterMockData);
}
