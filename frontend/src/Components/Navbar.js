import React from 'react';
import { Link } from 'react-router-dom';
import HamMenu from './HamMenu';
import SwitchButton from './SwitchButton'; 
import { useTheme } from '../Theme'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { darkMode, toggleDarkMode } = useTheme(); 

    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className={`bg-gray-800 fixed top-0 w-full z-10 ${darkMode ? 'dark-mode' : ''}`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
                <div className="relative flex h-16 items-center justify-between">
                    
                    <Link to="/" className={`text-2xl font-bold text-white ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} px-3 py-2 rounded-md`}
                        aria-current="page">
                        NewsReport
                    </Link>

                    <div className="hidden md:flex flex-1 items-center justify-around mx-4 md:mx-16">
                        
                        <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Home
                        </Link>

                        <Link to="/technology" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Technology
                        </Link>

                        <Link to="/business" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Business
                        </Link>
                        
                        
                        <Link to="/sports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Sports
                        </Link>

                        <Link to="/science" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Science
                        </Link>

                        <Link to="/entertainment" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Entertainment
                        </Link>

                        <Link to="/health" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Health
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        <SwitchButton
                            checked={darkMode}
                            onChange={toggleDarkMode}
                            aria-label="dark mode switch"
                            className="text-white" 
                        />

                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 ${isOpen ? 'block' : 'hidden'} md:hidden`}>
                        <HamMenu closeMenu={closeMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
