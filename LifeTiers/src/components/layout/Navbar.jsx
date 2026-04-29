import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search, ChevronDown, Menu, X, ExternalLink } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { SiteSettings } from '@/api/supabaseClient';

const ICONS = {
  rankings: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/d1b88660a_rankings.png',
  discord: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/93b690db8_discord.png',
  docs: 'https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/8fd81b70b_file_code.png',
};

export default function Navbar({ searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [discordOpen, setDiscordOpen] = useState(false);
  const discordRef = useRef(null);

  const { data: settingsList } = useQuery({
    queryKey: ['site_settings'],
    queryFn: () => SiteSettings.list(),
    initialData: [],
  });

  const settings = settingsList?.[0] || {};
  let discordLinks = [];
  try {
    discordLinks = settings.discord_links ? JSON.parse(settings.discord_links) : [];
  } catch(e) {}
  if (!discordLinks.length && settings.discord_link) {
    discordLinks = [{ name: 'Main Server', url: settings.discord_link }];
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: '#0f1117', borderBottom: '1px solid #2a2d3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/7738025bb_Gemini_Generated_Image_vss0sgvss0sgvss0__1_-removebg-preview1.png" 
              alt="LifeTiers" 
              className="w-28 h-10 object-contain"
            />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to={createPageUrl('Rankings')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium">
              <img src={ICONS.rankings} alt="Rankings" className="w-4 h-4 object-contain" />
              Rankings
            </Link>

            {/* Discord Dropdown */}
            <div className="relative" ref={discordRef}>
              <button
                onClick={() => setDiscordOpen(!discordOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
              >
                <img src={ICONS.discord} alt="Discord" className="w-4 h-4 object-contain" />
                Discords
                <ChevronDown className={`w-3 h-3 transition-transform ${discordOpen ? 'rotate-180' : ''}`} />
              </button>
              {discordOpen && (
                <div
                  className="absolute top-full left-0 mt-1 rounded-xl p-3 min-w-[200px] z-50"
                  style={{ background: '#161924', border: '1px solid #2a2d3a', boxShadow: '0 8px 32px #00000066' }}
                  onMouseLeave={() => setDiscordOpen(false)}
                >
                  {discordLinks.length === 0 ? (
                    <p className="text-slate-500 text-sm px-2 py-1">No links configured</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {discordLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm"
                          onClick={() => setDiscordOpen(false)}
                        >
                          <img src={settings.discord_icon || ICONS.discord} alt="" className="w-4 h-4 object-contain opacity-70 rounded" />
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to={createPageUrl('Docs')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium">
              <img src={ICONS.docs} alt="Docs" className="w-4 h-4 object-contain" />
              Docs
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => { onSearchChange(e.target.value); window.dispatchEvent(new CustomEvent('navPlayerSearch', { detail: e.target.value })); }}
                className="pl-10 w-64 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => { onSearchChange(e.target.value); window.dispatchEvent(new CustomEvent('navPlayerSearch', { detail: e.target.value })); }}
                className="pl-10 w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Link to={createPageUrl('Rankings')} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium">
                <img src={ICONS.rankings} alt="" className="w-4 h-4" />
                Rankings
              </Link>
              <Link to={createPageUrl('Docs')} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium">
                <img src={ICONS.docs} alt="" className="w-4 h-4" />
                Docs
              </Link>
              {discordLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium">
                  <img src={ICONS.discord} alt="" className="w-4 h-4" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}