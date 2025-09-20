interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GenerateQuizRequest {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
  categories?: string[];
}

class AIService {
  private geminiApiKey: string | null = null;
  private vertexApiKey: string | null = null;
  
  constructor() {
    // Load API keys from localStorage
    this.geminiApiKey = localStorage.getItem('gemini_api_key');
    this.vertexApiKey = localStorage.getItem('vertex_api_key');
  }

  setGeminiApiKey(apiKey: string) {
    this.geminiApiKey = apiKey;
    localStorage.setItem('gemini_api_key', apiKey);
  }

  setVertexApiKey(apiKey: string) {
    this.vertexApiKey = apiKey;
    localStorage.setItem('vertex_api_key', apiKey);
  }

  hasApiKeys(): boolean {
    return !!(this.geminiApiKey && this.vertexApiKey);
  }

  async generateQuizWithGemini(request: GenerateQuizRequest): Promise<QuizQuestion[]> {
    if (!this.geminiApiKey) {
      throw new Error('Gemini API key not set');
    }

    const prompt = `Generate ${request.numberOfQuestions} multiple choice questions about ${request.topic} at ${request.difficulty} difficulty level. 
    Format the response as a JSON array with objects containing: id, question, options (array of 4 strings), correctAnswer (index 0-3), category, and difficulty.
    Make questions engaging and educational.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      const questionsMatch = generatedText.match(/\[[\s\S]*\]/);
      if (questionsMatch) {
        return JSON.parse(questionsMatch[0]);
      }
      
      throw new Error('Failed to parse quiz questions from Gemini response');
    } catch (error) {
      console.error('Error generating quiz with Gemini:', error);
      throw error;
    }
  }

  async analyzeSkillsWithVertex(userAnswers: any[]): Promise<any> {
    if (!this.vertexApiKey) {
      throw new Error('Vertex AI API key not set');
    }

    const prompt = `Analyze these quiz answers and provide skill assessment: ${JSON.stringify(userAnswers)}`;

    try {
      // Vertex AI endpoint (replace PROJECT_ID and REGION with your values)
      const endpoint = `https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/publishers/google/models/text-bison:predict`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.vertexApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{
            prompt: prompt
          }],
          parameters: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Vertex AI error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.predictions[0];
    } catch (error) {
      console.error('Error analyzing skills with Vertex AI:', error);
      throw error;
    }
  }

  // Placeholder methods that work without API keys
  async generatePlaceholderQuiz(request: GenerateQuizRequest): Promise<QuizQuestion[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const placeholderQuestions: QuizQuestion[] = [
      {
        id: '1',
        question: `What is a key concept in ${request.topic}?`,
        options: [
          'Option A (Placeholder)',
          'Option B (Placeholder)', 
          'Option C (Placeholder)',
          'Option D (Placeholder)'
        ],
        correctAnswer: 0,
        category: request.categories?.[0] || 'General',
        difficulty: request.difficulty
      },
      {
        id: '2',
        question: `Which of the following best describes ${request.topic}?`,
        options: [
          'Description A (Placeholder)',
          'Description B (Placeholder)',
          'Description C (Placeholder)', 
          'Description D (Placeholder)'
        ],
        correctAnswer: 1,
        category: request.categories?.[0] || 'General',
        difficulty: request.difficulty
      }
    ];

    return placeholderQuestions.slice(0, request.numberOfQuestions);
  }

  async generateQuiz(request: GenerateQuizRequest): Promise<QuizQuestion[]> {
    if (this.hasApiKeys()) {
      return this.generateQuizWithGemini(request);
    } else {
      console.log('Using placeholder quiz generation - add API keys for real generation');
      return this.generatePlaceholderQuiz(request);
    }
  }

  async analyzeSkills(userAnswers: any[]): Promise<any> {
    if (this.hasApiKeys()) {
      return this.analyzeSkillsWithVertex(userAnswers);
    } else {
      console.log('Using placeholder skill analysis - add API keys for real analysis');
      // Return placeholder analysis
      return {
        overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
        skillBreakdown: {
          'Technical Skills': Math.floor(Math.random() * 30) + 70,
          'Problem Solving': Math.floor(Math.random() * 30) + 70,
          'Communication': Math.floor(Math.random() * 30) + 70
        },
        recommendations: [
          'Focus on strengthening core concepts (Placeholder)',
          'Practice more hands-on projects (Placeholder)',
          'Consider additional learning resources (Placeholder)'
        ]
      };
    }
  }
}

export const aiService = new AIService();
export type { QuizQuestion, GenerateQuizRequest };