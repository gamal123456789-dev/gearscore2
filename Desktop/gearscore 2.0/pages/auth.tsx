import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabaseUrl = 'https://fhchdmecufyqehqjlhkq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY2hkbWVjdWZ5cWVocWpsaGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjA4NTksImV4cCI6MjA2NTAzNjg1OX0.JDoBKAIJOFLispBMCeYhmvZ8br9G_4NwKoA04AzUnvk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const redirectAfterLogin = () => {
    const from = router.query.from as string;
    if (from) {
      router.push(from);
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!isLoginMode && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        alert("Signed in successfully!");
        redirectAfterLogin();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              firstName,
              lastName
            }
          }
        });
        if (signUpError) {
          if (signUpError.message.includes("User already registered")) {
            const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            if (loginError) throw new Error("Email already registered. Please sign in or reset your password.");
            redirectAfterLogin();
            return;
          }
          throw signUpError;
        }

        const user = data.user;
        if (user) {
          const { error: upsertError } = await supabase.from('profiles').upsert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email
          });
          if (upsertError) throw upsertError;
        }

        alert("Account created! Check your email to confirm.");
      }
    } catch (err: any) {
      console.error("Authentication Error:", err);
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-5xl font-extrabold text-center text-white mb-3 tracking-tight">Welcome to Gearscore</h1>
        <p className="text-center text-gray-400 mb-10 text-lg">Sign in to your account or create a new one.</p>

        <div className="flex bg-gray-700 rounded-2xl p-1 mb-10 shadow-inner">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-4 px-5 text-xl font-bold rounded-2xl transition-all duration-300 transform
                        ${isLoginMode ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-gray-300 hover:text-white hover:bg-gray-600'}`}
          >Sign In</button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-4 px-5 text-xl font-bold rounded-2xl transition-all duration-300 transform
                        ${!isLoginMode ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-gray-300 hover:text-white hover:bg-gray-600'}`}
          >Sign Up</button>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-md">
          <h2 className="text-4xl font-bold text-white mb-5">
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            {isLoginMode ? 'Enter your credentials to access your account' : 'Fill in your information to create a new account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {error && (
              <div className="bg-red-900 border border-red-600 text-red-100 px-5 py-4 rounded-lg relative shadow-md flex items-center">
                <i className="fas fa-exclamation-triangle mr-3 text-xl"></i>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {!isLoginMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="shadow-sm border border-gray-600 rounded-lg w-full py-4 px-5 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="shadow-sm border border-gray-600 rounded-lg w-full py-4 px-5 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              className="shadow-sm border border-gray-600 rounded-lg w-full py-4 px-5 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="shadow-sm border border-gray-600 rounded-lg w-full py-4 px-5 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {!isLoginMode && (
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="shadow-sm border border-gray-600 rounded-lg w-full py-4 px-5 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 px-7 rounded-lg w-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
              disabled={loading}
            >
              {loading ? (isLoginMode ? 'Signing In...' : 'Creating Account...') : (isLoginMode ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
