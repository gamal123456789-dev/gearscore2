
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhchdmecufyqehqjlhkq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY2hkbWVjdWZ5cWVocWpsaGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjA4NTksImV4cCI6MjA2NTAzNjg1OX0.JDoBKAIJOFLispBMCeYhmvZ8br9G_4NwKoA04AzUnvk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
