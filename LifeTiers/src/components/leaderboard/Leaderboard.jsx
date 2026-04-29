import React, { useState, useMemo } from 'react';
import PlayerRow from './PlayerRow';
import { calculateTotalPoints } from '../tier/TierIcon';
import { ArrowUpDown, Users, Trophy, Medal, Award, ChevronUp } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import PlayerProfileModal from '../player/PlayerProfileModal';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Leaderboard({ players, isLoading, activeGamemode, searchQuery }) {
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...(players || [])];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(player =>
        player.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by gamemode (only show players with a tier in that gamemode)
    if (activeGamemode !== 'all') {
      result = result.filter(player => player.tiers?.[activeGamemode]);
    }

    // Calculate points for sorting
    result = result.map(player => ({
      ...player,
      calculatedPoints: activeGamemode === 'all' 
        ? calculateTotalPoints(player.tiers)
        : calculateTotalPoints({ [activeGamemode]: player.tiers?.[activeGamemode] })
    }));

    // Sort
    result.sort((a, b) => {
      if (sortConfig.key === 'points') {
        return sortConfig.direction === 'desc' 
          ? b.calculatedPoints - a.calculatedPoints 
          : a.calculatedPoints - b.calculatedPoints;
      }
      if (sortConfig.key === 'username') {
        return sortConfig.direction === 'desc'
          ? b.username.localeCompare(a.username)
          : a.username.localeCompare(b.username);
      }
      if (sortConfig.key === 'region') {
        return sortConfig.direction === 'desc'
          ? b.region.localeCompare(a.region)
          : a.region.localeCompare(b.region);
      }
      return 0;
    });

    return result;
  }, [players, searchQuery, activeGamemode, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full bg-slate-700" />
              <Skeleton className="w-12 h-12 rounded-lg bg-slate-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40 bg-slate-700" />
                <Skeleton className="h-4 w-32 bg-slate-700" />
              </div>
              <div className="hidden md:flex gap-2">
                <Skeleton className="w-8 h-8 rounded-lg bg-slate-700" />
                <Skeleton className="w-8 h-8 rounded-lg bg-slate-700" />
                <Skeleton className="w-8 h-8 rounded-lg bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Tier view for specific gamemodes
  if (activeGamemode !== 'all') {
    const tierGroups = {
      HT1: [], LT1: [],
      HT2: [], LT2: [],
      HT3: [], LT3: [],
      HT4: [], LT4: [],
      HT5: [], LT5: [],
      RHT1: [], RLT1: [],
      RHT2: [], RLT2: [],
      RHT3: [], RLT3: [],
      RHT4: [], RLT4: [],
      RHT5: [], RLT5: []
    };

    const REGION_COLORS = {
      EU:  'bg-[#22c55e]',
      NA:  'bg-[#ef4444]',
      AS:  'bg-[#3b82f6]',
      SA:  'bg-[#eab308]',
      OCE: 'bg-[#14b8a6]',
      OC:  'bg-[#14b8a6]',
      AF:  'bg-[#f97316]',
    };

    const REGION_BADGE_COLORS = {
      EU:  'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30',
      NA:  'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30',
      AS:  'bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/30',
      SA:  'bg-[#eab308]/20 text-[#eab308] border-[#eab308]/30',
      OCE: 'bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30',
      OC:  'bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/30',
      AF:  'bg-[#f97316]/20 text-[#f97316] border-[#f97316]/30',
    };

    filteredAndSortedPlayers.forEach(player => {
      const tier = player.tiers?.[activeGamemode];
      if (tier && tierGroups[tier]) {
        tierGroups[tier].push(player);
      }
    });

    const tierConfig = {
      1: { tiers: ['HT1', 'LT1'], label: 'Tier 1', headerBg: '#78450a', trophyIcon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/af260724d_tier_1.png' },
      2: { tiers: ['HT2', 'LT2'], label: 'Tier 2', headerBg: '#3a3f4a', trophyIcon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/4bd3419d3_tier_2.png' },
      3: { tiers: ['HT3', 'LT3'], label: 'Tier 3', headerBg: '#5c3010', trophyIcon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/2386bddf4_tier_3.png' },
      4: { tiers: ['HT4', 'LT4'], label: 'Tier 4', headerBg: '#1e2130', trophyIcon: null },
      5: { tiers: ['HT5', 'LT5'], label: 'Tier 5', headerBg: '#1e2130', trophyIcon: null },
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(tierConfig).map(([tierNum, config]) => {
          const Icon = config.icon;
          const playersInTier = [...tierGroups[config.tiers[0]], ...tierGroups[config.tiers[1]]];
          
          return (
            <div key={tierNum} className="space-y-2">
              {/* Tier Header */}
              <div className="rounded-lg px-4 py-2.5 flex items-center gap-2" style={{ background: config.headerBg }}>
                {config.trophyIcon && (
                  <img src={config.trophyIcon} width={20} height={20} alt={config.label} onError={(e) => { e.target.style.display='none'; }} />
                )}
                <h3 className="font-bold text-white text-base">{config.label}</h3>
              </div>
              
              {/* Players Box */}
              <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="p-2 space-y-1 max-h-[600px] overflow-y-auto">
                  {playersInTier.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">No players</p>
                  ) : (
                    playersInTier.map(player => {
                      const tier = player.tiers?.[activeGamemode];
                      const isHighTier = tier?.startsWith('HT') || tier?.startsWith('RHT');
                      return (
                        <button
                          key={player.id}
                          onClick={() => {
                            setSelectedPlayer({ player, rank: playersInTier.indexOf(player) + 1 });
                            setShowModal(true);
                          }}
                          className="w-full text-left p-2 rounded-lg transition-all relative overflow-visible group" style={{ background: '#161924', border: '1px solid #2a2d3a' }} onMouseEnter={e => e.currentTarget.style.background='#1e2130'} onMouseLeave={e => e.currentTarget.style.background='#161924'}
                        >
                          {/* Region indicator with expand on hover */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${REGION_COLORS[player.region]} transition-all duration-200 group-hover:w-12 rounded-l-lg`} />
                          <div className={`absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-bold ${player.region === 'EU' ? 'text-blue-900' : player.region === 'NA' ? 'text-red-900' : player.region === 'AS' ? 'text-yellow-900' : player.region === 'OCE' ? 'text-purple-900' : 'text-green-900'} z-10`}>
                            {player.region}
                          </div>
                          
                          <div className="flex items-center justify-between gap-2 pl-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <img
                                src={player.avatar_url || `https://mc-heads.net/avatar/${player.username}/32`}
                                alt={player.username}
                                className="w-6 h-6 rounded flex-shrink-0"
                                style={{ imageRendering: 'pixelated' }}
                              />
                              <span className="text-white text-sm font-medium truncate">{player.username}</span>
                            </div>
                            {/* Arrows */}
                            <div className="flex flex-col flex-shrink-0">
                              <ChevronUp className="w-3 h-3 text-slate-400" strokeWidth={3} />
                              {isHighTier && <ChevronUp className="w-3 h-3 text-slate-400 -mt-1.5" strokeWidth={3} />}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {selectedPlayer && (
          <PlayerProfileModal
            player={selectedPlayer.player}
            open={showModal}
            onOpenChange={setShowModal}
            rank={selectedPlayer.rank}
          />
        )}
      </div>
    );
  }

  // Default list view for "all" gamemode
  return (
    <>
      <div className="space-y-3">
        {filteredAndSortedPlayers.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No players found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredAndSortedPlayers.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              rank={index + 1}
              activeGamemode={activeGamemode}
            />
          ))
        )}
      </div>
    </>
  );
}