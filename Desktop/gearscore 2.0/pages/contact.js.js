import React, { useState, useEffect } from 'react';

function ContactUsPage() {
    // State to manage active tab: 'liveChat' or 'submitTicket'
    const [activeTab, setActiveTab] = useState('liveChat');
    // State for form fields
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketPriority, setTicketPriority] = useState('Medium'); // Default priority
    const [ticketDescription, setTicketDescription] = useState('');
    const [ticketName, setTicketName] = useState('');
    const [ticketEmail, setTicketEmail] = useState('');


    // Function to handle tab switching
    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    // Handle form submission (for demonstration, just logs to console)
    const handleSubmitTicket = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend service
        console.log({
            name: ticketName,
            email: ticketEmail,
            subject: ticketSubject,
            priority: ticketPriority,
            description: ticketDescription,
        });
        alert('Your ticket has been submitted! We will get back to you soon.');
        // Optionally, clear the form
        setTicketName('');
        setTicketEmail('');
        setTicketSubject('');
        setTicketPriority('Medium');
        setTicketDescription('');
    };

    return (
        <div className="antialiased">
            {/* Custom CSS for the page */}
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0d1117; /* Dark background inspired by gaming themes */
                    color: #e2e8f0; /* Light text for contrast */
                }
                .header-bg {
                    background-color: #1a202c; /* A dark blue-gray color */
                    background-size: cover;
                    background-position: center;
                }
                .btn-primary {
                    background-color: #6366f1; /* Indigo */
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 9999px;
                    font-weight: 600;
                    transition: background-color 0.2s ease-in-out;
                }
                .btn-primary:hover {
                    background-color: #4f46e5; /* Darker indigo */
                }
                .btn-secondary {
                    background-color: #1a202c; /* Darker background */
                    color: #a0aec0; /* Lighter gray */
                    padding: 0.75rem 1.5rem;
                    border-radius: 9999px;
                    font-weight: 600;
                    border: 1px solid #2d3748;
                    transition: background-color 0.2s ease-in-out;
                }
                .btn-secondary:hover {
                    background-color: #2d3748;
                }
                .navbar-link {
                    color: #cbd5e0;
                    transition: color 0.2s ease-in-out;
                }
                .navbar-link:hover {
                    color: #ffffff;
                }
                .tab-button {
                    background-color: #2d3748;
                    color: #cbd5e0;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
                    cursor: pointer;
                }
                .tab-button.active {
                    background-color: #6366f1;
                    color: white;
                }
                .tab-content {
                    display: none;
                }
                .tab-content.active {
                    display: block;
                }
                `}
            </style>

            {/* Navbar */}
            <nav className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <a href="index.html" className="text-3xl font-bold rounded-lg px-4 py-2 tracking-wider flex items-center justify-center
                               bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg
                               transform hover:scale-105 transition duration-300">
                        <i className="fas fa-cog text-white mr-3 text-4xl"></i>
                        <span className="text-white">Gearscore</span>
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 text-lg">
                        <a href="index.html" className="navbar-link">Home</a>
                        <a href="games.html" className="navbar-link">Games</a>
                        <a href="index.html#services" className="navbar-link">Services</a>
                        <a href="index.html#how-it-works" className="navbar-link">How It Works</a>
                        <a href="faq.html" className="navbar-link">FAQ</a>
                        {/* Assuming contact_us_react.html would be the entry point for this React app if deployed stand-alone */}
                        <a href="contact_us_new_design.html" className="navbar-link">Contact Us</a> 
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <select className="bg-gray-800 text-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                            </select>
                        </div>
                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-gray-400 focus:outline-none">
                            <i className="fas fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section for Contact Page */}
            <header className="header-bg py-20 text-center text-white rounded-b-xl shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Get In <span className="text-indigo-400">Touch</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        We're here to help you with any questions or support you need!
                    </p>
                </div>
            </header>

            {/* Contact Section - Based on provided image */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-8">
                        {/* Tab Buttons */}
                        <div className="flex justify-center space-x-4 mb-8">
                            <button
                                className={`tab-button ${activeTab === 'liveChat' ? 'active' : ''}`}
                                onClick={() => openTab('liveChat')}
                            >
                                <i className="fas fa-comments mr-2"></i>Live Chat
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'submitTicket' ? 'active' : ''}`}
                                onClick={() => openTab('submitTicket')}
                            >
                                <i className="fas fa-envelope-open-text mr-2"></i>Submit Ticket
                            </button>
                        </div>

                        {/* Live Chat Tab Content */}
                        <div id="liveChat" className={`tab-content ${activeTab === 'liveChat' ? 'active' : ''} text-center`}>
                            <div className="bg-gray-700 rounded-xl p-8 flex flex-col items-center justify-center">
                                <i className="fas fa-headset text-indigo-400 text-6xl mb-4"></i>
                                <h3 className="text-3xl font-bold text-white mb-2">Live Chat Support</h3>
                                <p className="text-gray-300 text-lg mb-4">Connect with our support team instantly for immediate assistance</p>
                                <p className="text-green-500 font-semibold mb-6">
                                    <i className="fas fa-circle text-xs mr-2"></i>Support team is online
                                </p>
                                <a href="https://discord.gg/DzvbWwzuV8" target="_blank" className="btn-primary text-xl py-3 px-8 inline-block">
                                    Start Live Chat <i className="fab fa-discord ml-2"></i>
                                </a>
                            </div>
                        </div>

                        {/* Submit Ticket Tab Content */}
                        <div id="submitTicket" className={`tab-content ${activeTab === 'submitTicket' ? 'active' : ''} text-center`}>
                            <div className="bg-gray-700 rounded-xl p-8">
                                <h3 className="text-3xl font-bold text-white mb-6">Submit a Support Ticket</h3>
                                <form onSubmit={handleSubmitTicket} className="space-y-6">
                                    {/* Name and Email fields from previous version, kept for continuity */}
                                    <div>
                                        <label htmlFor="ticketName" className="block text-gray-300 text-sm font-bold mb-2">Your Name</label>
                                        <input 
                                            type="text" 
                                            id="ticketName" 
                                            name="ticketName" 
                                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500" 
                                            placeholder="John Doe" 
                                            value={ticketName}
                                            onChange={(e) => setTicketName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ticketEmail" className="block text-gray-300 text-sm font-bold mb-2">Your Email</label>
                                        <input 
                                            type="email" 
                                            id="ticketEmail" 
                                            name="ticketEmail" 
                                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500" 
                                            placeholder="your.email@example.com" 
                                            value={ticketEmail}
                                            onChange={(e) => setTicketEmail(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label htmlFor="ticketSubject" className="block text-gray-300 text-sm font-bold mb-2">Subject</label>
                                        <input
                                            type="text"
                                            id="ticketSubject"
                                            name="ticketSubject"
                                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                                            placeholder="Brief description of your issue"
                                            value={ticketSubject}
                                            onChange={(e) => setTicketSubject(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Priority Dropdown */}
                                    <div>
                                        <label htmlFor="ticketPriority" className="block text-gray-300 text-sm font-bold mb-2">Priority</label>
                                        <select
                                            id="ticketPriority"
                                            name="ticketPriority"
                                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                                            value={ticketPriority}
                                            onChange={(e) => setTicketPriority(e.target.value)}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>
                                    {/* Description Textarea */}
                                    <div>
                                        <label htmlFor="ticketDescription" className="block text-gray-300 text-sm font-bold mb-2">Message</label>
                                        <textarea
                                            id="ticketDescription"
                                            name="ticketDescription"
                                            rows="6"
                                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                                            placeholder="Please provide detailed information about your issue..."
                                            value={ticketDescription}
                                            onChange={(e) => setTicketDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <button type="submit" className="btn-primary text-xl px-6 py-3 rounded-md">
                                            Submit Ticket <i className="fas fa-paper-plane ml-2"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-gray-800 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition duration-300">
                            <div className="text-indigo-400 text-5xl mb-4"><i className="fas fa-comments"></i></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Live Chat</h3>
                            <p className="text-gray-300">Instant support available 24/7 through our Discord server.</p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition duration-300">
                            <div className="text-indigo-400 text-5xl mb-4"><i className="fas fa-clock"></i></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Fast Response</h3>
                            <p className="text-gray-300">Average response time under 5 minutes for immediate assistance.</p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition duration-300">
                            <div className="text-indigo-400 text-5xl mb-4"><i className="fas fa-ticket-alt"></i></div>
                            <h3 className="text-2xl font-bold text-white mb-3">Ticket System</h3>
                            <p className="text-gray-300">Track your issues and get updates on your support requests.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Footer */}
            <section className="bg-indigo-700 text-white py-12 text-center rounded-t-xl mx-auto max-w-7xl mt-12 shadow-xl">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl mb-8">Let Gearscore elevate your gaming experience to a new level.</p>
                    <a href="https://discord.gg/DzvbWwzuV8" target="_blank" className="btn-primary text-xl py-3 px-8 inline-block">
                        Join Our Discord Server <i className="fab fa-discord ml-2"></i>
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-10 text-gray-400 text-sm">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Gearscore</h3>
                        <p>Your gateway to professional gaming boosting services. We aim to provide the best experience for gamers.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><a href="index.html" className="hover:text-white">Home</a></li>
                            <li className="mb-2"><a href="games.html" className="hover:text-white">Games</a></li>
                            <li className="mb-2"><a href="index.html#services" className="hover:text-white">Services</a></li>
                            <li className="mb-2"><a href="index.html#how-it-works" className="hover:text-white">How It Works</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Support</h3>
                        <ul>
                            <li className="mb-2"><a href="faq.html" className="hover:text-white">FAQ</a></li>
                            <li className="mb-2"><a href="contact_us_new_design.html" className="hover:text-white">Contact Us</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-discord"></i></a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-10 border-t border-gray-700 pt-8">
                    <p>&copy; 2024 Gearscore. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default ContactUsPage;
