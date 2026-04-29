import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ExternalLink } from 'lucide-react';
import TierIcon, { calculateTotalPoints, getTitle } from '../tier/TierIcon';

const REGION_FULL = {
  EU:  'Europe',
  NA:  'North America',
  AS:  'Asia',
  OCE: 'Oceania',
  OC:  'Oceania',
  SA:  'South America',
  AF:  'Africa',
};

const GAMEMODE_ORDER = ['vanilla', 'cart', 'uhc', 'dia_pot', 'neth_pot', 'sword', 'axe', 'dia_smp', 'neth_smp', 'mace', 'spear_mace', 'ely_spear'];

export default function PlayerProfileModal({ player, open, onOpenChange, rank }) {
  if (!player) return null;

  const totalPoints = calculateTotalPoints(player.tiers);
  const title = getTitle(totalPoints);
  const avatarUrl = player.avatar_url || `https://mc-heads.net/avatar/${player.username}/80`;
  const regionName = REGION_FULL[player.region] || player.region || 'Unknown';

  const rankIcon = () => {
    if (rank === 1) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/af260724d_tier_1.png" width="28" height="28" alt="#1" />;
    if (rank === 2) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/4bd3419d3_tier_2.png" width="28" height="28" alt="#2" />;
    if (rank === 3) return <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/2386bddf4_tier_3.png" width="28" height="28" alt="#3" />;
    return (
      <div className="bg-[#1e2130] rounded px-2 py-1 text-white font-bold text-sm">{rank}.</div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden text-white"
        style={{
          maxWidth: 420,
          background: '#161924',
          border: '1px solid #2a2d3a',
          borderRadius: 16,
        }}
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-10 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          style={{ background: '#1e2130', color: '#8b8fa8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#8b8fa8'}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: 88, height: 88, border: '3px solid #f59e0b', background: '#0f1117' }}
          >
            <img
              src={avatarUrl}
              alt={player.username}
              width="88"
              height="88"
              style={{ imageRendering: 'pixelated', display: 'block' }}
            />
          </div>

          {/* Username */}
          <h2 className="text-2xl font-bold text-white tracking-wide">{player.username}</h2>

          {/* Title badge — gold pill */}
          <div
            className="flex items-center gap-2 px-5 py-2 rounded-full"
            style={{ background: 'linear-gradient(90deg, #b45309, #d97706)', border: '1px solid #f59e0b' }}
          >
            <img
              src={title.icon}
              width="18"
              height="18"
              alt={title.label}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-white font-bold text-sm">{title.label}</span>
          </div>

          {/* Region */}
          <p className="text-sm" style={{ color: '#8b8fa8' }}>{regionName}</p>

          {/* NameMC */}
          <a
            href={`https://namemc.com/profile/${player.username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm transition-colors"
            style={{ border: '1px solid #2a2d3a', color: '#8b8fa8', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#8b8fa8'}
          >
            <span
              className="w-4 h-4 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: '#2a2d3a', color: '#fff' }}
            >n</span>
            <span>NameMC</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: '#2a2d3a' }} />

          {/* Position */}
          <div className="w-full">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#8b8fa8' }}>Position</p>
            <div
              className="flex items-center gap-3 rounded-lg overflow-hidden"
              style={{ background: '#0f1117', border: '1px solid #2a2d3a' }}
            >
              {/* Gold rank badge */}
              <div
                className="flex items-center justify-center px-4 py-3 flex-shrink-0"
                style={{
                  background: rank <= 3 ? 'linear-gradient(135deg, #b45309, #f59e0b)' : '#1e2130',
                  minWidth: 56,
                }}
              >
                {rank <= 3 ? (
                  <img src={[
                    'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/af260724d_tier_1.png',
                    'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/4bd3419d3_tier_2.png',
                    'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/2386bddf4_tier_3.png',
                  ][rank - 1]} width="28" height="28" alt={`#${rank}`} />
                ) : (
                  <span className="text-white font-bold text-lg">{rank}.</span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-1 px-2 py-3">
                <img
                  src="https://mctiers.com/tier_icons/overall.svg"
                  width="20"
                  height="20"
                  alt="overall"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="font-bold text-white text-sm">OVERALL</span>
                <span className="text-sm font-semibold" style={{ color: '#f59e0b' }}>({totalPoints} points)</span>
              </div>
            </div>
          </div>

          {/* Tiers */}
          <div className="w-full">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#8b8fa8' }}>Tiers</p>
            <div className="rounded-lg p-3" style={{ background: '#0f1117', border: '1px solid #2a2d3a' }}>
              <div className="flex flex-wrap gap-2 justify-start">
                {GAMEMODE_ORDER.filter(gm => player.tiers?.[gm]).map(gm => (
                  <TierIcon key={gm} tier={player.tiers[gm]} gamemode={gm} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}