import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

export default function Layout({ children }) {
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
    <>
      <Head>
        <title>Gearscore</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="text-3xl font-bold rounded-lg px-4 py-2 tracking-wider flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg transform hover:scale-105 transition duration-300">
              <i className="fas fa-cog text-white mr-3 text-4xl"></i>
              <span className="text-white">Gearscore</span>
            </a>
          </Link>

          <div className="hidden md:flex space-x-6 text-lg text-gray-400">
            <Link href="/" legacyBehavior><a className="hover:text-white">Home</a></Link>
            <Link href="/games" legacyBehavior><a className="hover:text-white">Games</a></Link>
            <a href="#services" className="hover:text-white">Services</a>
            <Link href="/how-it-works" legacyBehavior><a className="hover:text-white">How It Works</a></Link>
            <Link href="/faq" legacyBehavior><a className="hover:text-white">FAQ</a></Link>
            <Link href="/contact" legacyBehavior><a className="hover:text-white">Contact Us</a></Link>

            {user ? (
              <>
                <span className="text-white">Hi, {firstName}</span>
                <Link href="/orders" legacyBehavior><a className="hover:text-white">My Orders</a></Link>
                <button onClick={handleLogout} className="hover:text-white">Logout</button>
              </>
            ) : router.pathname !== '/auth' ? (
              <Link href="/auth" legacyBehavior><a className="hover:text-white">Login / Register</a></Link>
            ) : null}
          </div>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}
