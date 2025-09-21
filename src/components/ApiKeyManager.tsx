import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, AlertTriangle, CheckCircle } from 'lucide-react';

interface ApiKeyManagerProps {
  onKeysUpdated?: () => void;
}

export function ApiKeyManager({ onKeysUpdated }: ApiKeyManagerProps) {
  const [geminiKey, setGeminiKey] = useState('');
  const [vertexKey, setVertexKey] = useState('');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showVertexKey, setShowVertexKey] = useState(false);
  const [hasKeys, setHasKeys] = useState(() => {
    return !!(localStorage.getItem('gemini_api_key') || localStorage.getItem('vertex_api_key'));
  });

  const handleSaveKeys = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiKey.trim());
    }
    if (vertexKey.trim()) {
      localStorage.setItem('vertex_api_key', vertexKey.trim());
    }
    
    setHasKeys(!!(localStorage.getItem('gemini_api_key') || localStorage.getItem('vertex_api_key')));
    setGeminiKey('');
    setVertexKey('');
    onKeysUpdated?.();
  };

  const handleClearKeys = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('vertex_api_key');
    setHasKeys(false);
    onKeysUpdated?.();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          AI API Configuration (Optional)
        </CardTitle>
        <CardDescription>
          Configure your Firebase Gemini API and Vertex AI credentials for enhanced features. 
          The application works with pregenerated content without API keys.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode Active:</strong> The application is currently running with pregenerated content. 
            All features are fully functional without API keys.
          </AlertDescription>
        </Alert>

        {!hasKeys && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No API keys configured. You can add them here for enhanced AI features in the future, 
              but they are not required for current functionality.
            </AlertDescription>
          </Alert>
        )}

        {hasKeys && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <Key className="h-4 w-4" />
            <AlertDescription>
              API keys are configured and stored securely in your browser. 
              They will be used for future AI-powered features.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key">
              Gemini API Key
              <span className="text-sm text-muted-foreground ml-2">
                (For future AI-enhanced quiz features)
              </span>
            </Label>
            <div className="relative">
              <Input
                id="gemini-key"
                type={showGeminiKey ? 'text' : 'password'}
                placeholder="Enter your Gemini API key..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
              >
                {showGeminiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vertex-key">
              Vertex AI API Key
              <span className="text-sm text-muted-foreground ml-2">
                (For future AI-powered skill analysis)
              </span>
            </Label>
            <div className="relative">
              <Input
                id="vertex-key"
                type={showVertexKey ? 'text' : 'password'}
                placeholder="Enter your Vertex AI API key..."
                value={vertexKey}
                onChange={(e) => setVertexKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowVertexKey(!showVertexKey)}
              >
                {showVertexKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure your Vertex AI credentials in{' '}
              <a 
                href="https://console.cloud.google.com/vertex-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            onClick={handleSaveKeys}
            disabled={!geminiKey.trim() && !vertexKey.trim()}
          >
            Save API Keys
          </Button>
          {hasKeys && (
            <Button variant="outline" onClick={handleClearKeys}>
              Clear Keys
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <strong>Security Note:</strong> API keys are stored locally in your browser and never sent to our servers. 
          For production applications, consider using server-side authentication.
          <br /><br />
          <strong>Current Status:</strong> The application is fully functional without API keys using pregenerated content and mock data.
        </div>
      </CardContent>
    </Card>
  );
}