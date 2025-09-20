import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Brain, Target, RotateCcw } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { QuizGenerator } from "@/components/QuizGenerator";
import { aiService, type QuizQuestion } from "@/services/aiService";

const sampleQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "When faced with a complex problem, what's your first approach?",
    options: [
      "Break it down into smaller, manageable parts",
      "Research similar problems and solutions",
      "Brainstorm creative alternative approaches",
      "Gather a team to discuss different perspectives"
    ],
    category: 'analytical',
    difficulty: 'medium' as 'medium',
    correctAnswer: 0
  },
  {
    id: "2",
    question: "Which activity energizes you the most?",
    options: [
      "Coding or working with technical systems",
      "Analyzing data and finding patterns",
      "Creating visual designs or content",
      "Leading meetings and motivating teams"
    ],
    category: 'technical',
    difficulty: 'medium' as 'medium',
    correctAnswer: 0
  },
  {
    id: "3",
    question: "How do you prefer to learn new skills?",
    options: [
      "Hands-on practice and experimentation",
      "Reading comprehensive documentation",
      "Visual tutorials and examples",
      "Group discussions and peer learning"
    ],
    category: 'communication',
    difficulty: 'medium' as 'medium',
    correctAnswer: 0
  },
  {
    id: "4",
    question: "What type of work environment motivates you most?",
    options: [
      "Quiet, focused individual work",
      "Collaborative team projects",
      "Dynamic, fast-paced challenges",
      "Structured, goal-oriented tasks"
    ],
    category: 'leadership',
    difficulty: 'medium' as 'medium',
    correctAnswer: 1
  },
  {
    id: "5",
    question: "When presenting ideas, you typically:",
    options: [
      "Use data and logical arguments",
      "Tell stories and use analogies",
      "Create visual presentations",
      "Facilitate group discussions"
    ],
    category: 'creative',
    difficulty: 'medium' as 'medium',
    correctAnswer: 2
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showGenerator, setShowGenerator] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>(sampleQuestions);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleQuizGenerated = (generatedQuestions: QuizQuestion[]) => {
    setQuestions(generatedQuestions);
    setShowGenerator(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsAnalyzing(true);
      try {
        // Analyze answers with AI
        const analysisData = selectedAnswers.map((answer, index) => ({
          question: questions[index].question,
          selectedAnswer: questions[index].options[answer],
          correctAnswer: questions[index].correctAnswer,
          category: questions[index].category
        }));
        
        await aiService.analyzeSkills(analysisData);
        setShowResults(true);
      } catch (error) {
        console.error('Analysis failed:', error);
        setShowResults(true); // Show results anyway with fallback
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setShowGenerator(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuestions(sampleQuestions);
  };

  const getResults = () => {
    // Enhanced scoring system that works with AI-generated questions
    const categoryMap: Record<string, string> = {
      'technical': 'Technical Skills',
      'analytical': 'Analytical Thinking', 
      'creative': 'Creative Problem Solving',
      'leadership': 'Leadership',
      'communication': 'Communication',
      'General': 'General Knowledge'
    };

    const scores: Record<string, number> = {};
    let correctAnswers = 0;

    selectedAnswers.forEach((answer, index) => {
      const question = questions[index];
      const category = categoryMap[question.category] || question.category;
      
      if (!scores[category]) scores[category] = 0;
      
      // Check if answer is correct (for AI-generated questions)
      if (question.correctAnswer !== undefined && answer === question.correctAnswer) {
        correctAnswers++;
        scores[category] += 2; // Bonus for correct answers
      } else {
        scores[category] += 1; // Participation points
      }
    });

    const overallScore = Math.round((correctAnswers / questions.length) * 100);
    const topSkill = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    return { scores, topSkill, overallScore, correctAnswers };
  };

  if (showGenerator) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              AI-Powered Quiz Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate personalized quizzes using AI or take our default assessment
            </p>
          </div>
          
          <QuizGenerator onQuizGenerated={handleQuizGenerated} />
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowGenerator(false)}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Use Default Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { scores, topSkill, overallScore, correctAnswers } = getResults();
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Assessment Complete!
              </h1>
              <p className="text-xl text-muted-foreground">
                You scored {correctAnswers}/{questions.length} ({overallScore}%)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span>Your Top Skill</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold capitalize mb-2 bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                      {topSkill}
                    </div>
                    <p className="text-muted-foreground">
                      This is your strongest skill area based on your responses
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>Skill Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(scores).map(([skill, score]) => {
                    const maxScore = questions.length * 2; // Max possible score
                    return (
                      <div key={skill}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{skill}</span>
                          <span className="text-sm text-muted-foreground">{score}/{maxScore}</span>
                        </div>
                        <Progress value={(score / maxScore) * 100} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button variant="cosmic" size="lg" className="mr-4">
                View Full Report
              </Button>
              <Button variant="glass" size="lg" className="mr-4">
                Explore Careers
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={resetQuiz}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Take Another Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                {aiService.hasApiKeys() ? 'AI-Generated' : 'Skill'} Assessment
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {currentQuestion + 1} of {questions.length}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetQuiz}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  New Quiz
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-accent/20"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button
              variant={selectedAnswers[currentQuestion] !== undefined ? "cosmic" : "outline"}
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined || isAnalyzing}
              className="flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>{currentQuestion === questions.length - 1 ? "Complete" : "Next"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}