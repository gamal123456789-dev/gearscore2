import '../styles/globals.css';
<<<<<<< HEAD
import Layout from '../components/Layout';
import { UserProvider } from '../context/UserContext'; // ✅ أضف هذا

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider> {/* ✅ لف كل حاجة داخل UserProvider */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
=======

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
>>>>>>> 11c9ccf41cd8c56956f4218ba23161a8486c9d95
