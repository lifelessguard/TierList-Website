import React, { useState, useRef, useEffect } from 'react';
import { Info, ChevronUp } from 'lucide-react';

const TITLES = [
  { title: 'Combat Grandmaster', color: '#f59e0b', desc: 'Obtained 400+ total points', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/b6e2eaf7f_combat_grandmaster-1.png' },
  { title: 'Combat Master',      color: '#f97316', desc: 'Obtained 250+ total points', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/c5d57ca05_combat_master-1.png' },
  { title: 'Combat Ace',         color: '#ef4444', desc: 'Obtained 100+ total points', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/08da6228b_combat_ace.png' },
  { title: 'Combat Specialist',  color: '#a855f7', desc: 'Obtained 50+ total points',  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/a0aa2b148_combat_specialist.png' },
  { title: 'Combat Cadet',       color: '#818cf8', desc: 'Obtained 20+ total points',  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/3005339fa_combat_cadet.png' },
  { title: 'Combat Novice',      color: '#3b82f6', desc: 'Obtained 10+ total points',  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/31b9d77d9_combat_novice.png' },
  { title: 'Rookie',             color: '#94a3b8', desc: 'Starting rank for players with less than 10 points', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/52c0a3d83_rookie.png' },
];

const TIERS_POINTS = [
  { tier: 'Tier 1', points: [60, 45], gold: true,  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/820a14540_tier_1.png' },
  { tier: 'Tier 2', points: [30, 20], gold: true,  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/fbff26039_tier_2.png' },
  { tier: 'Tier 3', points: [10, 6],  gold: true,  icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/fa59b5621_tier_3.png' },
  { tier: 'Tier 4', points: [4, 3],   gold: false, icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/fbff26039_tier_2.png' },
  { tier: 'Tier 5', points: [2, 1],   gold: false, icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/fbff26039_tier_2.png' },
];

export default function ServerInfo() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('titles');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
        style={{ background: '#1e2130', border: '1px solid #2a2d3a' }}
      >
        <Info className="w-4 h-4 text-slate-400" />
        Information
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
          style={{ width: 320, background: '#1a1d2e', border: '1px solid #2a2d3a', boxShadow: '0 8px 32px #00000066' }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid #2a2d3a' }}>
            {['titles', 'points'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 text-sm font-semibold transition-colors capitalize"
                style={{
                  color: tab === t ? '#fff' : '#8b8fa8',
                  background: tab === t ? '#252840' : 'transparent',
                  borderBottom: tab === t ? '2px solid #f59e0b' : '2px solid transparent',
                }}
              >
                {t === 'titles' ? 'Titles' : 'Points'}
              </button>
            ))}
          </div>

          <div className="p-4 overflow-y-auto" style={{ maxHeight: 420 }}>
            {tab === 'titles' && (
              <>
                <p className="text-xs mb-3" style={{ color: '#8b8fa8' }}>How to obtain Achievement Titles</p>
                <div className="space-y-2">
                  {TITLES.map((t) => (
                    <div key={t.title} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: '#0f1117', border: '1px solid #2a2d3a' }}>
                      <img src={t.icon} alt={t.title} width={28} height={28} className="flex-shrink-0 object-contain" onError={e => { e.target.style.display='none'; }} />
                      <div>
                        <p className="text-sm font-bold" style={{ color: t.color }}>{t.title}</p>
                        <p className="text-xs" style={{ color: '#8b8fa8' }}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'points' && (
              <>
                <p className="text-xs mb-3" style={{ color: '#8b8fa8' }}>How <span style={{ textDecoration: 'underline' }}>ranking points</span> are calculated</p>
                <div className="space-y-3">
                  {TIERS_POINTS.map((t) => {
                    const accentColor = t.gold ? '#f59e0b' : '#94a3b8';
                    return (
                      <div key={t.tier}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <img src={t.icon} alt={t.tier} width={20} height={20} className="object-contain" style={{ filter: t.gold ? 'none' : 'grayscale(1)' }} onError={e => { e.target.style.display='none'; }} />
                          <span className="text-sm font-bold text-white">{t.tier}</span>
                        </div>
                        <div className="flex items-start gap-1 pl-1" style={{ borderLeft: `2px solid ${accentColor}` }}>
                          <div className="flex gap-1.5 pl-2">
                            {t.points.map((pts, i) => (
                              <div key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#0f1117', border: `1px solid #2a2d3a`, color: accentColor }}>
                                <ChevronUp className="w-3 h-3" strokeWidth={3} />
                                {pts} Points
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}