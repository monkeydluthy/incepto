import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SolanaStudio() {
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    features: '',
    walletIntegration: 'phantom',
  });

  return (
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
                placeholder="Enter your Solana project name"
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
                placeholder="Describe your Solana application..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Features
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-dark-input border border-white/10 text-white placeholder-white/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
                value={projectDetails.features}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    features: e.target.value,
                  })
                }
                placeholder="List the main features of your Solana app..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Wallet Integration
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-dark-input border border-white/10 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
                value={projectDetails.walletIntegration}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    walletIntegration: e.target.value,
                  })
                }
              >
                <option value="phantom">Phantom Wallet</option>
                <option value="solflare">Solflare</option>
                <option value="slope">Slope</option>
                <option value="sollet">Sollet</option>
                <option value="math">Math Wallet</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-lg bg-primary text-dark font-medium text-lg shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] transition-all duration-200"
            >
              Generate Solana Project
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
