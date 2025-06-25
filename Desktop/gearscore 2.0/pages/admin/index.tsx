import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [orders, setOrders] = useState([]);

  // مؤقتًا هنستخدم بيانات وهمية
  useEffect(() => {
    const dummyOrders = [
      {
        id: 1,
        customer: 'Gamal',
        type: 'Power Leveling',
        levelRange: '1 to 65',
        extras: 'weaponMastery',
        date: '2025-06-25',
      },
      {
        id: 2,
        customer: 'Ali',
        type: 'Artifact Boost',
        artifact: 'The Abyss',
        boost: 'Full Upgrade',
        date: '2025-06-24',
      },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="text-left bg-gray-700">
            <th className="p-4">ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Type</th>
            <th className="p-4">Details</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-gray-600">
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.type}</td>
              <td className="p-4">
                {order.type === 'Power Leveling'
                  ? `Levels: ${order.levelRange}, Extras: ${order.extras}`
                  : `Artifact: ${order.artifact}, Boost: ${order.boost}`}
              </td>
              <td className="p-4">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
