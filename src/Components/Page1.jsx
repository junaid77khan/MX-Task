import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Card from './Card';

function Page1() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let res = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
            res = await res.json();
            setData(res);
        };
        fetchData();
    }, []);

    const filteredData = data.filter((D) => filter === 'All' || D.Status === filter);

    return (
        <div className="text-white flex flex-col justify-start items-center min-h-screen p-6 bg-gradient-to-t from-gray-800 to-cyan-700">
            <Header />
            <h1 className="text-4xl font-bold text-cyan-400 mb-12 text-center">Science Fiction Stories</h1>

            <div className="p-4 rounded-lg mb-16">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {['Published', 'In Progress', 'Completed', 'All'].map((status) => (
                        <button
                            key={status}
                            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out ${
                                filter === status
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                            }`}
                            onClick={() => setFilter(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-center w-full">
                {filteredData?.length > 0 ? (
                    filteredData.map((D) => (
                        D.Image[1] && (
                            <div
                                key={D?._id}
                                onClick={() => navigate(`/d/${D._id}`, { state: D._id })}
                                className="w-full sm:w-80 md:w-80 lg:w-1/3 xl:w-1/4 2xl:w-1/5 cursor-pointer transform transition-transform hover:scale-105"
                            >
                                <Card img1={D?.Image[0]} img2={D?.Image[1]} status={D?.Status} title={D?.Title} />
                            </div>
                        )
                    ))
                ) : (
                    <div className="text-xl text-gray-300">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default Page1;
