import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Player, Admin, SiteSettings } from '@/api/supabaseClient';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Plus, Trash2, CreditCard as Edit2, LogOut, Users, User, ChevronUp, ChevronDown, Settings, Save } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TierSelector from '../components/admin/TierSelector';

const GAMEMODES = [
  'vanilla', 'cart', 'uhc', 'dia_pot', 'neth_pot',
  'sword', 'axe', 'dia_smp', 'neth_smp', 'mace', 'spear_mace', 'ely_spear'
];

const TIERS = ['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5'];
const REGIONS = ['EU', 'NA', 'AS', 'OCE', 'SA'];

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('players');

  useEffect(() => {
    if (localStorage.getItem('lt_admin_auth') !== 'true') {
      window.location.href = '/Rankings';
      return;
    }
    setAdmin({ username: 'admin' });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lt_admin_auth');
    toast.success('Logged out successfully');
    window.location.href = '/Rankings';
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-400">Welcome, {admin.username}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('players')}
            className={activeTab === 'players' 
              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' 
              : 'bg-slate-800 hover:bg-slate-700'
            }
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Players
          </Button>
          <Button
            onClick={() => setActiveTab('admins')}
            className={activeTab === 'admins' 
              ? 'bg-gradient-to-r from-red-500 to-orange-500' 
              : 'bg-slate-800 hover:bg-slate-700'
            }
          >
            <Shield className="w-4 h-4 mr-2" />
            Manage Admins
          </Button>
          <Button
            onClick={() => setActiveTab('settings')}
            className={activeTab === 'settings' 
              ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
              : 'bg-slate-800 hover:bg-slate-700'
            }
          >
            <Settings className="w-4 h-4 mr-2" />
            Site Settings
          </Button>
          <Button
            onClick={() => setActiveTab('discord')}
            className={activeTab === 'discord' 
              ? 'bg-gradient-to-r from-indigo-500 to-blue-600' 
              : 'bg-slate-800 hover:bg-slate-700'
            }
          >
            <img src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/93b690db8_discord.png" alt="Discord" className="w-4 h-4 mr-2 object-contain" />
            Discord Settings
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'players' && <PlayersManager />}
        {activeTab === 'admins' && <AdminsManager currentAdmin={admin} />}
        {activeTab === 'settings' && <SiteSettingsManager />}
        {activeTab === 'discord' && <DiscordSettingsManager />}
      </div>
    </div>
  );
}

function PlayersManager() {
  const queryClient = useQueryClient();
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const allPlayers = await Player.list();
      return allPlayers.map(player => ({
        ...player,
        totalPoints: calculatePlayerPoints(player.tiers || {})
      })).sort((a, b) => b.totalPoints - a.totalPoints);
    },
    initialData: [],
  });

  const calculatePlayerPoints = (tiers) => {
    const TIER_POINTS = {
      HT1: 60, LT1: 45, HT2: 30, LT2: 20, HT3: 10,
      LT3: 6, HT4: 4, LT4: 3, HT5: 2, LT5: 1
    };
    return Object.values(tiers).reduce((sum, tier) => sum + (TIER_POINTS[tier] || 0), 0);
  };

  const movePlayer = async (index, direction) => {
    const newPlayers = [...players];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newPlayers.length) return;
    
    [newPlayers[index], newPlayers[targetIndex]] = [newPlayers[targetIndex], newPlayers[index]];
    
    queryClient.setQueryData(['players'], newPlayers);
    toast.success(`Moved ${newPlayers[targetIndex].username} ${direction}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => Player.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success('Player deleted');
    },
    onError: (error) => {
      toast.error(`Failed to delete player: ${error.message}`);
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => Player.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setIsDialogOpen(false);
      toast.success('Player created');
    },
    onError: (error) => {
      toast.error(`Failed to create player: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => Player.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setIsDialogOpen(false);
      setEditingPlayer(null);
      toast.success('Player updated');
    },
    onError: (error) => {
      toast.error(`Failed to update player: ${error.message}`);
    },
  });

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Players</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPlayer ? 'Edit Player' : 'Add New Player'}</DialogTitle>
            </DialogHeader>
            <PlayerForm
              player={editingPlayer}
              onSubmit={(data) => {
                if (editingPlayer) {
                  updateMutation.mutate({ id: editingPlayer.id, data });
                } else {
                  createMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPlayer(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <p className="text-slate-400">Loading players...</p>
        ) : players.length === 0 ? (
          <p className="text-slate-400">No players found</p>
        ) : (
          players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 w-8">#{index + 1}</span>
                <img
                  src={player.avatar_url || `https://mc-heads.net/avatar/${player.username}/32`}
                  alt={player.username}
                  className="w-8 h-8 rounded"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div>
                  <p className="text-white font-medium">{player.username}</p>
                  <p className="text-sm text-slate-400">{player.region} • {player.totalPoints} points</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => movePlayer(index, 'up')}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => movePlayer(index, 'down')}
                  disabled={index === players.length - 1}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingPlayer(player);
                    setIsDialogOpen(true);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(player.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PlayerForm({ player, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    username: player?.username || '',
    region: player?.region || 'EU',
    avatar_url: player?.avatar_url || '',
    tiers: player?.tiers || {}
  });

  const handleTierChange = (gamemode, tier) => {
    setFormData(prev => ({
      ...prev,
      tiers: {
        ...prev.tiers,
        [gamemode]: tier === 'none' ? undefined : tier
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedTiers = Object.fromEntries(
      Object.entries(formData.tiers).filter(([, v]) => v)
    );
    onSubmit({ ...formData, tiers: cleanedTiers });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
        <Input
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="bg-slate-900/50 border-slate-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Region</label>
        <Select value={formData.region} onValueChange={(v) => setFormData({ ...formData, region: v })}>
          <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {REGIONS.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Tiers</label>
        <TierSelector formData={formData} handleTierChange={handleTierChange} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-700 text-slate-300">
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          {player ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}

function DiscordSettingsManager() {
  const queryClient = useQueryClient();

  const { data: settingsList, isLoading } = useQuery({
    queryKey: ['site_settings'],
    queryFn: () => SiteSettings.list(),
    initialData: [],
  });

  const existing = settingsList?.[0];

  const [form, setForm] = useState({
    discord_link: '',
    discord_links: '',
    discord_icon: '',
  });

  useEffect(() => {
    if (existing) {
      setForm({
        discord_link: existing.discord_link || '',
        discord_links: existing.discord_links || '',
        discord_icon: existing.discord_icon || '',
      });
    }
  }, [existing]);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (existing) return SiteSettings.update(existing.id, data);
      return SiteSettings.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
      toast.success('Discord settings saved!');
    },
    onError: (error) => {
      toast.error(`Failed to save Discord settings: ${error.message}`);
    },
  });

  if (isLoading) return <p className="text-slate-400">Loading...</p>;

  const previewIcon = form.discord_icon ||
    'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/ce65b64ba_Gemini_Generated_Image_ov4fs9ov4fs9ov4f-removebg-preview.png';

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Discord Settings</h2>
      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Discord Invite Link</label>
          <Input
            value={form.discord_link}
            onChange={(e) => setForm({ ...form, discord_link: e.target.value })}
            className="bg-slate-900/50 border-slate-700 text-white"
            placeholder="https://discord.gg/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Discord Links (JSON array format)</label>
          <textarea
            value={form.discord_links || ''}
            onChange={(e) => setForm({ ...form, discord_links: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white text-sm h-24 resize-none"
            placeholder='[{"name": "Main Server", "url": "https://discord.gg/..."}]'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Server Icon URL</label>
          <p className="text-xs text-slate-500 mb-2">Leave blank to use the default LifeTiers logo</p>
          <Input
            value={form.discord_icon}
            onChange={(e) => setForm({ ...form, discord_icon: e.target.value })}
            className="bg-slate-900/50 border-slate-700 text-white"
            placeholder="https://... (leave blank for default)"
          />
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-slate-400">Preview:</span>
            <img src={previewIcon} alt="Icon preview" className="w-10 h-10 object-contain rounded-lg" style={{ background: '#0f1117', border: '1px solid #2a2d3a' }} />
          </div>
        </div>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? 'Saving...' : 'Save Discord Settings'}
        </Button>
      </form>
    </div>
  );
}

function SiteSettingsManager() {
  const queryClient = useQueryClient();

  const { data: settingsList, isLoading } = useQuery({
    queryKey: ['site_settings'],
    queryFn: () => SiteSettings.list(),
    initialData: [],
  });

  const existing = settingsList?.[0];

  const [form, setForm] = useState({
    discord_link: '',
    discord_links: '',
    realm_code: '',
    server_name: '',
    server_tagline: '',
  });

  useEffect(() => {
    if (existing) {
      setForm({
        discord_link: existing.discord_link || '',
        discord_links: existing.discord_links || '',
        realm_code: existing.realm_code || '',
        server_name: existing.server_name || '',
        server_tagline: existing.server_tagline || '',
      });
    }
  }, [existing]);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (existing) {
        return SiteSettings.update(existing.id, data);
      } else {
        return SiteSettings.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
      toast.success('Site settings saved!');
    },
    onError: (error) => {
      toast.error(`Failed to save site settings: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(form);
  };

  if (isLoading) return <p className="text-slate-400">Loading settings...</p>;

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Discord Links (JSON array format)</label>
          <textarea
            value={form.discord_links || ''}
            onChange={(e) => setForm({ ...form, discord_links: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white text-sm h-24 resize-none"
            placeholder='[{"name": "Main Server", "url": "https://discord.gg/..."}]'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Realm Code</label>
          <Input
            value={form.realm_code}
            onChange={(e) => setForm({ ...form, realm_code: e.target.value })}
            className="bg-slate-900/50 border-slate-700 text-white"
            placeholder="e.g. kerqwt5ervys4gy"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Server Name</label>
          <Input
            value={form.server_name}
            onChange={(e) => setForm({ ...form, server_name: e.target.value })}
            className="bg-slate-900/50 border-slate-700 text-white"
            placeholder="AceTiers"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Server Tagline</label>
          <Input
            value={form.server_tagline}
            onChange={(e) => setForm({ ...form, server_tagline: e.target.value })}
            className="bg-slate-900/50 border-slate-700 text-white"
            placeholder="Join our community"
          />
        </div>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={saveMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
}

function AdminsManager({ currentAdmin }) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });

  const { data: admins, isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: () => Admin.list(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => Admin.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      setIsDialogOpen(false);
      setNewAdmin({ username: '', password: '' });
      toast.success('Admin created');
    },
    onError: (error) => {
      toast.error(`Failed to create admin: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => Admin.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Admin deleted');
    },
    onError: (error) => {
      toast.error(`Failed to delete admin: ${error.message}`);
    },
  });

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Admins</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(newAdmin);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <Input
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <Input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Create
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <p className="text-slate-400">Loading admins...</p>
        ) : admins.length === 0 ? (
          <p className="text-slate-400">No admins found</p>
        ) : (
          admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400" />
                <p className="text-white font-medium">{admin.username}</p>
                {admin.id === currentAdmin.id && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">You</span>
                )}
              </div>
              {admin.id !== currentAdmin.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(admin.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}