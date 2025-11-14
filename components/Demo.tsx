import { motion } from 'framer-motion';
import { useState } from 'react';
import Terminal from './Terminal';
import MonacoEditor from '@monaco-editor/react';

const demoCommands = [
  'incepto new e-commerce-app',
  'analyzing project requirements...',
  'initializing neural architecture...',
  'generating component structure...',
  'applying design system...',
  'optimizing for performance...',
  'integrating state management...',
];

const demoOutput = [
  '🎯 Project Analysis Complete:',
  '  • Type: E-commerce Platform',
  '  • Framework: Next.js + TypeScript',
  '  • UI Framework: Tailwind CSS',
  '  • State: Redux Toolkit',
  '',
  '🏗 Generating Architecture:',
  '  ✓ Created project structure',
  '  ✓ Set up TypeScript configuration',
  '  ✓ Initialized package.json',
  '',
  '📦 Installing Dependencies:',
  '  ✓ next@14.2.0',
  '  ✓ @reduxjs/toolkit@2.0.1',
  '  ✓ tailwindcss@3.4.0',
  '',
  '🎨 Generating Components:',
  '  ✓ components/',
  '    • ProductGrid',
  '    • ProductCard',
  '    • ShoppingCart',
  '    • Checkout',
  '    • UserProfile',
  '',
  '🔄 Setting up State Management:',
  '  ✓ store/',
  '    • productSlice',
  '    • cartSlice',
  '    • userSlice',
  '',
  '✨ Finalizing Setup:',
  '  ✓ Added animations and transitions',
  '  ✓ Implemented responsive design',
  '  ✓ Generated API routes',
  '  ✓ Added TypeScript types',
  '',
  '🚀 Project ready! Start with:',
  '  $ cd e-commerce-app',
  '  $ npm run dev',
];

const defaultPreview = `// Generated ProductGrid.tsx
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { Product } from '@/types';

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const productVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProductGrid() {
  const products = useSelector((state) => state.products.items);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={productVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="aspect-w-3 aspect-h-2">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold">\${product.price}</span>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="px-4 py-2 bg-primary text-white rounded-lg
                hover:bg-primary-dark transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}`;

const demoPrompts = {
  'web-app': 'Create a modern e-commerce product page with image gallery',
  'mobile-app':
    'Generate a React Native social feed screen with infinite scroll',
  dashboard: 'Build an analytics dashboard with real-time charts',
  api: 'Create a RESTful API for user authentication and profile management',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState('web-app');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectType: activeDemo,
          description: demoPrompts[activeDemo as keyof typeof demoPrompts],
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
      console.error('Generation error:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate code'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="demo" className="mt-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text"
        >
          See It In Action
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-xl text-light-darker">
          Watch how Incepto NX transforms prompts into production-ready code
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-primary/20 p-4">
            <div className="flex space-x-4">
              {Object.keys(demoPrompts).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveDemo(type);
                    setGeneratedCode(null);
                    setError(null);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeDemo === type
                      ? 'bg-primary text-dark-darker'
                      : 'text-light-darker hover:text-primary'
                  }`}
                >
                  {type
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="flex space-x-6">
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Prompt</h3>
                  <div className="bg-dark-darker rounded-lg p-4 font-mono text-sm">
                    {demoPrompts[activeDemo as keyof typeof demoPrompts]}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-dark-darker font-medium shadow-glow hover:shadow-glow-strong transition-shadow disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate Code'}
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Preview</h3>
                <div className="bg-dark-darker rounded-lg overflow-hidden border border-primary/20">
                  {error ? (
                    <div className="p-4 text-red-500">
                      <p className="font-medium">Error generating code:</p>
                      <p className="mt-2">{error}</p>
                    </div>
                  ) : generatedCode ? (
                    <MonacoEditor
                      height="400px"
                      language={
                        activeDemo === 'api' ? 'javascript' : 'typescript'
                      }
                      theme="vs-dark"
                      value={generatedCode}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        folding: true,
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 3,
                      }}
                    />
                  ) : (
                    <div className="h-[400px] flex items-center justify-center text-light-darker text-center">
                      <div>
                        <div className="text-4xl mb-4">✨</div>
                        <p>Click "Generate Code" to see the magic happen</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
