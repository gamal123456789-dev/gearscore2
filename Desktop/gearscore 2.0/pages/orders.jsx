
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const fetchOrders = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("✅ Logged in user:", user);
    if (!user || userError) {
      console.warn("❌ No user logged in");
      return;
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*') // مؤقتًا خليه select الكل
      .eq('customer_id', user.id);

    console.log("📦 Orders for user:", data);

    if (error) {
      console.error('❌ Error fetching orders:', error);
    } else {
      setOrders(data);
    }
  };

  fetchOrders();
}, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">You have no orders yet.</p>
      ) : (
        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Price</th>
              <th className="p-3">Date</th>
              <th className="p-3">Chat</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-600">
                <td className="p-3">{order.id.slice(0, 8)}...</td>
                <td className="p-3">{order.type || 'N/A'}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">${order.total_price_usd || '0.00'}</td>
                <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  {order.chat_rooms?.length > 0 ? (
                    <a
                      href={`/chat/${order.chat_rooms[0].id}`}
                      className="text-blue-400 underline"
                    >
                      Open Chat
                    </a>
                  ) : (
                    <span className="text-gray-500">No Chat</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
