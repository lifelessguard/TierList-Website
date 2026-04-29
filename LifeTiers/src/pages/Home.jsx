import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Trophy, Users, Swords, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: Trophy,
      title: 'Global Rankings',
      description: 'Compete with the best players worldwide across multiple gamemodes',
      color: 'from-yellow-500 to-orange-500',
      shadowColor: 'shadow-yellow-500/20'
    },
    {
      icon: Users,
      title: 'Player Profiles',
      description: 'Track your progress and showcase your achievements',
      color: 'from-cyan-500 to-blue-500',
      shadowColor: 'shadow-cyan-500/20'
    },
    {
      icon: Swords,
      title: '12 Gamemodes',
      description: 'From Dia SMP to UHC, prove yourself in every style of combat',
      color: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/20'
    },
  ];

  const gamemodes = [
    'Vanilla', 'Dia SMP', 'Neth SMP', 'Ely Mace', 'Mace', 'Sword', 'Axe',
    'Dia Pot', 'Neth Pot', 'Cart', 'Spear Mace', 'UHC'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">The Ultimate PvP Ranking System</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Climb the</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Leaderboards
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Track your rankings, earn tiers, and compete with the best Minecraft PvP players across 12 different gamemodes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={createPageUrl('Rankings')}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-emerald-500/25"
                >
                  View Rankings
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Docs')}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg ${feature.shadowColor} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamemodes Grid */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">12 Competitive Gamemodes</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Each gamemode has its own unique ranking system and tier progression</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gamemodes.map((mode, index) => (
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 text-center hover:border-emerald-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <Zap className="w-6 h-6 mx-auto mb-2 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{mode}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier System Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tier System</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Earn points for each tier achieved and climb the global rankings</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { tier: 'Tier 1', ht: 60, lt: 45, color: 'from-yellow-400 to-amber-500' },
              { tier: 'Tier 2', ht: 30, lt: 20, color: 'from-pink-500 to-rose-600' },
              { tier: 'Tier 3', ht: 10, lt: 6, color: 'from-amber-600 to-orange-700' },
              { tier: 'Tier 4', ht: 4, lt: 3, color: 'from-cyan-500 to-blue-600' },
              { tier: 'Tier 5', ht: 2, lt: 1, color: 'from-slate-600 to-slate-700' },
            ].map((item, index) => (
              <motion.div
                key={item.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`} />
                <h3 className="text-lg font-bold text-white mb-2">{item.tier}</h3>
                <p className="text-sm text-slate-400">HT: {item.ht} pts</p>
                <p className="text-sm text-slate-400">LT: {item.lt} pts</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl border border-emerald-500/20 p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Compete?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join our community and start climbing the leaderboards today.
            </p>
            <Link to={createPageUrl('Rankings')}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-8 py-6 text-lg"
              >
                View Rankings
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}