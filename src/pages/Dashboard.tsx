import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Briefcase,
  Star,
  Award,
  Zap,
  Clock,
  BarChart,
  BookMarked,
  UserCheck
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { getUserProgress } from "@/services/firestoreService";

interface UserProgress {
  userId: string;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  skills: Record<string, number>;
  recentQuizzes: Array<{
    profession: string;
    score: number;
    date: string;
  }>;
}

export default function Dashboard() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const mockAchievements = [
    {
      name: "Quick Learner",
      description: "Complete 5 quizzes in one day",
      unlocked: true,
      icon: Zap
    },
    {
      name: "Perfect Score",
      description: "Score 100% on any quiz",
      unlocked: true,
      icon: Star
    },
    {
      name: "Career Explorer",
      description: "Take quizzes in 3 different professions",
      unlocked: true,
      icon: Briefcase
    },
    {
      name: "Knowledge Master",
      description: "Complete 10 quizzes",
      unlocked: false,
      icon: Award
    }
  ];

  const mockCareerRecommendations = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      salary: "$95,000 - $130,000",
      match: 92,
      skills: ["React", "JavaScript", "TypeScript", "CSS"]
    },
    {
      title: "UX/UI Designer",
      company: "Design Studio Pro",
      salary: "$75,000 - $100,000", 
      match: 88,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      title: "Product Manager",
      company: "Growth Ventures",
      salary: "$100,000 - $140,000",
      match: 85,
      skills: ["Strategy", "Analytics", "Leadership", "Communication"]
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate user ID (in real app, get from auth)
        const userId = "demo-user-123";
        const progress = await getUserProgress(userId);
        setUserProgress(progress);
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">Ready to advance your career journey?</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Button variant="cosmic">
                <Zap className="w-4 h-4 mr-2" />
                Take New Quiz
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Target, label: "Completed", value: userProgress?.completedQuizzes.toString() || "0", color: "text-primary" },
                { icon: Trophy, label: "Average Score", value: `${userProgress?.averageScore || 0}%`, color: "text-accent" },
                { icon: TrendingUp, label: "Total Quizzes", value: userProgress?.totalQuizzes.toString() || "0", color: "text-green-500" },
                { icon: Briefcase, label: "Skills Areas", value: Object.keys(userProgress?.skills || {}).length.toString(), color: "text-purple-500" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Skills Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Your Skills Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userProgress?.skills && Object.entries(userProgress.skills).map(([skillName, skillLevel], index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skillName}</span>
                        <span className="text-muted-foreground">{skillLevel}%</span>
                      </div>
                      <Progress value={skillLevel} className="h-2" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Improve Skills
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Quiz Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-blue-500" />
                    <span>Recent Quiz Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProgress?.recentQuizzes?.map((quiz, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                        <div>
                          <p className="font-medium text-sm">{quiz.profession}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(quiz.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                          {quiz.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <span>Recommended Careers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCareerRecommendations.map((career, index) => (
                      <div key={index} className="glass-card p-4 hover-lift">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{career.title}</h4>
                            <p className="text-sm text-muted-foreground">{career.company}</p>
                            <p className="text-sm font-medium text-accent">{career.salary}</p>
                          </div>
                          <Badge variant="secondary" className="bg-accent/20 text-accent">
                            {career.match}% match
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="cosmic" className="w-full mt-4">
                    View All Opportunities
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          achievement.unlocked 
                            ? "bg-accent/10 border border-accent/30" 
                            : "bg-muted/20 opacity-60"
                        }`}
                      >
                        <achievement.icon className={`w-8 h-8 ${
                          achievement.unlocked ? "text-accent" : "text-muted-foreground"
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{achievement.name}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Completed Software Developer Quiz", time: "2 hours ago", icon: Target },
                      { action: "Unlocked Perfect Score badge", time: "1 day ago", icon: Award },
                      { action: "Started UX Designer assessment", time: "3 days ago", icon: BookMarked },
                      { action: "Improved Technical Skills by 15%", time: "1 week ago", icon: TrendingUp },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <activity.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Learning Resources
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Take New Assessment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}