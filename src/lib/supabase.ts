import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our application
export interface UserProfile {
  id: string;
  email: string;
  master_password_emojis: string;
  created_at: string;
  updated_at: string;
}

export interface VaultEntry {
  id: string;
  user_id: string;
  title: string;
  website?: string;
  email?: string;
  username: string;
  encrypted_password: string;
  category: string;
  is_favorite: boolean;
  last_used: string;
  created_at: string;
  updated_at: string;
}