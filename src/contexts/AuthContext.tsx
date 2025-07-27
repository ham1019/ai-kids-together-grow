import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createProfile = async (userId: string, username: string) => {
    try {
      console.log('Creating profile for user:', userId, username);
      
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: username,
          display_name: username,
          is_public: true,
        });

      if (error) {
        console.error('Error creating profile:', error);
        return { error };
      }

      // Create user settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .insert({
          id: userId,
          email_notifications: true,
          push_notifications: true,
          theme: 'light',
          language: 'ko',
          timezone: 'Asia/Seoul',
          privacy_level: 'public',
        });

      if (settingsError) {
        console.error('Error creating user settings:', settingsError);
        return { error: settingsError };
      }

      console.log('Profile and settings created successfully');
      return { error: null };
    } catch (error) {
      console.error('Error in createProfile:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      console.log('Signing up user:', email, username);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { error };
      }

      console.log('Signup successful:', data);

      // If signup successful, create profile immediately
      if (data.user) {
        const profileError = await createProfile(data.user.id, username);
        if (profileError.error) {
          console.error('Profile creation error:', profileError.error);
          return { error: profileError.error };
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error in signUp:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Signin error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('Unexpected error in signIn:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};