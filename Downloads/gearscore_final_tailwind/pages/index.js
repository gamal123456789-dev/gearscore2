import { useState } from "react";
import { motion } from "framer-motion";

const games = [
  {
    id: "newworld",
    title: "New World",
    offers: [
      { title: "Power Level 1 → 20", desc: "6–8 hrs", price: "$25" },
      { title: "Gorgon Raid Completion", desc: "2–3 hrs, full loot", price: "$75" },
    ],
  },
  {
    id: "bdo",
    title: "Black Desert Online",
    offers: [
      { title: "Gear Boost Pack", desc: "Top gear + quests", price: "$45" },
    ],
  },
  {
    id: "poe",
    title: "Path of Exile",
    offers: [
      { title: "Currency Rush", desc: "1000 Chaos Orbs", price: "$30" },
    ],
  },
  {
    id: "d2",
    title: "Destiny 2",
    offers: [
      { title: "Trials Carry", desc: "Flawless loot", price: "$40" },
    ],
  },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#111122] text-white px-4">
      <header className="flex items-center justify-between p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-blue-400">GearScore</h1>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-blue-300">Home</a>
          <a href="#" className="hover:text-blue-300">Support</a>
        </nav>
      </header>
      <section className="text-center py-20">
        <h2 className="text-4xl font-extrabold mb-4">
          The <span className="text-blue-400">All-In-One</span> Platform for Gamers
        </h2>
        <p className="text-white/70">Boosting • Accounts • Carries • Gear</p>
      </section>
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {games.map((game) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={game.id}
              onClick={() => setSelected(game.id)}
              className={`rounded-xl py-4 px-2 font-medium text-center border ${selected === game.id ? "border-blue-500 text-blue-300" : "border-white/10 text-white/80"}`}
            >
              {game.title}
            </motion.button>
          ))}
        </div>
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {games.find((g) => g.id === selected).offers.map((offer, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#1a1a2a] p-5 border border-white/10 shadow hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{offer.title}</h3>
                <p className="text-sm text-white/60">{offer.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-300 font-bold">{offer.price}</span>
                  <a
                    href="https://discord.gg/yourlink"
                    target="_blank"
                    className="text-sm font-semibold text-black bg-blue-400 px-3 py-1 rounded hover:bg-blue-500"
                  >
                    Order
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </section>
      <footer className="text-center text-white/40 text-sm py-10">
        © 2025 GearScore. All rights reserved.
      </footer>
    </main>
  );
}
