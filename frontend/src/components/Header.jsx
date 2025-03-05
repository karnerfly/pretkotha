import { useState } from "react";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-opacity-90 text-white shadow-lg relative">
            {/* Animated Particles (Placeholder for Future Implementation) */}
            <div id="particles" className="absolute inset-0 overflow-hidden pointer-events-none opacity-30"></div>

            {/* Navbar */}
            <nav className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="text-2xl font-bold flex items-center space-x-2 group">
                        <div className="bg-white text-primary-600 rounded-full p-2 transform group-hover:rotate-12 transition-transform duration-300">
                            <i className="fas fa-book-open"></i>
                        </div>
                        <span className="tracking-tight">CreativeWorld</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {["Home", "About", "Contact", "Login"].map((item, index) => (
                            <a 
                                key={index} 
                                href={item === "About" ? "pages/about.html" : item === "Contact" ? "pages/contact.html" : "#"} 
                                className="text-white hover:text-primary-100 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                        ))}
                        <button className="bg-white text-primary-600 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Subscribe
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="text-white focus:outline-none"
                        >
                            <i className="fas fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mt-4 rounded-lg bg-white shadow-xl animate__animated animate__fadeIn">
                        <div className="flex flex-col p-4 space-y-3">
                            {["Home", "About", "Contact", "Login"].map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item === "About" ? "pages/about.html" : item === "Contact" ? "pages/contact.html" : "#"} 
                                    className="text-primary-600 hover:text-primary-800 py-2 px-4 rounded-lg hover:bg-gray-100"
                                >
                                    {item}
                                </a>
                            ))}
                            <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 mt-2">
                                Subscribe
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
