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

// Simple health check for Supabase connection
export const createSupabaseSession = async () => {
  try {
    // Basic connection check
    console.log('Checking Supabase connection...');
    const { data, error } = await supabase.from('suggestions').select('count');
    
    if (error) {
      console.log('Supabase connection check error (expected for new tables):', error);
    } else {
      console.log('Supabase connection successful!', data);
    }
    
    // Always return true to avoid blocking the app
    return true;
  } catch (err) {
    console.error('Error in Supabase connection:', err);
    // Still return true to avoid blocking the app
    return true;
  }
};

// Function to subscribe to realtime changes on a table
export const subscribeToTable = (
  tableName: 'tasks' | 'notes' | 'admin_messages' | 'suggestions',
  callback: (payload: any) => void
) => {
  console.log(`Setting up realtime subscription for table: ${tableName}`);
  
  const channel = supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: tableName },
      (payload) => {
        console.log(`Realtime event received for ${tableName}:`, payload);
        callback(payload);
      }
    )
    .subscribe((status) => {
      console.log(`Subscription status for ${tableName}:`, status);
    });
  
  // Return the channel so it can be unsubscribed when no longer needed
  return channel;
};
