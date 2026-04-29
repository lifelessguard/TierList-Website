import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TierIcon, { calculateTotalPoints, getTierPoints, TIER_CONFIG } from '../components/tier/TierIcon';
import { GAMEMODES } from '../components/leaderboard/GamemodeTabs';
import { ArrowLeft, Globe, Trophy, Award } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const REGION_INFO = {
  EU: { name: 'Europe', color: 'from-blue-500 to-blue-600' },
  NA: { name: 'North America', color: 'from-red-500 to-red-600' },
  AS: { name: 'Asia', color: 'from-yellow-500 to-yellow-600' },
  OCE: { name: 'Oceania', color: 'from-purple-500 to-purple-600' },
  SA: { name: 'South America', color: 'from-green-500 to-green-600' },
};

export default function PlayerProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerId = urlParams.get('id');

  const { data: player, isLoading } = useQuery({
    queryKey: ['player', playerId],
    queryFn: async () => {
      const players = await base44.entities.Player.filter({ id: playerId });
      return players[0];
    },
    enabled: !!playerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full rounded-2xl bg-slate-800" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-20 w-full rounded-xl bg-slate-800" />
            <Skeleton className="h-20 w-full rounded-xl bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Player not found</h1>
          <Link to={createPageUrl('Rankings')}>
            <Button>Back to Rankings</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPoints = calculateTotalPoints(player.tiers);
  const avatarUrl = player.avatar_url || `https://mc-heads.net/avatar/${player.username}/128`;
  const regionInfo = REGION_INFO[player.region] || REGION_INFO.EU;

  // Calculate points per gamemode
  const gamemodePoints = GAMEMODES.filter(g => g.id !== 'all').map(gamemode => {
    const tier = player.tiers?.[gamemode.id];
    return {
      ...gamemode,
      tier,
      points: tier ? getTierPoints(tier) : 0,
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to={createPageUrl('Rankings')} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Rankings
        </Link>

        {/* Profile Header */}
        <div className="relative bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${regionInfo.color} opacity-10`} />
          
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={player.username}
                  className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-slate-700"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{player.username}</h1>
                  <Badge className={`bg-gradient-to-r ${regionInfo.color} text-white border-0`}>
                    <Globe className="w-3 h-3 mr-1" />
                    {player.region}
                  </Badge>
                </div>
                
                <p className="text-xl text-emerald-400 font-semibold mb-4">
                  {player.rank_title || 'Combat Initiate'}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {totalPoints}
                    </p>
                    <p className="text-sm text-slate-400">Total Points</p>
                  </div>
                  <div className="w-px h-12 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">
                      {Object.keys(player.tiers || {}).length}
                    </p>
                    <p className="text-sm text-slate-400">Tiers Earned</p>
                  </div>
                  <div className="w-px h-12 bg-slate-700" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">
                      {Object.values(player.tiers || {}).filter(t => t.startsWith('HT')).length}
                    </p>
                    <p className="text-sm text-slate-400">High Tiers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Tiers Display */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Earned Tiers
              </h3>
              <div className="flex flex-wrap gap-3">
                {player.tiers && Object.entries(player.tiers).map(([gamemode, tier]) => (
                  <TierIcon key={gamemode} tier={tier} gamemode={gamemode} size="md" />
                ))}
                {(!player.tiers || Object.keys(player.tiers).length === 0) && (
                  <p className="text-slate-400">No tiers earned yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gamemode Breakdown */}
        <div className="mt-8 bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Gamemode Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {gamemodePoints.map((gm) => {
              const Icon = gm.icon;
              return (
                <div 
                  key={gm.id} 
                  className={`p-4 rounded-lg border ${gm.tier ? 'bg-slate-900/50 border-slate-700/50' : 'bg-slate-900/20 border-slate-800/50 opacity-50'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">{gm.name}</span>
                  </div>
                  {gm.tier ? (
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">{gm.tier}</span>
                      <span className="text-emerald-400 text-sm">{gm.points} pts</span>
                    </div>
                  ) : (
                    <span className="text-slate-500 text-sm">No tier</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}