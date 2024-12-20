import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-5 text-white w-full">
            <h1 className="text-2xl sm:text-3xl">BrainyLingo</h1>
            <div className="flex flex-wrap justify-between items-center gap-5 sm:gap-10 w-full sm:w-auto overflow-x-auto scrollbar-hide">
                <a className="text-xl" href="/home">Home</a>
                <a className="text-xl" href="#">Leaderboard</a>
                <a className="text-xl" href="#">Daily Quiz</a>
                <a className="text-xl" href="/genre">Genre</a>
            </div>
            <button 
                onClick={() => navigate('/')} 
                className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-800 rounded-full mt-4 sm:mt-0"
            >
                Sign out
            </button>
        </div>
    );
}

export default Header;
