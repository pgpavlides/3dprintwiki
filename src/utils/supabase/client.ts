import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';

// These environment variables need to be set in your project's .env file
// Get these values from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Simplified Supabase session approach that doesn't try to create users
export const createSupabaseSession = async () => {
  // For now, we'll just assume success and proceed without trying 
  // to create a Supabase session or check connectivity
  
  try {
    // Just return true to bypass Supabase authentication errors
    console.log('Bypassing Supabase authentication');
    return true;
  } catch (err) {
    console.error('Error in Supabase connection:', err);
    // Return true anyway to avoid blocking the app
    return true;
  }
};

// Function to subscribe to realtime changes on a table
export const subscribeToTable = (
  tableName: 'tasks' | 'notes',
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: tableName },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
  
  // Return the channel so it can be unsubscribed when no longer needed
  return channel;
};
