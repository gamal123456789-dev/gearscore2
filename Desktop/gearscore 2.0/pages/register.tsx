import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from('profiles').insert({
        id: userId,
        email,
        name,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 mb-4 bg-gray-700 rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 mb-4 bg-gray-700 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 mb-6 bg-gray-700 rounded" required />
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold transition duration-300">Register</button>
      </form>
    </div>
  );
}