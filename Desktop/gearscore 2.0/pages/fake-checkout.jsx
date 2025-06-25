import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const FakeCheckout = () => {
  const router = useRouter();
  const { current, desired, world, platform, extras, price } = router.query;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const confirmOrder = async () => {
    if (!userId) return alert('User not authenticated');

    const { error } = await supabase.from('orders').insert({
      customer_id: userId,
      booster_id: null,
      service_id: null,
      status: 'pending',
      total_price_usd: parseFloat(price),
      total_price_eur: parseFloat(price) * 0.91,
    });

    if (error) {
      console.error(error);
      alert('❌ Failed to place order.');
    } else {
      alert('✅ Order placed successfully!');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Fake Checkout</h1>
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-xl">
        <p><strong>From:</strong> {current} → <strong>To:</strong> {desired}</p>
        <p><strong>World:</strong> {world}</p>
        <p><strong>Platform:</strong> {platform}</p>
        <p><strong>Extras:</strong> {extras || 'None'}</p>
        <p><strong>Price (USD):</strong> ${price}</p>
        <button
          onClick={confirmOrder}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md font-bold"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default FakeCheckout;
