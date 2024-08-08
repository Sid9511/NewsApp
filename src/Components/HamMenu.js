import React from 'react';
import { Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import { XIcon } from '@heroicons/react/outline';

const HamMenu = ({ closeMenu }) => {
    return (
        <Menu
            right
            styles={{
                bmMenuWrap: { height: '100%' }, 
                bmMenu: { overflowY: 'hidden' },
                bmMenuItem: { padding: '10px', fontSize: '18px' }, 
            }}
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"} 
        >
            <button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white"
            >
                <XIcon className="w-6 h-6" aria-hidden="true" />
            </button>

            <ul className="flex flex-col items-center space-y-4 p-4 bg-gray-800 text-white mt-16">
                <li>
                    <Link to="/" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" aria-current="page">
                        Home
                    </Link>
                </li>
                <li>
                        <Link to="/technology" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Technology
                        </Link>

                </li>
                <li>
                    <Link to="/business" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        Business
                    </Link>
                        
                        
                </li>
                <li>
                    <Link to="/sports" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        Sports
                    </Link>

                </li>
                <li>
                    <Link to="/science" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        Science
                    </Link>

                </li>
                <li>
                    <Link to="/entertainment" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        Entertainment
                    </Link>

                </li>
                <li>
                    <Link to="/health" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        Health
                    </Link>
                </li>
            </ul>
        </Menu>
    );
};

export default HamMenu;
