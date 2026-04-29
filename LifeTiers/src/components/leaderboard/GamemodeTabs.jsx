import React from 'react';

const GAMEMODES = [
  { id: 'all', name: 'Overall' },
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'cart', name: 'Cart' },
  { id: 'uhc', name: 'UHC' },
  { id: 'dia_pot', name: 'Dia Pot' },
  { id: 'neth_pot', name: 'Neth Pot' },
  { id: 'sword', name: 'Sword' },
  { id: 'axe', name: 'Axe' },
  { id: 'dia_smp', name: 'Dia SMP' },
  { id: 'neth_smp', name: 'SMP' },
  { id: 'mace', name: 'Mace' },
  { id: 'spear_mace', name: 'Spear Mace' },
];

export { GAMEMODES };

const GAMEMODE_ICONS = {
  all: 'https://mctiers.com/tier_icons/overall.svg',
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
};

export { GAMEMODE_ICONS };

export default function GamemodeTabs({ activeGamemode, onGamemodeChange }) {
  return (
    <div className="w-full" style={{ borderBottom: '1px solid #2a2d3a' }}>
      <div className="flex overflow-x-auto scrollbar-hide">
        {GAMEMODES.map((mode) => {
          const iconUrl = GAMEMODE_ICONS[mode.id];
          const isActive = activeGamemode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onGamemodeChange(mode.id)}
              className="flex flex-col items-center justify-center gap-1 flex-shrink-0 cursor-pointer transition-colors duration-150"
              style={{
                padding: '12px 20px',
                borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={mode.name}
                  width={24}
                  height={24}
                  className="object-contain"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#2a2d3a]" />
              )}
              <span
                className="font-medium leading-tight text-center"
                style={{
                  fontSize: '11px',
                  color: isActive ? '#ffffff' : '#8b8fa8',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {mode.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}