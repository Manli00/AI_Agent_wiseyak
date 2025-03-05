import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Use the current location to check scroll effect globally
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full flex justify-between items-center p-4 z-10 transition-all duration-300 ${
            isScrolled ? 'bg-[#172A2F] shadow-2xl' : 'bg-transparent'  // Scroll effect for all pages
        }`}>
            <div className='flex gap-2 mr-5'>
                <Link to="/">
                    <img src="src/assets/logo2.png" alt="logo" />
                </Link>
                </div>

            <div className='flex gap-6 mr-5'>
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 text-lg md:text-xl font-medium text-[#f9f9f9] bg-transparent border border-[#ffffff] rounded-md hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:border-none"
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
