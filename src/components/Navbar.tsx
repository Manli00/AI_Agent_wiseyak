import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {

    const navigate = useNavigate();
    return (
        <nav className='flex justify-between items-center p-4 bg-slate-700'>
           
            <div >
                <span className='text-4xl font-bold text-white'>wiseagent.ai</span>
            </div>

            <div className='flex gap-6 mr-5'>
                <button 
                onClick={() => navigate('/login')}
                className='py-1 px-6 text-lg font-bold bg-[#ff7a59] rounded-sm text-white'>
                    Log In
                </button>

                <button 
                onClick={() => navigate('/signup')}
                className='py-1 px-5 text-lg font-bold bg-[#ff7a59] rounded-sm text-white'>
                    Sign Up
                </button>
            </div>
          
        </nav>
    );
};

export default Navbar;