
import Head from "next/head";
import Link from "next/link";

export default function Games() {
  const games = [
    {
      title: "New World",
      description: "Power leveling, raid completions, and more in Aeternum.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=New+World",
      href: "/newworldoffers",
    },
    {
      title: "Rust",
      description: "Survival assistance, farming, and base protection.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=Rust+Game+Image",
      href: "#",
    },
    {
      title: "Black Desert Online (BDO)",
      description: "Power leveling, silver farming, and gear progression.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=BDO+Game+Image",
      href: "#",
    },
    {
      title: "Path of Exile (PoE)",
      description:
        "Currency farming, unique items, and challenge completion for Path of Exile.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=PoE+Game+Image",
      href: "#",
    },
    {
      title: "PoE 2",
      description:
        "Stay tuned for boosting and account services upon release!",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=PoE2+Game+Image",
      href: "#",
    },
    {
      title: "Destiny 2 Accounts",
      description:
        "High-end PVE/PVP accounts with rare gear and triumphs.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=Destiny2+Game+Image",
      href: "#",
    },
    {
      title: "War Thunder Accounts",
      description:
        "Accounts with rare vehicles, high research trees, and premium content.",
      image: "https://placehold.co/300x150/0f172a/e2e8f0?text=WarThunder+Game+Image",
      href: "#",
    },
  ];

  return (
    <>
      <Head>
        <title>Gearscore - Our Games</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <section className="py-20 bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Explore Our <span className="text-indigo-400">Supported Games</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-12">
          Discover a wide range of boosting and account services across your
          favorite titles.
        </p>

        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
              <img
                src={game.image}
                alt={game.title}
                className="rounded-md mb-4"
              />
              <p className="text-gray-300 mb-6">{game.description}</p>
              <Link href={game.href}>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition w-full">
                  View Offers
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
