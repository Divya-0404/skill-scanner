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
  Clock
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [skillsData, setSkillsData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [recommendedCareers, setRecommendedCareers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch skills data
      const skillsSnapshot = await getDocs(collection(db, "skills"));
      const skills = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSkillsData(skills);

      // Fetch achievements data
      const achievementsSnapshot = await getDocs(collection(db, "achievements"));
      const achievements = achievementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAchievements(achievements);

      // Fetch recommended careers data
      const careersSnapshot = await getDocs(collection(db, "recommendedCareers"));
      const careers = careersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecommendedCareers(careers);
    };

    fetchData();
  }, []);

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
              <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
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
                { icon: Target, label: "Assessments", value: "12", color: "text-primary" },
                { icon: Trophy, label: "Achievements", value: "8", color: "text-accent" },
                { icon: TrendingUp, label: "Skill Growth", value: "+15%", color: "text-green-500" },
                { icon: Briefcase, label: "Job Matches", value: "24", color: "text-purple-500" },
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
                    <span>Your Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillsData.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Improve Skills
                  </Button>
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
                    {recommendedCareers.map((career, index) => (
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
                    {achievements.map((achievement, index) => (
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
                      { action: "Completed React Skills Quiz", time: "2 hours ago", icon: Target },
                      { action: "Unlocked Perfect Score badge", time: "1 day ago", icon: Award },
                      { action: "Joined Frontend Developer community", time: "3 days ago", icon: Users },
                      { action: "Started JavaScript learning path", time: "1 week ago", icon: BookOpen },
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
                    Browse Learning Paths
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goal
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