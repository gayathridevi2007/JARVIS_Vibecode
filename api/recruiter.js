export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const mockData = {
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

  res.status(200).json(mockData);
}
