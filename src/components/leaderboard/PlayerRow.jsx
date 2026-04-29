import React, { useState } from 'react';
import TierIcon, { calculateTotalPoints, getTitle } from '../tier/TierIcon';
import PlayerProfileModal from '../player/PlayerProfileModal';

const TIER_ORDER = ['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5'];

const REGION_COLORS = {
  EU:  '#22c55e',
  NA:  '#ef4444',
  AS:  '#3b82f6',
  SA:  '#eab308',
  OCE: '#14b8a6',
};

export default function PlayerRow({ player, rank, activeGamemode }) {
  const [showModal, setShowModal] = useState(false);

  const totalPoints = calculateTotalPoints(player.tiers);
  const title = getTitle(totalPoints);
  const avatarUrl = player.avatar_url || `https://mc-heads.net/avatar/${player.username}/32`;
  const regionColor = REGION_COLORS[player.region] || '#8b8fa8';

  const rankDisplay = () => {
    if (rank === 1) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/af260724d_tier_1.png" width="28" height="28" alt="#1" />;
    if (rank === 2) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/4bd3419d3_tier_2.png" width="28" height="28" alt="#2" />;
    if (rank === 3) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/2386bddf4_tier_3.png" width="28" height="28" alt="#3" />;
    return <span className="text-slate-400 font-bold text-sm w-7 text-center">{rank}</span>;
  };

  const tiersToShow = activeGamemode === 'all'
    ? Object.entries(player.tiers || {})
        .filter(([, tier]) => tier)
        .sort(([, a], [, b]) => {
          const aRetired = a.startsWith('R');
          const bRetired = b.startsWith('R');
          if (aRetired !== bRetired) return aRetired ? 1 : -1;
          const ai = TIER_ORDER.indexOf(aRetired ? a.slice(1) : a);
          const bi = TIER_ORDER.indexOf(bRetired ? b.slice(1) : b);
          return ai - bi;
        })
        .map(([gm]) => gm)
    : [activeGamemode];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full text-left p-4 rounded-xl transition-all group"
        style={{ background: '#161924', border: '1px solid #2a2d3a' }}
        onMouseEnter={e => e.currentTarget.style.background = '#1e2130'}
        onMouseLeave={e => e.currentTarget.style.background = '#161924'}
      >
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="w-8 flex items-center justify-center flex-shrink-0">
            {rankDisplay()}
          </div>

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={player.username}
              className="w-10 h-10 rounded-lg"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Name & Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold truncate">{player.username}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: `${regionColor}20`, color: regionColor, border: `1px solid ${regionColor}40` }}>
                {player.region}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <img src={title.icon} alt={title.label} width={14} height={14} className="object-contain" onError={e => { e.target.style.display = 'none'; }} />
              <span className="text-xs" style={{ color: '#8b8fa8' }}>{title.label}</span>
              <span className="text-xs font-semibold" style={{ color: '#f59e0b' }}>• {totalPoints} pts</span>
            </div>
          </div>

          {/* Tiers */}
          <div className="hidden md:flex items-center gap-2 flex-wrap flex-shrink-0">
            {tiersToShow.map(gm => (
              <TierIcon key={gm} tier={player.tiers?.[gm]} gamemode={gm} size="sm" showPill />
            ))}
          </div>
        </div>
      </button>

      <PlayerProfileModal
        player={player}
        open={showModal}
        onOpenChange={setShowModal}
        rank={rank}
      />
    </>
  );
}