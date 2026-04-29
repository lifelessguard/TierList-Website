import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const GAMEMODES = [
  { id: 'vanilla', name: 'Vanilla', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/a4ffd93c1_vanilla1.png' },
  { id: 'cart', name: 'Cart', icon: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/1b28b8e8e_minecart-e4204998.png' },
  { id: 'uhc', name: 'UHC', icon: 'https://mctiers.com/tier_icons/uhc.svg' },
  { id: 'dia_pot', name: 'Dia Pot', icon: 'https://mctiers.com/tier_icons/pot.svg' },
  { id: 'neth_pot', name: 'Neth Pot', icon: 'https://mctiers.com/tier_icons/nethop.svg' },
  { id: 'sword', name: 'Sword', icon: 'https://mctiers.com/tier_icons/sword.svg' },
  { id: 'axe', name: 'Axe', icon: 'https://mctiers.com/tier_icons/axe.svg' },
  { id: 'dia_smp', name: 'Dia SMP', icon: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/d6f161163_dia_smp-523efa38.png' },
  { id: 'neth_smp', name: 'SMP', icon: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/9c7b83259_smp.png' },
  { id: 'mace', name: 'Mace', icon: 'https://mctiers.com/tier_icons/mace.svg' },
  { id: 'spear_mace', name: 'Spear Mace', icon: 'https://media.base44.com/images/public/69c694fceabd90a23b1873c9/b6e3289ce_Untitled4x.png' },
];

const TIERS = ['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5'];
const RETIRED_TIERS = ['RHT1', 'RLT1', 'RHT2', 'RLT2', 'RHT3', 'RLT3', 'RHT4', 'RLT4', 'RHT5', 'RLT5'];

export default function TierSelector({ formData, handleTierChange }) {
  const [searchTier, setSearchTier] = useState('');
  const [selectedTier, setSelectedTier] = useState(null);
  const [showKitDialog, setShowKitDialog] = useState(false);

  const filteredTiers = TIERS.filter(tier => 
    tier.toLowerCase().includes(searchTier.toLowerCase())
  );

  const filteredRetiredTiers = RETIRED_TIERS.filter(tier => 
    tier.toLowerCase().includes(searchTier.toLowerCase())
  );

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
    setShowKitDialog(true);
  };

  const handleKitSelect = (gamemode) => {
    // If selecting a retired tier, clear the regular tier for that gamemode
    if (selectedTier.startsWith('R')) {
      const regularTier = selectedTier.substring(1); // Remove 'R' prefix
      // If the gamemode has the regular version of this tier, remove it
      if (formData.tiers[gamemode] === regularTier) {
        handleTierChange(gamemode, selectedTier);
      } else {
        handleTierChange(gamemode, selectedTier);
      }
    } else {
      // If selecting a regular tier, clear any retired version
      const retiredTier = 'R' + selectedTier;
      handleTierChange(gamemode, selectedTier);
    }
    setShowKitDialog(false);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={searchTier}
            onChange={(e) => setSearchTier(e.target.value)}
            className="pl-9 bg-slate-900/50 border-slate-700 text-white"
            placeholder="Search tier (e.g. LT1, RHT2)..."
          />
        </div>

        {/* Tiers Grid - Two Columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Regular Tiers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Regular Tiers</h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredTiers.map(tier => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleTierClick(tier)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-white text-sm font-medium transition-colors"
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Retired Tiers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Retired Tiers</h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredRetiredTiers.map(tier => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleTierClick(tier)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-white text-sm font-medium transition-colors"
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gamemodes with Tier Selection */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {GAMEMODES.map(gamemode => {
            const currentTier = formData.tiers[gamemode.id];
            const isRetired = currentTier?.startsWith('R');
            const regularTier = isRetired ? currentTier.substring(1) : currentTier;
            const tierPoints = currentTier ? (
              isRetired ? 
                { HT1: 60, LT1: 45, HT2: 30, LT2: 20, HT3: 10, LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1 }[regularTier] :
                { HT1: 60, LT1: 45, HT2: 30, LT2: 20, HT3: 10, LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1 }[currentTier]
            ) : null;

            return (
              <div key={gamemode.id} className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                <img 
                  src={gamemode.icon} 
                  alt={gamemode.name}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm text-slate-300 w-24">{gamemode.name}</span>

                {isRetired ? (
                  <div className="flex-1 flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 border border-slate-700">
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">Retired {regularTier}</div>
                      <div className="text-slate-400 text-xs">{tierPoints} points</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleTierChange(gamemode.id, regularTier)}
                        className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-xs font-bold text-white"
                        title={`Change to ${regularTier}`}
                      >
                        {regularTier}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTierChange(gamemode.id, 'none')}
                        className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-400"
                        title="Remove tier"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex gap-1 overflow-x-auto scrollbar-hide">
                    <button
                      type="button"
                      onClick={() => handleTierChange(gamemode.id, 'none')}
                      className={`px-2 py-1 text-xs rounded ${
                        !formData.tiers[gamemode.id]
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-800/50 text-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      None
                    </button>
                    {TIERS.map(tier => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => handleTierChange(gamemode.id, tier)}
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          formData.tiers[gamemode.id] === tier
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Kit Selection Dialog */}
      <Dialog open={showKitDialog} onOpenChange={setShowKitDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Kit for {selectedTier}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {GAMEMODES.map(gamemode => (
              <button
                key={gamemode.id}
                type="button"
                onClick={() => handleKitSelect(gamemode.id)}
                className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 border border-slate-700 hover:border-emerald-500 transition-all"
              >
                <img 
                  src={gamemode.icon} 
                  alt={gamemode.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm text-slate-300 font-medium">{gamemode.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}