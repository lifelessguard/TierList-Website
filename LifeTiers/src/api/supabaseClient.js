import { supabase } from '@/lib/supabase';

// Player entity
export const Player = {
  list: async () => {
    const { data, error } = await supabase.from('players').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  get: async (id) => {
    const { data, error } = await supabase.from('players').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  },

  filter: async (filters) => {
    let query = supabase.from('players').select('*');
    if (filters.id) query = query.eq('id', filters.id);
    if (filters.username) query = query.eq('username', filters.username);
    if (filters.region) query = query.eq('region', filters.region);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  create: async (playerData) => {
    const { data, error } = await supabase.from('players').insert(playerData).select().single();
    if (error) throw error;
    return data;
  },

  update: async (id, playerData) => {
    const { data, error } = await supabase.from('players').update(playerData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  delete: async (id) => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) throw error;
  },
};

// Admin entity
export const Admin = {
  list: async () => {
    const { data, error } = await supabase.from('admins').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  create: async (adminData) => {
    const { data, error } = await supabase.from('admins').insert(adminData).select().single();
    if (error) throw error;
    return data;
  },

  delete: async (id) => {
    const { error } = await supabase.from('admins').delete().eq('id', id);
    if (error) throw error;
  },
};

// SiteSettings entity
export const SiteSettings = {
  list: async () => {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) throw error;
    return data || [];
  },

  get: async (id) => {
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  },

  create: async (settingsData) => {
    const { data, error } = await supabase.from('site_settings').insert(settingsData).select().single();
    if (error) throw error;
    return data;
  },

  update: async (id, settingsData) => {
    const { data, error } = await supabase.from('site_settings').update({ ...settingsData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
};

// Export supabase instance for direct use
export { supabase };
