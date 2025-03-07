import React from 'react';
//import { useNavigate } from 'react-router-dom';
const Footer: React.FC = () => {

    return (
        

<footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-[#172A2F] ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
   
      <span className="text-sm text-gray-500 sm:text-center dark:text-white">© 2025 <a href="https://wiseyak.com/" className="hover:none" target="_blank" rel="noopener noreferrer">Wiseyak™</a>. All Rights Reserved.
    </span>

    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

    );
};

export default Footer;