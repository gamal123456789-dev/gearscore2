import Head from 'next/head';

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>Gearscore - How It Works</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <header className="bg-[#1a202c] py-20 text-center text-white rounded-b-xl shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Understand Our <span className="text-indigo-400">Process</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Simple steps to elevate your gaming experience with Gearscore.
          </p>
        </div>
      </header>

      {/* Steps Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            How <span className="text-indigo-400">Gearscore</span> Works?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {[
              {
                title: 'Choose Your Service',
                desc: 'Browse our wide range of games and services and select what suits you best.'
              },
              {
                title: 'Place Your Order',
                desc: 'Fill in the required details and complete the secure payment process with ease.'
              },
              {
                title: 'Receive Your Boost',
                desc: 'We will notify you upon service completion, and you can enjoy your new progress.'
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 w-full md:w-1/4 flex-shrink-0">
                <div className="bg-indigo-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white py-12 text-center rounded-t-xl mx-auto max-w-7xl mt-12 shadow-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Let Gearscore elevate your gaming experience to a new level.</p>
          <a href="https://discord.gg/yourdiscordlink" target="_blank" className="inline-block bg-white text-indigo-700 hover:bg-gray-200 text-xl py-3 px-8 rounded-full">
            Join Our Discord Server <i className="fab fa-discord ml-2"></i>
          </a>
        </div>
      </section>
    </>
  );
}