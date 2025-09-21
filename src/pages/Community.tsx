import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Heart, 
  Reply, 
  Search,
  Plus,
  Filter,
  Star,
  Clock,
  ArrowUp,
  Send,
  Bookmark,
  Share,
  ThumbsUp,
  MoreHorizontal
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  replies: number;
  likes: number;
  timeAgo: string;
  tags: string[];
  isAnswered?: boolean;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  avatar: string;
}

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const discussions: Discussion[] = [
    {
      id: "1",
      title: "How to transition from Frontend to Full-Stack development?",
      content: "I've been working as a frontend developer for 2 years and want to transition to full-stack. What backend technologies should I learn first?",
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        role: "Frontend Developer"
      },
      category: "Career Advice",
      replies: 24,
      likes: 15,
      timeAgo: "2 hours ago",
      tags: ["frontend", "fullstack", "career-transition"],
      isAnswered: true
    },
    {
      id: "2",
      title: "Best practices for Data Science portfolio projects",
      content: "Looking for advice on what projects to include in my data science portfolio to land my first role. Any specific domains or techniques I should focus on?",
      author: {
        name: "Alex Kumar",
        avatar: "AK",
        role: "Data Science Student"
      },
      category: "Portfolio Review",
      replies: 18,
      likes: 12,
      timeAgo: "4 hours ago",
      tags: ["data-science", "portfolio", "projects"]
    },
    {
      id: "3",
      title: "UX Research methods for small startups",
      content: "Working at a startup with limited resources. What are the most effective UX research methods I can implement with a small budget and tight timelines?",
      author: {
        name: "Maria Rodriguez",
        avatar: "MR",
        role: "UX Designer"
      },
      category: "UX/Design",
      replies: 31,
      likes: 28,
      timeAgo: "6 hours ago",
      tags: ["ux-research", "startup", "budget"]
    },
    {
      id: "4",
      title: "Salary negotiation tips for junior developers",
      content: "Just received my first job offer as a junior developer. How should I approach salary negotiation without seeming ungrateful or overconfident?",
      author: {
        name: "David Park",
        avatar: "DP",
        role: "CS Graduate"
      },
      category: "Career Advice",
      replies: 42,
      likes: 35,
      timeAgo: "8 hours ago",
      tags: ["salary", "negotiation", "junior-dev"]
    },
    {
      id: "5",
      title: "Machine Learning model deployment in production",
      content: "Successfully trained my first ML model, but struggling with deployment. What are the best practices for deploying ML models in production environments?",
      author: {
        name: "Emma Watson",
        avatar: "EW",
        role: "ML Engineer"
      },
      category: "Technical Discussion",
      replies: 16,
      likes: 22,
      timeAgo: "12 hours ago",
      tags: ["machine-learning", "deployment", "production"]
    }
  ];

  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Jennifer Liu",
      role: "Senior Software Engineer",
      company: "Google",
      expertise: ["React", "System Design", "Leadership"],
      rating: 4.9,
      sessions: 127,
      avatar: "JL"
    },
    {
      id: "2", 
      name: "Michael Thompson",
      role: "Data Science Director",
      company: "Netflix",
      expertise: ["Machine Learning", "Python", "Strategy"],
      rating: 4.8,
      sessions: 89,
      avatar: "MT"
    },
    {
      id: "3",
      name: "Lisa Chang",
      role: "Head of Design",
      company: "Airbnb",
      expertise: ["UX Strategy", "Design Systems", "Leadership"],
      rating: 4.9,
      sessions: 156,
      avatar: "LC"
    },
    {
      id: "4",
      name: "Robert Garcia",
      role: "VP of Engineering",
      company: "Stripe",
      expertise: ["Architecture", "Team Building", "Scaling"],
      rating: 4.7,
      sessions: 93,
      avatar: "RG"
    }
  ];

  const trendingTopics = [
    { name: "AI in Career Development", count: 234, growth: "+45%" },
    { name: "Remote Work Best Practices", count: 189, growth: "+32%" },
    { name: "Tech Salary Discussions", count: 156, growth: "+28%" },
    { name: "Career Transition Stories", count: 142, growth: "+38%" },
    { name: "Interview Preparation", count: 128, growth: "+25%" }
  ];

  const categories = ["all", "Career Advice", "Technical Discussion", "Portfolio Review", "UX/Design", "Networking"];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Connect & Grow{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join discussions, find mentors, and accelerate your career with our vibrant community
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..."
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
                <Button variant="cosmic">
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Active Members", value: "12.5K", color: "text-primary" },
            { icon: MessageCircle, label: "Discussions", value: "3.2K", color: "text-accent" },
            { icon: Star, label: "Expert Mentors", value: "450", color: "text-yellow-500" },
            { icon: TrendingUp, label: "Weekly Growth", value: "+18%", color: "text-green-500" },
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
          {/* Main Discussions */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span>Recent Discussions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredDiscussions.map((discussion) => (
                      <div key={discussion.id} className="glass-card p-6 hover-lift">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3 flex-1">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>{discussion.author.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{discussion.title}</h3>
                                {discussion.isAnswered && (
                                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                                    Answered
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <span className="font-medium text-foreground">{discussion.author.name}</span>
                                <span>•</span>
                                <span>{discussion.author.role}</span>
                                <span>•</span>
                                <span>{discussion.timeAgo}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {discussion.content}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{discussion.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Reply className="w-4 h-4" />
                                    <span>{discussion.replies} replies</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {discussion.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Bookmark className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Share className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Load More Discussions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Mentors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Featured Mentors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentors.map((mentor) => (
                      <div key={mentor.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{mentor.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{mentor.name}</h4>
                            <p className="text-xs text-muted-foreground">{mentor.role}</p>
                            <p className="text-xs text-muted-foreground">{mentor.company}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                {mentor.rating} ({mentor.sessions} sessions)
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {mentor.expertise.slice(0, 2).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          <Send className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="cosmic" className="w-full mt-4">
                    View All Mentors
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Trending Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{topic.name}</p>
                          <p className="text-xs text-muted-foreground">{topic.count} discussions</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                          {topic.growth}
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
              transition={{ delay: 0.8 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Community Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Join Study Groups
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Share Your Success
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule 1:1 Session
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