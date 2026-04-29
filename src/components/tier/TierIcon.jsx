import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TIER_POINTS_MAP = {
  HT1: 60, LT1: 45, HT2: 30, LT2: 20,
  HT3: 10, LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1,
};

const GAMEMODE_NAMES = {
  vanilla: 'Vanilla',
  cart: 'Cart',
  uhc: 'UHC',
  dia_pot: 'Dia Pot',
  neth_pot: 'Neth Pot',
  sword: 'Sword',
  axe: 'Axe',
  dia_smp: 'Dia SMP',
  neth_smp: 'SMP',
  mace: 'Mace',
  spear_mace: 'Spear Mace',
};

const TIER_COLORS = {
  HT1: '#f59e0b', LT1: '#f97316',
  HT2: '#eab308', LT2: '#facc15',
  HT3: '#22c55e', LT3: '#14b8a6',
  HT4: '#a855f7', LT4: '#c084fc',
  HT5: '#64748b', LT5: '#6b7280',
};

const TIER_PILL_COLORS = {
  HT1: { bg: '#D0B850', text: '#5C4A00', ring: '#D0B850' },
  LT1: { bg: '#A89B5C', text: '#3A2E00', ring: '#A89B5C' },
  HT2: { bg: '#C1CFE4', text: '#1A2F50', ring: '#C1CFE4' },
  LT2: { bg: '#8E939F', text: '#1A1E2E', ring: '#8E939F' },
  HT3: { bg: '#DD935D', text: '#5C2A00', ring: '#DD935D' },
  LT3: { bg: '#6B6070', text: '#1A1020', ring: '#6B6070' },
  HT4: { bg: '#C5C0CD', text: '#3A2A50', ring: '#C5C0CD' },
  LT4: { bg: '#615E73', text: '#120F1E', ring: '#615E73' },
  HT5: { bg: '#7E7996', text: '#1A1530', ring: '#7E7996' },
  LT5: { bg: '#5E596F', text: '#100D1A', ring: '#5E596F' },
};

// DO NOT CHANGE THESE ICON URLs
const GAMEMODE_ICONS = {
  crystal_smp: 'https://mctiers.com/tier_icons/smp.svg',
  cart: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/1b28b8e8e_minecart-e4204998.png',
  uhc: 'https://mctiers.com/tier_icons/uhc.svg',
  dia_pot: 'https://mctiers.com/tier_icons/pot.svg',
  neth_pot: 'https://mctiers.com/tier_icons/nethop.svg',
  sword: 'https://mctiers.com/tier_icons/sword.svg',
  axe: 'https://mctiers.com/tier_icons/axe.svg',
  dia_smp: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/d6f161163_dia_smp-523efa38.png',
  neth_smp: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/9c7b83259_smp.png',
  vanilla: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/a4ffd93c1_vanilla1.png',
  mace: 'https://mctiers.com/tier_icons/mace.svg',
  spear_mace: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/b6e3289ce_Untitled4x.png',
  ely_spear: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/691405e51_image.png',
};

export const getTierPoints = (tier) => {
  if (!tier) return 0;
  const base = tier.startsWith('R') ? tier.slice(1) : tier;
  return TIER_POINTS_MAP[base] || 0;
};

export const calculateTotalPoints = (tiers) => {
  if (!tiers) return 0;
  return Object.values(tiers).reduce((sum, tier) => sum + getTierPoints(tier), 0);
};

export const getTitle = (points) => {
  if (points >= 400) return { label: 'Combat Grandmaster', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/b6e2eaf7f_combat_grandmaster-1.png' };
  if (points >= 250) return { label: 'Combat Master', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/c5d57ca05_combat_master-1.png' };
  if (points >= 100) return { label: 'Combat Ace', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/08da6228b_combat_ace.png' };
  if (points >= 50)  return { label: 'Combat Specialist', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/a0aa2b148_combat_specialist.png' };
  if (points >= 20)  return { label: 'Combat Cadet', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/3005339fa_combat_cadet.png' };
  if (points >= 10)  return { label: 'Combat Novice', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/31b9d77d9_combat_novice.png' };
  return               { label: 'Rookie', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/52c0a3d83_rookie.png' };
};

export const TIER_CONFIG = {
  HT1: { points: 60, label: 'High Tier 1' },
  LT1: { points: 45, label: 'Low Tier 1' },
  HT2: { points: 30, label: 'High Tier 2' },
  LT2: { points: 20, label: 'Low Tier 2' },
  HT3: { points: 10, label: 'High Tier 3' },
  LT3: { points: 6,  label: 'Low Tier 3' },
  HT4: { points: 4,  label: 'High Tier 4' },
  LT4: { points: 3,  label: 'Low Tier 4' },
  HT5: { points: 2,  label: 'High Tier 5' },
  LT5: { points: 1,  label: 'Low Tier 5' },
};

export { GAMEMODE_ICONS };

const CIRCLE_SIZES = {
  xs: { size: 44, icon: 30, text: 'text-[9px]' },
  sm: { size: 40, icon: 20, text: 'text-[10px]' },
  md: { size: 44, icon: 22, text: 'text-[10px]' },
  lg: { size: 56, icon: 30, text: 'text-xs' },
};

export default function TierIcon({ tier, gamemode, size = 'sm', showPill = false }) {
  const s = CIRCLE_SIZES[size] || CIRCLE_SIZES.sm;
  const isRetired = tier && tier.startsWith('R');
  const baseTier = isRetired ? tier.substring(1) : tier;
  const pillColors = TIER_PILL_COLORS[baseTier];
  const gamemodeIcon = gamemode ? GAMEMODE_ICONS[gamemode] : null;

  const circleStyle = {
    width: s.size,
    height: s.size,
    borderRadius: '50%',
    background: '#0f1117',
    border: showPill && pillColors ? `2px solid ${pillColors.ring}` : '1px solid #2a2d3a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isRetired ? 0.5 : 1,
    flexShrink: 0,
  };

  if (!tier) {
    return (
      <div className="flex flex-col items-center" style={{ gap: 3 }}>
        <div style={{ ...circleStyle, border: '1px solid #2a2d3a', opacity: 1 }}>
          {gamemodeIcon && (
            <img src={gamemodeIcon} alt={gamemode} width={s.icon} height={s.icon} className="object-contain" />
          )}
        </div>
        <span className={`${s.text} font-bold`} style={{ color: '#8b8fa8' }}>-</span>
      </div>
    );
  }

  const badge = showPill && pillColors ? (
    <div style={{
      background: pillColors.bg,
      color: pillColors.text,
      borderRadius: 8,
      width: 34,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 9,
      fontWeight: 700,
      marginTop: 3,
      flexShrink: 0,
      opacity: isRetired ? 0.5 : 1,
    }}>
      {tier}
    </div>
  ) : (
    <span className={`${s.text} font-bold`} style={{ color: pillColors?.ring || '#8b8fa8', opacity: isRetired ? 0.5 : 1 }}>
      {tier}
    </span>
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center cursor-pointer transition-transform duration-150 hover:scale-110" style={{ gap: 3 }}>
            <div style={circleStyle}>
              {gamemodeIcon && (
                <img src={gamemodeIcon} alt={gamemode} width={s.icon} height={s.icon} className="object-contain" />
              )}
            </div>
            {badge}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-[#161924] border-[#2a2d3a] text-white px-3 py-2">
          <div className="text-center">
            <p className="font-bold text-sm" style={{ color: pillColors?.ring || '#8b8fa8' }}>{tier}</p>
            {gamemode && <p className="text-xs" style={{ color: '#8b8fa8' }}>{GAMEMODE_NAMES[gamemode] || gamemode.replace(/_/g, ' ')}</p>}
            <p className="font-semibold mt-1" style={{ color: '#f59e0b' }}>{getTierPoints(tier)} points</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}