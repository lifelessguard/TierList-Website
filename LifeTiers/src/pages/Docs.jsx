import React, { useState } from 'react';
import { Book, ChevronRight, Trophy, Star, Zap, Award } from 'lucide-react';
import { TIER_CONFIG } from '../components/tier/TierIcon';
import { GAMEMODES } from '../components/leaderboard/GamemodeTabs';
import TierIcon from '../components/tier/TierIcon';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
  { id: 'overview', name: 'Overview', icon: Book },
  { id: 'tiers', name: 'Tier System', icon: Trophy },
  { id: 'points', name: 'Points Calculation', icon: Star },
  { id: 'gamemodes', name: 'Gamemodes', icon: Zap },
  { id: 'ranks', name: 'Rank Titles', icon: Award }];


  const rankTitles = [
  { points: 0, title: 'Combat Initiate', color: 'text-slate-400' },
  { points: 50, title: 'Combat Apprentice', color: 'text-emerald-400' },
  { points: 100, title: 'Combat Adept', color: 'text-cyan-400' },
  { points: 200, title: 'Combat Expert', color: 'text-blue-400' },
  { points: 350, title: 'Combat Master', color: 'text-purple-400' },
  { points: 500, title: 'Combat Ace', color: 'text-yellow-400' },
  { points: 750, title: 'Combat Legend', color: 'text-orange-400' },
  { points: 1000, title: 'Combat God', color: 'text-red-400' }];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Book className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Documentation</h1>
            <p className="text-slate-400">Everything you need to know about LifeTiers
</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => {const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${
                        activeSection === section.id ?
                        'bg-emerald-500/20 text-emerald-400' :
                        'text-slate-400 hover:text-white hover:bg-slate-700/50'}`
                        }>
                        
                      <Icon className="w-4 h-4" />
                      {section.name}
                      {activeSection === section.id &&
                        <ChevronRight className="w-4 h-4 ml-auto" />
                        }
                    </button>);

                  })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Section */}
            {activeSection === 'overview' &&
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed">
                    ChaosTiers is the ultimate ranking system for Minecraft PvP. We track player performance 
                    across 12 different gamemodes and assign tiers based on skill level.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    Players earn points for each tier they achieve, and these points are tallied to 
                    create a global ranking. The higher your total points, the higher you rank on the leaderboard.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-emerald-400">11</p>
                      <p className="text-sm text-slate-400">Gamemodes</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-cyan-400">10</p>
                      <p className="text-sm text-slate-400">Tier Levels</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            {/* Tier System Section */}
            {activeSection === 'tiers' &&
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Tier System</h2>
                <p className="text-slate-300 mb-6">
                  Each gamemode has its own tier system with 5 main tiers, each split into High (HT) and Low (LT) variants.
                </p>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((tierNum) => {
                  const htKey = `HT${tierNum}`;
                  const ltKey = `LT${tierNum}`;
                  const htConfig = TIER_CONFIG[htKey];
                  const ltConfig = TIER_CONFIG[ltKey];

                  return (
                    <div key={tierNum} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                        <div className="w-16 text-center">
                          <span className="text-lg font-bold text-white">Tier {tierNum}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <TierIcon tier={htKey} size="md" />
                            <div>
                              <p className="text-sm font-medium text-white">{htConfig.label}</p>
                              <p className="text-xs text-emerald-400">{htConfig.points} points</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <TierIcon tier={ltKey} size="md" />
                            <div>
                              <p className="text-sm font-medium text-white">{ltConfig.label}</p>
                              <p className="text-xs text-emerald-400">{ltConfig.points} points</p>
                            </div>
                          </div>
                        </div>
                      </div>);

                })}
                </div>
              </div>
            }

            {/* Points Section */}
            {activeSection === 'points' &&
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Points Calculation</h2>
                <p className="text-slate-300 mb-6">
                  Points are awarded based on the tier achieved in each gamemode. Higher tiers award more points.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(TIER_CONFIG).map(([tier, config]) =>
                <div key={tier} className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700/50">
                      <TierIcon tier={tier} size="sm" />
                      <p className="text-lg font-bold text-emerald-400 mt-2">{config.points}</p>
                      <p className="text-xs text-slate-400">points</p>
                    </div>
                )}
                </div>
              </div>
            }

            {/* Gamemodes Section */}
            {activeSection === 'gamemodes' &&
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Gamemodes</h2>
                <p className="text-slate-300 mb-6">
                  ChaosTiers tracks performance across 12 different PvP gamemodes.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {GAMEMODES.filter((g) => g.id !== 'all').map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <div key={mode.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-emerald-400" />
                          <span className="text-white font-medium">{mode.name}</span>
                        </div>
                      </div>);

                })}
                </div>
              </div>
            }

            {/* Rank Titles Section */}
            {activeSection === 'ranks' &&
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Rank Titles</h2>
                <p className="text-slate-300 mb-6">
                  Earn prestigious titles by accumulating points across all gamemodes.
                </p>
                
                <div className="space-y-3">
                  {rankTitles.map((rank, index) =>
                <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                      <span className={`font-bold ${rank.color}`}>{rank.title}</span>
                      <span className="text-slate-400">{rank.points}+ points</span>
                    </div>
                )}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}