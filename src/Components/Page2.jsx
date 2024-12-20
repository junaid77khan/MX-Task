import React from 'react';
import Header from './Header';
import { useEffect, useState } from 'react';
import Card from './Card';

function Page2() {
const [data, setData] = useState([]);
    useEffect(() => {
            const fetchData = async () => {
                let res = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
                res = await res.json();
                console.log(res);
                
                setData(res);
            };
            fetchData();
        }, []);
    return (
        <div className="text-white flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800">
            <Header/>

            <div className="w-full flex justify-around items-center my-8">
                <button className="px-6 py-3 rounded-lg text-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition">Word Explorer</button>
                <button className="px-6 py-3 rounded-lg text-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition">Story Adventure</button>
                <button className="px-6 py-3 rounded-lg text-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition">Brain Quest</button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 w-full px-6">
                <div className="bg-gray-700 p-6 rounded-lg w-full md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">Correction (Noun)</h2>
                    <p className="text-gray-300 mb-4">
                        The Story is about a city where we assume that a city known as vanavela...
                    </p>
                    <img
                        src="https://media.istockphoto.com/id/1434212178/photo/middle-eastern-lady-using-laptop-working-online-sitting-in-office.jpg?s=2048x2048&w=is&k=20&c=U0nKYf9Ggh8S77U7DvPlFpRE0bKiSOD9gr9naxHEpfM="
                        alt="Teacher and students"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-400">Synonyms: hustle, free, joy, step forward</p>
                    <p className="text-sm text-gray-400">Antonyms: hustle, free, joy, step forward</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
                    {data.map((D, index) => (
                        D.Image[1] && (
                            <div
                                key={D?._id}
                                onClick={() => navigate(`/d/${D._id}`, { state: D._id })}
                                className=""
                            >
                                <Card img1={D?.Image[0]} img2={D?.Image[1]} status={D?.Status} title={D?.Title} />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page2;
