import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  {
    icon: '🚀',
    title: 'AI Code Generation',
    description:
      'Transform natural language into production-ready code with advanced AI models.',
  },
  {
    icon: '📊',
    title: 'Smart Analytics',
    description:
      'Real-time insights into your generated code quality and performance metrics.',
  },
  {
    icon: '🎨',
    title: 'Modern UI Components',
    description:
      'Automatically generate beautiful, responsive UI components with best practices.',
  },
  {
    icon: '⚡',
    title: 'Instant Prototyping',
    description:
      'Create full-stack applications in minutes instead of days or weeks.',
  },
  {
    icon: '🔄',
    title: 'Version Control',
    description:
      'Track and manage different versions of your generated code seamlessly.',
  },
  {
    icon: '🛠️',
    title: 'Custom Templates',
    description:
      'Choose from various project templates or create your own custom blueprints.',
  },
];

const stats = [
  {
    value: '10.15%',
    change: '+5.6%',
    label: 'Code Generation Speed',
  },
  {
    value: '35.6K',
    change: '-2.5%',
    label: 'Lines Generated',
  },
  {
    value: '59.8K',
    change: '+10.7%',
    label: 'Components Created',
  },
];

const trustedBy = [
  { name: 'Acme Corp', logo: '/logos/acme.svg' },
  { name: 'Pulse', logo: '/logos/pulse.svg' },
  { name: 'Quantum', logo: '/logos/quantum.svg' },
  { name: 'Echo Valley', logo: '/logos/echo-valley.svg' },
  { name: 'Outside', logo: '/logos/outside.svg' },
  { name: 'Apex', logo: '/logos/apex.svg' },
  { name: 'Celestial', logo: '/logos/celestial.svg' },
  { name: '2TWICE', logo: '/logos/2twice.svg' },
];

export default function Landing() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-dark-darker text-light">
      <Head>
        <title>Incepto NX - AI-Powered App Generation</title>
        <meta
          name="description"
          content="Transform your ideas into production-ready applications with AI"
        />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-darker/80 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-primary font-display text-2xl font-bold">
                  Incepto
                </span>
                <span className="text-secondary text-2xl font-bold">NX</span>
              </Link>
            </div>
            <Link
              href="/app"
              className="px-6 py-2 bg-primary text-dark-darker rounded-lg hover:bg-primary-dark transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="inline-block mb-6">
              <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-wider text-primary">
                  Latest integration just arrived
                </span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent animate-gradient-x">
                Build your next app
                <br />
                with AI power.
              </span>
            </h1>
            <p className="text-xl text-light-darker max-w-3xl mx-auto mb-8">
              Transform your ideas into production-ready applications
              effortlessly with AI, where smart technology meets
              developer-friendly tools.
            </p>
            <Link
              href="/app"
              className="inline-block px-8 py-4 bg-primary text-dark font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)]"
            >
              Start for free
            </Link>
            <p className="mt-4 text-light-darker">
              No credit card required · 7-days free trial
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card rounded-2xl p-8 mb-32"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center relative">
                  <div className="absolute inset-0 bg-white/5 rounded-lg transform -skew-y-2" />
                  <div className="relative">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-primary">
                        {stat.value}
                      </span>
                      <span
                        className={`${
                          stat.change.startsWith('+')
                            ? 'text-green-400'
                            : 'text-red-400'
                        } font-medium`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-light-darker mt-2">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-light-darker">
            Everything you need to build production-ready applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2 text-primary">
                  {feature.title}
                </h3>
                <p className="text-light-darker">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Trusted by innovative teams
            </span>
          </h2>
          <p className="text-xl text-light-darker">
            Join the community of developers building the future
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustedBy.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative glass-card rounded-xl p-6 flex items-center justify-center border border-primary/20 bg-gradient-to-br from-dark-darker/50 to-dark-darker/30 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {company.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
          <div className="relative glass-card rounded-2xl p-12 text-center border border-primary/20 bg-gradient-to-br from-dark-darker/50 to-dark-darker/30 backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                Start building with AI today
              </span>
            </h2>
            <p className="text-xl text-light-darker mb-8">
              Join thousands of developers using Incepto NX to build better
              applications faster
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-dark-input border border-white/10 text-white placeholder-white/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors backdrop-blur-sm"
              />
              <Link
                href="/app"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-dark-darker rounded-lg hover:opacity-90 transition-all duration-200 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)]"
              >
                Get Started
              </Link>
            </div>
            <p className="mt-4 text-light-darker">
              No credit card required · 7-days free trial
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
