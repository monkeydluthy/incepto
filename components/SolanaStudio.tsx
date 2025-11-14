import { useState, ChangeEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';

type SolanaFeature = 'program' | 'audit' | 'frontend' | 'template' | 'terminal';

export default function SolanaStudio() {
  const [activeTab, setActiveTab] = useState<'ide' | 'terminal'>('ide');
  const [selectedFeature, setSelectedFeature] =
    useState<SolanaFeature>('program');
  const [prompt, setPrompt] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ input: string; output: string }>
  >([]);

  const features: Record<SolanaFeature, string> = {
    program: 'Program Development',
    audit: 'Code Analysis',
    frontend: 'dApp Frontend',
    template: 'Project Template',
    terminal: 'AI Terminal',
  };

  const handleReset = () => {
    setPrompt('');
    setSourceCode('');
    setGeneratedCode('');
    setAnalysis('');
    setDependencies([]);
    setTerminalHistory([]);
    setSelectedFeature('program');
    setActiveTab('ide');
  };

  const handleGenerate = async () => {
    if (!prompt && selectedFeature !== 'audit') {
      return;
    }

    if (selectedFeature === 'audit' && !sourceCode) {
      return;
    }

    setIsGenerating(true);
    setGeneratedCode('');
    setAnalysis('');
    setDependencies([]);

    try {
      const response = await fetch('/api/solana-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedFeature,
          prompt,
          sourceCode,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        if (selectedFeature === 'terminal') {
          // Add the interaction to terminal history
          setTerminalHistory((prev) => [
            ...prev,
            { input: prompt, output: data.analysis },
          ]);
          setPrompt('');
        } else {
          setGeneratedCode(data.code || '');
          setAnalysis(data.analysis || '');
          setDependencies(data.dependencies || []);
        }
      } else {
        setAnalysis(data.message || 'An error occurred');
      }
    } catch (error) {
      setAnalysis('Failed to generate code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Determine which tabs to show based on selected feature
  const showTabs = selectedFeature !== 'audit';
  const defaultTab = selectedFeature === 'audit' ? 'analysis' : 'code';

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-500">
          Solana Development Studio
        </h1>
        <div className="space-x-2">
          <Button
            variant={activeTab === 'ide' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ide')}
          >
            IDE
          </Button>
          <Button
            variant={activeTab === 'terminal' ? 'default' : 'outline'}
            onClick={() => {
              setActiveTab('terminal');
              setSelectedFeature('terminal');
            }}
          >
            AI Terminal
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="text-red-500 hover:text-red-700"
          >
            Reset
          </Button>
        </div>
      </div>

      {activeTab === 'ide' ? (
        <div className="grid grid-cols-4 gap-4">
          {/* Feature Selection */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="space-y-2">
              {Object.entries(features).map(
                ([key, label]) =>
                  key !== 'terminal' && (
                    <Button
                      key={key}
                      variant={selectedFeature === key ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedFeature(key as SolanaFeature)}
                    >
                      {label}
                    </Button>
                  )
              )}
            </div>
          </Card>

          {/* Main Content */}
          <Card className="col-span-3 p-4">
            <div className="space-y-4">
              {selectedFeature === 'audit' ? (
                <>
                  <Label>Paste your code for analysis</Label>
                  <Textarea
                    value={sourceCode}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceCode(e.target.value)
                    }
                    className="h-40"
                    placeholder="Paste your Solana program code here..."
                  />
                </>
              ) : (
                <>
                  <Label>What would you like to create?</Label>
                  <Input
                    value={prompt}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPrompt(e.target.value)
                    }
                    placeholder="Describe what you want to build..."
                    onKeyPress={handleKeyPress}
                  />
                </>
              )}

              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>

              {/* Output Section */}
              {(generatedCode || analysis || dependencies.length > 0) &&
                (showTabs ? (
                  <Tabs defaultValue={defaultTab} className="mt-4">
                    <TabsList>
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="analysis">Analysis</TabsTrigger>
                      <TabsTrigger value="dependencies">
                        Dependencies
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="code">
                      {generatedCode && (
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <code>{generatedCode}</code>
                        </pre>
                      )}
                    </TabsContent>

                    <TabsContent value="analysis">
                      {analysis && (
                        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                          {analysis}
                        </pre>
                      )}
                    </TabsContent>

                    <TabsContent value="dependencies">
                      {dependencies.length > 0 && (
                        <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-x-auto">
                          {dependencies.join('\n')}
                        </pre>
                      )}
                    </TabsContent>
                  </Tabs>
                ) : (
                  // For Code Analysis, only show analysis
                  <div className="mt-4">
                    {analysis && (
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                        {analysis}
                      </pre>
                    )}
                  </div>
                ))}
            </div>
          </Card>
        </div>
      ) : (
        // Terminal View
        <Card className="p-4 min-h-[600px] bg-gray-900">
          <div className="space-y-4">
            {/* Terminal History */}
            <div className="space-y-4 mb-4">
              <div className="text-green-400 mb-4">
                Welcome to Solana AI Terminal. I understand Anchor, SPL tokens,
                and Solana RPC calls. How can I help you?
              </div>
              {terminalHistory.map((entry, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-purple-400">{`> ${entry.input}`}</div>
                  <div className="text-gray-300 whitespace-pre-wrap">
                    {entry.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="flex items-center space-x-2">
              <div className="text-purple-400">{'>'}</div>
              <Input
                value={prompt}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrompt(e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about Solana development..."
                className="bg-transparent border-none text-white focus:ring-0"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
