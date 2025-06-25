import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gearscore - Professional Gaming Boosting Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-[#0d1117] text-[#e2e8f0] font-sans antialiased">
        {/* Why Choose Us */}
        <section id="services" className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Why Choose <span className="text-indigo-400">Gearscore</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                ["fas fa-user-shield", "Guaranteed Security", "We ensure the complete security and privacy of your account while providing our services."],
                ["fas fa-users-cog", "Professional Players", "Our team consists of expert and certified players ready to fulfill your requests."],
                ["fas fa-bolt", "Fast Delivery", "We are committed to completing services as quickly as possible so you can get back to playing."],
                ["fas fa-headset", "24/7 Support", "Our customer support team is available around the clock to assist you."]
              ].map(([icon, title, desc], i) => (
                <div key={i} className="bg-gray-700 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition duration-300">
                  <div className="text-indigo-400 text-5xl mb-4">
                    <i className={icon}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-300">{desc}</p>
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
            <a
              href="https://discord.gg/yourdiscordlink"
              target="_blank"
              className="inline-block bg-white text-indigo-700 hover:bg-gray-200 text-xl py-3 px-8 rounded-full"
            >
              Join Our Discord Server <i className="fab fa-discord ml-2"></i>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-10 text-gray-400 text-sm text-center">
          <p>&copy; 2024 Gearscore. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
