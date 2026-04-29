import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Leaderboard from '../components/leaderboard/Leaderboard';
import GamemodeTabs from '../components/leaderboard/GamemodeTabs';
import ServerInfo from '../components/sidebar/ServerInfo';

export default function Rankings() {
  const [activeGamemode, setActiveGamemode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list(),
    initialData: [],
  });

  useEffect(() => {
    const handler = (e) => setSearchQuery(e.detail || '');
    window.addEventListener('navPlayerSearch', handler);
    return () => window.removeEventListener('navPlayerSearch', handler);
  }, []);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0f1117' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Rankings</h1>
          <p className="text-sm" style={{ color: '#8b8fa8' }}>{players.length} players ranked</p>
        </div>
        <ServerInfo />
      </div>

      {/* Gamemode Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <GamemodeTabs activeGamemode={activeGamemode} onGamemodeChange={setActiveGamemode} />
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Leaderboard
          players={players}
          isLoading={isLoading}
          activeGamemode={activeGamemode}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}