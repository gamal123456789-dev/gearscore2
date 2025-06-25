import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fhchdmecufyqehqjlhkq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY2hkbWVjdWZ5cWVocWpsaGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjA4NTksImV4cCI6MjA2NTAzNjg1OX0.JDoBKAIJOFLispBMCeYhmvZ8br9G_4NwKoA04AzUnvk'
);

const UserContext = createContext(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ user, supabase }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
