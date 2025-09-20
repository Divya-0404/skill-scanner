import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Search, 
  Filter,
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function Learning() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-4">
              Accelerate Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Curated courses and resources tailored to your career goals and skill level
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, skills, or topics..."
                  className="pl-10 glass-card border-border/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Courses Enrolled", value: "8", color: "text-primary" },
            { icon: Award, label: "Certificates Earned", value: "12", color: "text-accent" },
            { icon: TrendingUp, label: "Skills Improved", value: "23", color: "text-green-500" },
            { icon: Clock, label: "Hours Learned", value: "145", color: "text-purple-500" },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Paths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>Recommended Learning Paths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Placeholder for Learning Paths - Fetch from Firestore */}
                    <div className="text-center py-10 text-muted-foreground">
                      <p className="text-sm mb-2">No learning paths found.</p>
                      <Button variant="outline" size="sm">
                        Create Your First Learning Path
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Lessons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-accent" />
                    <span>Quick Lessons</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Placeholder for Quick Lessons - Fetch from Firestore */}
                    <div className="text-center py-10 text-muted-foreground">
                      <p className="text-sm mb-2">No quick lessons found.</p>
                      <Button variant="outline" size="sm">
                        Create Your First Quick Lesson
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Lessons
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Streaks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span>Learning Streak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold mb-2">🔥</div>
                  <div className="text-2xl font-bold text-orange-500 mb-1">7 Days</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Keep learning daily to maintain your streak!
                  </p>
                  <Button variant="cosmic" size="sm" className="w-full">
                    Continue Streak
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommended Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Trending Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "AI/Machine Learning", growth: "+45%" },
                      { name: "Cloud Computing", growth: "+38%" },
                      { name: "Blockchain", growth: "+52%" },
                      { name: "Cybersecurity", growth: "+41%" },
                      { name: "Data Analysis", growth: "+33%" },
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {skill.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}