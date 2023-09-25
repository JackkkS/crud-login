import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar({ logOut, user }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

   
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold text-xl">
                        Logo
                    </div>

                    <div className="flex space-x-4">
                        <Link to ="/profile" className="text-white hover:text-gray-300">Profile</Link>
                        <Link to ="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                    </div>
                    
                    <div className="relative inline-block text-left">
                        <button
                            onClick={toggleDropdown}
                            type="button"
                            className="text-white group rounded-full focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user.avatar}
                                alt="User Avatar"
                            />
                        </button>

                        {isDropdownOpen && (
                            <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabIndex="-1"
                            >
                                <div className="py-1" role="none">
                                    <button
                                        onClick={logOut}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar