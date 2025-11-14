import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import Demo from '../components/Demo';
import SolanaStudio from '../components/SolanaStudio';
import Link from 'next/link';

export default function AppPage() {
  const [showSolanaStudio, setShowSolanaStudio] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    type: 'web-app',
  });
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidationError, setShowValidationError] = useState(false);

  const handleGenerate = async () => {
    // Show validation error if fields are empty
    if (!projectDetails.type || !projectDetails.description) {
      setShowValidationError(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowValidationError(false);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectType: projectDetails.type,
          description: projectDetails.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate code');
      }

      if (data.code) {
        setGeneratedCode(data.code);
      }
    } catch (error) {
      console.error('Error generating code:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate code'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Incepto NX - AI Code Generation</title>
        <meta
          name="description"
          content="Generate production-ready code with AI"
        />
      </Head>

      <div className="min-h-screen bg-dark text-light">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-primary font-display text-2xl font-bold">
                    Incepto
                  </span>
                  <span className="text-white text-2xl font-bold">NX</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-6"
              >
                <button
                  onClick={() => setShowSolanaStudio(!showSolanaStudio)}
                  className="px-6 py-2 bg-primary text-dark font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)]"
                >
                  {showSolanaStudio ? 'Back to Generator' : 'Solana Studio'}
                </button>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          {showSolanaStudio ? (
            <SolanaStudio />
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl" />
                <div className="relative glass-card rounded-2xl p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-primary">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-dark-input border border-white/10 text-white placeholder-white/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
                        value={projectDetails.name}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-primary">
                        Description
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg bg-dark-input border border-white/10 text-white placeholder-white/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
                        value={projectDetails.description}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe your application..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-primary">
                        Project Type
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-lg bg-dark-input border border-white/10 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
                        value={projectDetails.type}
                        onChange={(e) =>
                          setProjectDetails({
                            ...projectDetails,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="web-app">Web Application</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="dashboard">Admin Dashboard</option>
                        <option value="api">REST API</option>
                        <option value="fullstack">Full-Stack Project</option>
                      </select>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="w-full py-4 rounded-lg bg-primary text-dark font-medium text-lg shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] transition-all duration-200 disabled:opacity-50"
                    >
                      {isLoading ? 'Generating...' : 'Generate Code'}
                    </motion.button>

                    {showValidationError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                        Project type and description are required
                      </div>
                    )}

                    {error && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 backdrop-blur-xl">
                        {error}
                      </div>
                    )}

                    {generatedCode && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl" />
                        <div className="relative glass-card rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 text-center text-xs text-primary font-medium">
                              Generated Code
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(generatedCode);
                              }}
                              className="text-xs text-light-darker hover:text-primary transition-colors"
                            >
                              Copy Code
                            </button>
                          </div>
                          <pre className="p-4 text-sm font-mono text-light overflow-x-auto">
                            <code>{generatedCode}</code>
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Demo Section */}
              <Demo />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
