import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Page2 = () => {
  const [selectedTab, setSelectedTab] = useState("Word Explorer");
  const navigate = useNavigate();
  const tabs = ["Word Explorer", "Story Adventure", "Brain Quest"];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
      res = await res.json();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-800 to-cyan-900 text-white">
      <Header />

      <h1 className="text-center text-4xl font-extrabold text-cyan-400 mt-8">
        The Lost City of Future Earth
      </h1>

      <div className="flex justify-center mt-6 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out ${
              selectedTab === tab
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-300 mt-4 text-lg">
        Drag Pictures to the matching Words, light up correct pairs, shake for a retry
      </p>

      <div className="flex flex-wrap items-start mt-10 justify-center gap-6">
        <div className="w-full md:w-1/3 bg-gradient-to-r from-gray-800 to-cyan-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-purple-400">Correction (Retry)</h3>
          <p className="text-sm mt-4 text-gray-200">
            Tier up the city! Drag pictures into matching words or unscramble the story to explore more about the lost city.
          </p>
          <img 
            className="h-64 w-full mt-6 object-cover rounded-md shadow-md" 
            src="https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Correction Example" 
          />
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((D) => (
            D.Image[1] && (
              <div
                key={D._id}
                onClick={() => navigate(`/d/${D._id}`, { state: D._id })}
              >
                <Card img1={D.Image[0]} img2={D.Image[1]} status={D.Status} title={D.Title} />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page2;