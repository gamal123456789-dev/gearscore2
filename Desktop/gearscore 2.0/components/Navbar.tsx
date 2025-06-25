import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user, supabase } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname === '/auth') {
      router.replace('/');
    }
  }, [user, router.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  const firstName = user?.user_metadata?.firstName || 'User';

  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <Link href="/" className="text-white font-bold text-xl">
        <span className="text-indigo-400">Gear</span>score
      </Link>

      <div className="flex items-center gap-4 text-gray-300">
        {user ? (
          <>
            <span className="text-white">Hi, {firstName}</span>
            <Link href="/orders" className="hover:text-white">My Orders</Link>
            <button onClick={handleLogout} className="hover:text-white">Logout</button>
          </>
        ) : router.pathname !== '/auth' ? (
          <Link href="/auth" className="hover:text-white">Login / Register</Link>
        ) : null}
      </div>
    </nav>
  );
}
