import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  TrendingUp,
  ExternalLink,
  CheckCircle,
  PlayCircle,
  FileText,
  Video,
  Globe
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'article' | 'course' | 'interactive';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolled: number;
  url?: string;
  progress?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: string;
  level: string;
  skills: string[];
  progress: number;
}

export default function Learning() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Frontend Developer Path",
      description: "Master modern web development with React, TypeScript, and industry best practices",
      courses: 8,
      duration: "6-8 months",
      level: "Beginner to Advanced",
      skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
      progress: 45
    },
    {
      id: "2", 
      title: "Data Science Mastery",
      description: "Learn data analysis, machine learning, and statistical modeling from scratch",
      courses: 12,
      duration: "8-10 months",
      level: "Beginner to Advanced",
      skills: ["Python", "Machine Learning", "Statistics", "SQL", "Pandas"],
      progress: 20
    },
    {
      id: "3",
      title: "UX/UI Design Complete",
      description: "Design thinking, user research, prototyping, and visual design principles",
      courses: 6,
      duration: "4-6 months", 
      level: "Beginner to Intermediate",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      progress: 0
    }
  ];

  const learningResources: LearningResource[] = [
    {
      id: "1",
      title: "React Hooks Deep Dive",
      description: "Master React Hooks with practical examples and best practices",
      category: "Frontend Development",
      type: "video",
      duration: "3h 45m",
      level: "intermediate",
      rating: 4.8,
      enrolled: 15420,
      progress: 75
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      description: "Introduction to ML concepts, algorithms, and real-world applications",
      category: "Data Science",
      type: "course",
      duration: "25h 30m",
      level: "beginner", 
      rating: 4.9,
      enrolled: 8934,
      progress: 30
    },
    {
      id: "3",
      title: "Design Systems in Practice",
      description: "Building scalable design systems for modern applications",
      category: "UX/UI Design",
      type: "interactive",
      duration: "4h 15m",
      level: "intermediate",
      rating: 4.7,
      enrolled: 6721,
      progress: 0
    },
    {
      id: "4",
      title: "SQL for Data Analysis",
      description: "Master SQL queries, joins, and database optimization techniques",
      category: "Data Science",
      type: "course",
      duration: "8h 20m", 
      level: "beginner",
      rating: 4.6,
      enrolled: 12340,
      progress: 60
    },
    {
      id: "5",
      title: "TypeScript Best Practices",
      description: "Advanced TypeScript patterns and enterprise-level development",
      category: "Frontend Development",
      type: "article",
      duration: "45m",
      level: "advanced",
      rating: 4.8,
      enrolled: 9876,
      progress: 100
    },
    {
      id: "6",
      title: "User Research Methods",
      description: "Comprehensive guide to conducting effective user research",
      category: "UX/UI Design",
      type: "course",
      duration: "6h 30m",
      level: "beginner",
      rating: 4.9,
      enrolled: 5432,
      progress: 0
    }
  ];

  const categories = ["all", "Frontend Development", "Data Science", "UX/UI Design", "Backend Development", "DevOps", "Mobile Development"];

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'interactive': return <PlayCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

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
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, skills, or topics..."
                  className="pl-10 glass-card border-border/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 rounded-md border border-border bg-background text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Courses Enrolled", value: "8", color: "text-primary" },
            { icon: Award, label: "Certificates Earned", value: "3", color: "text-accent" },
            { icon: TrendingUp, label: "Skills Improved", value: "12", color: "text-green-500" },
            { icon: Clock, label: "Hours Learned", value: "89", color: "text-purple-500" },
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
                    {learningPaths.map((path) => (
                      <div key={path.id} className="glass-card p-6 hover-lift">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                            <p className="text-muted-foreground mb-3">{path.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {path.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{path.courses} courses</span>
                              <span>{path.duration}</span>
                              <span>{path.level}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                        </div>
                        <Button 
                          variant={path.progress > 0 ? "default" : "cosmic"}
                          className="w-full"
                        >
                          {path.progress > 0 ? "Continue Learning" : "Start Path"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-accent" />
                    <span>Learning Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {filteredResources.map((resource) => (
                      <div key={resource.id} className="glass-card p-4 hover-lift">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(resource.type)}
                              <h4 className="font-semibold">{resource.title}</h4>
                              {resource.progress === 100 && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {resource.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {resource.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {resource.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {resource.enrolled.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 ml-4">
                            <Badge 
                              variant="secondary" 
                              className={getLevelColor(resource.level)}
                            >
                              {resource.level}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Open
                            </Button>
                          </div>
                        </div>
                        {resource.progress !== undefined && resource.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Progress</span>
                              <span className="text-xs text-muted-foreground">{resource.progress}%</span>
                            </div>
                            <Progress value={resource.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
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

            {/* Trending Skills */}
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
                      { name: "React/Frontend", growth: "+35%" },
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

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Learning Goal
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Explore Certificates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Study Group
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