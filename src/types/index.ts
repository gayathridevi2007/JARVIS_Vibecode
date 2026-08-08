export type Student = {
  id: string;
  name: string;
  profileCompletion: number;
  currentStreak: number;
  bestStreak: number;
  currentChallengeDay: number;
  totalCompletedDays: number;
  totalChallengeDays: number;
  standing: string;
  momentumState: string;
  lastUpdated: string;
};

export type ProofStatus = {
  submitted: boolean;
  url: string;
  commit?: string;
  post?: string;
};

export type Challenge = {
  dayNumber: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  learningObjective: string;
  requirements: string[];
  resources: string[];
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt: string | null;
};

export type DashboardData = {
  student: Student;
  challenge: Challenge;
  proof: {
    github: ProofStatus;
    linkedin: ProofStatus;
  };
  achievements: Achievement[];
  progress: number;
};

export type ProgressSummary = {
  completedDays: number;
  totalDays: number;
  percentage: number;
  streak: number;
  currentDay: number;
};
