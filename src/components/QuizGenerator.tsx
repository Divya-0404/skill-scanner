import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Settings } from 'lucide-react';
import { aiService, type QuizQuestion, type GenerateQuizRequest } from '@/services/aiService';
import { ApiKeyManager } from './ApiKeyManager';
import { fetchCollection, addDocument, updateDocument, deleteDocument } from '@/services/firestoreService';

interface QuizGeneratorProps {
  onQuizGenerated: (questions: QuizQuestion[]) => void;
}

export function QuizGenerator({ onQuizGenerated }: QuizGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiManager, setShowApiManager] = useState(false);
  const [formData, setFormData] = useState({
    qualification: '', // Changed from topic to qualification
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    numberOfQuestions: 5,
    customPrompt: ''
  });
  const [firestoreData, setFirestoreData] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCollection('quizzes');
      setFirestoreData(data);
    };

    fetchData();
  }, []);

  const handleGenerate = async () => {
    if (!formData.qualification.trim()) return;

    setIsGenerating(true);
    try {
      const request: GenerateQuizRequest = {
        qualification: formData.qualification, // Pass qualification to the API
        difficulty: formData.difficulty,
        numberOfQuestions: formData.numberOfQuestions,
      };

      const questions = await aiService.generateQuiz(request);
      onQuizGenerated(questions);
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      // You could add toast notification here
    } finally {
      setIsGenerating(false);
    }
  };

  if (showApiManager) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowApiManager(false)}
          className="mb-4"
        >
          ← Back to Quiz Generator
        </Button>
        <ApiKeyManager onKeysUpdated={() => setShowApiManager(false)} />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Quiz Generator
        </CardTitle>
        <CardDescription>
          Generate personalized quizzes using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {aiService.hasApiKeys() ? (
              <span className="text-green-600 dark:text-green-400">✓ API keys configured</span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400">⚠ Using placeholder data</span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiManager(true)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configure API
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              placeholder="e.g., High School, Bachelor's Degree, Master's Degree..."
              value={formData.qualification}
              onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                  setFormData(prev => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questions">Number of Questions</Label>
              <Select
                value={formData.numberOfQuestions.toString()}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, numberOfQuestions: parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Instructions (Optional)</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Add any specific requirements or focus areas for the quiz..."
              value={formData.customPrompt}
              onChange={(e) => setFormData(prev => ({ ...prev, customPrompt: e.target.value }))}
              rows={3}
            />
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={!formData.qualification.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Quiz
            </>
          )}
        </Button>

        {firestoreData.length === 0 && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>No data found:</strong> It seems we don't have any quizzes available yet. Please check back later or configure your API keys to generate quizzes.
          </div>
        )}
      </CardContent>
    </Card>
  );
}