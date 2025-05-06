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

// Helper function to map the current authenticated user to a Supabase session
export const createSupabaseSession = async (username: string) => {
  // For demonstration purposes, we'll use a deterministic email based on username
  // In a real implementation, you would use the actual user's email
  const email = `${username}@3dprintwiki.com`;
  
  // Use a simple "magic link" authentication to create a session
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // This creates a session without sending an email
        // Only use this in development or for trusted users
        shouldCreateUser: true,
      }
    });
    
    if (error) {
      console.error('Error creating Supabase session:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in Supabase authentication:', err);
    return false;
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
